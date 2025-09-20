import '../App.css'
import { useSelector } from 'react-redux';
import { 
  Container, 
  Typography, 
  Switch, 
  FormControlLabel, 
  Box,
  Fade
} from '@mui/material';
import instance from '../instance';
import { useEffect, useState } from 'react';
import Raid from '../Data';
import Material from '../Material';
import CharacterCard from '../components/CharacterCard';
import RaidItem from '../components/RaidItem';

function Board() {
  let state = useSelector((state) => state.characterName);
  let [characterData, setCharacterData] = useState([]);

  // 캐릭터 데이터 받아오기
  const getAPIData = async () => {
    try {
      const res = await instance({
        method: "get",
        url: `/characters/${state}/siblings`,
        data: {
          CharacterName: state,
        },
      });
      setCharacterData(res.data); // 데이터 상태 업데이트
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getAPIData();
  }, []);

  const itemLevelArr = [];

  // 필터링: ItemAvgLevel이 1370.00 이하인 객체 제거
  const filteredData = characterData.filter(item => {
    // item과 ItemAvgLevel이 존재하는지 확인
    if (!item || !item.ItemAvgLevel) return false;
    
    const itemLevel = parseFloat(item.ItemAvgLevel.replace(/,/g, ""));
    itemLevelArr.push(itemLevel); // itemLevel 값 저장
    return itemLevel >= 1370.00; // 1370.00 이상만 포함
  });

  // 정렬: ItemAvgLevel 기준으로 내림차순 정렬
  const sortedData = filteredData.sort((a, b) => {
    const aLevel = parseFloat(a.ItemAvgLevel.replace(/,/g, ""));
    const bLevel = parseFloat(b.ItemAvgLevel.replace(/,/g, ""));
    return bLevel - aLevel; // 내림차순
  });

  // itemLevelArr 내림차순 정렬
  itemLevelArr.sort(function (a, b) {
    return b - a;
  });

  const filterRaidByItemLevel = [];
  let filteredRaidName = [];

  // 아이템 레벨에 따른 입장 가능 레이드 필터링
  for (let i = 0; i < itemLevelArr.length; i++) {
    let filterRaid = Raid.filter(item => {
      const raidItemLevel = item.RaidItemLevel
      return raidItemLevel <= itemLevelArr[i];
    });
    filterRaidByItemLevel.push(filterRaid);
    let arr = []
    for (let j = 0; j < filterRaidByItemLevel[i].length; j++) {
      arr.push(filterRaidByItemLevel[i][j].RaidName)
    }
    arr = new Set(arr)
    arr = Array.from(arr)
    filteredRaidName.push(arr)
  }

  const [selectValues, setSelectValues] = useState({}); // select 값 관리
  const [tierMaterialSwitch, setTierMaterialSwitch] = useState(true); // 티어별 재료 보기 스위치 관리
  const [raidAndDiff, setRaidAndDiff] = useState({}); // raidName : difficulty 상태 관리
  const [goldCheckboxes, setGoldCheckboxes] = useState(() =>
    sortedData.reduce((acc, _, characterIndex) => {
      acc[characterIndex] = {}; // 초기값을 빈 객체로 설정
      return acc;
    }, {})
  ); // 골드 체크박스 상태 관리
  const [checkedValues, setCheckedValues] = useState(() =>
    sortedData.reduce((acc, _, characterIndex) => {
      acc[characterIndex] = filteredRaidName[characterIndex].reduce((raidAcc, _, raidIndex) => {
        raidAcc[raidIndex] = false;
        return raidAcc;
      }, {});
      return acc;
    }, {})
  ); // 레이드 클리어 체크박스 상태 관리
  const [additionalCheckedValues, setAdditionalCheckedValues] = useState(() =>
    sortedData.reduce((acc, _, characterIndex) => {
      acc[characterIndex] = filteredRaidName[characterIndex].reduce((raidAcc, _, raidIndex) => {
        raidAcc[raidIndex] = false;
        return raidAcc;
      }, {});
      return acc;
    }, {})
  ); // 더보기 체크박스 상태 관리
  const [showAll, setShowAll] = useState(() =>
    sortedData.reduce((acc, _, characterIndex) => {
      acc[characterIndex] = false; // 각 캐릭터의 초기 상태는 '접어두기'
      return acc;
    }, {})
  ); // 레이드 전체 보기 / 축소 보기 상태 관리
  const groupMapping = {
    "카멘": ["카멘 1-3관문", "카멘 4관문"],
    "아브렐슈드": ["아브렐슈드 1-2관문", "아브렐슈드 3관문", "아브렐슈드 4관문"],
  }; // 특수 레이드 그룹(카멘, 아브렐슈드) 관리

  // 첫 번째 값 가져오기
  const getDefaultDifficulty = (raidName, characterIndex, raidIndex) => {
    let num = filterRaidByItemLevel[characterIndex].findIndex((x) => x.RaidName === raidName)
    const difficulties = filterRaidByItemLevel[characterIndex][num].RaidDifficulty || [];
    return difficulties || ''; // 첫 번째 값 또는 빈 문자열 반환
  };

  // select 값 변경 핸들러
  const handleSelectChange = (e, characterIndex, raidIndex) => {
    const newValue = e.target.value;
    setSelectValues((prev) => ({
      ...prev,
      [`${characterIndex}-${raidIndex}`]: newValue, // 고유 키로 상태 저장
    }));
  };

  // 티어별 재료 보기 스위치 핸들러
  const handleTierMaterialSwitch = (event) => {
    setTierMaterialSwitch(event.target.checked)
  }
  // 체크박스 함수 통합 핸들러
  const handleCheckboxChangeGeneric = (e, characterIndex, raidIndex, stateSetter) => {
    const isChecked = e.target.checked;

    const raidName = filteredRaidName[characterIndex][raidIndex];
    const difficulty =
      selectValues[`${characterIndex}-${raidIndex}`] ||
      getDefaultDifficulty(raidName, characterIndex, raidIndex);

    stateSetter((prevState) => {
      const updatedCheckedValues = {
        ...prevState,
        [characterIndex]: {
          ...prevState[characterIndex],
          [raidIndex]: isChecked,
        },
      };

      // `raidAndDiff` 업데이트
      setRaidAndDiff({ [raidName]: difficulty });

      return updatedCheckedValues;
    });

  };

  // 레이드 클리어 체크박스 함수
  const handleCheckboxChange = (e, characterIndex, raidIndex) => {
    handleCheckboxChangeGeneric(e, characterIndex, raidIndex, setCheckedValues);
    if(countSelectedCheckboxes(characterIndex) < 3 && e.target.checked === true){ // 레이드 골드 자동 선택. 골드 체크 개수가 3개 이상일 경우 실행 x
      handleGoldCheckboxChange(e, characterIndex, raidIndex);
    }else if(e.target.checked === false){
      handleGoldCheckboxChange(e, characterIndex, raidIndex);
      handleAdditionalCheckboxChange(e, characterIndex, raidIndex)
    }
  };

  // 골드 체크박스 함수
  const handleGoldCheckboxChange = (e, characterIndex, raidIndex) => {
    handleCheckboxChangeGeneric(e, characterIndex, raidIndex, setGoldCheckboxes);
  };

  // 더보기 체크박스 함수
  const handleAdditionalCheckboxChange = (e, characterIndex, raidIndex) =>{
    handleCheckboxChangeGeneric(e, characterIndex, raidIndex, setAdditionalCheckedValues)
  }

  // 골드 체크박스 관리 함수
  const countSelectedCheckboxes = (characterIndex) => {
    const characterCheckboxes = goldCheckboxes[characterIndex] || {};

    // 그룹 선택 개수 계산
    const groupSelectedCount = Object.keys(groupMapping).reduce((count, groupName) => {
      const group = groupMapping[groupName];
      const isGroupSelected = group.some(
        (raidName) =>
          goldCheckboxes[characterIndex]?.[filteredRaidName[characterIndex].indexOf(raidName)]
      );
      return count + (isGroupSelected ? 1 : 0);
    }, 0);

    // 그룹 외 개별 선택 개수 계산
    const individualSelectedCount = Object.entries(characterCheckboxes)
      .filter(([raidIndex, isChecked]) => {
        const raidName = filteredRaidName[characterIndex][raidIndex];
        const isPartOfGroup = Object.values(groupMapping).some((group) =>
          group.includes(raidName)
        );
        return isChecked && !isPartOfGroup;
      })
      .length;

    return groupSelectedCount + individualSelectedCount;
  };

  // 로딩 상태 처리
  if (characterData.length === 0) {
    return (
      <div className='content'>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div>캐릭터 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  // 필터링된 데이터가 없는 경우
  if (filteredData.length === 0) {
    return (
      <div className='content'>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div>1370 이상의 캐릭터가 없습니다.</div>
        </div>
      </div>
    );
  }

  // 난이도 옵션 가져오기
  const getDifficultyOptions = (raidName, characterIndex) => {
    if (!filterRaidByItemLevel[characterIndex]) return [];
    
    // 해당 레이드의 모든 난이도 옵션들을 찾기
    const raidOptions = filterRaidByItemLevel[characterIndex]
      .filter(raid => raid.RaidName === raidName)
      .map(raid => raid.RaidDifficulty);
    
    // 중복 제거하고 정렬 (hard, normal, single 순서)
    const uniqueDifficulties = [...new Set(raidOptions)];
    const sortOrder = { 'hard': 1, 'normal': 2, 'single': 3 };
    
    return uniqueDifficulties.sort((a, b) => (sortOrder[a] || 999) - (sortOrder[b] || 999));
  };

  return (
    <div className='content'>
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* 헤더 영역 */}
        <Box sx={{ marginBottom: '32px', textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'var(--text-primary)', 
              fontWeight: 'bold',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, var(--primary-gold), var(--primary-gold-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            레이드 현황판
          </Typography>
          
          <FormControlLabel 
            control={
              <Switch 
                checked={tierMaterialSwitch}
                onChange={handleTierMaterialSwitch}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: 'var(--primary-gold)',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'var(--primary-gold)',
                  },
                }}
              />
            } 
            label={
              <Typography sx={{ color: 'var(--text-secondary)' }}>
                티어에 맞는 재료 보기
              </Typography>
            }
          />
        </Box>

        {/* 캐릭터 목록 */}
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '20px',
            justifyItems: 'center',
            alignItems: 'start',
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            '@media (max-width: 1400px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
              maxWidth: '900px',
            },
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
              maxWidth: '500px',
            }
          }}
        >
          {sortedData.map((characterInfo, characterIndex) => (
            <Fade in={true} timeout={300 + characterIndex * 100} key={characterIndex}>
              <Box>
                <CharacterCard 
                  characterInfo={characterInfo} 
                  characterIndex={characterIndex}
                >
                {/* 레이드 목록 */}
                <Box sx={{ marginBottom: '20px' }}>
                  {filteredRaidName[characterIndex]
                    ?.slice(0, showAll[characterIndex] ? filteredRaidName[characterIndex].length : 5)
                    .map((raidName, raidIndex) => {
                      const groupName = Object.keys(groupMapping).find((group) =>
                        groupMapping[group].includes(raidName)
                      );

                      const isGroupSelected = groupName
                        ? groupMapping[groupName].some((name) =>
                            goldCheckboxes[characterIndex]?.[
                              filteredRaidName[characterIndex].indexOf(name)
                            ]
                          )
                        : false;

                      const selectedCount = countSelectedCheckboxes(characterIndex);
                      const isGoldDisabled = 
                        !goldCheckboxes[characterIndex]?.[raidIndex] &&
                        !isGroupSelected &&
                        selectedCount >= 3;

                      const isAdditionalDisabled = !checkedValues[characterIndex]?.[raidIndex];

                      return (
                        <RaidItem
                          key={raidIndex}
                          raidName={raidName}
                          isChecked={checkedValues[characterIndex]?.[raidIndex] || false}
                          isGoldSelected={goldCheckboxes[characterIndex]?.[raidIndex] || false}
                          isAdditionalSelected={additionalCheckedValues[characterIndex]?.[raidIndex] || false}
                          isGoldDisabled={isGoldDisabled}
                          isAdditionalDisabled={isAdditionalDisabled}
                          difficulty={selectValues[`${characterIndex}-${raidIndex}`] || getDifficultyOptions(raidName, characterIndex)[0]}
                          difficulties={getDifficultyOptions(raidName, characterIndex)}
                          onRaidToggle={(e) => handleCheckboxChange(e, characterIndex, raidIndex)}
                          onGoldToggle={(e) => handleGoldCheckboxChange(e, characterIndex, raidIndex)}
                          onAdditionalToggle={(e) => handleAdditionalCheckboxChange(e, characterIndex, raidIndex)}
                          onDifficultyChange={(e) => handleSelectChange(e, characterIndex, raidIndex)}
                        />
                      );
                    })}
                </Box>

                {/* 더보기/접어두기 버튼 */}
                {filteredRaidName[characterIndex]?.length > 5 && (
                  <Box sx={{ textAlign: 'center', marginTop: '12px' }}>
                    <button
                      onClick={() =>
                        setShowAll((prev) => ({
                          ...prev,
                          [characterIndex]: !prev[characterIndex],
                        }))
                      }
                      style={{
                        padding: '8px 16px',
                        background: 'linear-gradient(135deg, var(--primary-gold), var(--primary-gold-dark))',
                        color: 'var(--bg-primary)',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {showAll[characterIndex] ? "접어두기" : "더보기"}
                    </button>
                  </Box>
                )}

                {/* 재료 정보 */}
                <Box sx={{ 
                  marginTop: '16px', 
                  padding: '16px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)'
                }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'var(--primary-gold)', 
                      marginBottom: '12px',
                      fontWeight: 'bold',
                      fontSize: '1rem'
                    }}
                  >
                    획득 재료
                  </Typography>
                  <Material
                    characterInfo={characterInfo}
                    checkedValues={checkedValues[characterIndex] || {}}
                    characterIndex={characterIndex}
                    raidAndDiff={raidAndDiff}
                    goldCheckboxes={goldCheckboxes[characterIndex] || {}}
                    additionalCheckedValues={additionalCheckedValues[characterIndex] || {}}
                    filteredRaidName={filteredRaidName}
                    tierMaterialSwitch={tierMaterialSwitch}
                  />
                </Box>
              </CharacterCard>
              </Box>
            </Fade>
          ))}
        </Box>
      </Container>
    </div>
  )
}

export default Board;