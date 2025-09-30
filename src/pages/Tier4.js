import calcEfficiency from '../calcEfficiency';
// 🧪 새로운 데이터 구조 테스트용 임포트
import { hybridCalcEfficiency } from '../utils/legacyAdapter';
// 🎯 2단계: 새로운 컴포넌트 임포트
import RaidGrid from '../components/RaidGrid/RaidGrid';

function Tier4(props) {
  const raidList = ['카제로스(종막)', '아르모체(4막)', '모르둠(3막)', '아브렐슈드(2막)', '에기르(1막)', '베히모스', '에키드나(서막)'];

  // 🧪 새로운 데이터 구조 테스트 (2단계에서 활성화)
  const useNewStructure = process.env.NODE_ENV === 'development' && true; // 2단계 테스트용

  let raidDataArray = useNewStructure
    ? hybridCalcEfficiency(raidList, props.itemData, true)
    : calcEfficiency(raidList, props.itemData);

  // 🔧 새로운 구조 데이터 콘솔 출력 (개발용)
  if (useNewStructure && props.itemData) {
    console.log('🎯 2단계 - 새로운 컴포넌트 구조:', raidDataArray[0]);
  }

  // 🎯 상세 정보 클릭 핸들러
  const handleRaidDetailClick = (raidName, raidData) => {
    console.log(`${raidName} 상세 정보:`, raidData);
    // TODO: 3단계에서 모달 또는 상세 페이지로 이동
  };

  return (
    <div className="tier4-container">
      {/* 🎨 페이지 헤더 */}
      <div className="tier-header">
        <h2 className="tier-title">4티어 레이드 더보기 효율</h2>
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
export default Tier4