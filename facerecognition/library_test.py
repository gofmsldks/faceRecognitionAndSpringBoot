import cv2
import numpy
import matplotlib
import tensorflow
import deepface
import face_recognition_models
import urllib.request

# 라이브러리 설치가 안돼서 라이브러리를 불러오려면 터머널에 pip install -r requirements.txt 입력
print(cv2.__version__)
print(numpy.__version__)
print(matplotlib.__version__)
print(tensorflow.__version__)

# img_url = urllib.request.urlretrieve("https://upload.wikimedia.org/wikipedia/ko/2/24/Lenna.png", "Lena.png")
img = cv2.imread("C:/ensglobal/facerecognition/Lena.png", cv2.IMREAD_COLOR)
cv2.imshow('image', img)

cv2.waitKey(0)