/**
 * 새로운 데이터 구조 테스트 파일
 * 블로그용 Before/After 비교를 위한 테스트
 */

import { processAllRaidData } from './raidDataProcessor';

// 테스트용 가격 데이터 (실제 API 응답 형태)
const mockItemData = [
    { "운명의 파괴석": 15.5 },
    { "운명의 수호석": 8.2 },
    { "운명의 파편": 0.85 },
    { "운명의 돌파석": 125.0 }
];

// 테스트용 레이드 목록
const testRaidList = ['모르둠(3막)', '베히모스'];

/**
 * Before vs After 비교 함수
 */
export function compareDataStructures() {
    console.log('='.repeat(60));
    console.log('데이터 구조 개선 Before vs After 비교');
    console.log('='.repeat(60));

    // 새로운 구조 테스트
    const newStructure = processAllRaidData(testRaidList, mockItemData);
    
    console.log('\nAfter (새로운 구조):');
    console.log('구조화된 데이터:', JSON.stringify(newStructure[0], null, 2));

    // 사용 편의성 테스트
    const mordomData = newStructure[0];
    console.log('\n사용 편의성 테스트:');
    console.log(`레이드명: ${mordomData.raidName}`);
    console.log(`사용 가능한 난이도: ${mordomData.availableDifficulties.join(', ')}`);
    console.log(`기본 난이도: ${mordomData.defaultDifficulty}`);
    
    if (mordomData.difficulties.hard) {
        console.log(`하드 난이도 전체 효율성: ${mordomData.difficulties.hard.overallEfficiency}%`);
        console.log(`하드 난이도 1관문 골드: ${mordomData.difficulties.hard.gates[0].goldCost}G`);
        console.log(`하드 난이도 1관문 효율성: ${mordomData.difficulties.hard.gates[0].efficiency}%`);
    }

    return newStructure;
}

// 개발 환경에서만 실행
if (process.env.NODE_ENV === 'development') {
    // compareDataStructures();
}

export default compareDataStructures;