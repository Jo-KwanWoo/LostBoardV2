/**
 * 2단계: 재사용 가능한 RaidCard 컴포넌트
 */

import React, { useState } from 'react';
import './RaidCard.css';

/**
 * 레거시 데이터 형태 처리 함수
 */
function processLegacyData(legacyArray) {
  if (!Array.isArray(legacyArray)) {
    return { summary: '데이터 없음', details: [] };
  }

  const firstItem = legacyArray[0] || '';
  const goldMatch = firstItem.match(/더보기 골드: (\d+)G/);
  const rewardMatch = firstItem.match(/더보기 보상 골드: ([\d.]+)/);

  const totalGold = goldMatch ? parseInt(goldMatch[1]) : 0;
  const totalReward = rewardMatch ? parseFloat(rewardMatch[1]) : 0;
  const efficiency = Math.round(totalReward - totalGold);

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
 * 새로운 데이터 구조 처리 함수
 */
function processNewData(structuredData, selectedDifficulty = null) {
  if (!structuredData || !structuredData.difficulties) {
    return { summary: '데이터 없음', details: [] };
  }

  const targetDifficulty = selectedDifficulty || structuredData.defaultDifficulty;
  const difficultyData = structuredData.difficulties[targetDifficulty];

  if (!difficultyData) {
    return { summary: '데이터 없음', details: [] };
  }

  const totalGold = difficultyData.gates.reduce((sum, gate) => sum + gate.goldCost, 0);
  const totalReward = difficultyData.gates.reduce((sum, gate) => sum + gate.totalMaterialPrice, 0);

  return {
    summary: {
      totalGold,
      totalReward,
      efficiency: difficultyData.overallEfficiency,
      gateCount: difficultyData.gates.length,
      difficulty: targetDifficulty,
      itemLevel: difficultyData.itemLevel
    },
    details: difficultyData.gates,
    availableDifficulties: structuredData.availableDifficulties
  };
}

/**
 * 보상 상세 모달 컴포넌트
 */
function RewardModal({ raidName, raidData, initialDifficulty, availableDifficulties, onClose }) {
  const [modalDifficulty, setModalDifficulty] = useState(initialDifficulty);

  const processedData = processNewData(raidData, modalDifficulty);
  const { summary, details: gates } = processedData;

  if (!gates || gates.length === 0) return null;

  return (
    <div className="reward-modal-overlay" onClick={onClose}>
      <div className="reward-modal" onClick={e => e.stopPropagation()}>
        {/* 모달 헤더 */}
        <div className="reward-modal__header">
          {/* 좌측 균형용 플레이스홀더 */}
          <button className="reward-modal__close reward-modal__close--placeholder" aria-hidden="true" tabIndex={-1}>✕</button>

          <div className="reward-modal__title-group">
            <h2 className="reward-modal__title">{raidName}</h2>
            <div className="reward-modal__meta">
              {summary.difficulty && (
                <span className={`difficulty-badge difficulty-badge--${summary.difficulty}`}>
                  {summary.difficulty.toUpperCase()}
                </span>
              )}
              {summary.itemLevel && (
                <span className="reward-modal__ilvl">Lv.{summary.itemLevel}</span>
              )}
            </div>
            {/* 난이도 선택 탭 */}
            {availableDifficulties && availableDifficulties.length > 1 && (
              <div className="reward-modal__difficulties">
                {availableDifficulties.map(diff => (
                  <button
                    key={diff}
                    className={`difficulty-tag difficulty-tag--clickable ${diff === modalDifficulty ? 'difficulty-tag--active' : ''}`}
                    onClick={() => setModalDifficulty(diff)}
                  >
                    {diff.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="reward-modal__close" onClick={onClose} aria-label="닫기">✕</button>
        </div>

        {/* 관문별 보상 */}
        <div className="reward-modal__body">
          {gates.map((gate, idx) => (
            <div key={idx} className="reward-gate-section">
              <div className="reward-gate-section__title">
                <span className="reward-gate-number">{gate.gate}관문</span>
              </div>

              {/* 클리어 보상 */}
              <div className="reward-block">
                <div className="reward-block__label reward-block__label--clear">클리어 보상</div>
                <div className="reward-block__gold">
                  <span className="reward-item-name">클리어 골드</span>
                  <span className="reward-item-value reward-item-value--gold">
                    +{gate.clearGold?.toLocaleString() || 0}G
                  </span>
                </div>
                <div className="reward-block__items">
                  {gate.clearMaterials && Object.values(gate.clearMaterials)
                    .filter(m => m.quantity > 0)
                    .map((material, i) => (
                      <div key={i} className="reward-item">
                        <span className="reward-item-name">{material.name}</span>
                        <span className="reward-item-qty">×{material.quantity.toLocaleString()}</span>
                        {material.price > 0 && (
                          <span className="reward-item-price">≈{material.price.toLocaleString()}G</span>
                        )}
                      </div>
                    ))
                  }
                  {gate.clearSpecialRewards && Object.values(gate.clearSpecialRewards)
                    .filter(r => r.quantity > 0)
                    .map((reward, i) => (
                      <div key={`cs-${i}`} className="reward-item reward-item--special">
                        <span className="reward-item-name">✦ {reward.name}</span>
                        <span className="reward-item-qty">×{reward.quantity.toLocaleString()}</span>
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* 더보기 보상 */}
              <div className="reward-block">
                <div className="reward-block__label reward-block__label--additional">더보기 보상</div>
                <div className="reward-block__gold">
                  <span className="reward-item-name">더보기 비용</span>
                  <span className="reward-item-value reward-item-value--cost">
                    -{gate.goldCost?.toLocaleString() || 0}G
                  </span>
                </div>
                <div className="reward-block__items">
                  {gate.materials && Object.values(gate.materials)
                    .filter(m => m.quantity > 0)
                    .map((material, i) => (
                      <div key={i} className="reward-item">
                        <span className="reward-item-name">{material.name}</span>
                        <span className="reward-item-qty">×{material.quantity.toLocaleString()}</span>
                        {material.price > 0 && (
                          <span className="reward-item-price">≈{material.price.toLocaleString()}G</span>
                        )}
                      </div>
                    ))
                  }
                  {gate.specialRewards && Object.values(gate.specialRewards)
                    .filter(r => r.quantity > 0)
                    .map((reward, i) => (
                      <div key={`s-${i}`} className="reward-item reward-item--special">
                        <span className="reward-item-name">✦ {reward.name}</span>
                        <span className="reward-item-qty">×{reward.quantity.toLocaleString()}</span>
                      </div>
                    ))
                  }
                </div>
                <div className="reward-block__efficiency">
                  <span className="reward-item-name">더보기 순이익</span>
                  <span className={`reward-item-value ${gate.efficiency >= 0 ? 'reward-item-value--positive' : 'reward-item-value--negative'}`}>
                    {gate.efficiency >= 0 ? '+' : ''}{gate.efficiency?.toLocaleString() || 0}G
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
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
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [showRewardModal, setShowRewardModal] = useState(false);

  const processedData = isNewStructure
    ? processNewData(raidData, selectedDifficulty)
    : processLegacyData(raidData);

  const { summary, details, availableDifficulties } = processedData;

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleDetailClick = () => {
    if (isNewStructure) {
      setShowRewardModal(true);
    } else if (onDetailClick) {
      onDetailClick(raidName, raidData);
    }
  };

  if (!raidData || (Array.isArray(raidData) && raidData.length === 0)) {
    return (
      <div className="raid-card raid-card--loading">
        <div className="raid-card__image-placeholder"></div>
        <div className="raid-card__title">{raidName}</div>
        <div className="raid-card__loading">데이터 로딩 중...</div>
      </div>
    );
  }

  if (summary === '데이터 없음') {
    return (
      <div className="raid-card raid-card--error">
        <img
          src={`${process.env.PUBLIC_URL}/Raid/${raidName}.jpg`}
          alt={raidName}
          className="raid-card__image"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="raid-card__title">{raidName}</div>
        <div className="raid-card__error">데이터를 불러올 수 없습니다</div>
      </div>
    );
  }

  return (
    <>
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
              <span className={`summary-value summary-value--efficiency ${
                summary.efficiency >= 0 ? 'summary-value--positive' : 'summary-value--negative'
              }`}>
                {summary.efficiency >= 0 ? '+' : ''}{summary.efficiency?.toLocaleString() || 0}G
              </span>
            </div>
          </div>

          {/* 상세 정보 */}
          <div className="raid-card__details">
            {isNewStructure ? (
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
              details.map((detail, index) => (
                <div key={index} className="legacy-detail">
                  {detail}
                </div>
              ))
            )}
          </div>
        </div>

        {/* 자세한 분석 버튼 */}
        <div className="raid-card__actions">
          <button
            className="btn btn--primary btn--small"
            onClick={handleDetailClick}
          >
            자세한 분석
          </button>
        </div>

        {/* 난이도 탭 */}
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

      {/* 보상 상세 모달 */}
      {showRewardModal && isNewStructure && (
        <RewardModal
          raidName={raidName}
          raidData={raidData}
          initialDifficulty={summary.difficulty}
          availableDifficulties={availableDifficulties}
          onClose={() => setShowRewardModal(false)}
        />
      )}
    </>
  );
}

export default RaidCard;
