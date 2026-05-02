import '../App.css'
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Switch,
  FormControlLabel,
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
      setCharacterData(res.data);
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
    if (!item || !item.ItemAvgLevel) return false;
    const itemLevel = parseFloat(item.ItemAvgLevel.replace(/,/g, ""));
    itemLevelArr.push(itemLevel);
    return itemLevel >= 1370.00;
  });

  // 정렬: ItemAvgLevel 기준으로 내림차순 정렬
  const sortedData = filteredData.sort((a, b) => {
    const aLevel = parseFloat(a.ItemAvgLevel.replace(/,/g, ""));
    const bLevel = parseFloat(b.ItemAvgLevel.replace(/,/g, ""));
    return bLevel - aLevel;
  });

  itemLevelArr.sort((a, b) => b - a);

  const filterRaidByItemLevel = [];
  let filteredRaidName = [];

  for (let i = 0; i < itemLevelArr.length; i++) {
    let filterRaid = Raid.filter(item => item.RaidItemLevel <= itemLevelArr[i]);
    filterRaidByItemLevel.push(filterRaid);
    let arr = filterRaid.map(r => r.RaidName);
    arr = Array.from(new Set(arr));
    filteredRaidName.push(arr);
  }

  const [selectValues, setSelectValues] = useState({});
  const [tierMaterialSwitch, setTierMaterialSwitch] = useState(true);
  const [lastChangedRaid, setLastChangedRaid] = useState(null); // { characterIndex, raidName, difficulty, isChecked, type }
  const [goldCheckboxes, setGoldCheckboxes] = useState(() =>
    sortedData.reduce((acc, _, characterIndex) => {
      acc[characterIndex] = {};
      return acc;
    }, {})
  );
  const [checkedValues, setCheckedValues] = useState(() =>
    sortedData.reduce((acc, _, characterIndex) => {
      acc[characterIndex] = filteredRaidName[characterIndex].reduce((raidAcc, _, raidIndex) => {
        raidAcc[raidIndex] = false;
        return raidAcc;
      }, {});
      return acc;
    }, {})
  );
  const [additionalCheckedValues, setAdditionalCheckedValues] = useState(() =>
    sortedData.reduce((acc, _, characterIndex) => {
      acc[characterIndex] = filteredRaidName[characterIndex].reduce((raidAcc, _, raidIndex) => {
        raidAcc[raidIndex] = false;
        return raidAcc;
      }, {});
      return acc;
    }, {})
  );
  const [showAll, setShowAll] = useState(() =>
    sortedData.reduce((acc, _, characterIndex) => {
      acc[characterIndex] = false;
      return acc;
    }, {})
  );

  const groupMapping = {
    "카멘": ["카멘 1-3관문", "카멘 4관문"],
    "아브렐슈드": ["아브렐슈드 1-2관문", "아브렐슈드 3관문", "아브렐슈드 4관문"],
  };

  const getDefaultDifficulty = (raidName, characterIndex) => {
    const num = filterRaidByItemLevel[characterIndex].findIndex((x) => x.RaidName === raidName);
    return filterRaidByItemLevel[characterIndex][num]?.RaidDifficulty || '';
  };

  const handleSelectChange = (e, characterIndex, raidIndex) => {
    setSelectValues((prev) => ({
      ...prev,
      [`${characterIndex}-${raidIndex}`]: e.target.value,
    }));
  };

  const handleTierMaterialSwitch = (event) => {
    setTierMaterialSwitch(event.target.checked);
  };

  // 체크박스 함수 통합 핸들러 - type: 'clear' | 'gold' | 'additional'
  const handleCheckboxChangeGeneric = (e, characterIndex, raidIndex, stateSetter, type) => {
    const isChecked = e.target.checked;
    const raidName = filteredRaidName[characterIndex][raidIndex];
    const difficulty =
      selectValues[`${characterIndex}-${raidIndex}`] ||
      getDefaultDifficulty(raidName, characterIndex);

    // Material에 변경 이벤트 전달
    setLastChangedRaid({ characterIndex, raidName, difficulty, isChecked, type });

    stateSetter((prevState) => ({
      ...prevState,
      [characterIndex]: {
        ...prevState[characterIndex],
        [raidIndex]: isChecked,
      },
    }));
  };

  // 레이드 클리어 체크박스
  const handleCheckboxChange = (e, characterIndex, raidIndex) => {
    handleCheckboxChangeGeneric(e, characterIndex, raidIndex, setCheckedValues, 'clear');
    if (countSelectedCheckboxes(characterIndex) < 3 && e.target.checked === true) {
      handleGoldCheckboxChange(e, characterIndex, raidIndex);
    } else if (e.target.checked === false) {
      handleGoldCheckboxChange(e, characterIndex, raidIndex);
      handleAdditionalCheckboxChange(e, characterIndex, raidIndex);
    }
  };

  // 골드 체크박스
  const handleGoldCheckboxChange = (e, characterIndex, raidIndex) => {
    handleCheckboxChangeGeneric(e, characterIndex, raidIndex, setGoldCheckboxes, 'gold');
  };

  // 더보기 체크박스
  const handleAdditionalCheckboxChange = (e, characterIndex, raidIndex) => {
    handleCheckboxChangeGeneric(e, characterIndex, raidIndex, setAdditionalCheckedValues, 'additional');
  };

  // 골드 체크박스 개수 관리
  const countSelectedCheckboxes = (characterIndex) => {
    const characterCheckboxes = goldCheckboxes[characterIndex] || {};

    const groupSelectedCount = Object.keys(groupMapping).reduce((count, groupName) => {
      const group = groupMapping[groupName];
      const isGroupSelected = group.some(
        (raidName) =>
          goldCheckboxes[characterIndex]?.[filteredRaidName[characterIndex].indexOf(raidName)]
      );
      return count + (isGroupSelected ? 1 : 0);
    }, 0);

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

  if (characterData.length === 0) {
    return (
      <div className='content'>
        <div className='board-loading'>
          <div>캐릭터 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <div className='content'>
        <div className='board-no-characters'>
          <div>1370 이상의 캐릭터가 없습니다.</div>
        </div>
      </div>
    );
  }

  const getDifficultyOptions = (raidName, characterIndex) => {
    if (!filterRaidByItemLevel[characterIndex]) return [];
    const raidOptions = filterRaidByItemLevel[characterIndex]
      .filter(raid => raid.RaidName === raidName)
      .map(raid => raid.RaidDifficulty);
    const uniqueDifficulties = [...new Set(raidOptions)];
    const sortOrder = { 'nightmare': 1, 'hard': 2, 'normal': 3, 'single': 4 };
    return uniqueDifficulties.sort((a, b) => (sortOrder[a] || 999) - (sortOrder[b] || 999));
  };

  return (
    <div className='content'>
      <Container maxWidth="xl" className='board-container'>
        <div className='board-header'>
          <Typography variant="h4" className='board-title'>
            레이드 현황판
          </Typography>
          <FormControlLabel
            className='board-switch-container'
            control={
              <Switch
                checked={tierMaterialSwitch}
                onChange={handleTierMaterialSwitch}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: 'var(--primary-gold)' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: 'var(--primary-gold)' },
                }}
              />
            }
            label={<Typography className='board-switch-label'>티어에 맞는 재료 보기</Typography>}
          />
        </div>

        <div className='board-grid'>
          {sortedData.map((characterInfo, characterIndex) => (
            <Fade in={true} timeout={300 + characterIndex * 100} key={characterIndex}>
              <div>
                <CharacterCard characterInfo={characterInfo} characterIndex={characterIndex}>
                  <div className='raid-list-container'>
                    {filteredRaidName[characterIndex]
                      ?.slice(0, showAll[characterIndex] ? filteredRaidName[characterIndex].length : 5)
                      .map((raidName, raidIndex) => {
                        const groupName = Object.keys(groupMapping).find((group) =>
                          groupMapping[group].includes(raidName)
                        );
                        const isGroupSelected = groupName
                          ? groupMapping[groupName].some((name) =>
                              goldCheckboxes[characterIndex]?.[filteredRaidName[characterIndex].indexOf(name)]
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
                  </div>

                  {filteredRaidName[characterIndex]?.length > 5 && (
                    <div className='expand-button-container'>
                      <button
                        className='expand-button'
                        onClick={() =>
                          setShowAll((prev) => ({ ...prev, [characterIndex]: !prev[characterIndex] }))
                        }
                      >
                        {showAll[characterIndex] ? "접어두기" : "전체 레이드 보기"}
                      </button>
                    </div>
                  )}

                  <div className='material-info-container'>
                    <Typography variant="h6" className='material-info-title'>
                      획득 재료
                    </Typography>
                    <Material
                      characterInfo={characterInfo}
                      characterIndex={characterIndex}
                      tierMaterialSwitch={tierMaterialSwitch}
                      lastChangedRaid={lastChangedRaid}
                    />
                  </div>
                </CharacterCard>
              </div>
            </Fade>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Board;
