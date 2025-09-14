import Raid from "./Data";

// 아이템 레벨별 재료 필터링
function filteringItem(raidItemLevel) {
    const rewards = {
        1640: { '운명의 파괴석': 0, '운명의 수호석': 0, '운명의 파편': 0, '운명의 돌파석': 0 },
        1580: { '정제된 파괴강석': 0, '정제된 수호강석': 0, '명예의 파편': 0, '찬란한 명예의 돌파석': 0 },
        1490: { '파괴강석': 0, '수호강석': 0, '명예의 파편': 0, '경이로운 명예의 돌파석': 0 },
        0: { '파괴석 결정': 0, '수호석 결정': 0, '명예의 파편': 0, '위대한 명예의 돌파석': 0 }
    };
    return Object.keys(rewards).reduce((acc, level) => (raidItemLevel >= level ? rewards[level] : acc), rewards[0]);
}

// 보상 가치 계산 함수
function calcPrice(item, itemData, number) {
    let keyItem = itemData.find(x => Object.keys(x)[0] === item) || {};
    let conversionRates = {
        '운명의 파괴석': 10, '운명의 수호석': 10, '정제된 파괴강석': 10, '정제된 수호강석': 10,
        '파괴강석': 10, '수호강석': 10, '파괴석 결정': 10, '수호석 결정': 10,
        '운명의 파편': 3000, '명예의 파편': 1500
    };
    number /= conversionRates[item] || 1;
    return parseFloat((keyItem[item] * number || 0).toPrecision(4));
}

// 특정 레이드의 추가 보상 계산
function calculateAdditionalReward(raid, itemData, reward) {
    return raid.additionalGold.map((gold, k) => {
        let additionalRewardPrice = Object.keys(reward).reduce(
            (sum, key) => sum + calcPrice(key, itemData, raid.additionalReward[k][Object.keys(reward).indexOf(key)]),
            0
        );
        return `${raid.RaidDifficulty} ${k + 1}관문 더보기 골드: ${gold}G 더보기 보상 골드: ${additionalRewardPrice}`;
    });
}

// 예외 처리 함수 난이도 순 정렬
function sortRaidResults(results) {
    const order = { 'hard': 1, 'normal': 2, 'single': 3 };

    return results.sort((a, b) => {
        const matchA = a.match(/(hard|normal|single) (\d+)관문/);
        const matchB = b.match(/(hard|normal|single) (\d+)관문/);

        // 정규식 매칭이 실패하면 기본값 설정
        if (!matchA || !matchB) return 0;

        const [_, diffA, gateA] = matchA;
        const [__, diffB, gateB] = matchB;

        // 난이도 우선 정렬
        if (order[diffA] !== order[diffB]) {
            return order[diffA] - order[diffB];
        }
        // 관문 숫자 정렬
        return Number(gateA) - Number(gateB);
    });
}

// 예외 처리 함수
/**
 * 에키드나의 경우 single, normal 난이도에서는 3티어 재료, hard 난이도에서는 4티어 재료를 지급하기에 예외 처리
 * 카멘의 경우 1-3관문은 single, normal, hard 난이도가 존재하지만, 4관문은 hard 난이도만 존재하기에 에외 처리
 * 아브렐슈드의 경우 관문 별 입장 레벨이 다르기 때문에 예외 처리
 */
function exceptionalHandling(raidName, itemData) {
    const specialRaids = {
        '에키드나': [{ level: 1640, diff: ['hard'] }, { level: 1620, diff: ['normal', 'single'] }],
        '카멘': [{ level: 1610, name: '카멘 1-3관문', diff: ['single', 'normal', 'hard'] }, { level: 1630, name: '카멘 4관문', diff: ['hard'], gate: 4 }],
        '아브렐슈드': [
            { level: 1490, name: '아브렐슈드 1-2관문', diff: ['single', 'normal'] },
            { level: 1500, name: '아브렐슈드 3관문', diff: ['single', 'normal'], gate: 3 },
            { level: 1520, name: '아브렐슈드 4관문', diff: ['single', 'normal'], gate: 4 },
            { level: 1540, name: '아브렐슈드 1-2관문', diff: ['hard'] },
            { level: 1550, name: '아브렐슈드 3관문', diff: ['hard'], gate: 3 },
            { level: 1560, name: '아브렐슈드 4관문', diff: ['hard'], gate: 4 }
        ]
    };

    let results = [];

    specialRaids[raidName].forEach(({ level, name = raidName, diff, gate }) => {
        let reward = filteringItem(level);
        let raidList = Raid.filter(x => x.RaidName === name && diff.includes(x.RaidDifficulty));

        raidList.forEach(raid => {
            calculateAdditionalReward(raid, itemData, reward).forEach(text => {
                if (gate) text = text.replace(/\d+관문/, `${gate}관문`);
                results.push(text);
            });
        });
    });

    return sortRaidResults(results); // 정렬 적용
}




// 메인 함수: 레이드 효율 계산
function calcEfficiency(raidList, itemData) {
    return raidList.map(raidName => {
        if (['에키드나', '카멘', '아브렐슈드'].includes(raidName)) return exceptionalHandling(raidName, itemData);
        
        let raids = Raid.filter(x => x.RaidName === raidName);
        let reward = filteringItem(raids[0]?.RaidItemLevel || 0);

        return raids.flatMap(raid => calculateAdditionalReward(raid, itemData, reward));
    });
}

export default calcEfficiency;
