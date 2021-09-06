import glob
import os
import numpy as np
from pprint import pprint
import warnings

warnings.filterwarnings("ignore", category=np.VisibleDeprecationWarning)

def result_parser(resultJson):
    resultDic = {key: [resultJson[key]['distance'], resultJson[key]['verified']] for key in resultJson}

    return resultDic

def loadSavedUserImgName():
    userName = []
    for path in glob.glob("C:/ensglobal/facerecognition/test_image/*.jpg"):
        prePath, fileName = os.path.split(path)
        userName.append(os.path.splitext(fileName)[0])

    return userName

#ans = result_parser({'pair_1': {'verified': False, 'distance': 0.7632899384256077, 'max_threshold_to_verify': 0.4, 'model': 'Facenet', 'similarity_metric': 'cosine'}, 'pair_2': {'verified': False, 'distance': 0.7650084421282037, 'max_threshold_to_verify': 0.4, 'model': 'Facenet', 'similarity_metric': 'cosine'}, 'pair_3': {'verified': False, 'distance': 0.6611249393479569, 'max_threshold_to_verify': 0.4, 'model': 'Facenet', 'similarity_metric': 'cosine'}, 'pair_4': {'verified': False, 'distance': 0.5535364950198216, 'max_threshold_to_verify': 0.4, 'model': 'Facenet', 'similarity_metric': 'cosine'}})
#pprint(ans)

#ans2 = loadSavedUserImgName()
#print(ans2)


ex = {'blackpink_jenny': [0.6028985057019954, False], 'blackpink_jisoo': [0.320443189225492, True], 'blackpink_lisa': [0.6494940232026954, False], 'blackpink_rose': [0.4841463778241566, False], 'bts_jhop': [0.6360608877610666, False], 'bts_jimin': [0.8708128116063791, False], 'bts_jin': [0.788150418430921, False], 'bts_jungook': [0.5645761859333103, False], 'bts_rm': [0.5936947652078569, False], 'bts_sugar': [0.7880860669700351, False], 'bts_v': [0.6571562072868095, False], 'han_ye_sle': [0.4525477928151965, False], 'hwang_jung_min': [0.8170182028360277, False], 'jang_dong_gun': [0.7634753966747752, False], 'jeong_woo_sung': [0.8272666669892533, False], 'jeung_yong_hwa': [0.6277116496785334, False], 'jo_jeong_suk': [0.7871796830030157, False], 'kim_so_youn': [0.6413888506415892, False], 'kim_tae_hee': [0.5996314313329045, False], 'lee_ha_nee': [0.7243433315826556, False], 'lee_jae_hoon': [0.7330570943165018, False], 'lee_jeong_jae': [0.9398823685429565, False], 'lee_jong_suk': [0.5681394075363269, False], 'mably': [0.8178513863472927, False], 'park_bo_gum': [0.7232274885326002, False], 'park_bo_young': [0.5112587349569319, False], 'park_myung_soo': [0.7965508243236898, False], 'seo_hyun': [0.5748686575263555, False], 'shin_ha_goun': [0.6733529500250538, False], 'shine_ye_un_1': [0.2664021376351564, True], 'shine_ye_un_2': [0.17786127122309403, True], 'son_ye_jin': [0.6650498848052319, False], 'song_jung_gi_1': [0.504806140005122, False], 'song_jung_gi_2': [0.5429341233451632, False], 'twice_chaeyoung': [0.6743441698579711, False], 'twice_dahyun': [0.48321297817898745, False], 'twice_jeongyeon': [0.67606735535312, False], 'twice_jihyo': [0.5931096338032495, False], 'twice_mina': [0.63184571027856, False], 'twice_momo': [0.4374472856095821, False], 'twice_nayeon': [0.7004615721878722, False], 'twice_sana': [0.4970924795940538, False], 'twice_tzuyu': [0.45950694016414273, False], 'you_jae_suk': [0.8434409365589358, False], 'you_youn_suk': [0.6574715459004805, False]}

ans = {key : (1-value[0])*100 for key, value in ex.items() if value[1] != False}
ans = dict(sorted(ans.items(), key = lambda x: x[1], reverse= True))
print(ans)

i = 1
for key, value in ans.items():
    print(f"{i} 순위 ----> 성함: {key}, 일치율: {value}%")
    i+=1