/**
 * RaidGrid 컴포넌트
 * 레이드 카드들을 그리드 형태로 배치하는 레이아웃 컴포넌트
 */

import React from 'react';
import Grid from '@mui/material/Grid2';
import RaidCard from '../RaidCard/RaidCard';
import './RaidGrid.css';

/**
 * 메인 RaidGrid 컴포넌트
 */
function RaidGrid({
  raidList,
  raidDataArray,
  isNewStructure = false,
  onRaidDetailClick = null,
  loading = false,
  error = null
}) {

  // 로딩 상태 처리
  if (loading) {
    return (
      <div className="raid-grid raid-grid--loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">레이드 데이터를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="raid-grid raid-grid--error">
        <div className="error-container">
          <div className="error-icon">!</div>
          <div className="error-text">{error}</div>
          <button
            className="error-retry-btn"
            onClick={() => window.location.reload()}
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 데이터 검증
  if (!raidList || !Array.isArray(raidList) || raidList.length === 0) {
    return (
      <div className="raid-grid raid-grid--empty">
        <div className="empty-container">
          <div className="empty-icon">📊</div>
          <div className="empty-text">표시할 레이드 데이터가 없습니다</div>
        </div>
      </div>
    );
  }

  return (
    <div className="raid-grid">
      {/* 그리드 헤더 : 업데이트된 시간 표시) */}
      <div className="raid-grid__header">
        <div className="stat-item">
          <span className="stat-label">데이터 업데이트</span>
          <span className="stat-value">
            {new Date().toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>

      {/* 메인 그리드 */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        className="raid-grid__container"
      >
        {raidList.map((raidName, index) => (
          <Grid
            key={`${raidName}-${index}`}
            size={{ xs: 4, sm: 4, md: 4 }}
            className="raid-grid__item"
          >
            <RaidCard
              raidName={raidName}
              raidData={raidDataArray ? raidDataArray[index] : null}
              isNewStructure={isNewStructure}
              onDetailClick={onRaidDetailClick}
            />
          </Grid>
        ))}
      </Grid>
     
    </div>
  );
}

function calculateAverageEfficiency(raidDataArray, isNewStructure) {
  if (!Array.isArray(raidDataArray) || raidDataArray.length === 0) return 0;

  let totalEfficiency = 0;
  let validCount = 0;

  raidDataArray.forEach(raidData => {
    if (isNewStructure && raidData?.difficulties) {
      const defaultDiff = raidData.defaultDifficulty;
      const efficiency = raidData.difficulties[defaultDiff]?.overallEfficiency || 0;
      totalEfficiency += efficiency;
      validCount++;
    } else if (Array.isArray(raidData) && raidData.length > 0) {
      // 레거시 구조에서 순이익 계산
      const firstItem = raidData[0] || '';
      const goldMatch = firstItem.match(/더보기 골드: (\\d+)G/);
      const rewardMatch = firstItem.match(/더보기 보상 골드: ([\\d.]+)/);

      if (goldMatch && rewardMatch) {
        const gold = parseInt(goldMatch[1]);
        const reward = parseFloat(rewardMatch[1]);
        const efficiency = reward - gold;
        totalEfficiency += efficiency;
        validCount++;
      }
    }
  });

  return validCount > 0 ? Math.round(totalEfficiency / validCount) : 0;
}

/**
 * 유틸리티: 최고 순이익 찾기
 */
function findBestEfficiency(raidDataArray, isNewStructure) {
  if (!Array.isArray(raidDataArray) || raidDataArray.length === 0) return 0;

  let bestEfficiency = Number.NEGATIVE_INFINITY; // 음수도 고려

  raidDataArray.forEach(raidData => {
    if (isNewStructure && raidData?.difficulties) {
      const defaultDiff = raidData.defaultDifficulty;
      const efficiency = raidData.difficulties[defaultDiff]?.overallEfficiency || 0;
      bestEfficiency = Math.max(bestEfficiency, efficiency);
    } else if (Array.isArray(raidData) && raidData.length > 0) {
      // 레거시 구조에서 순이익 계산
      const firstItem = raidData[0] || '';
      const goldMatch = firstItem.match(/더보기 골드: (\\d+)G/);
      const rewardMatch = firstItem.match(/더보기 보상 골드: ([\\d.]+)/);

      if (goldMatch && rewardMatch) {
        const gold = parseInt(goldMatch[1]);
        const reward = parseFloat(rewardMatch[1]);
        const efficiency = reward - gold;
        bestEfficiency = Math.max(bestEfficiency, efficiency);
      }
    }
  });

  return bestEfficiency === Number.NEGATIVE_INFINITY ? 0 : Math.round(bestEfficiency);
}

export default RaidGrid;