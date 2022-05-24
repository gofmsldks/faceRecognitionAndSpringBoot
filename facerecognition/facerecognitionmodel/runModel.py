from .FaceRecognitionModel import faceRecognitionModel

BACKENDS = ['opencv', 'ssd', 'dlib', 'mtcnn', 'retinaface']
METRICS = ["cosine", "euclidean", "euclidean_l2"]

def run(update):

    # 모델 class 선언
    faceRecognition = faceRecognitionModel()

    # 사진 경로
    TEMP_PATH = "C:/ensglobal_srs/facerecognition/tempface/recFace.jpg"

    userImgPath = faceRecognition.loadUserImgPath(TEMP_PATH)
    print(f"로드 된 유저 이미지 PATH: {userImgPath}")
    allResult = faceRecognition.recognition(userImgPath, model_name = 'Facenet', distance_metric = 'cosine', model = None, enforce_detection = True, detector_backend = 'mtcnn', align = True, prog_bar = True, normalization = 'base', update = update)
    print(allResult)


    return allResult

    # 각 모듈을 이어서 한번에 동작하게 구현 그리고 사진 캡쳐시 영상 스트리밍 종료 기능 구현해야됨.
    # 사진 찍었을때 tempface 폴더와 기존 유저 폴더 경로 검색해서 불러오는 함수 구현