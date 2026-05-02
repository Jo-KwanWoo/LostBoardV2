// 데이터 형식
/**
 * {
        "RaidName" : "레이드 이름", string
        "RaidDifficulty" : "레이드 난이도(single, normal, hard)", string
        "RaidItemLevel" : 레이드 입장 레벨, number
        "clearGold" : [1관문 클리어 골드, 2관문 클리어 골드, ...], number arr
        "clearReward" : [[1관문 파괴석, 수호석, 파편, 돌파석], [2관문 파괴석, 수호석, 파편, 돌파석], ...], number arr[arr]
        "additionalGold" : [1관문 더보기 비용, 2관문 더보기 비용, ...], number arr
        "additionalReward" : [[1관문 더보기 파괴석, 더보기 수호석, 더보기 파편, 더보기 돌파석], [2관문 더보기 파괴석, 더보기 수호석, 더보기 파편, 더보기 돌파석], ...], number arr[arr]
        "clearUniqueRewards" : [{"고유아이템명": 수량}, {"고유아이템명": 수량}, ...], object arr - 관문별 클리어 고유보상
        "additionalUniqueRewards" : [{"고유아이템명": 수량}, {"고유아이템명": 수량}, ...], object arr - 관문별 더보기 고유보상
    }
 */

const Raid = [
    {
        "RaidName": "지평의 성당",
        "RaidDifficulty": "3단계",
        "RaidItemLevel": 1750,
        "clearGold": [20000, 30000],
        "clearReward": [[405, 810, 9100, 8, 0], [500, 1000, 11000, 12, 0]],
        "additionalGold": [6400, 9600],
        "additionalReward": [[860, 1720, 19000, 36], [1430, 2860, 32200, 60]],
        "clearUniqueRewards": [
            { "코어": 3, "은총의 파편" : 24, "특수 재련 : 전이 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 3, "은총의 파편" : 36, "특수 재련 : 전이 돌파석": 6, "운명의 돌" : 10 }
        ],
        "additionalUniqueRewards": [
            { "코어": 3, "은총의 파편" : 24, "특수 재련 : 전이 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 3, "은총의 파편" : 36, "특수 재련 : 전이 돌파석": 5, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "지평의 성당",
        "RaidDifficulty": "2단계",
        "RaidItemLevel": 1720,
        "clearGold": [16000, 24000],
        "clearReward": [[980, 1960, 6800, 11, 0], [1150, 2300, 8600, 16, 0]],
        "additionalGold": [5120, 7680],
        "additionalReward": [[1680, 3360, 14250, 53], [2880, 5760, 24200, 94]],
        "clearUniqueRewards": [
            { "코어": 2, "은총의 파편" : 12, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 2, "은총의 파편" : 18, "특수 재련 : 순환 돌파석": 17, "운명의 돌" : 10 }
        ],
        "additionalUniqueRewards": [
            { "코어": 2, "은총의 파편" : 12, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 2, "은총의 파편" : 18, "특수 재련 : 순환 돌파석": 18, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "지평의 성당",
        "RaidDifficulty": "1단계",
        "RaidItemLevel": 1700,
        "clearGold": [13500, 16500],
        "clearReward": [[820, 1640, 5400, 9, 0], [960, 1920, 6800, 12, 0]],
        "additionalGold": [4320, 5280],
        "additionalReward": [[1400, 2800, 11880, 44], [2400, 4800, 20160, 78]],
        "clearUniqueRewards": [
            { "코어": 2, "은총의 파편" : 4, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 2, "은총의 파편" : 6, "특수 재련 : 순환 돌파석": 15, "운명의 돌" : 8 }
        ],
        "additionalUniqueRewards": [
            { "코어": 2, "은총의 파편" : 4, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 2, "은총의 파편" : 6, "특수 재련 : 순환 돌파석": 10, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "세르카",
        "RaidDifficulty": "nightmare",
        "RaidItemLevel": 1740,
        "clearGold": [21000, 33000],
        "clearReward": [[405, 810, 9100, 8, 0], [500, 1000, 11000, 12, 0]],
        "additionalGold": [6720, 10560],
        "additionalReward": [[860, 1720, 19000, 36], [1430, 2860, 32200, 60]],
        "clearUniqueRewards": [
            { "코어": 3, "고통의 가시" : 10, "특수 재련 : 전이 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 3, "고통의 가시" : 15, "특수 재련 : 전이 돌파석": 6, "운명의 돌" : 10 }
        ],
        "additionalUniqueRewards": [
            { "코어": 3, "고통의 가시" : 10, "특수 재련 : 전이 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 3, "고통의 가시" : 15, "특수 재련 : 전이 돌파석": 5, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "세르카",
        "RaidDifficulty": "hard",
        "RaidItemLevel": 1730,
        "clearGold": [17500, 26500],
        "clearReward": [[385, 770, 8300, 7, 0], [475, 950, 10100, 10, 0]],
        "additionalGold": [5600, 8480],
        "additionalReward": [[750, 1500, 17500, 30], [1130, 2260, 26820, 45]],
        "clearUniqueRewards": [
            { "코어": 2, "고통의 가시" : 10, "특수 재련 : 전이 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 2, "고통의 가시" : 15, "특수 재련 : 전이 돌파석": 5, "운명의 돌" : 10 }
        ],
        "additionalUniqueRewards": [
            { "코어": 2, "고통의 가시" : 10, "특수 재련 : 전이 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 2, "고통의 가시" : 15, "특수 재련 : 전이 돌파석": 4, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "세르카",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1710,
        "clearGold": [14000, 21000],
        "clearReward": [[880, 1760, 6200, 12, 0], [1100, 2200, 7900, 15, 0]],
        "additionalGold": [4480, 6720],
        "additionalReward": [[1610, 3220, 13650, 50], [2480, 4960, 20880, 82]],
        "clearUniqueRewards": [
            { "코어": 2, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 2, "특수 재련 : 순환 돌파석": 17, "운명의 돌" : 8 }
        ],
        "additionalUniqueRewards": [
            { "코어": 2, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 2, "특수 재련 : 순환 돌파석": 12, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "카제로스(종막)",
        "RaidDifficulty": "hard",
        "RaidItemLevel": 1730,
        "clearGold": [17000, 35000],
        "clearReward": [[385, 770, 8300, 7, 0], [475, 950, 10100, 10, 0]],
        "additionalGold": [5440, 11200],
        "additionalReward": [[750, 1500, 17500, 30], [1320, 2640, 29800, 50]],
        "clearUniqueRewards": [
            { "코어": 2, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 2, "특수 재련 : 순환 돌파석": 22, "운명의 돌" : 10 }
        ],
        "additionalUniqueRewards": [
            { "코어": 2, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 2, "특수 재련 : 순환 돌파석": 16, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "카제로스(종막)",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1710,
        "clearGold": [14000, 26000],
        "clearReward": [[880, 1760, 6200, 12, 0], [1100, 2200, 7900, 15, 0]],
        "additionalGold": [4480, 8320],
        "additionalReward": [[1610, 3220, 13650, 50], [2760, 5520, 23200, 90]],
        "clearUniqueRewards": [
            { "코어": 2, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 2, "특수 재련 : 순환 돌파석": 17, "운명의 돌" : 8 }
        ],
        "additionalUniqueRewards": [
            { "코어": 2, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 2, "특수 재련 : 순환 돌파석": 12, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "아르모체(4막)",
        "RaidDifficulty": "hard",
        "RaidItemLevel": 1720,
        "clearGold": [15000, 27000],
        "clearReward": [[980, 1960, 6800, 11, 0], [1150, 2300, 8600, 16, 0]],
        "additionalGold": [4800, 8640],
        "additionalReward": [[1680, 3360, 14250, 53], [2880, 5760, 24200, 94]],
        "clearUniqueRewards": [
            { "코어": 1, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 1, "특수 재련 : 순환 돌파석": 19, "운명의 돌" : 16 }
        ],
        "additionalUniqueRewards": [
            { "코어": 1, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 1, "특수 재련 : 순환 돌파석": 13, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "아르모체(4막)",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1700,
        "clearGold": [12500, 20500],
        "clearReward": [[820, 1640, 5400, 9, 0], [960, 1920, 6800, 12, 0]],
        "additionalGold": [4000, 6560],
        "additionalReward": [[1400, 2800, 11880, 44], [2400, 4800, 20160, 78]],
        "clearUniqueRewards": [
            { "코어": 1, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 1, "특수 재련 : 순환 돌파석": 15, "운명의 돌" : 7 }
        ],
        "additionalUniqueRewards": [
            { "코어": 1, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "코어": 1, "특수 재련 : 순환 돌파석": 10, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "모르둠(3막)",
        "RaidDifficulty": "hard",
        "RaidItemLevel": 1700,
        "clearGold": [5000, 8000, 14000],
        "clearReward": [[440, 880, 3400, 6, 600], [520, 1040, 4000, 6, 700], [640, 1280, 5600, 8, 1400]],
        "additionalGold": [1650, 2640, 4060],
        "additionalReward": [[600, 1200, 5000, 23], [830, 1660, 7200, 27], [1460, 2920, 11760, 45]],
        "clearUniqueRewards": [
            { "우뢰의 뇌옥": 3, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "우뢰의 뇌옥": 5, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "우뢰의 뇌옥": 10, "특수 재련 : 순환 돌파석": 15, "운명의 돌" : 7 }
        ],
        "additionalUniqueRewards": [
            { "우뢰의 뇌옥": 3, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "우뢰의 뇌옥": 5, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "우뢰의 뇌옥": 10, "특수 재련 : 순환 돌파석": 10, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "모르둠(3막)",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1680,
        "clearGold": [4000, 7000, 10000],
        "clearReward": [[320, 640, 2600, 4, 600], [400, 800, 3000, 4, 700], [520, 1040, 4200, 6, 1400]],
        "additionalGold": [1300, 2350, 3360],
        "additionalReward": [[390, 780, 3680, 12], [530, 1060, 4750, 15], [780, 1560, 6810, 21]],
        "clearUniqueRewards": [
            { "낙뢰의 뿔": 3, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "낙뢰의 뿔": 5, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "낙뢰의 뿔": 10, "특수 재련 : 순환 돌파석": 11, "운명의 돌" : 5 }
        ],
        "additionalUniqueRewards": [
            { "낙뢰의 뿔": 3, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "낙뢰의 뿔": 5, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "낙뢰의 뿔": 10, "특수 재련 : 순환 돌파석": 7, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "모르둠(3막)",
        "RaidDifficulty": "single",
        "RaidItemLevel": 1680,
        "clearGold": [4000, 7000, 10000],
        "clearReward": [[320, 640, 2600, 4, 600], [400, 800, 3000, 4, 700], [520, 1040, 4200, 6, 1400]],
        "additionalGold": [1300, 2350, 3360],
        "additionalReward": [[390, 780, 3680, 12], [530, 1060, 4750, 15], [780, 1560, 6810, 21]],
        "clearUniqueRewards": [
            { "낙뢰의 뿔": 3, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "낙뢰의 뿔": 5, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "낙뢰의 뿔": 10, "특수 재련 : 순환 돌파석": 11, "운명의 돌" : 5 }
        ],
        "additionalUniqueRewards": [
            { "낙뢰의 뿔": 3, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "낙뢰의 뿔": 5, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "낙뢰의 뿔": 10, "특수 재련 : 순환 돌파석": 7, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "아브렐슈드(2막)",
        "RaidDifficulty": "hard",
        "RaidItemLevel": 1690,
        "clearGold": [7500, 15500],
        "clearReward": [[640, 1280, 4600, 7, 1000], [700, 1400, 6000, 8, 1300]],
        "additionalGold": [2400, 5100],
        "additionalReward": [[720, 1440, 6000, 30], [1320, 2640, 10590, 50]],
        "clearUniqueRewards": [
            { "카르마의 잔영": 8, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "카르마의 잔영": 12, "특수 재련 : 순환 돌파석": 13, "운명의 돌" : 6 }
        ],
        "additionalUniqueRewards": [
            { "카르마의 잔영": 8, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "카르마의 잔영": 12, "특수 재련 : 순환 돌파석": 9, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "아브렐슈드(2막)",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1670,
        "clearGold": [5500, 11000],
        "clearReward": [[540, 1080, 4000, 5, 1000], [640, 1280, 4600, 6, 1300]],
        "additionalGold": [1820, 3720],
        "additionalReward": [[610, 1220, 5220, 13], [810, 1620, 8060, 21]],
        "clearUniqueRewards": [
            { "카르마의 잔영": 4, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "카르마의 잔영": 6, "특수 재련 : 순환 돌파석": 11, "운명의 돌" : 4 }
        ],
        "additionalUniqueRewards": [
            { "카르마의 잔영": 4, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "카르마의 잔영": 6, "특수 재련 : 순환 돌파석": 7, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "아브렐슈드(2막)",
        "RaidDifficulty": "single",
        "RaidItemLevel": 1670,
        "clearGold": [5500, 11000],
        "clearReward": [[540, 1080, 4000, 5, 1000], [640, 1280, 4600, 6, 1300]],
        "additionalGold": [1820, 3720],
        "additionalReward": [[610, 1220, 5220, 13], [810, 1620, 8060, 21]],
        "clearUniqueRewards": [
            { "카르마의 잔영": 4, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "카르마의 잔영": 6, "특수 재련 : 순환 돌파석": 11, "운명의 돌" : 4 }
        ],
        "additionalUniqueRewards": [
            { "카르마의 잔영": 4, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "카르마의 잔영": 6, "특수 재련 : 순환 돌파석": 7, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "에기르(1막)",
        "RaidDifficulty": "hard",
        "RaidItemLevel": 1680,
        "clearGold": [5500, 12500],
        "clearReward": [[580, 1160, 4200, 6, 800], [660, 1320, 5400, 7, 1100]],
        "additionalGold": [1820, 4150],
        "additionalReward": [[610, 1220, 5280, 18], [940, 1880, 8930, 31]],
        "clearUniqueRewards": [
            { "업화의 쐐기돌": 8, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "업화의 쐐기돌": 12, "특수 재련 : 순환 돌파석": 12, "운명의 돌" : 5 }
        ],
        "additionalUniqueRewards": [
            { "업화의 쐐기돌": 8, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "업화의 쐐기돌": 12, "특수 재련 : 순환 돌파석": 9, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "에기르(1막)",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1660,
        "clearGold": [3500, 8000],
        "clearReward": [[480, 960, 3600, 4, 800], [580, 1160, 4400, 5, 1100]],
        "additionalGold": [750, 1780],
        "additionalReward": [[310, 620, 2800, 8], [460, 920, 4480, 15]],
        "clearUniqueRewards": [
            { "업화의 쐐기돌": 4, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "업화의 쐐기돌": 6, "특수 재련 : 순환 돌파석": 9, "운명의 돌" : 4 }
        ],
        "additionalUniqueRewards": [
            { "업화의 쐐기돌": 4, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "업화의 쐐기돌": 6, "특수 재련 : 순환 돌파석": 7, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "에기르(1막)",
        "RaidDifficulty": "single",
        "RaidItemLevel": 1660,
        "clearGold": [3500, 8000],
        "clearReward": [[480, 960, 3600, 4, 800], [580, 1160, 4400, 5, 1100]],
        "additionalGold": [750, 1780],
        "additionalReward": [[310, 620, 2800, 8], [460, 920, 4480, 15]],
        "clearUniqueRewards": [
            { "업화의 쐐기돌": 4, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "업화의 쐐기돌": 6, "특수 재련 : 순환 돌파석": 9, "운명의 돌" : 4 }
        ],
        "additionalUniqueRewards": [
            { "업화의 쐐기돌": 4, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "업화의 쐐기돌": 6, "특수 재련 : 순환 돌파석": 7, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "베히모스",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1640,
        "clearGold": [2200, 5000],
        "clearReward": [[210, 420, 3000, 2, 600], [270, 540, 4000, 3, 800]],
        "additionalGold": [720, 1630],
        "additionalReward": [[240, 480, 1620, 7], [460, 920, 2990, 20]],
        "clearUniqueRewards": [
            { "베히모스의 비늘": 10, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "베히모스의 비늘": 20, "특수 재련 : 순환 돌파석": 9, "운명의 돌" : 3 }
        ],
        "additionalUniqueRewards": [
            { "베히모스의 비늘": 10, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "베히모스의 비늘": 20, "특수 재련 : 순환 돌파석": 7, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "에키드나(서막)",
        "RaidDifficulty": "hard",
        "RaidItemLevel": 1640,
        "clearGold": [2200, 5000],
        "clearReward": [[200, 400, 2700, 2, 400], [260, 520, 3800, 3, 550]],
        "additionalGold": [720, 1630],
        "additionalReward": [[240, 480, 1620, 7], [460, 920, 2990, 20]],
        "clearUniqueRewards": [
            { "알키오네의 눈": 3, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "알키오네의 눈": 6, "특수 재련 : 순환 돌파석": 7, "운명의 돌" : 3 }
        ],
        "additionalUniqueRewards": [
            { "알키오네의 눈": 3, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "알키오네의 눈": 6, "특수 재련 : 순환 돌파석": 6, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "에키드나(서막)",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1620,
        "clearGold": [1900, 4200],
        "clearReward": [[80, 160, 1800, 1, 400], [110, 220, 2100, 1, 550]],
        "additionalGold": [310, 700],
        "additionalReward": [[90, 180, 1320, 2], [160, 320, 1900, 3]],
        "clearUniqueRewards": [
            { "아그리스의 비늘": 3, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "아그리스의 비늘": 6, "특수 재련 : 순환 돌파석": 1, "운명의 돌" : 2 }
        ],
        "additionalUniqueRewards": [
            { "아그리스의 비늘": 3, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "아그리스의 비늘": 6, "특수 재련 : 순환 돌파석": 1, "운명의 돌" : 0 }
        ]
    },
   {
        "RaidName": "에키드나(서막)",
        "RaidDifficulty": "single",
        "RaidItemLevel": 1620,
        "clearGold": [1900, 4200],
        "clearReward": [[80, 160, 1800, 1, 400], [110, 220, 2100, 1, 550]],
        "additionalGold": [310, 700],
        "additionalReward": [[90, 180, 1320, 2], [160, 320, 1900, 3]],
        "clearUniqueRewards": [
            { "아그리스의 비늘": 3, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "아그리스의 비늘": 6, "특수 재련 : 순환 돌파석": 1, "운명의 돌" : 2 }
        ],
        "additionalUniqueRewards": [
            { "아그리스의 비늘": 3, "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "아그리스의 비늘": 6, "특수 재련 : 순환 돌파석": 1, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "카멘 1-3관문",
        "RaidDifficulty": "hard",
        "RaidItemLevel": 1630,
        "clearGold": [2000, 2400, 3600],
        "clearReward": [[80, 160, 1200, 1, 250], [90, 180, 1400, 1, 300], [100, 200, 1650, 1, 500]],
        "additionalGold": [500, 600, 900],
        "additionalReward": [[90, 180, 920, 1], [100, 200, 1060, 2], [130, 260, 1360, 3]],
        "clearUniqueRewards": [
            { "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "특수 재련 : 순환 돌파석": 1, "운명의 돌" : 3 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "특수 재련 : 순환 돌파석": 1, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "카멘 1-3관문",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1610,
        "clearGold": [1600, 2000, 2800],
        "clearReward": [[150, 300, 3000, 5, 250], [180, 360, 3750, 5, 300], [225, 450, 4500, 6, 500]],
        "additionalGold": [360, 440, 640],
        "additionalReward": [[250, 500, 2220, 9], [290, 580, 2880, 12], [390, 780, 3780, 13]],
        "clearUniqueRewards": [
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 5, "혼돈의 돌" : 5 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 3, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "카멘 1-3관문",
        "RaidDifficulty": "single",
        "RaidItemLevel": 1610,
        "clearGold": [1600, 2000, 2800],
        "clearReward": [[150, 300, 3000, 5, 250], [180, 360, 3750, 5, 300], [225, 450, 4500, 6, 500]],
        "additionalGold": [360, 440, 640],
        "additionalReward": [[250, 500, 2220, 9], [290, 580, 2880, 12], [390, 780, 3780, 13]],
        "clearUniqueRewards": [
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 5, "혼돈의 돌" : 5 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 3, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "카멘 4관문",
        "RaidDifficulty": "hard",
        "RaidItemLevel": 1630,
        "clearGold": [5000],
        "clearReward": [[110, 220, 1800, 1, 0]],
        "additionalGold": [1250],
        "additionalReward": [[180, 360, 1910, 4]],
        "clearUniqueRewards": [
            { "특수 재련 : 순환 돌파석": 2, "운명의 돌" : 4 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 순환 돌파석": 1, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "혼돈의 상아탑",
        "RaidDifficulty": "hard",
        "RaidItemLevel": 1620,
        "clearGold": [1400, 2000, 3800],
        "clearReward": [[80, 160, 1100, 1, 200], [80, 160, 1150, 1, 250], [100, 200, 1700, 1, 450]],
        "additionalGold": [350, 500, 950],
        "additionalReward": [[50, 100, 1400, 1], [60, 120, 1450, 1], [90, 180, 2300, 3]],
        "clearUniqueRewards": [
            { "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "특수 재련 : 순환 돌파석": 2, "운명의 돌" : 1 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "특수 재련 : 순환 돌파석": 0, "운명의 돌" : 0 },
            { "특수 재련 : 순환 돌파석": 1, "운명의 돌" : 0 }
        ]
    },
    {
        "RaidName": "혼돈의 상아탑",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1600,
        "clearGold": [1200, 1600, 2400],
        "clearReward": [[200, 400, 3000, 3, 200], [200, 400, 3000, 3, 250], [260, 520, 4500, 4, 450]],
        "additionalGold": [180, 220, 300],
        "additionalReward": [[150, 300, 3600, 7], [160, 320, 3600, 7], [230, 460, 6000, 13]],
        "clearUniqueRewards": [
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 5, "혼돈의 돌" : 3 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 3, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "혼돈의 상아탑",
        "RaidDifficulty": "single",
        "RaidItemLevel": 1600,
        "clearGold": [1200, 1600, 2400],
        "clearReward": [[200, 400, 3000, 3, 200], [200, 400, 3000, 3, 250], [260, 520, 4500, 4, 450]],
        "additionalGold": [180, 220, 300],
        "additionalReward": [[150, 300, 3600, 7], [160, 320, 3600, 7], [230, 460, 6000, 13]],
        "clearUniqueRewards": [
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 5, "혼돈의 돌" : 3 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 3, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "일리아칸",
        "RaidDifficulty": "hard",
        "RaidItemLevel": 1600,
        "clearGold": [1200, 2000, 2800],
        "clearReward": [[180, 360, 3100, 3, 150], [200, 400, 3100, 3, 200], [320, 640, 4600, 4, 400]],
        "additionalGold": [300, 500, 700],
        "additionalReward": [[160, 320, 3200, 8], [200, 400, 3200, 10], [290, 580, 4400, 15]],
        "clearUniqueRewards": [
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 19, "혼돈의 돌" : 3 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 13, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "일리아칸",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1580,
        "clearGold": [800, 1550, 2300],
        "clearReward": [[140, 280, 2700, 2, 150], [180, 360, 2700, 2, 200], [260, 520, 4200, 3, 400]],
        "additionalGold": [190, 230, 330],
        "additionalReward": [[140, 280, 3830, 6], [160, 320, 3880, 7], [230, 460, 4430 , 13]],
        "clearUniqueRewards": [
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 11, "혼돈의 돌" : 3 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 7, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "일리아칸",
        "RaidDifficulty": "single",
        "RaidItemLevel": 1580,
        "clearGold": [800, 1550, 2300],
        "clearReward": [[140, 280, 2700, 2, 150], [180, 360, 2700, 2, 200], [260, 520, 4200, 3, 400]],
        "additionalGold": [190, 230, 330],
        "additionalReward": [[140, 280, 3830, 6], [160, 320, 3880, 7], [230, 460, 4430 , 13]],
        "clearUniqueRewards": [
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 11, "혼돈의 돌" : 3 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 7, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "카양겔",
        "RaidDifficulty": "hard",
        "RaidItemLevel": 1580,
        "clearGold": [900, 1400, 2000],
        "clearReward": [[80, 160, 2500, 2, 100], [120, 240, 3500, 2, 150], [150, 300, 5000, 3, 200]],
        "additionalGold": [225, 350, 500],
        "additionalReward": [[70, 140, 1500, 3], [80, 160, 3400, 4], [110, 220, 5100, 6]],
        "clearUniqueRewards": [
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 5, "혼돈의 돌" : 5 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 농축 돌파석": 5, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "카양겔",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1540,
        "clearGold": [750, 1100, 1450],
        "clearReward": [[260, 520, 2100, 3, 100], [300, 600, 2500, 3, 150], [400, 800, 4100, 4, 200]],
        "additionalGold": [180, 200, 270],
        "additionalReward": [[210, 420, 3290, 10], [260, 520, 3310, 11], [310, 620, 4990, 15]],
        "clearUniqueRewards": [
            { "특수 재련 : 심화 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 심화 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 심화 돌파석": 15, "혼돈의 돌" : 4 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 심화 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 심화 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 심화 돌파석": 8, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "카양겔",
        "RaidDifficulty": "single",
        "RaidItemLevel": 1540,
        "clearGold": [750, 1100, 1450],
        "clearReward": [[260, 520, 2100, 3, 100], [300, 600, 2500, 3, 150], [400, 800, 4100, 4, 200]],
        "additionalGold": [180, 200, 270],
        "additionalReward": [[210, 420, 3290, 10], [260, 520, 3310, 11], [310, 620, 4990, 15]],
        "clearUniqueRewards": [
            { "특수 재련 : 심화 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 심화 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 심화 돌파석": 15, "혼돈의 돌" : 4 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 심화 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 심화 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 심화 돌파석": 8, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "아브렐슈드 1-2관문",
        "RaidDifficulty": "hard",
        "RaidItemLevel": 1540,
        "clearGold": [1200, 1200],
        "clearReward": [[280, 560, 2500, 3, 150], [320, 640, 2500, 3, 150]],
        "additionalGold": [300, 300],
        "additionalReward": [[260, 520, 3000, 12], [420, 840, 4000, 16]],
        "clearUniqueRewards": [
            { "특수 재련 : 심화 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 심화 돌파석": 0, "혼돈의 돌" : 0 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 심화 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 심화 돌파석": 0, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "아브렐슈드 1-2관문",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1490,
        "clearGold": [1000, 1000],
        "clearReward": [[120, 240, 1100, 2, 150], [120, 240, 1300, 2, 150]],
        "additionalGold": [100, 150],
        "additionalReward": [[120, 240, 3000, 8], [180, 360, 3000, 10]],
        "clearUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "아브렐슈드 1-2관문",
        "RaidDifficulty": "single",
        "RaidItemLevel": 1490,
        "clearGold": [1000, 1000],
        "clearReward": [[120, 240, 1100, 2, 150], [120, 240, 1300, 2, 150]],
        "additionalGold": [100, 150],
        "additionalReward": [[120, 240, 3000, 8], [180, 360, 3000, 10]],
        "clearUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "아브렐슈드 3관문",
        "RaidDifficulty": "hard",
        "RaidItemLevel": 1550,
        "clearGold": [1200],
        "clearReward": [[400, 800, 3000, 3, 150]],
        "additionalGold": [300],
        "additionalReward": [[640, 1280, 5200, 24]],
        "clearUniqueRewards": [
            { "특수 재련 : 심화 돌파석": 23, "혼돈의 돌" : 2 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 12, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "아브렐슈드 3관문",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1500,
        "clearGold": [1000],
        "clearReward": [[140, 280, 1600, 2, 150]],
        "additionalGold": [200],
        "additionalReward": [[300, 600, 4000, 16]],
        "clearUniqueRewards": [
            { "특수 재련 : 심화 돌파석": 18, "혼돈의 돌" : 1 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 16, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "아브렐슈드 3관문",
        "RaidDifficulty": "single",
        "RaidItemLevel": 1500,
        "clearGold": [1000],
        "clearReward": [[140, 280, 1600, 2, 150]],
        "additionalGold": [200],
        "additionalReward": [[300, 600, 4000, 16]],
        "clearUniqueRewards": [
            { "특수 재련 : 심화 돌파석": 18, "혼돈의 돌" : 1 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 16, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "아브렐슈드 4관문",
        "RaidDifficulty": "hard",
        "RaidItemLevel": 1560,
        "clearGold": [2000],
        "clearReward": [[800, 1600, 6000, 5, 250]],
        "additionalGold": [500],
        "additionalReward": [[1000, 2000, 10000, 40]],
        "clearUniqueRewards": [
            { "특수 재련 : 심화 돌파석": 46, "혼돈의 돌" : 5 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 24, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "아브렐슈드 4관문",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1520,
        "clearGold": [1600],
        "clearReward": [[420, 840, 3000, 4, 250]],
        "additionalGold": [375],
        "additionalReward": [[600, 1200, 7000, 28]],
        "clearUniqueRewards": [
            { "특수 재련 : 심화 돌파석": 36, "혼돈의 돌" : 3 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 20, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "아브렐슈드 4관문",
        "RaidDifficulty": "single",
        "RaidItemLevel": 1520,
        "clearGold": [1600],
        "clearReward": [[420, 840, 3000, 4, 250]],
        "additionalGold": [375],
        "additionalReward": [[600, 1200, 7000, 28]],
        "clearUniqueRewards": [
            { "특수 재련 : 심화 돌파석": 36, "혼돈의 돌" : 3 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 20, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "쿠크세이튼",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1475,
        "clearGold": [600, 900, 1500],
        "clearReward": [[240, 480, 1000, 5, 60], [240, 480, 1000, 5, 90], [280, 560, 1000, 5, 150]],
        "additionalGold": [100, 150, 200],
        "additionalReward": [[360, 720, 2200, 13], [480, 960, 2200, 13], [600, 1200, 2600, 16]],
        "clearUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }, 
            { "특수 재련 : 융합 돌파석": 16, "혼돈의 돌" : 1 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }, 
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 융합 돌파석": 12, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "쿠크세이튼",
        "RaidDifficulty": "single",
        "RaidItemLevel": 1475,
        "clearGold": [600, 900, 1500],
        "clearReward": [[240, 480, 1000, 5, 60], [240, 480, 1000, 5, 90], [280, 560, 1000, 5, 150]],
        "additionalGold": [100, 150, 200],
        "additionalReward": [[360, 720, 2200, 13], [480, 960, 2200, 13], [600, 1200, 2600, 16]],
        "clearUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }, 
            { "특수 재련 : 융합 돌파석": 16, "혼돈의 돌" : 1 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }, 
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 },
            { "특수 재련 : 융합 돌파석": 12, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "비아키스",
        "RaidDifficulty": "hard",
        "RaidItemLevel": 1460,
        "clearGold": [900, 1500],
        "clearReward": [[280, 560, 850, 7, 60], [340, 680, 1150, 7, 100]],
        "additionalGold": [225, 375],
        "additionalReward": [[450, 900, 1600, 12], [520, 1040, 2000, 12]],
        "clearUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }, 
            { "특수 재련 : 융합 돌파석": 16, "혼돈의 돌" : 1 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }, 
            { "특수 재련 : 융합 돌파석": 12, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "비아키스",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1430,
        "clearGold": [600, 1000],
        "clearReward": [[240, 480, 700, 6, 60], [280, 560, 1100, 6, 100]],
        "additionalGold": [100, 150],
        "additionalReward": [[340, 680, 800, 9], [420, 840, 1200, 10]],
        "clearUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }, 
            { "특수 재련 : 융합 돌파석": 8, "혼돈의 돌" : 1 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }, 
            { "특수 재련 : 융합 돌파석": 6, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "비아키스",
        "RaidDifficulty": "single",
        "RaidItemLevel": 1430,
        "clearGold": [600, 1000],
        "clearReward": [[240, 480, 700, 6, 60], [280, 560, 1100, 6, 100]],
        "additionalGold": [100, 150],
        "additionalReward": [[340, 680, 800, 9], [420, 840, 1200, 10]],
        "clearUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }, 
            { "특수 재련 : 융합 돌파석": 8, "혼돈의 돌" : 1 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }, 
            { "특수 재련 : 융합 돌파석": 6, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "발탄",
        "RaidDifficulty": "hard",
        "RaidItemLevel": 1445,
        "clearGold": [700, 1100],
        "clearReward": [[240, 480, 750, 6, 50], [290, 580, 1100, 6, 70]],
        "additionalGold": [175, 275],
        "additionalReward": [[360, 720, 1300, 10], [480, 960, 1600, 10]],
        "clearUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }, 
            { "특수 재련 : 융합 돌파석": 16, "혼돈의 돌" : 1 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }, 
            { "특수 재련 : 융합 돌파석": 12, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "발탄",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1415,
        "clearGold": [600, 1000],
        "clearReward": [[200, 400, 600, 5, 50], [240, 480, 900, 5, 70]],
        "additionalGold": [75, 100],
        "additionalReward": [[280, 560, 600, 7], [360, 720, 900, 8]],
        "clearUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }, 
            { "특수 재련 : 융합 돌파석": 8, "혼돈의 돌" : 1 }
        ],
        "additionalUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }, 
            { "특수 재련 : 융합 돌파석": 6, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "발탄",
        "RaidDifficulty": "single",
        "RaidItemLevel": 1415,
        "clearGold": [500, 700],
        "clearReward": [[200, 400, 600, 5, 50], [240, 480, 900, 5, 70]],
        "additionalGold": [75, 100],
        "additionalReward": [[280, 560, 600, 7], [360, 720, 900, 8]],
        "clearUniqueRewards": [
            { "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }, 
            { "특수 재련 : 융합 돌파석": 8, "혼돈의 돌" : 1 }
        ],
        "additionalUniqueRewards": [
            { "마수의 뼈": 1, "특수 재련 : 융합 돌파석": 0, "혼돈의 돌" : 0 }, 
            { "마수의 뼈": 2, "특수 재련 : 융합 돌파석": 6, "혼돈의 돌" : 0 }
        ]
    },
    {
        "RaidName": "아르고스",
        "RaidDifficulty": "normal",
        "RaidItemLevel": 1370,
        "clearGold": [300, 300, 400],
        "clearReward": [[100, 200, 300, 0, 0], [100, 200, 300, 0, 0], [150, 300, 400, 0, 0]],
        "additionalGold": [100, 150, 150],
        "additionalReward": [[60, 120, 520, 5], [90, 180, 680, 5], [120, 240, 720, 5]],
        "clearUniqueRewards": [
            { }, 
            { }, 
            { } 
        ],
        "additionalUniqueRewards": [
            { }, 
            { }, 
            { } 
        ]
    },
];

export default Raid;