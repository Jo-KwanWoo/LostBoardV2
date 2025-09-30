import calcEfficiency from '../calcEfficiency';
// 🧪 새로운 데이터 구조 테스트용 임포트
import { hybridCalcEfficiency } from '../utils/legacyAdapter';
// 🎯 2단계: 새로운 컴포넌트 임포트
import RaidGrid from '../components/RaidGrid/RaidGrid';

function Tier3(props) {
  const raidList = ['카멘', '혼돈의 상아탑', '일리아칸',
    '카양겔', '아브렐슈드', '쿠크세이튼', '비아키스', '발탄', '아르고스'];
  
  // 🧪 새로운 데이터 구조 테스트 (3티어는 아직 기존 구조 사용)
  const useNewStructure = process.env.NODE_ENV === 'development' && true; // 3티어는 아직 false
  
  let raidDataArray = useNewStructure 
    ? hybridCalcEfficiency(raidList, props.itemData, true)
    : calcEfficiency(raidList, props.itemData);

  // 🎯 상세 정보 클릭 핸들러
  const handleRaidDetailClick = (raidName, raidData) => {
    console.log(`${raidName} 상세 정보:`, raidData);
    // TODO: 3단계에서 모달 또는 상세 페이지로 이동
  };

  return (
    <div className="tier3-container">
      {/* 🎨 페이지 헤더 */}
      <div className="tier-header">
        <h2 className="tier-title">3티어 레이드 더보기 효율</h2>
      </div>

      {/* 🎯 새로운 RaidGrid 컴포넌트 사용 */}
      <RaidGrid
        raidList={raidList}
        raidDataArray={raidDataArray}
        isNewStructure={useNewStructure}
        onRaidDetailClick={handleRaidDetailClick}
        loading={!props.itemData}
        error={props.error || null}
      />
    </div>
  )
}

export default Tier3;
