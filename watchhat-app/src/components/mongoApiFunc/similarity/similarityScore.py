import numpy as np
import json
from sklearn.preprocessing import MultiLabelBinarizer, OneHotEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.sparse import hstack
from sklearn.metrics.pairwise import cosine_similarity

moviesArray = [
  {
    "id": 824,
    "original_language": "en",
    "genre_ids": [18, 10749, 10402],
    "cast": [3061, 2227, 5723, 388, 12206]
  },
  {
    "id": 4935,
    "original_language": "ja",
    "genre_ids": [14, 16, 12],
    "cast": [533325, 12670, 20338, 19592, 225730]
  },
  {
    "id": 993784,
    "original_language": "en",
    "genre_ids": [35, 27, 10749],
    "cast": [221192, 56730, 1268847, 3410595, 141762]
  },
  {
    "id": 10494,
    "original_language": "ja",
    "genre_ids": [16, 53],
    "cast": [65437, 65424, 553949, 1685, 65438]
  },
  {
    "id": 3933,
    "original_language": "en",
    "genre_ids": [10749, 14, 16],
    "cast": [85, 1283, 1639, 30364, 34900]
  },
  {
    "id": 496243,
    "original_language": "ko",
    "genre_ids": [35, 53, 18],
    "cast": [20738, 115290, 556435, 1255881, 1442583]
  },
  {
    "id": 77,
    "original_language": "en",
    "genre_ids": [9648, 53],
    "cast": [529, 530, 532, 534, 535]
  },
  {
    "id": 13885,
    "original_language": "en",
    "genre_ids": [18, 27],
    "cast": [85, 1283, 4566, 9191, 6730]
  },
  {
    "id": 457335,
    "original_language": "en",
    "genre_ids": [28, 35, 80, 53],
    "cast": [10980, 1372369, 1583307, 63362, 82666]
  },
  {
    "id": 808,
    "original_language": "en",
    "genre_ids": [16, 35, 14, 12, 10751],
    "cast": [12073, 776, 6941, 12074, 1925]
  },
  {
    "id": 696506,
    "original_language": "en",
    "genre_ids": [878, 35, 12],
    "cast": [11288, 1537686, 215055, 103, 3051]
  },
  {
    "id": 950387,
    "original_language": "en",
    "genre_ids": [10751, 35, 12, 14],
    "cast": [117642, 70851, 2680307, 2604515, 1075037]
  },
  {
    "id": 426063,
    "original_language": "en",
    "genre_ids": [27, 14],
    "cast": [1459885, 3292, 137905, 27428, 5293]
  },
  {
    "id": 809,
    "original_language": "en",
    "genre_ids": [16, 10751, 35, 14, 12],
    "cast": [12073, 776, 6941, 5823, 3131]
  },
  {
    "id": 313369,
    "original_language": "en",
    "genre_ids": [35, 18, 10749, 10402],
    "cast": [30614, 54693, 113461, 14892, 18999]
  },
  {
    "id": 73723,
    "original_language": "en",
    "genre_ids": [16, 10751],
    "cast": [518, 27105, 29222, 71403, 212208]
  },
  {
    "id": 10681,
    "original_language": "en",
    "genre_ids": [16, 10751, 878],
    "cast": [670, 72754, 60074, 20753, 7907]
  },
  {
    "id": 822119,
    "original_language": "en",
    "genre_ids": [28, 53, 878],
    "cast": [53650, 3, 1773397, 1394332, 1462]
  },
  {
    "id": 1045938,
    "original_language": "en",
    "genre_ids": [28, 9648, 18],
    "cast": [19492, 18471, 72985, 1407498, 60373]
  },
  {
    "id": 1197306,
    "original_language": "en",
    "genre_ids": [28, 80, 53],
    "cast": [976, 35029, 454, 973, 3953574]
  },
  {
    "id": 1195506,
    "original_language": "en",
    "genre_ids": [28, 35, 53],
    "cast": [1030513, 1654001, 60960, 1649152, 1660452]
  },
  {
    "id": 1233413,
    "original_language": "en",
    "genre_ids": [27, 53],
    "cast": [135651, 130640, 134774, 4688032, 85065]
  },
  {
    "id": 1013601,
    "original_language": "en",
    "genre_ids": [36, 18, 80],
    "cast": [380, 23959, 1363054, 17920, 18313]
  },
  {
    "id": 617126,
    "original_language": "en",
    "genre_ids": [878, 12],
    "cast": [1253360, 556356, 1597365, 21042, 202032]
  },
  {
    "id": 1244944,
    "original_language": "en",
    "genre_ids": [27, 9648],
    "cast": [1853909, 60199, 2170322, 4697723, 62649]
  },
  {
    "id": 986056,
    "original_language": "en",
    "genre_ids": [28, 12, 878],
    "cast": [1373737, 60898, 986808, 18182, 1700685]
  },
  {
    "id": 324544,
    "original_language": "en",
    "genre_ids": [14, 12, 28],
    "cast": [63, 543530, 66147, 3883680, 30087]
  },
  {
    "id": 549509,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [3490, 72855, 529, 1496392, 1055230]
  },
  {
    "id": 1087891,
    "original_language": "en",
    "genre_ids": [53, 28],
    "cast": [17838, 7497, 165424, 993774, 72873]
  },
  {
    "id": 1241436,
    "original_language": "en",
    "genre_ids": [10752, 28],
    "cast": [2710333, 1363054, 93491, 1907002, 1597365]
  },
  {
    "id": 1233575,
    "original_language": "en",
    "genre_ids": [18, 9648, 53],
    "cast": [112, 17288, 52891, 2673762, 1628687]
  },
  {
    "id": 974576,
    "original_language": "en",
    "genre_ids": [18, 53, 9648],
    "cast": [5469, 2283, 12074, 6588, 1240427]
  },
  {
    "id": 1249213,
    "original_language": "en",
    "genre_ids": [9648, 53],
    "cast": [1028899, 1855143, 1515230, 4660921, 31508]
  },
  {
    "id": 1293286,
    "original_language": "en",
    "genre_ids": [37, 28],
    "cast": [10822, 69122, 2963, 36631, 1319440]
  },
  {
    "id": 939243,
    "original_language": "en",
    "genre_ids": [28, 878, 35, 10751, 12, 14],
    "cast": [206, 222121, 6384, 17605, 1212864]
  },
  {
    "id": 762509,
    "original_language": "en",
    "genre_ids": [12, 10751, 16],
    "cast": [1763709, 1344361, 1074676, 107529, 1251835]
  },
  {
    "id": 447273,
    "original_language": "en",
    "genre_ids": [10751, 14],
    "cast": [2217977, 90633, 1869968, 3555, 19978]
  },
  {
    "id": 1064213,
    "original_language": "en",
    "genre_ids": [18, 35, 10749],
    "cast": [1640439, 3051936, 1266686, 966306, 4338956]
  },
  {
    "id": 157336,
    "original_language": "en",
    "genre_ids": [12, 18, 878],
    "cast": [10297, 1813, 3895, 83002, 1893]
  },
  {
    "id": 1353117,
    "original_language": "en",
    "genre_ids": [27, 14, 53, 9648, 28],
    "cast": [2349355, 5528, 1259367, 1564775, 3172263]
  },
  {
    "id": 974453,
    "original_language": "en",
    "genre_ids": [28, 80, 53, 9648, 10751],
    "cast": [3896, 2372, 36549, 85756, 1710334]
  },
  {
    "id": 1895,
    "original_language": "en",
    "genre_ids": [12, 28, 878],
    "cast": [17244, 3061, 524, 27762, 2231]
  },
  {
    "id": 933260,
    "original_language": "en",
    "genre_ids": [27, 878],
    "cast": [3416, 1392137, 6065, 2313436, 1508131]
  },
  {
    "id": 710295,
    "original_language": "en",
    "genre_ids": [27, 53],
    "cast": [984629, 936970, 3844059, 65727, 1416517]
  },
  {
    "id": 1450863,
    "original_language": "en",
    "genre_ids": [35, 10749],
    "cast": [1982642, 3072712, 3502158, 2635809, 1181397]
  },
  {
    "id": 1241982,
    "original_language": "en",
    "genre_ids": [16, 12, 10751, 35],
    "cast": [1564846, 18918, 4775908, 1868823, 55937]
  },
  {
    "id": 1100988,
    "original_language": "en",
    "genre_ids": [27, 53, 878],
    "cast": [1388593, 27428, 85065, 5107934, 5469]
  },
  {
    "id": 293660,
    "original_language": "en",
    "genre_ids": [28, 12, 35],
    "cast": [10859, 54882, 1047649, 51990, 78452]
  },
  {
    "id": 11,
    "original_language": "en",
    "genre_ids": [12, 28, 878],
    "cast": [2, 3, 4, 5, 12248]
  },
  {
    "id": 615,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [8767, 8768, 8769, 8770, 28782]
  },
  {
    "id": 1429743,
    "original_language": "th",
    "genre_ids": [18, 35],
    "cast": [1346092, 3919883, 1839889, 2430105, 5230382]
  },
  {
    "id": 78,
    "original_language": "en",
    "genre_ids": [878, 18, 53],
    "cast": [3, 585, 586, 587, 588]
  },
  {
    "id": 823219,
    "original_language": "lv",
    "genre_ids": [16, 14, 12],
    "cast": []
  },
  {
    "id": 402431,
    "original_language": "en",
    "genre_ids": [18, 10749, 14],
    "cast": [1765068, 226001, 4785, 1620, 80860]
  },
  {
    "id": 597,
    "original_language": "en",
    "genre_ids": [18, 10749],
    "cast": [6193, 204, 1954, 8534, 3713]
  },
  {
    "id": 799766,
    "original_language": "en",
    "genre_ids": [10402, 18],
    "cast": [80535, 1499833, 28485, 47699, 123884]
  },
  {
    "id": 1124620,
    "original_language": "en",
    "genre_ids": [27, 35],
    "cast": [587020, 61134, 1721268, 3257962, 36801]
  },
  {
    "id": 671,
    "original_language": "en",
    "genre_ids": [12, 14],
    "cast": [10980, 10989, 10990, 194, 10993]
  },
  {
    "id": 27205,
    "original_language": "en",
    "genre_ids": [28, 878, 12],
    "cast": [6193, 24045, 3899, 2524, 27578]
  },
  {
    "id": 1084199,
    "original_language": "en",
    "genre_ids": [27, 878, 53],
    "cast": [1981044, 1030513, 1371509, 2073513, 210172]
  },
  {
    "id": 329,
    "original_language": "en",
    "genre_ids": [12, 878],
    "cast": [4783, 4784, 4785, 4786, 4789]
  },
  {
    "id": 558449,
    "original_language": "en",
    "genre_ids": [28, 12, 18],
    "cast": [2326151, 5292, 1253360, 935, 1597365]
  },
  {
    "id": 972533,
    "original_language": "en",
    "genre_ids": [53, 18],
    "cast": [57755, 1489211, 1508313, 7248, 1231402]
  },
  {
    "id": 438631,
    "original_language": "en",
    "genre_ids": [878, 12],
    "cast": [1190668, 933238, 25072, 117642, 1640]
  },
  {
    "id": 950396,
    "original_language": "en",
    "genre_ids": [10749, 878, 53],
    "cast": [996701, 1397778, 10205, 1479869, 84865]
  },
  {
    "id": 85,
    "original_language": "en",
    "genre_ids": [12, 28],
    "cast": [3, 650, 652, 655, 653]
  },
  {
    "id": 693134,
    "original_language": "en",
    "genre_ids": [878, 12],
    "cast": [1190668, 505710, 933238, 3810, 16851]
  },
  {
    "id": 1097549,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [2227, 1716493, 3131, 3435887, 3115932]
  },
  {
    "id": 1138194,
    "original_language": "en",
    "genre_ids": [27, 53],
    "cast": [3291, 1981044, 1512280, 17052, 2019444]
  },
  {
    "id": 603,
    "original_language": "en",
    "genre_ids": [28, 878],
    "cast": [6384, 2975, 530, 1331, 9364]
  },
  {
    "id": 533535,
    "original_language": "en",
    "genre_ids": [28, 35, 878],
    "cast": [10859, 6968, 2324569, 15576, 1464650]
  },
  {
    "id": 774370,
    "original_language": "en",
    "genre_ids": [10751, 35, 12, 16],
    "cast": [64149, 1427948, 1488961, 52848, 5100037]
  },
  {
    "id": 574475,
    "original_language": "en",
    "genre_ids": [27, 9648],
    "cast": [3480304, 1547148, 144852, 1482198, 1441215]
  },
  {
    "id": 1226572,
    "original_language": "hi",
    "genre_ids": [35, 18],
    "cast": [1605786, 1312081, 1427894, 3006631, 2908994]
  },
  {
    "id": 1184918,
    "original_language": "en",
    "genre_ids": [16, 878, 10751],
    "cast": [1267329, 1253360, 1538851, 2440, 1381186]
  },
  {
    "id": 870028,
    "original_language": "en",
    "genre_ids": [80, 53, 28],
    "cast": [880, 19498, 182272, 18999, 1257819]
  },
  {
    "id": 1226406,
    "original_language": "en",
    "genre_ids": [28, 35, 10749],
    "cast": [690, 1437491, 64436, 62385, 124644]
  },
  {
    "id": 19995,
    "original_language": "en",
    "genre_ids": [28, 12, 14, 878],
    "cast": [65731, 8691, 10205, 32747, 17647]
  },
  {
    "id": 1153714,
    "original_language": "en",
    "genre_ids": [27, 35, 14],
    "cast": [22226, 974169, 93491, 20766, 4939]
  },
  {
    "id": 238,
    "original_language": "en",
    "genre_ids": [18, 80],
    "cast": [3084, 1158, 3085, 3087, 3086]
  },
  {
    "id": 155,
    "original_language": "en",
    "genre_ids": [18, 28, 80, 53],
    "cast": [3894, 1810, 6383, 3895, 1579]
  },
  {
    "id": 1185528,
    "original_language": "zh",
    "genre_ids": [28, 18, 36],
    "cast": [2084790, 2611997, 56861, 5137536, 4809370]
  },
  {
    "id": 1061474,
    "original_language": "en",
    "genre_ids": [28, 12, 878],
    "cast": [1785590, 993774, 3292, 39391, 1180346]
  },
  {
    "id": 604685,
    "original_language": "en",
    "genre_ids": [28, 80, 53],
    "cast": [17276, 1371398, 93336, 1343865, 956385]
  },
  {
    "id": 1317088,
    "original_language": "en",
    "genre_ids": [878, 18, 53],
    "cast": [550843, 1227717, 227454, 6613, 30430]
  },
  {
    "id": 777443,
    "original_language": "en",
    "genre_ids": [878, 12, 28],
    "cast": [1356210, 73457, 690, 1206, 1945369]
  },
  {
    "id": 1087192,
    "original_language": "en",
    "genre_ids": [14, 12, 10751, 28],
    "cast": [2803710, 2064124, 17276, 11109, 1139349]
  },
  {
    "id": 661539,
    "original_language": "en",
    "genre_ids": [18, 10402],
    "cast": [1190668, 819, 18050, 1525043, 59233]
  },
  {
    "id": 675,
    "original_language": "en",
    "genre_ids": [12, 14],
    "cast": [10980, 10989, 10990, 11356, 1283]
  },
  {
    "id": 118340,
    "original_language": "en",
    "genre_ids": [28, 878, 12],
    "cast": [73457, 8691, 543530, 12835, 51329]
  },
  {
    "id": 1302916,
    "original_language": "en",
    "genre_ids": [27, 35, 10749],
    "cast": [542870, 2174509, 1542878, 113224, 50398]
  },
  {
    "id": 1306845,
    "original_language": "hi",
    "genre_ids": [28, 18],
    "cast": [86302, 6519, 1641086, 1166967, 1427894]
  },
  {
    "id": 348,
    "original_language": "en",
    "genre_ids": [27, 878],
    "cast": [4139, 10205, 5047, 5048, 5049]
  },
  {
    "id": 1126166,
    "original_language": "en",
    "genre_ids": [28, 53],
    "cast": [13240, 70904, 17052, 15050, 2714088]
  },
  {
    "id": 1212855,
    "original_language": "en",
    "genre_ids": [28, 35, 53],
    "cast": [2299, 51798, 118370, 1453293, 3327515]
  },
  {
    "id": 329865,
    "original_language": "en",
    "genre_ids": [18, 878, 9648],
    "cast": [9273, 17604, 2178, 72873, 225411]
  },
  {
    "id": 539972,
    "original_language": "en",
    "genre_ids": [28, 12, 53],
    "cast": [27428, 1437491, 2099497, 4941, 984629]
  },
  {
    "id": 550,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [819, 287, 1283, 7470, 7499]
  },
  {
    "id": 1446943,
    "original_language": "es",
    "genre_ids": [35, 18],
    "cast": [85560, 5298436, 1526350, 1303064, 1044027]
  },
  {
    "id": 1254786,
    "original_language": "en",
    "genre_ids": [10749, 35, 18],
    "cast": [1331457, 1562074, 1192218, 86310, 10963]
  },
  {
    "id": 1196943,
    "original_language": "hi",
    "genre_ids": [36, 28, 18],
    "cast": [1469935, 1752056, 87328, 86508, 35778]
  },
  {
    "id": 1125899,
    "original_language": "en",
    "genre_ids": [28, 53],
    "cast": [1315036, 2296, 2498631, 1736805, 56650]
  },
  {
    "id": 257094,
    "original_language": "en",
    "genre_ids": [53, 9648],
    "cast": [2227, 258, 15576, 3232669, 1658615]
  },
  {
    "id": 1130402,
    "original_language": "fr",
    "genre_ids": [35],
    "cast": [28781, 1644129, 1115077, 378552, 1471466]
  },
  {
    "id": 575265,
    "original_language": "en",
    "genre_ids": [28, 12, 53],
    "cast": [500, 39459, 10182, 11108, 65344]
  },
  {
    "id": 1141182,
    "original_language": "en",
    "genre_ids": [27, 53, 878],
    "cast": [530, 60077, 81685, 550522, 51937]
  },
  {
    "id": 1181107,
    "original_language": "en",
    "genre_ids": [16, 18, 10751, 14],
    "cast": [25072, 11181, 139, 517, 2054851]
  },
  {
    "id": 872585,
    "original_language": "en",
    "genre_ids": [18, 36],
    "cast": [2037, 5081, 1892, 3223, 1373737]
  },
  {
    "id": 1272149,
    "original_language": "en",
    "genre_ids": [10749, 35, 18],
    "cast": [9137, 5294, 3477880, 3291, 388]
  },
  {
    "id": 585,
    "original_language": "en",
    "genre_ids": [16, 35, 10751],
    "cast": [1230, 7904, 7905, 884, 5563]
  },
  {
    "id": 259316,
    "original_language": "en",
    "genre_ids": [14, 12],
    "cast": [37632, 77795, 58873, 998225, 72466]
  },
  {
    "id": 120,
    "original_language": "en",
    "genre_ids": [12, 14, 28],
    "cast": [109, 1327, 110, 1328, 65]
  },
  {
    "id": 1093237,
    "original_language": "en",
    "genre_ids": [53, 10402],
    "cast": [1549008, 974169, 1290466, 3715495, 2384066]
  },
  {
    "id": 1084031,
    "original_language": "hi",
    "genre_ids": [27, 18],
    "cast": [1148844, 53672, 2993313, 2869651, 2553283]
  },
  {
    "id": 545611,
    "original_language": "en",
    "genre_ids": [28, 12, 878],
    "cast": [1620, 1381186, 690, 20904, 8944]
  },
  {
    "id": 1771,
    "original_language": "en",
    "genre_ids": [28, 12, 878],
    "cast": [16828, 39459, 60898, 2176, 1331]
  },
  {
    "id": 1252309,
    "original_language": "es",
    "genre_ids": [10749, 18],
    "cast": [3513082, 2504043, 1062026, 1144322, 1042729]
  },
  {
    "id": 516729,
    "original_language": "en",
    "genre_ids": [10751, 35, 12],
    "cast": [17064, 19923, 1246, 1304662, 1304661]
  },
  {
    "id": 7451,
    "original_language": "en",
    "genre_ids": [28, 12, 53, 80],
    "cast": [12835, 18514, 20982, 2231, 53347]
  },
  {
    "id": 831396,
    "original_language": "en",
    "genre_ids": [27, 878],
    "cast": [932696, 19384, 2144, 228371, 78117]
  },
  {
    "id": 912649,
    "original_language": "en",
    "genre_ids": [28, 878, 12],
    "cast": [2524, 5294, 36594, 7026, 1115]
  },
  {
    "id": 271110,
    "original_language": "en",
    "genre_ids": [12, 28, 878],
    "cast": [16828, 3223, 1245, 60898, 53650]
  },
  {
    "id": 1064486,
    "original_language": "en",
    "genre_ids": [16, 18, 35],
    "cast": [235416, 113505, 67837, 45586, 2413]
  },
  {
    "id": 680,
    "original_language": "en",
    "genre_ids": [53, 80],
    "cast": [8891, 2231, 139, 62, 10182]
  },
  {
    "id": 278,
    "original_language": "en",
    "genre_ids": [18, 80],
    "cast": [192, 504, 4029, 6573, 6574]
  },
  {
    "id": 1022789,
    "original_language": "en",
    "genre_ids": [16, 12, 35, 10751],
    "cast": [56322, 1903874, 3020876, 51998, 25147]
  },
  {
    "id": 330,
    "original_language": "en",
    "genre_ids": [12, 28, 878],
    "cast": [4785, 1231, 4935, 3229, 4786]
  },
  {
    "id": 1312833,
    "original_language": "en",
    "genre_ids": [27, 28, 14],
    "cast": [1433186, 3290768, 1433191, 2531837, 300511]
  },
  {
    "id": 335984,
    "original_language": "en",
    "genre_ids": [878, 18],
    "cast": [30614, 3, 224513, 543530, 32]
  },
  {
    "id": 447365,
    "original_language": "en",
    "genre_ids": [878, 12, 28, 35],
    "cast": [73457, 8691, 543530, 543261, 139820]
  },
  {
    "id": 1227003,
    "original_language": "en",
    "genre_ids": [27],
    "cast": [225411, 117431, 1400939, 1451899, 11828]
  },
  {
    "id": 103,
    "original_language": "en",
    "genre_ids": [80, 18],
    "cast": [380, 1038, 1036, 1037, 1039]
  },
  {
    "id": 346698,
    "original_language": "en",
    "genre_ids": [35, 12],
    "cast": [234352, 30614, 59174, 1767250, 1455336]
  },
  {
    "id": 338953,
    "original_language": "en",
    "genre_ids": [14, 12],
    "cast": [37632, 9642, 1019, 132157, 58873]
  },
  {
    "id": 980477,
    "original_language": "zh",
    "genre_ids": [16, 14, 12],
    "cast": [2367355, 2367356, 2368846, 2368848, 2368849]
  },
  {
    "id": 299534,
    "original_language": "en",
    "genre_ids": [12, 878, 28],
    "cast": [3223, 16828, 103, 74568, 1245]
  },
  {
    "id": 974950,
    "original_language": "fr",
    "genre_ids": [18, 53],
    "cast": [1505938, 8691, 77948, 983710, 25616]
  },
  {
    "id": 70160,
    "original_language": "en",
    "genre_ids": [878, 12, 14],
    "cast": [72129, 27972, 96066, 57755, 9281]
  },
  {
    "id": 109445,
    "original_language": "en",
    "genre_ids": [16, 10751, 12, 14],
    "cast": [40462, 19394, 221611, 54415, 1207489]
  },
  {
    "id": 9806,
    "original_language": "en",
    "genre_ids": [28, 12, 16, 10751],
    "cast": [8977, 18686, 59361, 59360, 11662]
  },
  {
    "id": 1011477,
    "original_language": "en",
    "genre_ids": [28, 12, 18, 10751],
    "cast": [3033265, 18897, 2877, 11866, 2030076]
  },
  {
    "id": 9480,
    "original_language": "en",
    "genre_ids": [14, 28],
    "cast": [880, 9278, 72466, 61981, 15277]
  },
  {
    "id": 1457124,
    "original_language": "en",
    "genre_ids": [99],
    "cast": [1933688, 1029819, 5367757, 5367758, 2107155]
  },
  {
    "id": 672,
    "original_language": "en",
    "genre_ids": [12, 14],
    "cast": [10980, 10989, 10990, 11181, 13014]
  },
  {
    "id": 1271,
    "original_language": "en",
    "genre_ids": [28, 12, 10752],
    "cast": [17276, 17286, 17287, 1371, 9831]
  },
  {
    "id": 13,
    "original_language": "en",
    "genre_ids": [35, 18, 10749],
    "cast": [31, 32, 33, 35, 34]
  },
  {
    "id": 20526,
    "original_language": "en",
    "genre_ids": [12, 28, 878],
    "cast": [9828, 59315, 1229, 2547, 22063]
  },
  {
    "id": 475557,
    "original_language": "en",
    "genre_ids": [80, 53, 18],
    "cast": [73421, 380, 1545693, 4432, 16841]
  },
  {
    "id": 331,
    "original_language": "en",
    "genre_ids": [12, 28, 53, 878],
    "cast": [4783, 3905, 4939, 4941, 4940]
  },
  {
    "id": 12444,
    "original_language": "en",
    "genre_ids": [12, 14],
    "cast": [10980, 10990, 10989, 13014, 1283]
  },
  {
    "id": 10315,
    "original_language": "en",
    "genre_ids": [12, 16, 35, 10751],
    "cast": [1461, 5064, 17881, 486, 1332415]
  },
  {
    "id": 283995,
    "original_language": "en",
    "genre_ids": [878, 12, 28],
    "cast": [73457, 8691, 543530, 12835, 51329]
  },
  {
    "id": 131631,
    "original_language": "en",
    "genre_ids": [878, 12, 53],
    "cast": [72129, 27972, 96066, 57755, 9281]
  },
  {
    "id": 1020414,
    "original_language": "en",
    "genre_ids": [27, 53, 14],
    "cast": [2478464, 3965802, 4040585, 4041888, 3205360]
  },
  {
    "id": 1232546,
    "original_language": "en",
    "genre_ids": [27],
    "cast": [3307906, 2342988, 1972166, 2983147, 2286570]
  },
  {
    "id": 950,
    "original_language": "en",
    "genre_ids": [16, 10751, 35, 12],
    "cast": [15757, 5723, 5724, 15758, 57599]
  },
  {
    "id": 420818,
    "original_language": "en",
    "genre_ids": [12, 18, 10751, 16],
    "cast": [5294, 84292, 119589, 15152, 51878]
  },
  {
    "id": 1084736,
    "original_language": "fr",
    "genre_ids": [12, 28, 18],
    "cast": [145121, 910944, 123989, 93532, 17839]
  },
  {
    "id": 272,
    "original_language": "en",
    "genre_ids": [28, 80, 18],
    "cast": [3894, 3895, 3896, 3897, 64]
  },
  {
    "id": 673,
    "original_language": "en",
    "genre_ids": [12, 14],
    "cast": [10980, 10989, 10990, 1923, 5658]
  },
  {
    "id": 577922,
    "original_language": "en",
    "genre_ids": [28, 53, 878],
    "cast": [1117313, 11288, 1133349, 11181, 78921]
  },
  {
    "id": 454626,
    "original_language": "en",
    "genre_ids": [28, 878, 35, 10751],
    "cast": [222121, 11006, 110742, 206, 1546282]
  },
  {
    "id": 245891,
    "original_language": "en",
    "genre_ids": [28, 53],
    "cast": [6384, 6283, 71586, 5293, 68763]
  },
  {
    "id": 658224,
    "original_language": "ru",
    "genre_ids": [18, 14],
    "cast": [4551883, 238130, 235110, 94064, 1795509]
  },
  {
    "id": 12445,
    "original_language": "en",
    "genre_ids": [14, 12],
    "cast": [10980, 10990, 10989, 5469, 4566]
  },
  {
    "id": 674,
    "original_language": "en",
    "genre_ids": [12, 14],
    "cast": [10980, 10989, 10990, 2039, 5658]
  },
  {
    "id": 945961,
    "original_language": "en",
    "genre_ids": [27, 878],
    "cast": [1683343, 2761308, 2164506, 1428070, 2304140]
  },
  {
    "id": 242,
    "original_language": "en",
    "genre_ids": [80, 18, 53],
    "cast": [1158, 3092, 3094, 1271, 3265]
  },
  {
    "id": 1104845,
    "original_language": "en",
    "genre_ids": [16, 12, 35, 10751, 14],
    "cast": [188229, 17414, 78798, 34398, 70615]
  },
  {
    "id": 1930,
    "original_language": "en",
    "genre_ids": [28, 12, 878],
    "cast": [37625, 54693, 7026, 5724, 8349]
  },
  {
    "id": 1035259,
    "original_language": "en",
    "genre_ids": [35, 80],
    "cast": [3896, 6736, 1294982, 79072, 6413]
  },
  {
    "id": 338952,
    "original_language": "en",
    "genre_ids": [14, 12],
    "cast": [37632, 77795, 58873, 998225, 85]
  },
  {
    "id": 408,
    "original_language": "en",
    "genre_ids": [14, 16, 10751],
    "cast": [5460, 288940, 540747, 5457, 5462]
  },
  {
    "id": 1229730,
    "original_language": "fr",
    "genre_ids": [28, 12],
    "cast": [1449871, 1077537, 2580706, 2613134, 1947460]
  },
  {
    "id": 666277,
    "original_language": "en",
    "genre_ids": [18, 10749],
    "cast": [1260481, 1387126, 37154, 2309873, 3888559]
  },
  {
    "id": 312221,
    "original_language": "en",
    "genre_ids": [28, 18],
    "cast": [135651, 16483, 62561, 119598, 1746871]
  },
  {
    "id": 541671,
    "original_language": "en",
    "genre_ids": [28, 53, 80],
    "cast": [224513, 5657, 5168, 129101, 5887]
  },
  {
    "id": 578,
    "original_language": "en",
    "genre_ids": [27, 53, 12],
    "cast": [6355, 8606, 3037, 8607, 8608]
  },
  {
    "id": 1892,
    "original_language": "en",
    "genre_ids": [12, 28, 878],
    "cast": [2, 3, 4, 3799, 6]
  },
  {
    "id": 335983,
    "original_language": "en",
    "genre_ids": [878, 28],
    "cast": [2524, 1812, 53240, 87954, 81316]
  },
  {
    "id": 105814,
    "original_language": "cn",
    "genre_ids": [27],
    "cast": [1081095, 65197, 2994286, 1421429, 552086]
  },
  {
    "id": 1137339,
    "original_language": "hi",
    "genre_ids": [18, 36],
    "cast": [35070, 85519, 1973077, 177225, 2456713]
  },
  {
    "id": 648878,
    "original_language": "en",
    "genre_ids": [37, 35, 53],
    "cast": [73421, 1253360, 54693, 86654, 77013]
  },
  {
    "id": 1311537,
    "original_language": "zh",
    "genre_ids": [18, 80, 9648],
    "cast": [543877, 1173214, 126736, 1397017, 1739834]
  },
  {
    "id": 240,
    "original_language": "en",
    "genre_ids": [18, 80],
    "cast": [1158, 3087, 3092, 380, 3096]
  },
  {
    "id": 1109255,
    "original_language": "it",
    "genre_ids": [10749, 18],
    "cast": [4127112, 34027, 64, 108900, 119172]
  },
  {
    "id": 784524,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [1674162, 58754, 1335818, 45101, 538]
  },
  {
    "id": 862,
    "original_language": "en",
    "genre_ids": [16, 12, 10751, 35],
    "cast": [31, 12898, 7167, 12899, 12900]
  },
  {
    "id": 49521,
    "original_language": "en",
    "genre_ids": [28, 12, 878],
    "cast": [73968, 9273, 934, 335, 1269]
  },
  {
    "id": 68726,
    "original_language": "en",
    "genre_ids": [28, 878, 12],
    "cast": [56365, 18054, 17605, 94864, 5365]
  },
  {
    "id": 1891,
    "original_language": "en",
    "genre_ids": [12, 28, 878],
    "cast": [2, 3, 4, 3799, 6]
  },
  {
    "id": 22,
    "original_language": "en",
    "genre_ids": [12, 14, 28],
    "cast": [85, 118, 114, 116, 1709]
  },
  {
    "id": 10195,
    "original_language": "en",
    "genre_ids": [12, 14, 28],
    "cast": [74568, 524, 91606, 4173, 1640]
  },
  {
    "id": 129,
    "original_language": "ja",
    "genre_ids": [16, 10751, 14],
    "cast": [19587, 19588, 19589, 19590, 19591]
  },
  {
    "id": 769,
    "original_language": "en",
    "genre_ids": [18, 80],
    "cast": [380, 11477, 4517, 11478, 7004]
  },
  {
    "id": 552524,
    "original_language": "en",
    "genre_ids": [10751, 35, 878],
    "cast": [3988423, 66193, 3025125, 141034, 13445]
  },
  {
    "id": 1014505,
    "original_language": "ja",
    "genre_ids": [28, 12, 16, 14],
    "cast": [224413, 1643476, 1241562, 221773, 1248340]
  },
  {
    "id": 1305642,
    "original_language": "cn",
    "genre_ids": [18, 28, 80],
    "cast": [25246, 1698814, 57831, 931254, 1286615]
  },
  {
    "id": 1103621,
    "original_language": "th",
    "genre_ids": [18],
    "cast": [2729283, 4544982, 1270506, 1659249, 555778]
  },
  {
    "id": 49013,
    "original_language": "en",
    "genre_ids": [16, 10751, 12, 35],
    "cast": [15897, 887, 3895, 1246, 1926]
  },
  {
    "id": 274870,
    "original_language": "en",
    "genre_ids": [18, 10749, 878],
    "cast": [72129, 73457, 3968, 2975, 1271]
  },
  {
    "id": 1280672,
    "original_language": "en",
    "genre_ids": [35],
    "cast": [74688, 2048582, 2310333, 2558609, 1001737]
  },
  {
    "id": 1100782,
    "original_language": "en",
    "genre_ids": [27, 9648],
    "cast": [240724, 14892, 1371509, 3535991, 31514]
  },
  {
    "id": 698687,
    "original_language": "en",
    "genre_ids": [16, 878, 12, 10751],
    "cast": [74568, 226366, 1245, 298410, 65717]
  },
  {
    "id": 1056652,
    "original_language": "fr",
    "genre_ids": [18, 36, 12],
    "cast": [16269, 1925, 9824, 1577093, 4592671]
  },
  {
    "id": 1265623,
    "original_language": "fr",
    "genre_ids": [35, 10402],
    "cast": [1925, 1674833, 2832358, 1710851, 3637814]
  },
  {
    "id": 1388366,
    "original_language": "en",
    "genre_ids": [27],
    "cast": [98421, 2680806, 972445, 4910699, 3805862]
  },
  {
    "id": 995926,
    "original_language": "ko",
    "genre_ids": [28, 80],
    "cast": [68903, 1470763, 77188, 1856377, 1692997]
  },
  {
    "id": 1249289,
    "original_language": "en",
    "genre_ids": [28, 80, 53],
    "cast": [928572, 16483, 1318650, 450, 87956]
  },
  {
    "id": 1380415,
    "original_language": "en",
    "genre_ids": [18, 36],
    "cast": [1647127, 1420278, 1805355, 592528, 9140]
  },
  {
    "id": 1202479,
    "original_language": "en",
    "genre_ids": [27, 9648, 53],
    "cast": [2195140, 6949, 3196, 152416, 1928381]
  },
  {
    "id": 970450,
    "original_language": "en",
    "genre_ids": [28, 27, 53],
    "cast": [81685, 164930, 1181354, 262023, 38560]
  },
  {
    "id": 1326106,
    "original_language": "ja",
    "genre_ids": [16, 28, 878],
    "cast": [2652077, 2410194, 2359492, 1681, 1324472]
  },
  {
    "id": 536554,
    "original_language": "en",
    "genre_ids": [878, 27],
    "cast": [1255540, 2131391, 1319469, 3444018, 2043430]
  },
  {
    "id": 1182387,
    "original_language": "en",
    "genre_ids": [28, 80, 53, 18],
    "cast": [12261, 16483, 1279814, 6066, 157876]
  },
  {
    "id": 4232,
    "original_language": "en",
    "genre_ids": [80, 27, 9648],
    "cast": [15234, 9206, 14405, 26457, 16850]
  },
  {
    "id": 668489,
    "original_language": "en",
    "genre_ids": [28, 80, 53],
    "cast": [2524, 2178, 18082, 1684648, 2234003]
  },
  {
    "id": 250546,
    "original_language": "en",
    "genre_ids": [27],
    "cast": [82809, 94436, 34842, 1981, 188311]
  },
  {
    "id": 1208491,
    "original_language": "fr",
    "genre_ids": [16, 12, 14],
    "cast": [1446210, 83967, 2334522, 1321014, 2144020]
  },
  {
    "id": 1013482,
    "original_language": "en",
    "genre_ids": [35, 27, 53],
    "cast": [1372369, 60960, 1774398, 58115, 1674769]
  },
  {
    "id": 1059128,
    "original_language": "en",
    "genre_ids": [18, 10749],
    "cast": [8784, 1939676, 17881, 72305, 1563169]
  },
  {
    "id": 870360,
    "original_language": "en",
    "genre_ids": [10751, 35, 12, 16],
    "cast": [89599, 95257, 12688, 60279, 35159]
  },
  {
    "id": 976734,
    "original_language": "en",
    "genre_ids": [28, 53, 80],
    "cast": [3967, 36669, 9825, 56614, 44736]
  },
  {
    "id": 1154304,
    "original_language": "es",
    "genre_ids": [16, 12, 35, 10751],
    "cast": [4889833, 1744367, 4889834, 4889835, 2774169]
  },
  {
    "id": 1083968,
    "original_language": "en",
    "genre_ids": [27, 53],
    "cast": [137905, 4173, 3361846, 67979, 2528675]
  },
  {
    "id": 1593,
    "original_language": "en",
    "genre_ids": [28, 12, 35, 10751, 14],
    "cast": [7399, 17832, 61303, 1937, 8854]
  },
  {
    "id": 1018,
    "original_language": "en",
    "genre_ids": [53, 18, 9648],
    "cast": [3489, 15007, 15009, 15008, 1236]
  },
  {
    "id": 765897,
    "original_language": "en",
    "genre_ids": [18, 10751],
    "cast": [69899, 2035115, 2467139, 81133, 1028899]
  },
  {
    "id": 974250,
    "original_language": "en",
    "genre_ids": [35, 9648, 80],
    "cast": [1227717, 24045, 1016168, 1332680, 1462]
  },
  {
    "id": 804862,
    "original_language": "en",
    "genre_ids": [18, 53],
    "cast": [1290466, 984629, 17782, 53998, 1534392]
  },
  {
    "id": 1214508,
    "original_language": "es",
    "genre_ids": [18],
    "cast": [2475596, 4420468, 4445229, 4445230, 3481840]
  },
  {
    "id": 1112466,
    "original_language": "fr",
    "genre_ids": [35, 14, 27],
    "cast": [2037046, 2533470, 1385600, 2417980, 149988]
  },
  {
    "id": 2024,
    "original_language": "en",
    "genre_ids": [18, 36, 10752, 28],
    "cast": [2461, 1810, 20810, 11355, 2955]
  },
  {
    "id": 762,
    "original_language": "en",
    "genre_ids": [12, 35, 14],
    "cast": [10722, 8930, 10713, 280, 10707]
  },
  {
    "id": 1128752,
    "original_language": "en",
    "genre_ids": [18, 14],
    "cast": [4646921, 1285450, 1290466, 4646923, 1577903]
  },
  {
    "id": 1322752,
    "original_language": "ja",
    "genre_ids": [16, 10402, 18, 878],
    "cast": [1252995, 1253023, 148449, 2405530, 4856392]
  },
  {
    "id": 1102493,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [2037, 1639, 20057, 53999, 2491820]
  },
  {
    "id": 896536,
    "original_language": "en",
    "genre_ids": [14, 12, 10751],
    "cast": [1756490, 1442069, 5293, 1639, 5136483]
  },
  {
    "id": 502416,
    "original_language": "en",
    "genre_ids": [27, 53],
    "cast": [6944, 3196, 2048372, 1355176, 1453680]
  },
  {
    "id": 1225572,
    "original_language": "en",
    "genre_ids": [27, 35],
    "cast": [1880016, 1297165, 1863450, 81308, 3731720]
  },
  {
    "id": 1086497,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [4581, 378, 993151, 1042841, 1894408]
  },
  {
    "id": 1239655,
    "original_language": "en",
    "genre_ids": [35],
    "cast": [1500059, 22226, 51072, 1774679, 61545]
  },
  {
    "id": 1064307,
    "original_language": "no",
    "genre_ids": [16, 35],
    "cast": [1911397, 1816217, 76547, 1816870, 47647]
  },
  {
    "id": 970947,
    "original_language": "en",
    "genre_ids": [18, 878],
    "cast": [1925, 9824, 529, 65345, 108895]
  },
  {
    "id": 989662,
    "original_language": "en",
    "genre_ids": [35, 18],
    "cast": [60898, 1576786, 1675188, 1803734, 928931]
  },
  {
    "id": 1235499,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [6736, 8944, 543530, 88123, 934289]
  },
  {
    "id": 1205229,
    "original_language": "en",
    "genre_ids": [16, 35, 12, 878, 27],
    "cast": [35029, 178068, 78576, 1224735, 2386389]
  },
  {
    "id": 959604,
    "original_language": "fr",
    "genre_ids": [80, 18, 10749],
    "cast": [586757, 78124, 3508929, 3661253, 4275]
  },
  {
    "id": 9614,
    "original_language": "en",
    "genre_ids": [35],
    "cast": [19292, 4443, 31171, 11794, 1101]
  },
  {
    "id": 1084153,
    "original_language": "en",
    "genre_ids": [16, 35, 10751, 12],
    "cast": [2975, 53650, 78029, 86800, 1859727]
  },
  {
    "id": 1137179,
    "original_language": "ko",
    "genre_ids": [80],
    "cast": [1257899, 84996, 1292971, 2239782, 3276709]
  },
  {
    "id": 853387,
    "original_language": "en",
    "genre_ids": [27],
    "cast": [89822, 202032, 1085178, 3131371, 1246598]
  },
  {
    "id": 1339772,
    "original_language": "id",
    "genre_ids": [27, 53],
    "cast": [2120859, 1443667, 4372965, 1878340, 1451764]
  },
  {
    "id": 1059073,
    "original_language": "en",
    "genre_ids": [10749, 35, 18],
    "cast": [974169, 1477961, 49706, 84457, 3411159]
  },
  {
    "id": 779816,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [2534396, 2413280, 1668151, 12214, 15735]
  },
  {
    "id": 1092506,
    "original_language": "en",
    "genre_ids": [18, 10749],
    "cast": [2230991, 2034418, 93491, 1413390, 2542319]
  },
  {
    "id": 1053927,
    "original_language": "da",
    "genre_ids": [878, 18, 10749],
    "cast": [1290402, 1459336, 4469733, 2450862, 143391]
  },
  {
    "id": 1275248,
    "original_language": "en",
    "genre_ids": [35, 18, 27],
    "cast": [223167, 1727270, 1550351, 1304413, 5244661]
  },
  {
    "id": 8844,
    "original_language": "en",
    "genre_ids": [12, 14, 10751],
    "cast": [2157, 205, 145151, 5149, 8537]
  },
  {
    "id": 9671,
    "original_language": "en",
    "genre_ids": [12, 35],
    "cast": [57147, 57166, 14103, 53023, 13938]
  },
  {
    "id": 793387,
    "original_language": "ko",
    "genre_ids": [28, 14, 27],
    "cast": [1024395, 1471054, 557133, 1206963, 1418762]
  },
  {
    "id": 110420,
    "original_language": "ja",
    "genre_ids": [16, 10751, 18, 14],
    "cast": [1054260, 559411, 104522, 45999, 225662]
  },
  {
    "id": 1155828,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [91671, 4178063, 4178064, 1216195, 4583265]
  },
  {
    "id": 1363381,
    "original_language": "id",
    "genre_ids": [12, 27, 18],
    "cast": [3612949, 4577632, 581687, 2428478, 2435471]
  },
  {
    "id": 1278162,
    "original_language": "th",
    "genre_ids": [27, 53],
    "cast": [2131509, 2247749, 3882876, 4338888, 3529019]
  },
  {
    "id": 914206,
    "original_language": "fr",
    "genre_ids": [18, 878, 10749],
    "cast": [121529, 146750, 1360307, 1717627, 1789100]
  },
  {
    "id": 1301632,
    "original_language": "hi",
    "genre_ids": [10749, 35, 18, 14],
    "cast": [117727, 1267400, 52974, 1276863, 85656]
  },
  {
    "id": 1261543,
    "original_language": "id",
    "genre_ids": [27, 53],
    "cast": [1202392, 2017873, 3612949, 3300359, 3490117]
  },
  {
    "id": 1249423,
    "original_language": "zh",
    "genre_ids": [18],
    "cast": [126778, 1173214, 24011, 1800556, 3763838]
  },
  {
    "id": 1337411,
    "original_language": "tl",
    "genre_ids": [18, 10749],
    "cast": [1319939, 3878240, 3653075, 4095699]
  },
  {
    "id": 1129610,
    "original_language": "ja",
    "genre_ids": [16, 35, 10402],
    "cast": [1643476, 2206133, 3004070, 2103077, 1296667]
  },
  {
    "id": 1000866,
    "original_language": "fr",
    "genre_ids": [35, 18],
    "cast": [1159954, 544685, 1402424, 1332797, 117884]
  },
  {
    "id": 927547,
    "original_language": "ml",
    "genre_ids": [18],
    "cast": [1399177, 1413835, 1550351, 2918872, 1627904]
  },
  {
    "id": 965087,
    "original_language": "hi",
    "genre_ids": [36, 18],
    "cast": [1779934, 1602232]
  },
  {
    "id": 1056444,
    "original_language": "ja",
    "genre_ids": [16, 18, 10402],
    "cast": [4600291, 3144130, 3811388, 231364, 936275]
  },
  {
    "id": 1284120,
    "original_language": "no",
    "genre_ids": [35, 27],
    "cast": [2890913, 63769, 1384976, 3126191, 3676023]
  },
  {
    "id": 1373723,
    "original_language": "en",
    "genre_ids": [28, 10752],
    "cast": [17302, 5010136]
  },
  {
    "id": 1261050,
    "original_language": "da",
    "genre_ids": [28, 18],
    "cast": [1149906, 89626, 1602451, 1428298, 92429]
  },
  {
    "id": 1282980,
    "original_language": "en",
    "genre_ids": [27, 53],
    "cast": [127070, 1722856, 1521804, 2421922, 1539505]
  },
  {
    "id": 1297763,
    "original_language": "ja",
    "genre_ids": [16, 28],
    "cast": [20664, 149894, 1324472, 1241498, 2192867]
  },
  {
    "id": 1077782,
    "original_language": "en",
    "genre_ids": [28, 35],
    "cast": [27319, 140, 2764542, 2385684, 1866474]
  },
  {
    "id": 1333099,
    "original_language": "es",
    "genre_ids": [12, 18, 14, 16],
    "cast": [235128, 4891315, 4891316, 4891317]
  },
  {
    "id": 1450436,
    "original_language": "tl",
    "genre_ids": [18, 10749],
    "cast": [3913173, 3362447, 2252696, 5349531, 2939486]
  },
  {
    "id": 1196470,
    "original_language": "fr",
    "genre_ids": [878, 53, 12, 28],
    "cast": [23671, 1073985, 4980097, 4340928, 234921]
  },
  {
    "id": 1445276,
    "original_language": "ja",
    "genre_ids": [10749, 16],
    "cast": [2279389, 1279666]
  },
  {
    "id": 1140535,
    "original_language": "en",
    "genre_ids": [27, 18, 53],
    "cast": [3775598, 140, 1293892, 4416903, 2371446]
  },
  {
    "id": 1034541,
    "original_language": "en",
    "genre_ids": [27, 53],
    "cast": [1882502, 1880016, 1676771, 2787720, 37405]
  },
  {
    "id": 1083782,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [71070, 1477962, 60077, 225411, 207582]
  },
  {
    "id": 811941,
    "original_language": "te",
    "genre_ids": [28, 18],
    "cast": [148037, 35747, 89153, 1003981, 1413865]
  },
  {
    "id": 1199840,
    "original_language": "es",
    "genre_ids": [35],
    "cast": [224507, 1415546, 961, 2804618, 1243187]
  },
  {
    "id": 1355126,
    "original_language": "id",
    "genre_ids": [27, 53],
    "cast": [1380224, 2096040, 2120859, 3490117, 4372965]
  },
  {
    "id": 122,
    "original_language": "en",
    "genre_ids": [12, 14, 28],
    "cast": [109, 1327, 110, 1328, 1333]
  },
  {
    "id": 603692,
    "original_language": "en",
    "genre_ids": [28, 53, 80],
    "cast": [6384, 1341, 137905, 6972, 2975]
  },
  {
    "id": 11036,
    "original_language": "en",
    "genre_ids": [10749, 18],
    "cast": [30614, 53714, 4800, 16896, 11148]
  },
  {
    "id": 1043905,
    "original_language": "en",
    "genre_ids": [28, 18, 53, 10752],
    "cast": [10912, 2408703, 1246972, 1552773, 2135069]
  },
  {
    "id": 1333100,
    "original_language": "ja",
    "genre_ids": [16, 28, 12, 14],
    "cast": [149894, 1224288, 90135, 93801, 1253896]
  },
  {
    "id": 1407861,
    "original_language": "en",
    "genre_ids": [53, 27, 28],
    "cast": [1577369, 2291424, 2101948, 3602420, 1900200]
  },
  {
    "id": 717196,
    "original_language": "fi",
    "genre_ids": [16, 10751, 14],
    "cast": [4677369, 4815721, 96674, 1654994, 2045981]
  },
  {
    "id": 37799,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [44735, 37625, 53807, 928532, 12111]
  },
  {
    "id": 121,
    "original_language": "en",
    "genre_ids": [12, 14, 28],
    "cast": [109, 1327, 110, 1328, 1333]
  },
  {
    "id": 1380405,
    "original_language": "en",
    "genre_ids": [18, 36, 12],
    "cast": [1495825, 1355937, 1410477, 1598773, 1314134]
  },
  {
    "id": 1113583,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [1205, 139, 2034418, 11486, 38663]
  },
  {
    "id": 1232449,
    "original_language": "nl",
    "genre_ids": [18, 10749],
    "cast": [3724154, 4504024, 220295, 2900070, 1127485]
  },
  {
    "id": 4348,
    "original_language": "en",
    "genre_ids": [18, 10749],
    "cast": [116, 15576, 4154, 55636, 2441]
  },
  {
    "id": 953,
    "original_language": "en",
    "genre_ids": [10751, 16, 12, 35],
    "cast": [7399, 2632, 14409, 9575, 6730]
  },
  {
    "id": 1081012,
    "original_language": "en",
    "genre_ids": [28, 53],
    "cast": [95686, 2174509, 94797, 2569318, 4728]
  },
  {
    "id": 564,
    "original_language": "en",
    "genre_ids": [12, 28, 14],
    "cast": [18269, 3293, 10727, 16743, 18920]
  },
  {
    "id": 1286663,
    "original_language": "en",
    "genre_ids": [27],
    "cast": [1663195, 1157292, 143432, 2079778, 3315248]
  },
  {
    "id": 168259,
    "original_language": "en",
    "genre_ids": [28, 53, 80],
    "cast": [12835, 8167, 976, 17647, 22123]
  },
  {
    "id": 128,
    "original_language": "ja",
    "genre_ids": [12, 14, 16],
    "cast": [622, 20330, 20331, 20332, 20333]
  },
  {
    "id": 1051896,
    "original_language": "en",
    "genre_ids": [28, 27, 53, 878],
    "cast": [2963, 1274508, 1810651, 2270402, 1321622]
  },
  {
    "id": 1097150,
    "original_language": "en",
    "genre_ids": [27],
    "cast": [1116309, 2960441, 2957, 3147545, 3491]
  },
  {
    "id": 1195585,
    "original_language": "en",
    "genre_ids": [28, 53, 80],
    "cast": [4277348, 4006374, 3557173, 3680146, 226332]
  },
  {
    "id": 1195430,
    "original_language": "hi",
    "genre_ids": [28, 53, 9648, 80],
    "cast": [78245, 587753, 2032942, 1690969, 587090]
  },
  {
    "id": 1403735,
    "original_language": "te",
    "genre_ids": [35, 10749],
    "cast": [1893251, 3154351, 584878, 109743, 312870]
  },
  {
    "id": 1208808,
    "original_language": "es",
    "genre_ids": [27],
    "cast": [36586, 76855, 16406, 589123, 1488707]
  },
  {
    "id": 1101401,
    "original_language": "en",
    "genre_ids": [53, 35],
    "cast": [3707386, 3051389, 119807, 2377344, 2242653]
  },
  {
    "id": 1165067,
    "original_language": "en",
    "genre_ids": [53, 878],
    "cast": [90399, 31383, 1451348, 80184, 1681937]
  },
  {
    "id": 1029880,
    "original_language": "da",
    "genre_ids": [27, 53, 9648],
    "cast": [1032398, 12795, 3398, 1024, 1017]
  },
  {
    "id": 1103432,
    "original_language": "ja",
    "genre_ids": [16, 28, 878],
    "cast": [131563, 144773, 1116334, 1147713]
  },
  {
    "id": 1304594,
    "original_language": "es",
    "genre_ids": [35],
    "cast": [57409, 2723354, 1383932, 2627590, 1869530]
  },
  {
    "id": 1010581,
    "original_language": "es",
    "genre_ids": [10749, 18],
    "cast": [2527414, 2786960, 970027, 1251336, 4105602]
  },
  {
    "id": 1356039,
    "original_language": "es",
    "genre_ids": [28, 12, 53],
    "cast": [1309460, 89445, 1311441, 2139802, 3524227]
  },
  {
    "id": 519182,
    "original_language": "en",
    "genre_ids": [16, 10751, 35, 878],
    "cast": [4495, 41091, 23659, 63522, 17743]
  },
  {
    "id": 927342,
    "original_language": "ta",
    "genre_ids": [28, 18, 12, 10752],
    "cast": [587982, 1473119, 86212, 1295875, 1353425]
  },
  {
    "id": 1249385,
    "original_language": "en",
    "genre_ids": [27, 53],
    "cast": [3742245, 4638786, 2100160, 4638787, 2536479]
  },
  {
    "id": 1156593,
    "original_language": "es",
    "genre_ids": [10749, 18],
    "cast": [2527414, 2786960, 970027, 1251336, 4105602]
  },
  {
    "id": 1059643,
    "original_language": "en",
    "genre_ids": [53],
    "cast": [1274513, 1667883, 1577503, 225694, 21316]
  },
  {
    "id": 1405338,
    "original_language": "ja",
    "genre_ids": [28, 80, 14, 53],
    "cast": [228072, 1185386, 2430993, 3640211, 1154045]
  },
  {
    "id": 1217379,
    "original_language": "en",
    "genre_ids": [28, 80, 53],
    "cast": [54649, 1102621, 41352, 1820190, 1191266]
  },
  {
    "id": 1141233,
    "original_language": "fr",
    "genre_ids": [35, 10751],
    "cast": [1332481, 4115633, 1603424, 1448396, 54675]
  },
  {
    "id": 1160956,
    "original_language": "zh",
    "genre_ids": [28, 35],
    "cast": [18897, 1945662, 2093326, 2171593, 2493847]
  },
  {
    "id": 1062276,
    "original_language": "en",
    "genre_ids": [28, 27],
    "cast": [231517, 1336329, 5016435, 221840, 105656]
  },
  {
    "id": 1140847,
    "original_language": "en",
    "genre_ids": [14, 27],
    "cast": [3564432, 57395, 2564032, 3320201, 2021785]
  },
  {
    "id": 1229646,
    "original_language": "es",
    "genre_ids": [16, 12],
    "cast": [4799721, 2894698, 589413, 4799732, 4799735]
  },
  {
    "id": 968171,
    "original_language": "ja",
    "genre_ids": [35],
    "cast": [1134873, 225657, 1119086, 1270036, 1200397]
  },
  {
    "id": 1143407,
    "original_language": "hi",
    "genre_ids": [28, 53],
    "cast": [35070, 4301687, 1077932, 1848952, 1139872]
  },
  {
    "id": 1294203,
    "original_language": "en",
    "genre_ids": [10749, 18],
    "cast": [3499290, 3912097, 1092908, 56650, 4356302]
  },
  {
    "id": 1190462,
    "original_language": "en",
    "genre_ids": [27, 53, 18],
    "cast": [15549, 1003249, 1679882, 1012401]
  },
  {
    "id": 1260416,
    "original_language": "en",
    "genre_ids": [18, 10770],
    "cast": [5, 4597401, 136981, 47015, 184945]
  },
  {
    "id": 1178764,
    "original_language": "cn",
    "genre_ids": [27, 18],
    "cast": [140478, 4272699, 3202177, 4272709, 4984445]
  },
  {
    "id": 1151470,
    "original_language": "en",
    "genre_ids": [53, 28],
    "cast": [3146133, 1362223, 1421349, 2584916, 4263930]
  },
  {
    "id": 1357633,
    "original_language": "ja",
    "genre_ids": [28, 12, 14, 16],
    "cast": [2106489, 2784795, 3279626, 1452028, 1096528]
  },
  {
    "id": 1301650,
    "original_language": "mn",
    "genre_ids": [27],
    "cast": [4934349, 4534066, 4497442]
  },
  {
    "id": 411,
    "original_language": "en",
    "genre_ids": [12, 10751, 14],
    "cast": [5528, 5529, 5527, 5526, 3896]
  },
  {
    "id": 1059372,
    "original_language": "id",
    "genre_ids": [18, 10749, 14],
    "cast": [2273538, 1443667, 2046538, 3864898, 3580811]
  },
  {
    "id": 1147416,
    "original_language": "fr",
    "genre_ids": [16, 12, 28, 14],
    "cast": [1762588, 1558832, 1373143, 1762589, 1373246]
  },
  {
    "id": 24428,
    "original_language": "en",
    "genre_ids": [878, 28, 12],
    "cast": [3223, 16828, 103, 74568, 1245]
  },
  {
    "id": 829557,
    "original_language": "pl",
    "genre_ids": [10749, 18],
    "cast": [2511949, 2349355, 3090060, 1637039, 1616974]
  },
  {
    "id": 845781,
    "original_language": "en",
    "genre_ids": [28, 35, 14],
    "cast": [18918, 16828, 140, 18999, 5149]
  },
  {
    "id": 1255788,
    "original_language": "fr",
    "genre_ids": [28, 35],
    "cast": [15111, 82304, 1562547, 4578477, 47825]
  },
  {
    "id": 926670,
    "original_language": "en",
    "genre_ids": [28, 35, 10751, 878],
    "cast": [1428067, 1601223, 933578, 1296849, 1669372]
  },
  {
    "id": 1149137,
    "original_language": "pl",
    "genre_ids": [10751, 12],
    "cast": [4151122, 116173, 1590642, 136558, 2539487]
  },
  {
    "id": 1118031,
    "original_language": "es",
    "genre_ids": [18, 28, 27],
    "cast": [2422766, 72128, 1457340, 2264694, 1460406]
  },
  {
    "id": 198663,
    "original_language": "en",
    "genre_ids": [28, 9648, 878, 53],
    "cast": [527393, 115150, 78062, 25663, 1310760]
  },
  {
    "id": 999142,
    "original_language": "fr",
    "genre_ids": [18, 53],
    "cast": [1367720, 77498, 2075666, 588070, 3886244]
  },
  {
    "id": 1167366,
    "original_language": "th",
    "genre_ids": [10749, 18, 878],
    "cast": [3380426, 2729190, 4815163, 2431035, 1272413]
  },
  {
    "id": 1035048,
    "original_language": "en",
    "genre_ids": [28, 878, 53],
    "cast": [53650, 54882, 593202, 2437735, 1840932]
  },
  {
    "id": 299536,
    "original_language": "en",
    "genre_ids": [12, 28, 878],
    "cast": [3223, 16828, 74568, 16851, 103]
  },
  {
    "id": 573435,
    "original_language": "en",
    "genre_ids": [28, 35, 80, 53, 12],
    "cast": [2888, 78029, 67599, 23498, 544442]
  },
  {
    "id": 385687,
    "original_language": "en",
    "genre_ids": [28, 80, 53, 12, 9648],
    "cast": [12835, 17647, 8169, 8171, 56446]
  },
  {
    "id": 1230208,
    "original_language": "fr",
    "genre_ids": [28, 80, 18, 53],
    "cast": [1894422, 1135268, 1372661, 1600889, 2245]
  },
  {
    "id": 1138361,
    "original_language": "es",
    "genre_ids": [],
    "cast": [975976, 962031, 4105139]
  },
  {
    "id": 361743,
    "original_language": "en",
    "genre_ids": [28, 18],
    "cast": [500, 996701, 1525043, 1700685, 151680]
  },
  {
    "id": 1151506,
    "original_language": "es",
    "genre_ids": [35],
    "cast": [34018, 1167672, 1848583, 2408905, 2564672]
  },
  {
    "id": 58008,
    "original_language": "it",
    "genre_ids": [35],
    "cast": [227317, 80230, 38593, 1041256, 120637]
  },
  {
    "id": 150540,
    "original_language": "en",
    "genre_ids": [16, 10751, 12, 18, 35],
    "cast": [56322, 169200, 21125, 19278, 59258]
  },
  {
    "id": 1217876,
    "original_language": "de",
    "genre_ids": [16, 10751, 35],
    "cast": []
  },
  {
    "id": 993710,
    "original_language": "en",
    "genre_ids": [28, 35],
    "cast": [134, 6941, 2072197, 3969912, 3497]
  },
  {
    "id": 502356,
    "original_language": "en",
    "genre_ids": [10751, 35, 12, 16],
    "cast": [73457, 1397778, 95101, 70851, 298410]
  },
  {
    "id": 138843,
    "original_language": "en",
    "genre_ids": [27, 53],
    "cast": [17178, 21657, 3127, 17402, 851784]
  },
  {
    "id": 921436,
    "original_language": "ko",
    "genre_ids": [28, 18],
    "cast": [531736, 1096458, 3715923, 1591370, 1682490]
  },
  {
    "id": 14836,
    "original_language": "en",
    "genre_ids": [16, 10751, 14],
    "cast": [501, 10742, 12094, 5539, 65827]
  },
  {
    "id": 8587,
    "original_language": "en",
    "genre_ids": [10751, 16, 18],
    "cast": [4756, 20005, 78729, 69415, 15152]
  },
  {
    "id": 839033,
    "original_language": "en",
    "genre_ids": [16, 14, 12, 28],
    "cast": [1248, 1339199, 220232, 1674206, 78329]
  },
  {
    "id": 98,
    "original_language": "en",
    "genre_ids": [28, 18, 12],
    "cast": [934, 73421, 935, 936, 194]
  },
  {
    "id": 429,
    "original_language": "it",
    "genre_ids": [37],
    "cast": [190, 3265, 4078, 5813, 5814]
  },
  {
    "id": 259872,
    "original_language": "fr",
    "genre_ids": [10749],
    "cast": [1593298, 1593299]
  },
  {
    "id": 6844,
    "original_language": "en",
    "genre_ids": [18, 36],
    "cast": [10017, 14528, 10606, 13566, 41240]
  },
  {
    "id": 1275209,
    "original_language": "es",
    "genre_ids": [18, 35, 10752],
    "cast": [4432223, 1261476, 1331728, 1270686, 1413918]
  },
  {
    "id": 76600,
    "original_language": "en",
    "genre_ids": [878, 12, 28],
    "cast": [65731, 8691, 10205, 32747, 204]
  },
  {
    "id": 315635,
    "original_language": "en",
    "genre_ids": [28, 12, 878, 18],
    "cast": [1136406, 2232, 3223, 3141, 15277]
  },
  {
    "id": 592695,
    "original_language": "sv",
    "genre_ids": [18],
    "cast": [2280178, 1908347, 139422, 1903886, 1202732]
  },
  {
    "id": 569094,
    "original_language": "en",
    "genre_ids": [16, 28, 12, 878],
    "cast": [587506, 130640, 226366, 141610, 543505]
  },
  {
    "id": 1011985,
    "original_language": "en",
    "genre_ids": [16, 10751, 28, 35, 12, 14],
    "cast": [70851, 1625558, 19492, 4483, 17419]
  },
  {
    "id": 37165,
    "original_language": "en",
    "genre_ids": [35, 18],
    "cast": [206, 350, 11315, 11317, 11318]
  },
  {
    "id": 324857,
    "original_language": "en",
    "genre_ids": [16, 28, 12, 878],
    "cast": [587506, 543505, 130640, 932967, 226366]
  },
  {
    "id": 634649,
    "original_language": "en",
    "genre_ids": [28, 12, 878],
    "cast": [1136406, 505710, 71580, 1649152, 15277]
  },
  {
    "id": 807,
    "original_language": "en",
    "genre_ids": [80, 9648, 53],
    "cast": [192, 287, 12052, 12055, 30487]
  },
  {
    "id": 354912,
    "original_language": "en",
    "genre_ids": [10751, 16, 10402, 12],
    "cast": [1193391, 258, 4589, 10402, 154004]
  },
  {
    "id": 302946,
    "original_language": "en",
    "genre_ids": [80, 53, 18],
    "cast": [880, 182272, 84223, 18999, 19498]
  },
  {
    "id": 8966,
    "original_language": "en",
    "genre_ids": [14, 18, 10749],
    "cast": [37917, 11288, 21029, 56857, 45827]
  },
  {
    "id": 823464,
    "original_language": "en",
    "genre_ids": [28, 12, 878],
    "cast": [15556, 226366, 221018, 2948491, 60416]
  },
  {
    "id": 269149,
    "original_language": "en",
    "genre_ids": [16, 12, 10751, 35],
    "cast": [23532, 417, 17605, 213001, 41565]
  },
  {
    "id": 748783,
    "original_language": "en",
    "genre_ids": [10751, 35, 12, 16],
    "cast": [73457, 2231, 1278487, 10182, 3292]
  },
  {
    "id": 1726,
    "original_language": "en",
    "genre_ids": [28, 878, 12],
    "cast": [3223, 18288, 1229, 12052, 57451]
  },
  {
    "id": 1402,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [2888, 120724, 9030, 1990, 14852]
  },
  {
    "id": 1337395,
    "original_language": "tl",
    "genre_ids": [18],
    "cast": [4012042, 4866792, 3603443, 3371806, 1588844]
  },
  {
    "id": 177572,
    "original_language": "en",
    "genre_ids": [12, 10751, 16, 28, 35],
    "cast": [66580, 515510, 82093, 51990, 78324]
  },
  {
    "id": 48650,
    "original_language": "es",
    "genre_ids": [18, 10749],
    "cast": [3623, 84778, 27392, 16442, 1177739]
  },
  {
    "id": 424,
    "original_language": "en",
    "genre_ids": [18, 36, 10752],
    "cast": [3896, 2282, 5469, 6692, 6693]
  },
  {
    "id": 389,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [1936, 5247, 5248, 5249, 5250]
  },
  {
    "id": 19404,
    "original_language": "hi",
    "genre_ids": [35, 18, 10749],
    "cast": [55061, 35742, 691, 146971, 6217]
  },
  {
    "id": 497,
    "original_language": "en",
    "genre_ids": [14, 18, 80],
    "cast": [31, 52, 5149, 61981, 2505]
  },
  {
    "id": 372058,
    "original_language": "ja",
    "genre_ids": [16, 10749, 18],
    "cast": [225730, 1369100, 1668610, 936275, 1210634]
  },
  {
    "id": 346,
    "original_language": "ja",
    "genre_ids": [28, 18],
    "cast": [7450, 7453, 20828, 20829, 7454]
  },
  {
    "id": 12477,
    "original_language": "ja",
    "genre_ids": [16, 18, 10752],
    "cast": [72413, 72414, 72415, 72416, 3773484]
  },
  {
    "id": 637,
    "original_language": "it",
    "genre_ids": [35, 18],
    "cast": [4818, 9235, 9236, 9237, 9239]
  },
  {
    "id": 11216,
    "original_language": "it",
    "genre_ids": [18, 10749],
    "cast": [24366, 20030, 27643, 68635, 120152]
  },
  {
    "id": 598,
    "original_language": "pt",
    "genre_ids": [18, 80],
    "cast": [8595, 8596, 8597, 8598, 8599]
  },
  {
    "id": 539,
    "original_language": "en",
    "genre_ids": [27, 53, 9648],
    "cast": [7301, 7302, 7303, 7304, 1936]
  },
  {
    "id": 40096,
    "original_language": "pt",
    "genre_ids": [35, 18, 14],
    "cast": [8600, 87341, 123757, 123758, 102551]
  },
  {
    "id": 667257,
    "original_language": "es",
    "genre_ids": [10751, 18],
    "cast": [1508206, 1379379, 224508, 941366, 1549908]
  },
  {
    "id": 510,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [514, 1370, 7071, 518, 7072]
  },
  {
    "id": 14537,
    "original_language": "ja",
    "genre_ids": [28, 18, 36],
    "cast": [70131, 76977, 76976, 10071, 125721]
  },
  {
    "id": 696374,
    "original_language": "en",
    "genre_ids": [10749, 18],
    "cast": [1312450, 544002, 73659, 1188681, 2595115]
  },
  {
    "id": 311,
    "original_language": "en",
    "genre_ids": [18, 80],
    "cast": [380, 4512, 4513, 4515, 4514]
  },
  {
    "id": 255709,
    "original_language": "ko",
    "genre_ids": [18],
    "cast": [85008, 1299243, 1299244, 123820, 93252]
  },
  {
    "id": 378064,
    "original_language": "ja",
    "genre_ids": [16, 18, 10749],
    "cast": [19588, 221773, 936275, 1065297, 1258549]
  },
  {
    "id": 724089,
    "original_language": "en",
    "genre_ids": [10749, 18],
    "cast": [1312450, 544002, 2345991, 2595115, 1188681]
  },
  {
    "id": 423,
    "original_language": "en",
    "genre_ids": [18, 10752],
    "cast": [3490, 3491, 6637, 6638, 6639]
  },
  {
    "id": 704264,
    "original_language": "en",
    "genre_ids": [28, 12, 16, 18],
    "cast": [1281304, 1836598, 1218986, 60300]
  },
  {
    "id": 761053,
    "original_language": "en",
    "genre_ids": [10749, 18],
    "cast": [1312450, 544002, 1844204, 2345991, 2595115]
  },
  {
    "id": 244786,
    "original_language": "en",
    "genre_ids": [18, 10402],
    "cast": [996701, 18999, 781, 129104, 970216]
  },
  {
    "id": 1058694,
    "original_language": "es",
    "genre_ids": [18],
    "cast": [239574, 1875322, 3895926, 3895927, 3895928]
  },
  {
    "id": 567,
    "original_language": "en",
    "genre_ids": [53, 9648],
    "cast": [854, 4070, 7683, 7684, 7685]
  },
  {
    "id": 274,
    "original_language": "en",
    "genre_ids": [80, 18, 53],
    "cast": [1038, 4173, 349, 15854, 16293]
  },
  {
    "id": 770156,
    "original_language": "en",
    "genre_ids": [18, 10751],
    "cast": [2643437, 2875508, 2430234, 2755969, 3966921]
  },
  {
    "id": 620249,
    "original_language": "zh",
    "genre_ids": [16, 14, 28],
    "cast": [1907244, 2156556, 2207399, 2196313, 2339317]
  },
  {
    "id": 12493,
    "original_language": "ja",
    "genre_ids": [18, 80, 9648, 53],
    "cast": [7450, 70131, 34374, 13251, 20830]
  },
  {
    "id": 73,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [819, 820, 821, 823, 824]
  },
  {
    "id": 372754,
    "original_language": "ja",
    "genre_ids": [10749, 16],
    "cast": [126698, 93801, 9720, 2258797]
  },
  {
    "id": 105,
    "original_language": "en",
    "genre_ids": [12, 35, 878],
    "cast": [521, 1062, 1064, 1063, 1066]
  },
  {
    "id": 820067,
    "original_language": "ja",
    "genre_ids": [16, 35, 10749],
    "cast": [233590, 119143, 1072776, 1530921, 992869]
  },
  {
    "id": 3782,
    "original_language": "ja",
    "genre_ids": [18],
    "cast": [7453, 34375, 34376, 34377, 34378]
  },
  {
    "id": 15804,
    "original_language": "zh",
    "genre_ids": [80, 18, 10749],
    "cast": [1622, 150162, 1088685, 103598, 1293234]
  },
  {
    "id": 207,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [2157, 2692, 569, 2694, 2693]
  },
  {
    "id": 101,
    "original_language": "fr",
    "genre_ids": [80, 18, 28],
    "cast": [1003, 524, 64, 1004, 1005]
  },
  {
    "id": 652837,
    "original_language": "ja",
    "genre_ids": [16, 18, 10749],
    "cast": [1255318, 1671407, 1772522, 1254260, 1691384]
  },
  {
    "id": 914,
    "original_language": "en",
    "genre_ids": [35, 10752],
    "cast": [13848, 14027, 14028, 14029, 10924]
  },
  {
    "id": 599,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [8252, 8629, 8630, 8631, 8632]
  },
  {
    "id": 644479,
    "original_language": "es",
    "genre_ids": [18, 35],
    "cast": [1640507, 1640510, 147333, 1737888, 1309844]
  },
  {
    "id": 335,
    "original_language": "it",
    "genre_ids": [18, 37],
    "cast": [4959, 4958, 4765, 4960, 4961]
  },
  {
    "id": 3082,
    "original_language": "en",
    "genre_ids": [35, 18, 10749],
    "cast": [13848, 14027, 14438, 30194, 30195]
  },
  {
    "id": 42269,
    "original_language": "it",
    "genre_ids": [18, 35],
    "cast": [37583, 12259, 34027, 24606, 94420]
  },
  {
    "id": 632632,
    "original_language": "ja",
    "genre_ids": [16, 18, 10402, 10749],
    "cast": [1248374, 2019916, 2157589, 1492992, 1247778]
  },
  {
    "id": 18491,
    "original_language": "ja",
    "genre_ids": [16, 878, 28, 18],
    "cast": [77927, 40325, 77931, 83768, 77934]
  },
  {
    "id": 92321,
    "original_language": "ja",
    "genre_ids": [10749, 16, 14],
    "cast": [1315197, 1248372, 992869, 1254052, 65438]
  },
  {
    "id": 1585,
    "original_language": "en",
    "genre_ids": [18, 10751, 14],
    "cast": [854, 17752, 17753, 3383, 7666]
  },
  {
    "id": 28,
    "original_language": "en",
    "genre_ids": [18, 10752],
    "cast": [8349, 3084, 8354, 8351, 2975]
  },
  {
    "id": 77338,
    "original_language": "fr",
    "genre_ids": [18, 35],
    "cast": [33161, 78423, 1939095, 19370, 2411]
  },
  {
    "id": 901,
    "original_language": "en",
    "genre_ids": [35, 18, 10749],
    "cast": [13848, 13852, 2913936, 13854, 13855]
  },
  {
    "id": 533514,
    "original_language": "ja",
    "genre_ids": [16, 14, 10749, 18],
    "cast": [1224288, 110665, 84508, 225655, 1248340]
  },
  {
    "id": 1139087,
    "original_language": "en",
    "genre_ids": [16, 10751, 14, 35],
    "cast": [1217648, 1382187, 34478, 84213, 12077]
  },
  {
    "id": 637920,
    "original_language": "tr",
    "genre_ids": [18],
    "cast": [1163030, 1985311, 556113, 935344, 1948853]
  },
  {
    "id": 975,
    "original_language": "en",
    "genre_ids": [10752, 18, 36],
    "cast": [2090, 14562, 14563, 14564, 14565]
  },
  {
    "id": 10376,
    "original_language": "it",
    "genre_ids": [18, 10402],
    "cast": [3129, 3201, 59373, 5502, 80503]
  },
  {
    "id": 630566,
    "original_language": "en",
    "genre_ids": [10402, 18, 10749],
    "cast": [1887455, 1152083, 1597855, 9206, 16857]
  },
  {
    "id": 29259,
    "original_language": "fr",
    "genre_ids": [18, 53, 80],
    "cast": [24495, 103397, 25333, 103398, 46936]
  },
  {
    "id": 670,
    "original_language": "ko",
    "genre_ids": [18, 53, 9648, 28],
    "cast": [64880, 10112, 1299317, 77182, 77180]
  },
  {
    "id": 572154,
    "original_language": "ja",
    "genre_ids": [16, 10749, 18, 14],
    "cast": [1324666, 1254672, 1288294, 1168909, 1588597]
  },
  {
    "id": 568332,
    "original_language": "en",
    "genre_ids": [10402],
    "cast": [212208, 1529997, 1911673, 96092, 1448505]
  },
  {
    "id": 508965,
    "original_language": "en",
    "genre_ids": [16, 10751, 12, 35, 14],
    "cast": [17881, 18999, 80591, 3234, 77075]
  },
  {
    "id": 447362,
    "original_language": "en",
    "genre_ids": [18, 10749],
    "cast": [120724, 1289968, 9777, 1260036, 1795840]
  },
  {
    "id": 527641,
    "original_language": "en",
    "genre_ids": [10749, 18],
    "cast": [1286328, 56730, 57412, 1538035, 231610]
  },
  {
    "id": 504253,
    "original_language": "ja",
    "genre_ids": [16, 18, 10749],
    "cast": [1318732, 1691384, 1287794, 1492992, 115301]
  },
  {
    "id": 25237,
    "original_language": "ru",
    "genre_ids": [18, 10752],
    "cast": [93407, 93408, 93409, 139096, 1148739]
  },
  {
    "id": 995133,
    "original_language": "en",
    "genre_ids": [16, 10751, 12, 14],
    "cast": [3024068, 2441, 17605, 5168]
  },
  {
    "id": 283566,
    "original_language": "ja",
    "genre_ids": [16, 28, 878, 18],
    "cast": [77927, 83768, 9711, 40325, 77931]
  },
  {
    "id": 490132,
    "original_language": "en",
    "genre_ids": [18, 36],
    "cast": [110, 932967, 1817, 299743, 1613744]
  },
  {
    "id": 654299,
    "original_language": "es",
    "genre_ids": [35, 18, 10402],
    "cast": [1134885, 7351, 1255083, 1314375, 2492975]
  },
  {
    "id": 265177,
    "original_language": "fr",
    "genre_ids": [18],
    "cast": [86612, 142689, 575662, 142995, 123185]
  },
  {
    "id": 618344,
    "original_language": "en",
    "genre_ids": [16, 28, 878, 12, 14],
    "cast": [127712, 3035, 527313, 183812, 5916]
  },
  {
    "id": 24188,
    "original_language": "it",
    "genre_ids": [18, 35],
    "cast": [12259, 1352, 70119, 32677, 128245]
  },
  {
    "id": 441130,
    "original_language": "en",
    "genre_ids": [16, 10751, 12, 14],
    "cast": [1363045, 2770089, 48, 16358, 107682]
  },
  {
    "id": 857,
    "original_language": "en",
    "genre_ids": [18, 36, 10752],
    "cast": [31, 3197, 12833, 12834, 6163]
  },
  {
    "id": 1160164,
    "original_language": "en",
    "genre_ids": [10402],
    "cast": [212208, 3159951, 3159948, 3157265, 1448505]
  },
  {
    "id": 315162,
    "original_language": "en",
    "genre_ids": [16, 12, 14, 35, 10751],
    "cast": [3131, 3136, 210172, 52583, 1373737]
  },
  {
    "id": 16672,
    "original_language": "ja",
    "genre_ids": [18, 53],
    "cast": [25466, 94188, 555339, 96804]
  },
  {
    "id": 16869,
    "original_language": "en",
    "genre_ids": [18, 53, 10752],
    "cast": [287, 19119, 27319, 16847, 17288]
  },
  {
    "id": 37257,
    "original_language": "en",
    "genre_ids": [18, 9648, 80],
    "cast": [10922, 2896, 10921, 2926, 5182]
  },
  {
    "id": 635302,
    "original_language": "ja",
    "genre_ids": [16, 28, 14, 53],
    "cast": [1256603, 1563442, 119145, 233590, 224413]
  },
  {
    "id": 694,
    "original_language": "en",
    "genre_ids": [27, 53],
    "cast": [514, 10409, 10410, 7077, 10411]
  },
  {
    "id": 290098,
    "original_language": "ko",
    "genre_ids": [53, 18, 10749],
    "cast": [123664, 1537768, 75913, 138336, 93252]
  },
  {
    "id": 50014,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [54693, 19492, 18997, 6944, 83002]
  },
  {
    "id": 1124,
    "original_language": "en",
    "genre_ids": [18, 9648, 878],
    "cast": [6968, 3894, 3895, 15555, 15556]
  },
  {
    "id": 11324,
    "original_language": "en",
    "genre_ids": [18, 53, 9648],
    "cast": [6193, 103, 2282, 2201, 1812]
  },
  {
    "id": 284,
    "original_language": "en",
    "genre_ids": [35, 18, 10749],
    "cast": [3151, 4090, 4091, 4093, 4094]
  },
  {
    "id": 620683,
    "original_language": "pt",
    "genre_ids": [35],
    "cast": [1185618, 1185619, 592370, 557414, 1422048]
  },
  {
    "id": 522924,
    "original_language": "en",
    "genre_ids": [18, 10749],
    "cast": [1269, 16501, 2013474, 143333, 1461441]
  },
  {
    "id": 92060,
    "original_language": "en",
    "genre_ids": [27, 10402, 9648],
    "cast": [82702, 926, 1905, 99914, 61824]
  },
  {
    "id": 324786,
    "original_language": "en",
    "genre_ids": [18, 36, 10752],
    "cast": [37625, 65731, 4937, 20374, 972356]
  },
  {
    "id": 313106,
    "original_language": "en",
    "genre_ids": [878, 12],
    "cast": [136532, 20049, 5049, 1080542, 26076]
  },
  {
    "id": 829402,
    "original_language": "en",
    "genre_ids": [16, 878, 10751, 28],
    "cast": [1646774, 16183, 3134, 91387, 4366710]
  },
  {
    "id": 476292,
    "original_language": "ja",
    "genre_ids": [16, 14, 18, 12],
    "cast": [1835721, 19588, 4080133, 1254671, 149894]
  },
  {
    "id": 185,
    "original_language": "en",
    "genre_ids": [878, 80],
    "cast": [56890, 2264, 2272, 2267, 2268]
  },
  {
    "id": 490,
    "original_language": "sv",
    "genre_ids": [14, 18],
    "cast": [6649, 6656, 6658, 2201, 6657]
  },
  {
    "id": 68718,
    "original_language": "en",
    "genre_ids": [18, 37],
    "cast": [134, 27319, 6193, 11703, 2231]
  },
  {
    "id": 18148,
    "original_language": "ja",
    "genre_ids": [18],
    "cast": [33135, 134307, 95504, 131013, 68411]
  },
  {
    "id": 5156,
    "original_language": "it",
    "genre_ids": [18],
    "cast": [42416, 42417, 42419, 944148, 975006]
  },
  {
    "id": 851644,
    "original_language": "ko",
    "genre_ids": [10749, 18],
    "cast": [140335, 2117890, 2377671, 3218480, 1806235]
  },
  {
    "id": 629,
    "original_language": "en",
    "genre_ids": [18, 80, 53],
    "cast": [9045, 5168, 1121, 7166, 1979]
  },
  {
    "id": 26451,
    "original_language": "it",
    "genre_ids": [18, 53],
    "cast": [14276, 83259, 585373, 235572, 95229]
  },
  {
    "id": 20941,
    "original_language": "es",
    "genre_ids": [18, 10752],
    "cast": [145059, 145061, 10839, 72128, 1660431]
  },
  {
    "id": 797,
    "original_language": "sv",
    "genre_ids": [18],
    "cast": [6657, 11916, 11917, 6649, 11918]
  },
  {
    "id": 426,
    "original_language": "en",
    "genre_ids": [9648, 10749, 53],
    "cast": [854, 5729, 5730, 5731, 5732]
  },
  {
    "id": 111,
    "original_language": "en",
    "genre_ids": [28, 80, 18],
    "cast": [1158, 1159, 1160, 1161, 1162]
  },
  {
    "id": 10098,
    "original_language": "en",
    "genre_ids": [35, 18],
    "cast": [13848, 19426, 63378, 21301, 21306]
  },
  {
    "id": 1422,
    "original_language": "en",
    "genre_ids": [18, 53, 80],
    "cast": [6193, 1892, 514, 13240, 8349]
  },
  {
    "id": 592350,
    "original_language": "ja",
    "genre_ids": [16, 28, 14, 12],
    "cast": [1325962, 1245094, 2040402, 1919754, 1247771]
  },
  {
    "id": 289,
    "original_language": "en",
    "genre_ids": [18, 10749],
    "cast": [4110, 4111, 4112, 4113, 3001]
  },
  {
    "id": 812225,
    "original_language": "ja",
    "genre_ids": [16, 14, 28, 12],
    "cast": [1919881, 1210634, 9721, 1919889, 90571]
  },
  {
    "id": 556574,
    "original_language": "en",
    "genre_ids": [36, 18],
    "cast": [1179651, 1254614, 87932, 1631814, 1652371]
  },
  {
    "id": 489,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [1892, 2157, 880, 1640, 6613]
  },
  {
    "id": 537061,
    "original_language": "en",
    "genre_ids": [10770, 12, 16, 35, 14, 10402, 878, 28, 18],
    "cast": [225863, 1217614, 1393199, 109488, 1890500]
  },
  {
    "id": 517814,
    "original_language": "ar",
    "genre_ids": [18],
    "cast": [2084595, 2084596, 2084597, 2084599, 2084600]
  },
  {
    "id": 399106,
    "original_language": "en",
    "genre_ids": [10751, 16],
    "cast": []
  },
  {
    "id": 133919,
    "original_language": "sv",
    "genre_ids": [18, 10749],
    "cast": [11916, 38127, 6657, 46867, 6662]
  },
  {
    "id": 872,
    "original_language": "en",
    "genre_ids": [35, 10749],
    "cast": [13294, 13295, 8857, 13296, 13297]
  },
  {
    "id": 610892,
    "original_language": "ja",
    "genre_ids": [18, 14, 16],
    "cast": [1224288, 1249310, 936275, 1254052, 84508]
  },
  {
    "id": 606856,
    "original_language": "en",
    "genre_ids": [12, 10751],
    "cast": [5293, 86034, 32887, 97416, 43933]
  },
  {
    "id": 20914,
    "original_language": "it",
    "genre_ids": [35],
    "cast": [32312, 3281, 24366, 24599, 9920]
  },
  {
    "id": 422,
    "original_language": "it",
    "genre_ids": [18],
    "cast": [5676, 5682, 5683, 4959, 5684]
  },
  {
    "id": 20334,
    "original_language": "en",
    "genre_ids": [35, 18, 10749],
    "cast": [14869, 854, 9067, 24820, 85956]
  },
  {
    "id": 810693,
    "original_language": "ja",
    "genre_ids": [16, 28, 14],
    "cast": [77927, 119143, 1221114, 9705, 1281498]
  },
  {
    "id": 1026227,
    "original_language": "it",
    "genre_ids": [18, 35, 36],
    "cast": [133214, 56843, 2635684, 1689522, 128227]
  },
  {
    "id": 81481,
    "original_language": "ko",
    "genre_ids": [18],
    "cast": [150903, 127720, 913196, 929592, 145382]
  },
  {
    "id": 9702,
    "original_language": "en",
    "genre_ids": [80, 28, 18, 53],
    "cast": [58646, 58647, 4589, 16427, 58648]
  },
  {
    "id": 666,
    "original_language": "pt",
    "genre_ids": [18],
    "cast": [10055, 10059, 10057, 10061, 10062]
  },
  {
    "id": 600,
    "original_language": "en",
    "genre_ids": [18, 10752],
    "cast": [8654, 2059, 7132, 8655, 8656]
  },
  {
    "id": 280,
    "original_language": "en",
    "genre_ids": [28, 53, 878],
    "cast": [1100, 2713, 820, 418, 2716]
  },
  {
    "id": 406997,
    "original_language": "en",
    "genre_ids": [18, 10751],
    "cast": [1277188, 1204, 887, 1109976, 1590759]
  },
  {
    "id": 791373,
    "original_language": "en",
    "genre_ids": [28, 12, 14],
    "cast": [880, 73968, 90633, 1313559, 117642]
  },
  {
    "id": 500,
    "original_language": "en",
    "genre_ids": [80, 53],
    "cast": [1037, 3129, 147, 2969, 884]
  },
  {
    "id": 1398,
    "original_language": "ru",
    "genre_ids": [878, 18],
    "cast": [28079, 28078, 8475, 1190992, 28080]
  },
  {
    "id": 614,
    "original_language": "sv",
    "genre_ids": [18],
    "cast": [8741, 6657, 8742, 6649, 8743]
  },
  {
    "id": 398818,
    "original_language": "en",
    "genre_ids": [10749, 18],
    "cast": [53807, 1190668, 72873, 20577, 935096]
  },
  {
    "id": 3780,
    "original_language": "ja",
    "genre_ids": [18],
    "cast": [7450, 33764, 70626, 131203, 213483]
  },
  {
    "id": 996,
    "original_language": "en",
    "genre_ids": [80, 53],
    "cast": [4091, 14974, 13566, 14975, 14977]
  },
  {
    "id": 935,
    "original_language": "en",
    "genre_ids": [35, 10752],
    "cast": [12446, 862, 3088, 4966, 14253]
  },
  {
    "id": 575813,
    "original_language": "zh",
    "genre_ids": [18, 80, 10749],
    "cast": [145092, 2223265, 2133335, 106581, 113791]
  },
  {
    "id": 100,
    "original_language": "en",
    "genre_ids": [35, 80],
    "cast": [980, 973, 974, 975, 976]
  },
  {
    "id": 600354,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [4173, 39187, 34546, 11616, 17606]
  },
  {
    "id": 531428,
    "original_language": "fr",
    "genre_ids": [18, 10749, 36],
    "cast": [1385600, 68816, 1442550, 3124, 96295]
  },
  {
    "id": 508442,
    "original_language": "en",
    "genre_ids": [16, 10751, 35, 14],
    "cast": [134, 56323, 78577, 15298, 8602]
  },
  {
    "id": 38288,
    "original_language": "it",
    "genre_ids": [35],
    "cast": [120019, 120025, 120020, 7543]
  },
  {
    "id": 19,
    "original_language": "de",
    "genre_ids": [18, 878],
    "cast": [74, 75, 73, 77, 79]
  },
  {
    "id": 458220,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [12111, 2897867, 36594, 1519512, 35515]
  },
  {
    "id": 11659,
    "original_language": "it",
    "genre_ids": [18, 36, 10749],
    "cast": [34491, 44646, 44110, 70234, 35106]
  },
  {
    "id": 795607,
    "original_language": "zh",
    "genre_ids": [16, 14, 28, 12],
    "cast": [2508433, 3174708, 2199340, 2339332, 2508434]
  },
  {
    "id": 470044,
    "original_language": "en",
    "genre_ids": [80, 18],
    "cast": [561869, 35705, 62649, 1680339, 4238]
  },
  {
    "id": 55823,
    "original_language": "it",
    "genre_ids": [35, 10752, 18],
    "cast": [12259, 45982, 12520, 2568, 24379]
  },
  {
    "id": 843,
    "original_language": "cn",
    "genre_ids": [18, 10749],
    "cast": [1337, 1338, 12462, 12463, 12674]
  },
  {
    "id": 664767,
    "original_language": "en",
    "genre_ids": [16, 28, 14],
    "cast": [939345, 1231115, 53828, 74949, 1620226]
  },
  {
    "id": 24382,
    "original_language": "it",
    "genre_ids": [35, 80],
    "cast": [12259, 27442, 12341, 91543, 91544]
  },
  {
    "id": 11878,
    "original_language": "ja",
    "genre_ids": [18, 53],
    "cast": [7450, 70131, 70811, 33761, 7457]
  },
  {
    "id": 411088,
    "original_language": "es",
    "genre_ids": [18, 9648, 53],
    "cast": [82700, 34053, 110129, 724188, 28509]
  },
  {
    "id": 146233,
    "original_language": "en",
    "genre_ids": [18, 53, 80],
    "cast": [6968, 131, 19492, 49, 18288]
  },
  {
    "id": 762975,
    "original_language": "en",
    "genre_ids": [10749, 18],
    "cast": [1331457, 1425934, 1382755, 1643043, 1496755]
  },
  {
    "id": 46738,
    "original_language": "fr",
    "genre_ids": [18, 10752, 9648],
    "cast": [77498, 84573, 88592, 38526, 196737]
  },
  {
    "id": 239,
    "original_language": "en",
    "genre_ids": [35, 10749, 80],
    "cast": [3150, 3151, 3149, 3152, 3155]
  },
  {
    "id": 103663,
    "original_language": "da",
    "genre_ids": [18],
    "cast": [1019, 4457, 1112385, 1188827, 47156]
  },
  {
    "id": 149871,
    "original_language": "ja",
    "genre_ids": [16, 18, 14],
    "cast": [1115687, 227629, 70627, 120690, 90570]
  },
  {
    "id": 20532,
    "original_language": "ja",
    "genre_ids": [18],
    "cast": [24551, 122429, 34374, 122430, 134263]
  },
  {
    "id": 406,
    "original_language": "fr",
    "genre_ids": [18],
    "cast": [1925, 5418, 5419, 5420, 5422]
  },
  {
    "id": 38,
    "original_language": "en",
    "genre_ids": [878, 18, 10749],
    "cast": [206, 204, 205, 103, 109]
  },
  {
    "id": 655,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [5048, 2630, 923, 9892, 9893]
  },
  {
    "id": 2457,
    "original_language": "fr",
    "genre_ids": [18, 10749],
    "cast": [25154, 25155, 24476, 25157, 25156]
  },
  {
    "id": 755812,
    "original_language": "fr",
    "genre_ids": [16, 10770, 14, 28],
    "cast": [1762588, 1558832, 1758915, 1762590, 1762589]
  },
  {
    "id": 663558,
    "original_language": "zh",
    "genre_ids": [16, 14, 28],
    "cast": [2185754, 2974840, 2718152, 2463716, 2974841]
  },
  {
    "id": 705,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [3380, 10606, 3361, 10607, 10608]
  },
  {
    "id": 387,
    "original_language": "de",
    "genre_ids": [18, 36, 10752],
    "cast": [920, 5228, 5229, 5230, 4924]
  },
  {
    "id": 397567,
    "original_language": "ko",
    "genre_ids": [28, 12, 18, 14, 53],
    "cast": [75913, 63442, 150125, 1128106, 73249]
  },
  {
    "id": 832,
    "original_language": "de",
    "genre_ids": [18, 53, 80],
    "cast": [2094, 12322, 12323, 12324, 79]
  },
  {
    "id": 831827,
    "original_language": "en",
    "genre_ids": [16, 10751],
    "cast": []
  },
  {
    "id": 532067,
    "original_language": "ja",
    "genre_ids": [16, 12, 35, 14],
    "cast": [115301, 1492982, 1325034, 1254671, 202806]
  },
  {
    "id": 518068,
    "original_language": "ko",
    "genre_ids": [28, 12, 14, 53],
    "cast": [75913, 150125, 1128106, 1024395, 118976]
  },
  {
    "id": 21634,
    "original_language": "en",
    "genre_ids": [18, 36, 10770],
    "cast": [23891, 10205, 15319, 76470, 6069]
  },
  {
    "id": 7345,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [11856, 17142, 18916, 8785, 52564]
  },
  {
    "id": 439,
    "original_language": "it",
    "genre_ids": [35, 18],
    "cast": [5676, 5961, 5682, 5962, 5963]
  },
  {
    "id": 8392,
    "original_language": "ja",
    "genre_ids": [14, 16, 10751],
    "cast": [55662, 55664, 55663, 55665, 613]
  },
  {
    "id": 548,
    "original_language": "ja",
    "genre_ids": [80, 18, 9648],
    "cast": [7450, 7451, 7453, 7452, 7454]
  },
  {
    "id": 359940,
    "original_language": "en",
    "genre_ids": [80, 18],
    "cast": [3910, 57755, 6807, 1105079, 37260]
  },
  {
    "id": 42229,
    "original_language": "it",
    "genre_ids": [18, 10749],
    "cast": [16757, 5676, 17580, 548631, 548632]
  },
  {
    "id": 437068,
    "original_language": "ko",
    "genre_ids": [28, 18, 36],
    "cast": [20738, 3491, 84996, 1530733, 587676]
  },
  {
    "id": 31439,
    "original_language": "zh",
    "genre_ids": [18, 10749, 10752],
    "cast": [76913, 643, 146044, 548608, 15170]
  },
  {
    "id": 1091,
    "original_language": "en",
    "genre_ids": [27, 9648, 878],
    "cast": [6856, 65827, 11065, 15411, 15412]
  },
  {
    "id": 62,
    "original_language": "en",
    "genre_ids": [878, 9648, 12],
    "cast": [245, 246, 247, 253, 248]
  },
  {
    "id": 992,
    "original_language": "en",
    "genre_ids": [28, 35, 9648],
    "cast": [8635, 14920, 10530, 14921, 14922]
  },
  {
    "id": 555604,
    "original_language": "en",
    "genre_ids": [16, 14, 18, 12, 10751, 10402],
    "cast": [3061, 11180, 2099810, 39659, 2372]
  },
  {
    "id": 550776,
    "original_language": "en",
    "genre_ids": [18, 10770, 80],
    "cast": [1183993, 84522, 58014, 1461465, 158459]
  },
  {
    "id": 522518,
    "original_language": "en",
    "genre_ids": [10751, 12, 18],
    "cast": [19838, 92572, 1530941, 220236, 6065]
  },
  {
    "id": 11423,
    "original_language": "ko",
    "genre_ids": [80, 18, 53],
    "cast": [20738, 69378, 69379, 1080904, 116180]
  },
  {
    "id": 11645,
    "original_language": "ja",
    "genre_ids": [28, 18, 36],
    "cast": [70131, 70132, 70133, 70134, 72607]
  },
  {
    "id": 7347,
    "original_language": "pt",
    "genre_ids": [18, 28, 80],
    "cast": [52583, 52585, 52584, 52586, 469968]
  },
  {
    "id": 381284,
    "original_language": "en",
    "genre_ids": [18, 36],
    "cast": [40036, 6944, 1005852, 1269, 205]
  },
  {
    "id": 800,
    "original_language": "es",
    "genre_ids": [18, 80],
    "cast": [11973, 11974, 11972, 11975, 11976]
  },
  {
    "id": 640344,
    "original_language": "it",
    "genre_ids": [10751, 14],
    "cast": [2436933, 2436934, 1328360, 2508882, 1749081]
  },
  {
    "id": 334543,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [76788, 108916, 1371, 2227, 1750435]
  },
  {
    "id": 400608,
    "original_language": "en",
    "genre_ids": [35, 10402],
    "cast": [115128, 71551]
  },
  {
    "id": 1955,
    "original_language": "en",
    "genre_ids": [18, 36],
    "cast": [4173, 5049, 10774, 11857, 13325]
  },
  {
    "id": 120467,
    "original_language": "en",
    "genre_ids": [35, 18],
    "cast": [5469, 1164, 8789, 3490, 5293]
  },
  {
    "id": 472454,
    "original_language": "tr",
    "genre_ids": [18, 10752, 36],
    "cast": [106621, 1876418, 93389, 1457752, 145500]
  },
  {
    "id": 785534,
    "original_language": "tr",
    "genre_ids": [18],
    "cast": [1252061, 2934254, 1948899, 143249, 1514727]
  },
  {
    "id": 821,
    "original_language": "en",
    "genre_ids": [18, 36],
    "cast": [12147, 12149, 12150, 13784, 2896]
  },
  {
    "id": 310569,
    "original_language": "pt",
    "genre_ids": [18],
    "cast": [228012, 1342895, 1115320, 232517, 1065193]
  },
  {
    "id": 26022,
    "original_language": "hi",
    "genre_ids": [18, 10749],
    "cast": [35742, 55061, 4115011, 35792, 1332866]
  },
  {
    "id": 582,
    "original_language": "de",
    "genre_ids": [18, 53],
    "cast": [678, 8196, 8197, 8198, 8199]
  },
  {
    "id": 538362,
    "original_language": "it",
    "genre_ids": [18],
    "cast": [1395660, 128426, 69489, 1312428, 2126785]
  },
  {
    "id": 204,
    "original_language": "fr",
    "genre_ids": [18, 53, 12],
    "cast": [2565, 2566, 2567, 2568, 2569]
  },
  {
    "id": 106646,
    "original_language": "en",
    "genre_ids": [80, 18, 35],
    "cast": [6193, 21007, 234352, 10297, 3497]
  },
  {
    "id": 9277,
    "original_language": "en",
    "genre_ids": [35, 80, 18],
    "cast": [3636, 4135, 8606, 1466, 4093]
  },
  {
    "id": 823754,
    "original_language": "en",
    "genre_ids": [35, 18],
    "cast": [115128]
  },
  {
    "id": 147,
    "original_language": "fr",
    "genre_ids": [18],
    "cast": [1653, 1654, 1655, 1658, 1659]
  },
  {
    "id": 279,
    "original_language": "en",
    "genre_ids": [36, 10402, 18],
    "cast": [1164, 3999, 4000, 4001, 4002]
  },
  {
    "id": 638507,
    "original_language": "en",
    "genre_ids": [16, 14, 12, 28, 10751],
    "cast": [449, 59174, 17276, 24264, 54691]
  },
  {
    "id": 43949,
    "original_language": "en",
    "genre_ids": [10749, 18],
    "cast": [62564, 236851, 28412, 11085, 4251]
  },
  {
    "id": 20530,
    "original_language": "ja",
    "genre_ids": [18],
    "cast": [33135, 95504, 131012, 131013, 131014]
  },
  {
    "id": 8422,
    "original_language": "it",
    "genre_ids": [18, 10749],
    "cast": [15135, 27442, 6014, 54905, 22475]
  },
  {
    "id": 521,
    "original_language": "en",
    "genre_ids": [53, 80],
    "cast": [7124, 4070, 7125, 5182, 7682]
  },
  {
    "id": 938,
    "original_language": "it",
    "genre_ids": [37],
    "cast": [190, 4078, 14276, 5814, 14277]
  },
  {
    "id": 610461,
    "original_language": "es",
    "genre_ids": [35],
    "cast": [1641653, 1243464, 1415546, 2344290, 1405006]
  },
  {
    "id": 347688,
    "original_language": "en",
    "genre_ids": [10751, 16, 35, 9648],
    "cast": [15831, 86314, 26457, 15761, 57756]
  },
  {
    "id": 307,
    "original_language": "it",
    "genre_ids": [18, 10752],
    "cast": [4420, 4422, 4424, 4421, 4426]
  },
  {
    "id": 641,
    "original_language": "en",
    "genre_ids": [80, 18],
    "cast": [9560, 7499, 6161, 9562, 4443]
  },
  {
    "id": 838240,
    "original_language": "es",
    "genre_ids": [16, 18, 35, 878],
    "cast": [31415, 4529554, 4529555, 4324061, 4324062]
  },
  {
    "id": 110416,
    "original_language": "en",
    "genre_ids": [10751, 16, 14],
    "cast": [1326568, 2039, 1326574, 58068, 1442866]
  },
  {
    "id": 55960,
    "original_language": "it",
    "genre_ids": [35, 10749],
    "cast": [132190, 94418, 125357, 227385, 1038632]
  },
  {
    "id": 962232,
    "original_language": "pt",
    "genre_ids": [10749, 18],
    "cast": [1563169, 3505217, 55012, 10061, 1741309]
  },
  {
    "id": 515001,
    "original_language": "en",
    "genre_ids": [35, 10752, 18],
    "cast": [2054851, 1356758, 1245, 55934, 6807]
  },
  {
    "id": 400928,
    "original_language": "en",
    "genre_ids": [18, 35],
    "cast": [16828, 1172108, 30083, 213001, 6944]
  },
  {
    "id": 28178,
    "original_language": "en",
    "genre_ids": [18, 10751],
    "cast": [1205, 11148, 20376, 11398, 18917]
  },
  {
    "id": 3175,
    "original_language": "en",
    "genre_ids": [18, 10749, 10752, 36],
    "cast": [31070, 31071, 2264, 37777, 782]
  },
  {
    "id": 14,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [1979, 516, 2155, 8210, 8211]
  },
  {
    "id": 1000492,
    "original_language": "fr",
    "genre_ids": [18],
    "cast": [2689723, 23383, 7282, 1940747, 59807]
  },
  {
    "id": 264644,
    "original_language": "en",
    "genre_ids": [18, 53],
    "cast": [60073, 1277188, 11148, 144160, 64712]
  },
  {
    "id": 359724,
    "original_language": "en",
    "genre_ids": [18, 28, 36],
    "cast": [1892, 3894, 19498, 147056, 6164]
  },
  {
    "id": 568160,
    "original_language": "ja",
    "genre_ids": [16, 18, 14, 10749],
    "cast": [2194388, 2109360, 1255487, 2352340, 85939]
  },
  {
    "id": 906126,
    "original_language": "es",
    "genre_ids": [18, 36],
    "cast": [3301646, 1769529, 2446476, 1086358, 1187534]
  },
  {
    "id": 11658,
    "original_language": "ko",
    "genre_ids": [28, 12, 18, 36, 10752],
    "cast": [16962, 70336, 70337, 70338, 1432841]
  },
  {
    "id": 947,
    "original_language": "en",
    "genre_ids": [12, 36, 10752],
    "cast": [11390, 12248, 5004, 5401, 10018]
  },
  {
    "id": 526702,
    "original_language": "en",
    "genre_ids": [18],
    "cast": [204, 851784, 20508, 1826549, 4174]
  },
  {
    "id": 20453,
    "original_language": "hi",
    "genre_ids": [18, 35],
    "cast": [52763, 85519, 53674, 37233, 35779]
  },
  {
    "id": 15,
    "original_language": "en",
    "genre_ids": [9648, 18],
    "cast": [40, 7664, 11029, 14518, 11028]
  },
  {
    "id": 524,
    "original_language": "en",
    "genre_ids": [80, 18],
    "cast": [380, 4430, 4517, 4512, 7167]
  },
  {
    "id": 449176,
    "original_language": "en",
    "genre_ids": [35, 18, 10749],
    "cast": [1108907, 116088, 1253199, 1636738, 1563266]
  },
  {
    "id": 414419,
    "original_language": "en",
    "genre_ids": [28, 80, 53],
    "cast": [139, 140, 2535, 147, 589]
  },
  {
    "id": 337404,
    "original_language": "en",
    "genre_ids": [35, 80, 12],
    "cast": [54693, 7056, 54811, 1294982, 1819918]
  },
  {
    "id": 205596,
    "original_language": "en",
    "genre_ids": [36, 18, 53, 10752],
    "cast": [71580, 116, 1247, 139549, 85718]
  },
  {
    "id": 339877,
    "original_language": "en",
    "genre_ids": [16, 18, 9648, 36],
    "cast": [230680, 1702761, 73357, 15737, 36592]
  },
  {
    "id": 930094,
    "original_language": "en",
    "genre_ids": [35, 10749],
    "cast": [2648891, 1425934, 139, 5365, 970769]
  },
  {
    "id": 678512,
    "original_language": "en",
    "genre_ids": [28, 18],
    "cast": [8767, 23931, 121718, 17689, 29685]
  }
]

