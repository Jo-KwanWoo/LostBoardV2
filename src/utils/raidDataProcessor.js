/**
 * 1단계: 개선된 레이드 데이터 처리 시스템
 * 
 * 기존 calcEfficiency.js의 문제점들을 해결:
 * 1. 구조화된 데이터 반환 (문자열 → 객체)
 * 2. 난이도별 명확한 구분
 * 3. 특수 보상 정보 포함
 * 4. 확장 가능한 구조
 */

import Raid from "../Data";

// 아이템 레벨별 재료 매핑 (기존과 동일하지만 더 명확한 구조)
const MATERIAL_MAPPING = {
    1640: { 
        destruction: '운명의 파괴석', 
        guardian: '운명의 수호석', 
        fragment: '운명의 파편', 
        breakthrough: '운명의 돌파석' 
    },
    1580: { 
        destruction: '정제된 파괴강석', 
        guardian: '정제된 수호강석', 
        fragment: '명예의 파편', 
        breakthrough: '찬란한 명예의 돌파석' 
    },
    1490: { 
        destruction: '파괴강석', 
        guardian: '수호강석', 
        fragment: '명예의 파편', 
        breakthrough: '경이로운 명예의 돌파석' 
    },
    0: { 
        destruction: '파괴석 결정', 
        guardian: '수호석 결정', 
        fragment: '명예의 파편', 
        breakthrough: '위대한 명예의 돌파석' 
    }
};

// 재료 변환 비율 (기존과 동일)
const CONVERSION_RATES = {
    '운명의 파괴석': 100, '운명의 수호석': 100, 
    '정제된 파괴강석': 100, '정제된 수호강석': 100,
    '파괴강석': 100, '수호강석': 100, 
    '파괴석 결정': 100, '수호석 결정': 100,
    '운명의 파편': 3000, '명예의 파편': 1500
};

/**
 * 핵심 개선: 아이템 레벨에 따른 재료 타입 결정
 * @param {number} raidItemLevel - 레이드 입장 레벨
 * @returns {Object} 해당 레벨의 재료 타입들
 */
function getMaterialTypes(raidItemLevel) {
    const levels = Object.keys(MATERIAL_MAPPING).map(Number).sort((a, b) => b - a);
    const targetLevel = levels.find(level => raidItemLevel >= level) || 0;
    return MATERIAL_MAPPING[targetLevel];
}

/**
 * 핵심 개선: 재료 가격 계산 (기존 로직 개선)
 * @param {string} materialName - 재료 이름
 * @param {Array} itemData - API에서 받은 가격 데이터
 * @param {number} quantity - 수량
 * @returns {number} 계산된 가격
 */
function calculateMaterialPrice(materialName, itemData, quantity) {
    if (!itemData || !Array.isArray(itemData)) return 0;
    
    const priceData = itemData.find(x => Object.keys(x)[0] === materialName);
    if (!priceData) return 0;
    
    const unitPrice = priceData[materialName] || 0;
    const conversionRate = CONVERSION_RATES[materialName] || 1;
    const convertedQuantity = quantity / conversionRate;
    
    return parseFloat((unitPrice * convertedQuantity).toPrecision(4));
}

/**
 * 핵심 개선: 관문별 상세 정보 구조화
 * @param {Object} raidData - 레이드 데이터
 * @param {Array} itemData - 가격 데이터
 * @param {Object} materialTypes - 재료 타입 매핑
 * @returns {Array} 관문별 구조화된 데이터
 */
function processGateDetails(raidData, itemData, materialTypes) {
    return raidData.additionalGold.map((goldCost, gateIndex) => {
        // 기본 재료 보상 계산
        const materials = {};
        const materialKeys = Object.keys(materialTypes);
        
        materialKeys.forEach((key, index) => {
            const materialName = materialTypes[key];
            const quantity = raidData.additionalReward[gateIndex][index] || 0;
            materials[key] = {
                name: materialName,
                quantity: quantity,
                price: calculateMaterialPrice(materialName, itemData, quantity)
            };
        });

        // 특수 보상 처리 (기존에 누락되었던 부분!)
        const specialRewards = {};
        const uniqueRewards = raidData.additionalUniqueRewards[gateIndex] || {};
        
        Object.entries(uniqueRewards).forEach(([itemName, quantity]) => {
            if (quantity > 0) {
                specialRewards[itemName] = {
                    name: itemName,
                    quantity: quantity,
                    // 특수 아이템은 가격 정보가 없으므로 0으로 설정
                    price: 0
                };
            }
        });

        // 총 재료 가격 계산
        const totalMaterialPrice = Object.values(materials).reduce(
            (sum, material) => sum + material.price, 0
        );

        return {
            gate: gateIndex + 1,
            goldCost: goldCost,
            materials: materials,
            specialRewards: specialRewards,
            totalMaterialPrice: totalMaterialPrice,
            efficiency: Math.round(totalMaterialPrice - goldCost) // 실제 골드 차이로 변경
        };
    });
}

