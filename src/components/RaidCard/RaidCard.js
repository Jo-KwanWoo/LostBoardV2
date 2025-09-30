/**
 * 2단계: 재사용 가능한 RaidCard 컴포넌트
 * 
 * 기존 Tier4.js, Tier3.js의 중복 코드를 해결하고
 * 새로운 데이터 구조를 활용할 수 있는 컴포넌트
 */

import React, { useState } from 'react';
import './RaidCard.css';

/**
 * 레거시 데이터 형태 처리 함수
 * 기존 문자열 배열을 임시로 처리하기 위한 함수
 */
function processLegacyData(legacyArray) {
  if (!Array.isArray(legacyArray)) {
    return { summary: '데이터 없음', details: [] };
  }

  // 기본 정보 추출 (첫 번째 항목에서)
  const firstItem = legacyArray[0] || '';
  const goldMatch = firstItem.match(/더보기 골드: (\d+)G/);
  const rewardMatch = firstItem.match(/더보기 보상 골드: ([\d.]+)/);

  const totalGold = goldMatch ? parseInt(goldMatch[1]) : 0;
  const totalReward = rewardMatch ? parseFloat(rewardMatch[1]) : 0;
  const efficiency = Math.round(totalReward - totalGold); // 실제 골드 차이로 변경

  return {
    summary: {
      totalGold,
      totalReward,
      efficiency: efficiency,
      gateCount: legacyArray.length
    },
    details: legacyArray
  };
}

/**
 * 새로운 데이터 구조 처리 함수 (특정 난이도용)
 * 1단계에서 만든 구조화된 데이터를 처리
 */
function processNewData(structuredData, selectedDifficulty = null) {
  if (!structuredData || !structuredData.difficulties) {
    return { summary: '데이터 없음', details: [] };
  }

  // 선택된 난이도가 있으면 사용, 없으면 기본 난이도 사용
  const targetDifficulty = selectedDifficulty || structuredData.defaultDifficulty;
  const difficultyData = structuredData.difficulties[targetDifficulty];

  if (!difficultyData) {
    return { summary: '데이터 없음', details: [] };
  }

  // 요약 정보 계산
  const totalGold = difficultyData.gates.reduce((sum, gate) => sum + gate.goldCost, 0);
  const totalReward = difficultyData.gates.reduce((sum, gate) => sum + gate.totalMaterialPrice, 0);

  return {
    summary: {
      totalGold,
      totalReward,
      efficiency: difficultyData.overallEfficiency, // 이미 골드 차이로 계산됨
      gateCount: difficultyData.gates.length,
      difficulty: targetDifficulty,
      itemLevel: difficultyData.itemLevel
    },
    details: difficultyData.gates,
    availableDifficulties: structuredData.availableDifficulties
  };
}

/**
 * 메인 RaidCard 컴포넌트
 */
