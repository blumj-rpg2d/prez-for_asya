// Данные 30 вариантов (взяты из таблицы методички)
const VARIANTS = {
  "1": {
    "passwords": [
      "qwerty123",
      "tunduk2019",
      "Tunduk!2019",
      "%Wz3P8wir-"
    ],
    "letter": 1,
    "pdn": 1,
    "backup": {
      "volume": 150,
      "growth": 2,
      "disk": 2000,
      "rpo": 1,
      "rto": 8
    }
  },
  "2": {
    "passwords": [
      "12345678",
      "kompot2020",
      "K0mp0t!2020",
      "tH%mhi#7fAwu"
    ],
    "letter": 2,
    "pdn": 2,
    "backup": {
      "volume": 300,
      "growth": 3,
      "disk": 500,
      "rpo": 4,
      "rto": 2
    }
  },
  "3": {
    "passwords": [
      "password1",
      "sprint2021",
      "Spr1nt!2021",
      "sprint-kumys-elechek-21"
    ],
    "letter": 3,
    "pdn": 3,
    "backup": {
      "volume": 150,
      "growth": 3,
      "disk": 500,
      "rpo": 1,
      "rto": 2
    }
  },
  "4": {
    "passwords": [
      "iloveyou1",
      "alatoo2022",
      "@l@t00!2022",
      "5s_KWtggbhVGhnsQ"
    ],
    "letter": 4,
    "pdn": 4,
    "backup": {
      "volume": 300,
      "growth": 15,
      "disk": 2000,
      "rpo": 24,
      "rto": 4
    }
  },
  "5": {
    "passwords": [
      "qazwsx123",
      "kitep2023",
      "Y=uUDih5o&",
      "@A+sr9o5e_vu"
    ],
    "letter": 5,
    "pdn": 5,
    "backup": {
      "volume": 80,
      "growth": 10,
      "disk": 2000,
      "rpo": 4,
      "rto": 4
    }
  },
  "6": {
    "passwords": [
      "admin2024",
      "samovar2024",
      "8qN+PxSq@W",
      "samovar-balyk-too-24"
    ],
    "letter": 6,
    "pdn": 6,
    "backup": {
      "volume": 80,
      "growth": 5,
      "disk": 500,
      "rpo": 1,
      "rto": 24
    }
  },
  "7": {
    "passwords": [
      "letmein1",
      "borsok2025",
      "Ssig3N9NzGC_",
      "borsok-arbuz-kyl-25"
    ],
    "letter": 7,
    "pdn": 7,
    "backup": {
      "volume": 200,
      "growth": 12,
      "disk": 1000,
      "rpo": 24,
      "rto": 8
    }
  },
  "8": {
    "passwords": [
      "monkey123",
      "chaihana2019",
      "N-h3iyw7XgV&",
      "*%mw#+R?d8mX8PMB"
    ],
    "letter": 8,
    "pdn": 8,
    "backup": {
      "volume": 60,
      "growth": 5,
      "disk": 2000,
      "rpo": 24,
      "rto": 8
    }
  },
  "9": {
    "passwords": [
      "dragon777",
      "naryn2020",
      "naryn-elechek-chai-20",
      "_6R27vkiikjtRY%%"
    ],
    "letter": 9,
    "pdn": 9,
    "backup": {
      "volume": 120,
      "growth": 6,
      "disk": 2000,
      "rpo": 1,
      "rto": 8
    }
  },
  "10": {
    "passwords": [
      "football1",
      "@sm@n!2021",
      "$*9=CwFfA@",
      "WLBxUh-piu4E"
    ],
    "letter": 10,
    "pdn": 10,
    "backup": {
      "volume": 150,
      "growth": 12,
      "disk": 500,
      "rpo": 24,
      "rto": 24
    }
  },
  "11": {
    "passwords": [
      "qwerty123",
      "Kyzyl!2022",
      "ww55k5tV?8",
      "kyzyl-ak-keme-tobut-22"
    ],
    "letter": 11,
    "pdn": 11,
    "backup": {
      "volume": 80,
      "growth": 2,
      "disk": 500,
      "rpo": 24,
      "rto": 8
    }
  },
  "12": {
    "passwords": [
      "12345678",
      "D0stuk!2023",
      "4x=m-J99J2",
      "h$4D@2jsiNMaH?VK"
    ],
    "letter": 12,
    "pdn": 12,
    "backup": {
      "volume": 60,
      "growth": 20,
      "disk": 2000,
      "rpo": 4,
      "rto": 8
    }
  },
  "13": {
    "passwords": [
      "password1",
      "B1shk3k!2024",
      "dRL&Sbo7TQ&?",
      "$P&9ziGKzJNKq4p$"
    ],
    "letter": 13,
    "pdn": 13,
    "backup": {
      "volume": 200,
      "growth": 8,
      "disk": 500,
      "rpo": 4,
      "rto": 2
    }
  },
  "14": {
    "passwords": [
      "iloveyou1",
      "Kumys!2025",
      "kumys-nan-tunduk-25",
      "v9RS4sk2rwu#sU4w"
    ],
    "letter": 14,
    "pdn": 14,
    "backup": {
      "volume": 200,
      "growth": 3,
      "disk": 1000,
      "rpo": 1,
      "rto": 4
    }
  },
  "15": {
    "passwords": [
      "qazwsx123",
      "A57?r*%7ex",
      "BT7k-U&W8c48",
      "chaban-chai-kompot-19"
    ],
    "letter": 15,
    "pdn": 15,
    "backup": {
      "volume": 300,
      "growth": 5,
      "disk": 500,
      "rpo": 24,
      "rto": 8
    }
  },
  "16": {
    "passwords": [
      "admin2024",
      "*d49L?Q8Kb",
      "?e?26V%s8ymC",
      "+h?$UM+J+6#Y-2y@"
    ],
    "letter": 16,
    "pdn": 16,
    "backup": {
      "volume": 400,
      "growth": 15,
      "disk": 500,
      "rpo": 1,
      "rto": 4
    }
  },
  "17": {
    "passwords": [
      "letmein1",
      "mw8Z?iVe-V",
      "balyk-tobut-alatoo-21",
      "TG_%os32#rK-Qkxw"
    ],
    "letter": 17,
    "pdn": 17,
    "backup": {
      "volume": 300,
      "growth": 6,
      "disk": 500,
      "rpo": 1,
      "rto": 4
    }
  },
  "18": {
    "passwords": [
      "monkey123",
      "pBF??7iQg+$3",
      "arbuz-bokso-kitep-22",
      "#_Wv*Y?T2XcYRwPp"
    ],
    "letter": 18,
    "pdn": 18,
    "backup": {
      "volume": 400,
      "growth": 10,
      "disk": 500,
      "rpo": 4,
      "rto": 2
    }
  },
  "19": {
    "passwords": [
      "kavun2023",
      "K@vun!2023",
      "n58R_DyDW$",
      "kavun-oymo-samovar-23"
    ],
    "letter": 19,
    "pdn": 19,
    "backup": {
      "volume": 100,
      "growth": 4,
      "disk": 1000,
      "rpo": 1,
      "rto": 4
    }
  },
  "20": {
    "passwords": [
      "elechek2024",
      "3l3ch3k!2024",
      "LZ#NEb5$2F",
      "+__ejm4aGKNo@#Um"
    ],
    "letter": 20,
    "pdn": 20,
    "backup": {
      "volume": 60,
      "growth": 20,
      "disk": 1000,
      "rpo": 24,
      "rto": 8
    }
  },
  "21": {
    "passwords": [
      "dastorkon2025",
      "D@st0rk0n!2025",
      "%Y9Vuv64m&$_",
      "dastorkon-kompot-chaihana-25"
    ],
    "letter": 21,
    "pdn": 21,
    "backup": {
      "volume": 100,
      "growth": 4,
      "disk": 2000,
      "rpo": 4,
      "rto": 2
    }
  },
  "22": {
    "passwords": [
      "ak-keme2019",
      "@k-k3m3!2019",
      "&iRKe&9&nN6W",
      "#fCJ3XHdy2qu-wLD"
    ],
    "letter": 22,
    "pdn": 22,
    "backup": {
      "volume": 250,
      "growth": 6,
      "disk": 500,
      "rpo": 1,
      "rto": 24
    }
  },
  "23": {
    "passwords": [
      "too2020",
      "T00!2020",
      "too-alatoo-asman-20",
      "4dp?Ev6F8U=C5-Np"
    ],
    "letter": 23,
    "pdn": 23,
    "backup": {
      "volume": 60,
      "growth": 2,
      "disk": 2000,
      "rpo": 24,
      "rto": 2
    }
  },
  "24": {
    "passwords": [
      "kyl2021",
      "arY6q9=QV7",
      "qPPnYR_Uxn9-",
      "kyl-kitep-kyzyl-21"
    ],
    "letter": 24,
    "pdn": 24,
    "backup": {
      "volume": 250,
      "growth": 5,
      "disk": 2000,
      "rpo": 4,
      "rto": 4
    }
  },
  "25": {
    "passwords": [
      "nan2022",
      "?X@na+Y8R9",
      "nan-samovar-dostuk-22",
      "B*3msF&**gW_e+37"
    ],
    "letter": 25,
    "pdn": 25,
    "backup": {
      "volume": 100,
      "growth": 3,
      "disk": 500,
      "rpo": 1,
      "rto": 4
    }
  },
  "26": {
    "passwords": [
      "chai2023",
      "ia9_ZEZY%4sC",
      "chai-borsok-bishkek-23",
      "*@*EhkHR&b6PY&TZ"
    ],
    "letter": 26,
    "pdn": 26,
    "backup": {
      "volume": 400,
      "growth": 6,
      "disk": 2000,
      "rpo": 1,
      "rto": 4
    }
  },
  "27": {
    "passwords": [
      "Kurush!2024",
      "a-JR66D#_R",
      "ka963&M+pdFL",
      "kurush-chaihana-kumys-24"
    ],
    "letter": 27,
    "pdn": 27,
    "backup": {
      "volume": 400,
      "growth": 4,
      "disk": 1000,
      "rpo": 24,
      "rto": 24
    }
  },
  "28": {
    "passwords": [
      "T0but!2025",
      "5?D3a+Dae_",
      "#4yLyd34QVxS",
      "97#YpXu4yqf84T@*"
    ],
    "letter": 28,
    "pdn": 28,
    "backup": {
      "volume": 250,
      "growth": 4,
      "disk": 2000,
      "rpo": 1,
      "rto": 4
    }
  },
  "29": {
    "passwords": [
      "B0ks0!2019",
      "_H8V2%AVAp",
      "bokso-asman-zelenka-19",
      "wabTU55xRZ&WSP3M"
    ],
    "letter": 29,
    "pdn": 29,
    "backup": {
      "volume": 400,
      "growth": 4,
      "disk": 500,
      "rpo": 24,
      "rto": 2
    }
  },
  "30": {
    "passwords": [
      "u4KHZV?n8=",
      "MsRxy59%R__@",
      "oymo-kyzyl-balyk-20",
      "?gH&ur*Fr4@zepW4"
    ],
    "letter": 30,
    "pdn": 30,
    "backup": {
      "volume": 300,
      "growth": 3,
      "disk": 500,
      "rpo": 24,
      "rto": 4
    }
  }
};
