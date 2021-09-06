# -*- encoding: utf-8 -*-
#-------------------------------------------------#
# Date created          : 2020. 8. 18.
# Date last modified    : 2020. 8. 19.
# Author                : chamadams@gmail.com
# Site                  : http://wandlab.com
# License               : GNU General Public License(GPL) 2.0
# Version               : 0.1.0
# Python Version        : 3.6+
#-------------------------------------------------#

import time
import cv2
import imutils
import platform
import numpy as np
from threading import Thread
from queue import Queue
from facerecognitionmodel import runModel
import threading


class Streamer :
    
    def __init__(self):
        
        if cv2.ocl.haveOpenCL() :
            cv2.ocl.setUseOpenCL(True)
        print('[wandlab] ', 'OpenCL : ', cv2.ocl.haveOpenCL())
            
        self.capture = None
        self.thread = None
        self.width = 360
        self.height = 360
        self.stat = True
        self.current_time = time.time()
        self.preview_time = time.time()
        self.sec = 0
        self.Q = Queue(maxsize=128)
        self.started = False


        self.face_classifier = None
        self.eyes_classifier = None
        self.gray = None
        self.faces = None
        self.roi = None


        self.image = None
        self.ret = None
        self.frame = None
        self.face = None
        self.detect = False
        self.delay = True
        self.img = None
        self.cnt = 0
        self.faceRecognitionJson = {}
        self.recImg = []
        self.recFace = []

        self.startTimer()

    def run(self, src = 0 ) :

        self.stop()

        if platform.system() == 'Windows' :        
            self.capture = cv2.VideoCapture( src , cv2.CAP_DSHOW )

        else :
            self.capture = cv2.VideoCapture( src )


        self.capture.set(cv2.CAP_PROP_FRAME_WIDTH, self.width)
        self.capture.set(cv2.CAP_PROP_FRAME_HEIGHT, self.height)
        
        if self.thread is None :
            self.thread = Thread(target=self.update, args=())
            self.thread.daemon = False
            self.thread.start()
        
        self.started = True
    
    def stop(self):
        
        self.started = False
        
        if self.capture is not None :
            
            self.capture.release()
            self.clear()
            
    def update(self):
                    
        while True:

            if self.started :
                (grabbed, frame) = self.capture.read()
                # self.ret, self.frame = self.capture.read()
                # self.image, self.face = self.face_detector(self.frame)

                if grabbed : 
                    self.Q.put(frame)
                          
    def clear(self):
        
        with self.Q.mutex:
            self.Q.queue.clear()
            
    def read(self):

        return self.Q.get()

    def blank(self):
        
        return np.ones(shape=[self.height, self.width, 3], dtype=np.uint8)
    
    def bytescode(self):
        
        if not self.capture.isOpened():
            
            frame = self.blank()

        else :

            '''if self.detect is False and self.cnt < 200:
                self.cnt += 1
                print(f"카운트: {self.cnt}")

            elif self.cnt == 200:
                self.onDetect()'''

            frame = imutils.resize(self.read(), width=int(self.width) )
            cv2.putText(frame, "locate your face in CAMERA",(10, 30), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1,(255, 51, 51), 2)
            #cv2.circle(img, (180, 160), 100, (102, 205, 51), 2)
            cv2.rectangle(frame, (0, 0), (360, 294), (102, 205, 51), 3)

            if self.stat :
                #cv2.rectangle( frame, (240,264), (360,294), (0,0,0), -1)
                fps = 'FPS : ' + str(self.fps())
                cv2.putText  ( frame, fps, (270,280), cv2.FONT_HERSHEY_PLAIN, 1, (0,0,255), 1, cv2.LINE_AA)

            if self.detect:
                self.recImg, self.recFace = self.face_detector(frame)

                if len(self.recFace) >= 1:
                    cv2.imwrite('C:/ensglobal/facerecognition/tempface/recImg.jpg', np.array(self.recImg))
                    cv2.imwrite('C:/ensglobal/facerecognition/tempface/recFace.jpg', np.array(self.recFace))

                    try:
                        self.faceRecognitionJson = runModel.run(update=False)
                    except:
                        self.faceRecognitionJson = {'DETECTION': None}
                    print(f'streamer에서의 결과{self.faceRecognitionJson}')



        return cv2.imencode('.jpg', frame )[1].tobytes(), self.recImg, self.recFace, self.faceRecognitionJson
    
    def fps(self):
        
        self.current_time = time.time()
        self.sec = self.current_time - self.preview_time
        self.preview_time = self.current_time
        
        if self.sec > 0 :
            fps = round(1/(self.sec),1)
            
        else :
            fps = 1
            
        return fps


    def face_detector(self, img,size=0.5):

        self.face_classifier = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        #self.eyes_classifier = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # scaleFactor: 1에 가까우면 검출률 올라감
        # minNeighbors: 높으면 검출률 올라감
        # 올라가면 얼굴아닌 부분도 얼굴이라 인식할 수 있음

        faces = self.face_classifier.detectMultiScale(gray, scaleFactor = 1.8, minNeighbors = 3, minSize=(100,100))
        #eyes = self.eyes_classifier.detectMultiScale(gray, scaleFactor = 2.0, minNeighbors = 3, minSize=(10,10))
        if faces is ():
            print('얼굴 검출 안됨')
            cv2.putText(img, "locate your face in CAMERA",(10, 30), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1,(255, 51, 51), 2)
            #cv2.circle(img, (180, 160), 100, (102, 205, 51), 2)
            cv2.rectangle(img, (0, 0), (360,294), (102, 205, 51), 3)

            return img, []

        print(faces)
        print(np.array(faces).flatten().tolist()[:4])
        (x, y, w, h) = np.array(faces).flatten().tolist()[:4]
        #(x_eye1, y_eye1, w_eye1, h_eye1) = np.array(eyes[0]).flatten().tolist()[:4]
        #(x_eye2, y_eye2, w_eye2, h_eye2) = np.array(eyes[1]).flatten().tolist()[:4]

        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 255), 2)
        #cv2.rectangle(img, (x_eye1, y_eye1), (x_eye1 + w_eye1, y_eye1 + h_eye1), (255, 255, 255, 0.0), 0)
        #cv2.rectangle(img, (x_eye2, y_eye2), (x_eye2 + w_eye2, y_eye2 + h_eye2), (255, 255, 255, 0.0), 0)

        roi = img[y:y + h, x:x + w]
        roi = cv2.resize(roi, (200, 200))
        cv2.putText(img, "face detection success", (20, 30), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (255, 51, 51), 2)

        return img, roi  # 검출된 좌표에 사각 박스 그리고(img), 검출된 부위를 잘라(roi) 전달

    def result_parser(self, resultJson):

        resultDic = {key : [resultJson[key]['distance'], resultJson[key]['verified']] for key in resultJson}
        return resultDic

    def onDetect(self):
        if self.detect is False:
            print(f"detect: {self.detect}, 얼굴 detect 종료상태...대기 상태 종료...detect 기능실행...")
            self.detect = True
            print("detect 기능 실행 완료...")
        else:
            pass

    def offDetect(self):
        if self.detect is True:
            print(f"delay: {self.detect}, 얼굴 detect 실행상태...대기 상태 시작...detect 기능종료")
            self.detect = False

    # 결과 값 중 True 뽑아내고 일치율을 순위로 보여주는 함수
    def loadPrePropResult(self, result):

        ans = {key: (1 - value[0]) * 100 for key, value in result.items() if value[1] != False}
        ans = dict(sorted(ans.items(), key=lambda x: x[1], reverse=True))
        print(ans)

        i = 1
        for key, value in ans.items():
            print(f"{i} 순위 ----> 성함: {key}, 일치율: {value} %")
            i += 1

        return ans

    def startTimer(self):
        timer = threading.Timer(1, self.startTimer)
        timer.start()
        remainTime = 10 - self.cnt
        print(f"{self.cnt} / 10 >>> 안면 감지 까지 {remainTime}초 남음...")
        self.cnt += 1
        if self.cnt > 10:
            timer.cancel()
            self.onDetect()


    def __exit__(self) :
        print( '* streamer class exit')
        self.capture.release()


