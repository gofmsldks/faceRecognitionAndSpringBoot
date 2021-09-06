import glob
import os
import time

from deepface import DeepFace
from deepface.commons import functions
from deepface.basemodels import VGGFace, OpenFace, Facenet, Facenet512, FbDeepFace, DeepID, DlibWrapper, ArcFace, Boosting
from deepface.commons import functions, realtime, distance as dst
from tqdm import tqdm
from os import path

from keras_applications.vgg16 import preprocess_input
from keras_applications.vgg16 import decode_predictions
import cv2
import numpy as np
import pickle

BACKENDS = ['opencv', 'ssd', 'dlib', 'mtcnn', 'retinaface']
METRICS = ["cosine", "euclidean", "euclidean_l2"]

class faceRecognitionModel:


    def __init__(self):
        os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
        self.threshold = 0
        self.distance = None
        self.model_name = None
        self.__dectectionFace = None
        self.__userImg = None
        self.distance = None

    def findThreshold(self, model_name, distance_metric):
        self.model_name = model_name

        if model_name == 'VGG-Face':
            self.threshold = 0.55
        elif model_name == 'OpenFace':
            self.threshold = 0.55
        elif model_name == 'Facenet':
            self.threshold = 10
        elif model_name == 'DeepFace':
            self.threshold = 64
        return self.threshold


    def isValidFace(self, distance):
        self.distance = distance

        if distance < 0.55:
            return True
        else:
            return False


    def recognition(self, detectionTempFacePath, userImgPath = '', model_name = 'VGG-Face', distance_metric = 'cosine', model = None, enforce_detection = True, detector_backend = 'mtcnn', align = True, prog_bar = True, normalization = 'base', update = False):
        # detectionTempFacePath = 사용자가 캠에 인식한 얼굴
        # userImgPath = 저장되어져 있는 회원의 얼굴 사진
        tic = time.time()

        img_list, bulkProcess = functions.initialize_input(detectionTempFacePath, userImgPath)

        resp_objects = []

        # --------------------------------

        if model_name == 'Ensemble':
            model_names = ["VGG-Face", "Facenet", "OpenFace", "DeepFace"]
            metrics = ["cosine", "euclidean", "euclidean_l2"]
        else:
            model_names = []
            metrics = []
            model_names.append(model_name)
            metrics.append(distance_metric)

        # --------------------------------

        if model == None:
            if model_name == 'Ensemble':
                models = Boosting.loadModel()
            else:
                model = DeepFace.build_model(model_name)
                models = {}
                models[model_name] = model
        else:
            if model_name == 'Ensemble':
                Boosting.validate_model(model)
                models = model.copy()
            else:
                models = {}
                models[model_name] = model

        # ------------------------------

        disable_option = (False if len(img_list) > 1 else True) or not prog_bar
        img2_representation_list = []
        img1_representation = None

        if update is False:
            # load picke if pickle exist
            print("update == False. 기존 picke 로드...\n")
            with open("C:/ensglobal/facerecognition/test_pickle/user.pickle", "rb") as fr:
                img2_representation_list = pickle.load(fr)
        else:
            print("update == True. update 진행...\n")

        pbar = tqdm(range(0, len(img_list)), desc='Verification', disable=disable_option)

        for index in pbar:

            instance = img_list[index]

            if type(instance) == list and len(instance) >= 2:
                img1_path = instance[0]
                img2_path = instance[1]

                ensemble_features = []


                for i in model_names:
                    custom_model = models[i]
                    if img1_representation is None:
                        # img_path, model_name = 'VGG-Face', model = None, enforce_detection = True, detector_backend = 'mtcnn'
                        img1_representation = DeepFace.represent(img_path=img1_path
                                                        , model_name=model_name, model=custom_model
                                                        , enforce_detection=enforce_detection,
                                                        detector_backend=detector_backend
                                                        , align=align
                                                        , normalization=normalization
                                                        )
                    else:
                        pass

                    if update is True:
                            img2_representation = DeepFace.represent(img_path=img2_path
                                                            , model_name=model_name, model=custom_model
                                                            , enforce_detection=enforce_detection,
                                                            detector_backend=detector_backend
                                                            , align=align
                                                            , normalization=normalization
                                                            )
                            img2_representation_list.append(img2_representation)
                    else:
                        img2_representation = img2_representation_list[index]


                    # ----------------------
                    # find distances between embeddings
                    for j in metrics:

                        if j == 'cosine':
                            distance = dst.findCosineDistance(img1_representation, img2_representation)
                        elif j == 'euclidean':
                            distance = dst.findEuclideanDistance(img1_representation, img2_representation)
                        elif j == 'euclidean_l2':
                            distance = dst.findEuclideanDistance(dst.l2_normalize(img1_representation),
                                                                 dst.l2_normalize(img2_representation))
                        else:
                            raise ValueError("Invalid distance_metric passed - ", distance_metric)

                        distance = np.float64(
                            distance)  # causes trobule for euclideans in api calls if this is not set (issue #175)
                        # ----------------------
                        # decision

                        if model_name != 'Ensemble':

                            threshold = dst.findThreshold(i, j)

                            if distance <= threshold:
                                identified = True
                            else:
                                identified = False

                            resp_obj = {
                                "verified": identified
                                , "distance": distance
                                , "max_threshold_to_verify": threshold
                                , "model": model_name
                                , "similarity_metric": distance_metric

                            }

                            if bulkProcess == True:
                                resp_objects.append(resp_obj)
                            else:
                                return resp_obj

                        else:  # Ensemble

                            # this returns same with OpenFace - euclidean_l2
                            if i == 'OpenFace' and j == 'euclidean':
                                continue
                            else:
                                ensemble_features.append(distance)

                # ----------------------
                # img2_representation pickel에 저장
                if update is True:
                    with open("C:/ensglobal/facerecognition/test_pickle/user.pickle", "wb") as fw:
                        pickle.dump(img2_representation_list, fw)
                else:
                    pass
                # ----------------------

                if model_name == 'Ensemble':

                    boosted_tree = Boosting.build_gbm()

                    prediction = boosted_tree.predict(np.expand_dims(np.array(ensemble_features), axis=0))[0]

                    verified = np.argmax(prediction) == 1
                    score = prediction[np.argmax(prediction)]

                    resp_obj = {
                        "verified": verified
                        , "score": score
                        , "distance": ensemble_features
                        , "model": ["VGG-Face", "Facenet", "OpenFace", "DeepFace"]
                        , "similarity_metric": ["cosine", "euclidean", "euclidean_l2"]
                    }

                    if bulkProcess == True:
                        resp_objects.append(resp_obj)
                    else:
                        return resp_obj

            # ----------------------

            else:
                raise ValueError("Invalid arguments passed to verify function: ", instance)

        # -------------------------

        toc = time.time()

        if bulkProcess == True:

            resp_obj = {}
            # 결과값의 이름(Key Value)
            userName = self.loadSavedUserImgName()
            for i in range(0, len(resp_objects)):
                resp_item = resp_objects[i]
                resp_obj[userName[i]] = resp_item

            return resp_obj


        #self.__dectectionTempFace = cv2.imread(detectionTempFacePath)
        #print('openCV로 읽어온 유저이미지 shape: ' + str(self.__dectectionFace))
        #print('openCV로 읽어온 유저이미지 type: ' + str(type(self.__dectectionFace)))
        #self.__dectectionTempFace = self.detectFaceImage(detectionTempFacePath)


        # 로드 가능한 Recognition Model 종류
        # model = VGGFace.loadModel()
        # model = Facenet.loadModel()
        # model = OpenFace.loadModel()
        # model = FbDeepFace.loadModel()



    def detectFaceImage(self, userImgPath):

        prepropUserImg = DeepFace.detectFace(userImgPath, detector_backend = BACKENDS[3])
        print('얼굴 감지했을때 shape' + str(prepropUserImg.shape))
        print('얼굴 감지했을때 타입' + str(type(prepropUserImg)))
        return prepropUserImg.reshape((1, prepropUserImg.shape[0], prepropUserImg.shape[1], prepropUserImg.shape[2]))


    def distanceVector(self, representationDetectionFace, representationUserImg):
        # img1의 vector 값에서 img2의 vector값을 뺀 후 제곱
        distance_vector = np.square(representationDetectionFace - representationUserImg)
        # 제곱한 값에 루트를 씌움
        distance = np.sqrt(distance_vector.sum())
        return distance

    def loadUserImgPath(self,detectionTempFacePath):
        userImgPath = []
        for path in glob.glob("C:/ensglobal/facerecognition/test_image/*.jpg"):
            userImgPath.append([detectionTempFacePath, path])
        return userImgPath

    # user의 이름(사번) 로드
    def loadSavedUserImgName(self):
        userName = []
        for path in glob.glob("C:/ensglobal/facerecognition/test_image/*.jpg"):
            prePath, fileName = os.path.split(path)
            userName.append(os.path.splitext(fileName)[0])

        return userName