/**
 * 핵심 개선: 난이도별 데이터 구조화
 * @param {string} raidName - 레이드 이름
 * @param {Array} itemData - 가격 데이터
 * @returns {Object} 구조화된 레이드 데이터
 */
function getStructuredRaidData(raidName, itemData) {
    // 해당 레이드의 모든 난이도 데이터 가져오기
    const raidVariants = Raid.filter(raid => 
        raid.RaidName === raidName || 
        raid.RaidName.includes(raidName) ||
        raidName.includes(raid.RaidName.split('(')[0])
    );

    if (raidVariants.length === 0) {
        return {
            raidName,
            difficulties: {},
            availableDifficulties: [],
            defaultDifficulty: null,
            error: '레이드 데이터를 찾을 수 없습니다.'
        };
    }

    // 난이도별로 그룹화
    const difficulties = {};
    const availableDifficulties = [];

    raidVariants.forEach(raidData => {
        const difficulty = raidData.RaidDifficulty;
        const materialTypes = getMaterialTypes(raidData.RaidItemLevel);
        
        difficulties[difficulty] = {
            itemLevel: raidData.RaidItemLevel,
            gates: processGateDetails(raidData, itemData, materialTypes),
            // 전체 효율성 계산 (모든 관문 평균)
            overallEfficiency: 0 // 나중에 계산
        };

        if (!availableDifficulties.includes(difficulty)) {
            availableDifficulties.push(difficulty);
        }
    });

    // 각 난이도별 전체 효율성 계산 (실제 골드 차이로)
    Object.keys(difficulties).forEach(difficulty => {
        const gates = difficulties[difficulty].gates;
        const totalGold = gates.reduce((sum, gate) => sum + gate.goldCost, 0);
        const totalMaterialValue = gates.reduce((sum, gate) => sum + gate.totalMaterialPrice, 0);
        
        difficulties[difficulty].overallEfficiency = Math.round(totalMaterialValue - totalGold);
    });

    // 기본 난이도 설정 (우선순위: hard > normal > single)
    const difficultyPriority = ['hard', 'normal', 'single'];
    const defaultDifficulty = difficultyPriority.find(diff => 
        availableDifficulties.includes(diff)
    ) || availableDifficulties[0];

    return {
        raidName,
        difficulties,
        availableDifficulties: availableDifficulties.sort((a, b) => {
            const order = { 'hard': 1, 'normal': 2, 'single': 3 };
            return (order[a] || 999) - (order[b] || 999);
        }),
        defaultDifficulty
    };
}

/**
 * 메인 함수: 모든 레이드 데이터 처리
 * @param {Array} raidList - 레이드 이름 목록
 * @param {Array} itemData - 가격 데이터
 * @returns {Array} 구조화된 레이드 데이터 배열
 */
export function processAllRaidData(raidList, itemData) {
    if (!itemData || !Array.isArray(itemData)) {
        return raidList.map(raidName => ({
            raidName,
            difficulties: {},
            availableDifficulties: [],
            defaultDifficulty: null,
            loading: true
        }));
    }

    return raidList.map(raidName => getStructuredRaidData(raidName, itemData));
}

/**
 * 유틸리티: 특정 레이드의 특정 난이도 데이터만 가져오기
 * @param {string} raidName - 레이드 이름
 * @param {string} difficulty - 난이도
 * @param {Array} itemData - 가격 데이터
 * @returns {Object} 해당 난이도의 상세 데이터
 */
export function getRaidDifficultyData(raidName, difficulty, itemData) {
    const structuredData = getStructuredRaidData(raidName, itemData);
    return structuredData.difficulties[difficulty] || null;
}

export default { processAllRaidData, getRaidDifficultyData };