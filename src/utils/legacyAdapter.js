/**
 * 🔄 레거시 호환성 어댑터
 * 기존 컴포넌트들이 새로운 데이터 구조를 사용할 수 있도록 변환
 */

import { processAllRaidData } from './raidDataProcessor';

/**
 * 🎯 새로운 구조 → 기존 구조 변환 (임시 호환성용)
 * @param {Array} raidList - 레이드 목록
 * @param {Array} itemData - 가격 데이터
 * @returns {Array} 기존 형태의 문자열 배열
 */
export function convertToLegacyFormat(raidList, itemData) {
    const newData = processAllRaidData(raidList, itemData);
    
    return newData.map(raidData => {
        if (raidData.loading) {
            return ['데이터 로딩 중...'];
        }

        const results = [];
        
        // 각 난이도별로 처리
        raidData.availableDifficulties.forEach(difficulty => {
            const diffData = raidData.difficulties[difficulty];
            
            diffData.gates.forEach(gate => {
                const text = `${difficulty} ${gate.gate}관문 더보기 골드: ${gate.goldCost}G 더보기 보상 골드: ${gate.totalMaterialPrice}`;
                results.push(text);
            });
        });

        return results;
    });
}

/**
 * 🎯 점진적 마이그레이션을 위한 하이브리드 함수
 * 기존 calcEfficiency 함수를 대체하면서 새로운 기능도 제공
 */
export function hybridCalcEfficiency(raidList, itemData, useNewFormat = false) {
    if (useNewFormat) {
        return processAllRaidData(raidList, itemData);
    } else {
        return convertToLegacyFormat(raidList, itemData);
    }
}

export default { convertToLegacyFormat, hybridCalcEfficiency };