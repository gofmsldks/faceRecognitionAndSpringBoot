import pickle

try:
    # load picke if pickle exist
    with open("C:/ensglobal/facerecognition/test_pickle/user.pickle", "rb") as fr:
        img2_representation = pickle.load(fr)
    img2_representation_load_isValid = True

except:
    print("img2_representation(UserImg) 존재 하지 않음. 사전 학습 진행")
    pass