# 1. One-hot encode genres
genres_mlb = MultiLabelBinarizer()
genre_features = genres_mlb.fit_transform([movie["genre_ids"] for movie in moviesArray])

# 2. TF-IDF for cast
cast_as_strings = [' '.join(map(str, movie["cast"])) for movie in moviesArray]
tfidf = TfidfVectorizer(token_pattern=r'\d+')
cast_features = tfidf.fit_transform(cast_as_strings)

# 3. One-hot encode original_language
language_encoder = OneHotEncoder()
language_features = language_encoder.fit_transform(
    np.array([movie["original_language"] for movie in moviesArray]).reshape(-1, 1)
)

# 4. Combine all features
final_features = hstack([genre_features, cast_features, language_features])

# 5. Compute cosine similarity matrix
cosine_sim = cosine_similarity(final_features)

# 6. Get top 10 similar movies for every movie (excluding itself)
top_k = 10
similar_movies = {}

for idx in range(len(moviesArray)):
    # Get similarity scores for the current movie
    sim_scores = list(enumerate(cosine_sim[idx]))
    
    # Sort by similarity (descending) and exclude itself
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:top_k+1]
    
    # Store results as (movie_id, similarity_score)
    similar_movies[moviesArray[idx]["id"]] = [
        (moviesArray[i]["id"], score)
        for i, score in sim_scores
    ]

# Example output
query_id = moviesArray[0]["id"]
print(f"Top 10 similar movies for Movie ID {query_id} (language: {moviesArray[0]['original_language']}):")
for movie_id, score in similar_movies[query_id]:
    movie_idx = next(i for i, m in enumerate(moviesArray) if m["id"] == movie_id)
    print(f"  Movie ID: {movie_id}, Similarity: {score:.4f}, Language: {moviesArray[movie_idx]['original_language']}")


# Generate JSON output
top_k = 10
similarity_data = []

for idx in range(len(moviesArray)):
    movie_one_id = moviesArray[idx]["id"]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:top_k+1]
    
    for i, score in sim_scores:
        movie_two_id = moviesArray[i]["id"]
        
        similarity_data.append({
            "movieOne": int(movie_one_id),
            "movieTwo": int(movie_two_id),
            "score": float(score)
        })

# Save to JSON file
output_file = "movie_similarities.json"
with open(output_file, 'w') as f:
    json.dump(similarity_data, f, indent=2)

print(f"Generated {len(similarity_data)} similarity pairs in {output_file}")
print(f"Sample of the first 5 records:")
print(json.dumps(similarity_data[:5], indent=2))
