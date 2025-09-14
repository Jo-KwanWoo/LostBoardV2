import '../App.css'
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid2';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import instance from '../instance';
import { useEffect, useState, useMemo } from 'react';
import Raid from '../Data';
import DifficultySelect from '../DifficultySelect';
import Material from '../Material';

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

  return (
    <div className='content'>
      <FormControlLabel control={<Switch defaultChecked checked={tierMaterialSwitch}
      onChange={handleTierMaterialSwitch}/>} 
      label="티어에 맞는 재료 보기"/>
      {
        sortedData.map((characterInfo, characterIndex) => (
          <Grid container spacing={3} key={characterIndex}>
            <Grid size="grow">
              <img src={`${process.env.PUBLIC_URL}/class_logo/${characterInfo.CharacterClassName}.png`}
                width="30%" alt={characterInfo.CharacterClassName} />
              <p>{characterInfo.CharacterClassName}</p>
              <p>{characterInfo.CharacterName}</p>
              <p>{characterInfo.ItemMaxLevel}</p>
            </Grid>
            <Grid size="grow" marginBottom='80px'>
              {
                filteredRaidName[characterIndex]
                  .slice(0, showAll[characterIndex] ? filteredRaidName[characterIndex].length : 5)
                  .map((raidName, raidIndex) => {
                    const groupName = Object.keys(groupMapping).find((group) =>
                      groupMapping[group].includes(raidName)
                    );

                    // 현재 그룹 내 체크박스 중 하나라도 선택되었는지 확인
                    const isGroupSelected = groupName
                      ? groupMapping[groupName].some((name) =>
                        goldCheckboxes[characterIndex]?.[
                        filteredRaidName[characterIndex].indexOf(name)
                        ]
                      )
                      : false;

                    // 선택된 체크박스 개수 계산
                    const selectedCount = countSelectedCheckboxes(characterIndex);

                    // 체크박스 비활성화 조건
                    const isDisabled =
                      !goldCheckboxes[characterIndex]?.[raidIndex] &&
                      !isGroupSelected &&
                      selectedCount >= 3;


                    // "더보기" 체크박스 활성화 조건
                    const isAdditionalCheckboxDisabled =
                      !checkedValues[characterIndex]?.[raidIndex];


                    return (
                      <div
                        key={raidIndex}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <Checkbox
                          checked={checkedValues[characterIndex]?.[raidIndex] || false}
                          onChange={(e) =>
                            handleCheckboxChange(e, characterIndex, raidIndex)
                          }
                        />
                        <span>{raidName}</span>
                        <select
                          name="difficulty"
                          label="난이도"
                          onChange={(e) =>
                            handleSelectChange(e, characterIndex, raidIndex)
                          }
                        >
                          <DifficultySelect
                            raidName={raidName}
                            filterRaidByItemLevel={filterRaidByItemLevel}
                            characterIndex={characterIndex}
                            raidIndex={raidIndex}
                          />
                        </select>
                        <img src={`${process.env.PUBLIC_URL}/items/Gold.webp`}
                          width="5%" alt={characterInfo.CharacterClassName} />
                        <Checkbox
                          checked={goldCheckboxes[characterIndex]?.[raidIndex] || false}
                          onChange={(e) =>
                            handleGoldCheckboxChange(e, characterIndex, raidIndex)
                          }
                          disabled={isDisabled} // 선택 제한 조건 적용
                        />
                        <span>더보기</span>
                        <Checkbox
                          checked={additionalCheckedValues[characterIndex]?.[raidIndex] || false} // "더보기" 체크박스 초기값 설정 (필요시 상태로 관리 가능)
                          onChange={(e) => handleAdditionalCheckboxChange(e, characterIndex, raidIndex)} // "더보기" 체크박스의 핸들러
                          disabled={isAdditionalCheckboxDisabled} // checkedValues가 선택되어야 활성화
                        />
                        
                      </div>
                    );
                  })
              }

              {/* "더보기/접어두기" 버튼 */}
              {filteredRaidName[characterIndex].length > 6 && (
                <button
                  onClick={() =>
                    setShowAll((prev) => ({
                      ...prev,
                      [characterIndex]: !prev[characterIndex], // 특정 캐릭터 상태 토글
                    }))
                  }
                  style={{
                    marginTop: '10px',
                    padding: '5px 10px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {showAll[characterIndex] ? "접어두기" : "더보기"}
                </button>
              )}
            </Grid>
            <Grid size="grow">
              <div key={characterIndex}>
                <Material
                  characterInfo={characterInfo}
                  checkedValues={checkedValues[characterIndex] || {}}
                  characterIndex={characterIndex}
                  raidAndDiff={raidAndDiff}
                  goldCheckboxes={goldCheckboxes[characterIndex] || {}}
                  additionalCheckedValues={additionalCheckedValues[characterIndex] || {}}
                  filteredRaidName={filteredRaidName}
                  tierMaterialSwitch = {tierMaterialSwitch} />
              </div>

            </Grid>
          </Grid>
        ))
      }
    </div>
  )
}

export default Board;