import cv2
import numpy as np
import matplotlib
import tensorflow as tf
from Cython import inline
from tensorflow import keras
import face_recognition_models
import urllib.request
from deepface import DeepFace
from deepface.basemodels import VGGFace, OpenFace, Facenet, FbDeepFace
from keras_applications.vgg16 import preprocess_input
from keras_applications.vgg16 import decode_predictions
import os
import glob

# 필요한 패키지와 라이브러리를 가져옴
import matplotlib as mpl
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm

# 그래프에서 마이너스 폰트 깨지는 문제에 대한 대처
mpl.rcParams['axes.unicode_minus'] = False


# deep face 라이브러리를 사용한 얼굴 인식
# 먼저 스크립트 형식으로 코드를 작성하고
# 후에 서비스 제공을 위해 oop 형식으로 코드 재작성
# deep face 라이브러리를 사용하지 않고
# 이미지 전처리부터 후처리까지 구현하여 기존 모델에 불러오는 방법도 있으나
# 빠른 구현을 위해 deepface 라이브러리 이용

# thresh hold function

def findThreshold(model_name, distance_metric):
    threshold = 0
    if model_name == 'VGG-Face':
        threshold = 0.55
    elif model_name == 'OpenFace':
        threshold = 0.55
    elif model_name == 'Facenet':
        threshold = 10
    elif model_name == 'DeepFace':
        threshold = 64
    return threshold


def isValidFace(distance):
    if distance < 0.55:
        return True
    else:
        return False



os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# 사진 경로
IMG1_PATH = "C:/ensglobal/facerecognition/test_image/shine_ye_un_1.jpg"
IMG2_PATH = "C:/ensglobal/facerecognition/test_image/shine_ye_un_2.jpg"
IMG3_PATH = "C:/ensglobal/facerecognition/test_image/song_jung_gi_1.jpg"
IMG4_PATH = "C:/ensglobal/facerecognition/test_image/song_jung_gi_2.jpg"


img1 = cv2.imread(IMG1_PATH, cv2.IMREAD_COLOR)
img2 = cv2.imread(IMG2_PATH, cv2.IMREAD_COLOR)
print('openCV로 읽어온 이미지 shape: '+ str(img1.shape))
print('openCV로 읽어온 이미지 shape: '+ str(img2.shape))
print('openCV로 읽어온 이미지 type: '+ str(type(img2)))


# 얼굴 탐지 전 사진
pre_fig = plt.figure(figsize=(8,8))  # rows*cols 행렬의 i번째 subplot 생성
rows = 2
cols = 2
i = 1

xlabels = ["xlabel", "(a)", "(b)", "(c)", "(d)"]

for filename in [IMG1_PATH, IMG2_PATH, IMG3_PATH, IMG4_PATH]:
    img = cv2.imread(filename)
    ax = pre_fig.add_subplot(rows, cols, i)
    ax.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    ax.set_xlabel(xlabels[i])
    # ax.set_xticks([]), ax.set_yticks([])
    i += 1

plt.show()


# 얼굴 탐지 후 사진
backends = ['opencv', 'ssd', 'dlib', 'mtcnn', 'retinaface']
metrics = ["cosine", "euclidean"]

detected_fig = plt.figure(figsize=(8,8))  # rows*cols 행렬의 i번째 subplot 생성
rows = 2
cols = 2
i = 1

xlabels = ["xlabel", "(a)", "(b)", "(c)", "(d)"]
detectedFace = []

detectedFace.append(DeepFace.detectFace(IMG1_PATH, detector_backend = backends[3]))
detectedFace.append(DeepFace.detectFace(IMG2_PATH, detector_backend = backends[3]))
detectedFace.append(DeepFace.detectFace(IMG3_PATH, detector_backend = backends[3]))
detectedFace.append(DeepFace.detectFace(IMG4_PATH, detector_backend = backends[3]))

for img in detectedFace:
    ax = detected_fig.add_subplot(rows, cols, i)
    ax.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    ax.set_xlabel(xlabels[i])
    ax.set_xticks([]), ax.set_yticks([])
    i += 1

plt.show()
print('얼굴 감지했을때 shape' + str(detectedFace[0].shape))
print('얼굴 감지했을때 타입' + str(type(detectedFace[0])))

# preprocessing(Reshape) image
reshape_image1 = detectedFace[0].reshape((1, detectedFace[0].shape[0], detectedFace[0].shape[1], detectedFace[0].shape[2]))
reshape_image2 = detectedFace[1].reshape((1, detectedFace[1].shape[0], detectedFace[1].shape[1], detectedFace[1].shape[2]))
reshape_image3 = detectedFace[2].reshape((1, detectedFace[2].shape[0], detectedFace[2].shape[1], detectedFace[2].shape[2]))
reshape_image4 = detectedFace[3].reshape((1, detectedFace[3].shape[0], detectedFace[3].shape[1], detectedFace[3].shape[2]))


