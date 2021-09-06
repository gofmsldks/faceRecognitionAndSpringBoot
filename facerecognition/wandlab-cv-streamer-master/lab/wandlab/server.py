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

from flask import Flask
from flask import request
from flask import Response
from flask import stream_with_context
from flask import redirect, url_for
from flask import jsonify
import requests
import json
from .streamer import Streamer

app = Flask( __name__ )


@app.route('/resultRecognition', methods = ['POST'])
def resultRecognition():

    try:
        print(request.is_json)
        params = request.get_json()
        print(f"전달받은 json 값: {params}")
        return jsonify(params)

    except:
        print("오류 발생")



@app.route('/stream')
def stream():

    global streamer
    streamer = Streamer()

    src = request.args.get( 'src', default = 0, type = int )

    try :
        return Response(
                                stream_with_context( stream_gen( src ) ),
                                mimetype='multipart/x-mixed-replace; boundary=frame' )

    except Exception as e :

        print('[wandlab] ', 'stream error : ',str(e))


def stream_gen( src ):   
  
    try : 
        
        streamer.run(src)
        while True:
            frame, img, face, result = streamer.bytescode()

            if len(result) != 0:
                print('result 길이 0이상')
                streamer.stop()

                url = "http://211.51.22.141:8080/[얼굴인식 결과값 받을 주소]"
                testUrl = "http://localhost:5000/resultRecognition"
                headers = {'Content-Type': 'application/json; charset=utf-8'}
                parsedAllResult = streamer.result_parser(result)
                successResult = streamer.loadPrePropResult(parsedAllResult)
                params = {"parsedAllResult" : parsedAllResult , "successResult" : successResult}
                print(f"전달하는 json 값: {json.dumps(params)}")

                response = requests.post(url=testUrl, data=json.dumps(params), headers=headers)
                print(response.json())

                break

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
                    
    except GeneratorExit :
        #print( '[wandlab]', 'disconnected stream' )
        streamer.stop()