function RaidCard({
  raidName,
  raidData,
  isNewStructure = false,
  onDetailClick = null
}) {
  // 상세 정보를 기본으로 표시 (토글 기능 제거)
  // 난이도 변경을 위한 상태 추가
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  // 데이터 처리 (구조에 따라 다른 처리)
  const processedData = isNewStructure
    ? processNewData(raidData, selectedDifficulty)
    : processLegacyData(raidData);

  const { summary, details, availableDifficulties } = processedData;

  // 난이도 변경 핸들러
  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    console.log(`${raidName} 난이도 변경: ${summary.difficulty} → ${difficulty}`);

    // 변경된 데이터 미리보기
    const newData = processNewData(raidData, difficulty);
    console.log(`순이익 변화: ${summary.efficiency}G → ${newData.summary.efficiency}G`);
  };

  // 로딩 상태 처리
  if (!raidData || (Array.isArray(raidData) && raidData.length === 0)) {
    return (
      <div className="raid-card raid-card--loading">
        <div className="raid-card__image-placeholder"></div>
        <div className="raid-card__title">{raidName}</div>
        <div className="raid-card__loading">데이터 로딩 중...</div>
      </div>
    );
  }

  // 에러 상태 처리
  if (summary === '데이터 없음') {
    return (
      <div className="raid-card raid-card--error">
        <img
          src={`${process.env.PUBLIC_URL}/Raid/${raidName}.jpg`}
          alt={raidName}
          className="raid-card__image"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="raid-card__title">{raidName}</div>
        <div className="raid-card__error">데이터를 불러올 수 없습니다</div>
      </div>
    );
  }

  return (
    <div className="raid-card">
      {/* 카드 헤더 */}
      <div className="raid-card__header">
        <img
          src={`${process.env.PUBLIC_URL}/Raid/${raidName}.jpg`}
          alt={raidName}
          className="raid-card__image"
          onError={(e) => {
            e.target.src = `${process.env.PUBLIC_URL}/Raid/default.jpg`;
          }}
        />
        <div className="raid-card__title">{raidName}</div>

        {/* 새로운 구조에서는 난이도 정보 표시 */}
        {isNewStructure && summary.difficulty && (
          <div className="raid-card__difficulty">
            <span className={`difficulty-badge difficulty-badge--${summary.difficulty}`}>
              {summary.difficulty.toUpperCase()}
            </span>
            {summary.itemLevel && (
              <span className="item-level">Lv.{summary.itemLevel}</span>
            )}
          </div>
        )}
      </div>

      {/* 카드 내용 */}
      <div className="raid-card__content">
        {/* 요약 정보 */}
        <div className="raid-card__summary">
          <div className="summary-item">
            <span className="summary-label">총 골드</span>
            <span className="summary-value summary-value--gold">
              {summary.totalGold?.toLocaleString() || 0}G
            </span>
          </div>

          <div className="summary-item">
            <span className="summary-label">보상 가치</span>
            <span className="summary-value summary-value--reward">
              {summary.totalReward?.toLocaleString() || 0}G
            </span>
          </div>

          <div className="summary-item summary-item--highlight">
            <span className={`summary-value summary-value--efficiency ${summary.efficiency >= 0 ? 'summary-value--positive' : 'summary-value--negative'
              }`}>
              {summary.efficiency >= 0 ? '+' : ''}{summary.efficiency?.toLocaleString() || 0}G
            </span>
          </div>
        </div>

        {/* 상세 정보 (항상 표시) */}
        <div className="raid-card__details">
          {isNewStructure ? (
            // 새로운 구조의 상세 정보
            details.map((gate, index) => (
              <div key={index} className="gate-detail">
                <div className="gate-detail__header">
                  <span className="gate-number">{gate.gate}관문</span>
                  <span className={`gate-efficiency ${gate.efficiency >= 0 ? 'gate-efficiency--positive' : 'gate-efficiency--negative'}`}>
                    {gate.efficiency >= 0 ? '+' : ''}{gate.efficiency.toLocaleString()}G
                  </span>
                </div>
                <div className="gate-detail__content">
                  <span>골드: {gate.goldCost.toLocaleString()}G</span>
                  <span>보상: {gate.totalMaterialPrice.toLocaleString()}G</span>
                </div>
              </div>
            ))
          ) : (
            // 기존 구조의 상세 정보
            details.map((detail, index) => (
              <div key={index} className="legacy-detail">
                {detail}
              </div>
            ))
          )}
        </div>
      </div>

      {/* 카드 액션 (자세한 분석 버튼만 유지) */}
      {onDetailClick && (
        <div className="raid-card__actions">
          <button
            className="btn btn--primary btn--small"
            onClick={() => onDetailClick(raidName, raidData)}
          >
            자세한 분석
          </button>
        </div>
      )}

      {/* 새로운 구조에서는 클릭 가능한 난이도 탭 표시 */}
      {isNewStructure && availableDifficulties && availableDifficulties.length >= 1 && (
        <div className="raid-card__difficulties">
          <span className="difficulties-label">난이도 선택:</span>
          <div className="difficulties-list">
            {availableDifficulties.map(diff => (
              <button
                key={diff}
                className={`difficulty-tag difficulty-tag--clickable ${diff === summary.difficulty ? 'difficulty-tag--active' : ''}`}
                onClick={() => handleDifficultyChange(diff)}
                title={`${diff} 난이도로 변경`}
              >
                {diff.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RaidCard;