# calling VGGFace
model = VGGFace.loadModel()
# model = Facenet.loadModel()
# model = OpenFace.loadModel()
# model = FbDeepFace.loadModel()
model.summary()

image_representation1 = model.predict(reshape_image1)
image_representation2 = model.predict(reshape_image2)


img1_graph = []
img2_graph = []

# image 1, 2 representation and check distance
for i in range(0, 200):
    img1_graph.append(image_representation1)
    img2_graph.append(image_representation2)

img1_graph = np.array(img1_graph)
img2_graph = np.array(img2_graph)
img1_graph = img1_graph.reshape(200, 2622)
img2_graph = img2_graph.reshape(200, 2622)

fig = plt.figure(figsize=(10,10))

ax1 = fig.add_subplot(3, 2, 1)
plt.imshow(detectedFace[0][:, :, ::-1])
plt.axis('off')

ax2 = fig.add_subplot(3, 2, 2)
im = plt.imshow(img1_graph, interpolation='nearest', cmap=plt.cm.ocean)
plt.colorbar()

ax3 = fig.add_subplot(3, 2, 3)
plt.imshow(detectedFace[1][:, :, ::-1])
plt.axis('off')

ax4 = fig.add_subplot(3, 2, 4)
im = plt.imshow(img2_graph, interpolation='nearest', cmap=plt.cm.ocean)
plt.colorbar()

# img1의 vector 값에서 img2의 vector값을 뺀 후 제곱
distance_vector = np.square(image_representation1 - image_representation2)
# 제곱한 값에 루트를 씌움
distance = np.sqrt(distance_vector.sum())
distance_graph = []
for i in range(0, 200):
    distance_graph.append(distance_vector)

ax5 = fig.add_subplot(3, 2, 5)
plt.text(0.257, 0.535, 'distance: ' + str(distance))
plt.text(0.6, 0, 'A and B equal person?: ' + str(isValidFace(distance)), fontsize=12, color='blue')
plt.axis('off')

distance_graph = np.array(distance_graph)
distance_graph = distance_graph.reshape(200,2622)
ax6 = fig.add_subplot(3, 2, 6)
im = plt.imshow(distance_graph, interpolation='nearest', cmap=plt.cm.ocean)
plt.colorbar()
plt.show()
print('사진 A와 B는 일치하는 사람인가?: ' + str(isValidFace(distance)))



# image 3, 4 representation and check distance

image_representation3 = model.predict(reshape_image3)
image_representation4 = model.predict(reshape_image4)

img3_graph = []
img4_graph = []

for i in range(0, 200):
    img3_graph.append(image_representation3)
    img4_graph.append(image_representation4)

img3_graph = np.array(img1_graph)
img4_graph = np.array(img2_graph)
img3_graph = img1_graph.reshape(200, 2622)
img4_graph = img2_graph.reshape(200, 2622)

fig = plt.figure(figsize=(10,10))

ax1 = fig.add_subplot(3, 2, 1)
plt.imshow(detectedFace[2][:, :, ::-1])
plt.axis('off')

ax2 = fig.add_subplot(3, 2, 2)
im = plt.imshow(img3_graph, interpolation='nearest', cmap=plt.cm.ocean)
plt.colorbar()

ax3 = fig.add_subplot(3, 2, 3)
plt.imshow(detectedFace[3][:, :, ::-1])
plt.axis('off')

ax4 = fig.add_subplot(3, 2, 4)
im = plt.imshow(img4_graph, interpolation='nearest', cmap=plt.cm.ocean)
plt.colorbar()

# img1의 vector 값에서 img2의 vector값을 뺀 후 제곱
distance_vector = np.square(image_representation3 - image_representation4)
# 제곱한 값에 루트를 씌움
distance = np.sqrt(distance_vector.sum())
distance_graph = []
for i in range(0, 200):
    distance_graph.append(distance_vector)

ax5 = fig.add_subplot(3, 2, 5)
plt.text(0.257, 0.535, str(distance))
plt.text(0.6, 0, 'C and D equal person?: ' + str(isValidFace(distance)), fontsize=12, color='blue')
plt.axis('off')

distance_graph = np.array(distance_graph)
distance_graph = distance_graph.reshape(200,2622)
ax6 = fig.add_subplot(3, 2, 6)
im = plt.imshow(distance_graph, interpolation='nearest', cmap=plt.cm.ocean)
plt.colorbar()
plt.show()
print('사진 C과 D는 일치하는 사람인가?: ' + str(isValidFace(distance)))




# 한방에 되는것:
#ans = DeepFace.verify([[IMG1_PATH, IMG2_PATH], [IMG1_PATH, IMG3_PATH], [IMG1_PATH, IMG4_PATH]], model_name = 'VGG-Face', distance_metric = 'cosine', model = None, enforce_detection = True, detector_backend = 'mtcnn', align = True, prog_bar = True, normalization = 'base')  # validate our images
#print(ans)