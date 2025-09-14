import React from 'react';

function DifficultySelect(props) {

  let raidDifficultyKeyValue = [];
  for (let i = 0; i < props.filterRaidByItemLevel.length; i++) {
    let arr1 = []; // key(레이드 이름) : value(난이도) 를 저장할 배열
    let j = 0;

    while (j < props.filterRaidByItemLevel[i].length) {
      let arr2 = []; // 난이도 value 값을 저장할 배열
      let name = props.filterRaidByItemLevel[i][j].RaidName
      const currentRaid = props.filterRaidByItemLevel[i][j];

      // 현재와 다음 데이터를 비교해 같은 RaidName인지 확인
      if (j + 1 < props.filterRaidByItemLevel[i].length &&
        currentRaid.RaidName === props.filterRaidByItemLevel[i][j + 1].RaidName) {
        arr2.push(currentRaid.RaidDifficulty); // 현재 난이도 추가
        j++;

        if (j + 1 < props.filterRaidByItemLevel[i].length &&
          props.filterRaidByItemLevel[i][j].RaidName === props.filterRaidByItemLevel[i][j + 1].RaidName) {

          arr2.push(props.filterRaidByItemLevel[i][j].RaidDifficulty); // 두 번째 난이도 추가
          j++;
          arr2.push(props.filterRaidByItemLevel[i][j].RaidDifficulty); // 세 번째 난이도 추가
          j++;
        } else {
          arr2.push(props.filterRaidByItemLevel[i][j].RaidDifficulty); // 두 번째 난이도만 추가
          j++;
        }
      } else {
        // 다음 데이터와 RaidName이 다를 경우
        arr2.push(currentRaid.RaidDifficulty);
        j++;
      }
      let a = { [name]: arr2 }
      arr1.push(a); // key : value를 arr1에 추가
    }

    raidDifficultyKeyValue.push(arr1); // arr1을 raidDifficultyKeyValue에 저장
  }

  function raidDifficultyCase() {
    const difficulty = raidDifficultyKeyValue[props.characterIndex][props.raidIndex][props.raidName];
    if (JSON.stringify(difficulty) === JSON.stringify(['normal'])) {
      return (
        <>
          <option value="normal">노말</option>
        </>
      )
    } else if (JSON.stringify(difficulty) === JSON.stringify(['hard'])) {
      return (
        <>
          <option value="hard">하드</option>
        </>
      );
    } else if (JSON.stringify(difficulty) === JSON.stringify(['hard', 'normal'])) {
      return (
        <>
          <option value="hard">하드</option>
          <option value="normal">노말</option>
        </>
      );
    } else if (JSON.stringify(difficulty) === JSON.stringify(['normal', 'single'])) {
      return (
        <>
          <option value="normal">노말</option>
          <option value="single">싱글</option>
        </>
      );
    } else {
      return (
        <>
          <option value="hard">하드</option>
          <option value="normal">노말</option>
          <option value="single">싱글</option>
        </>
      );

    }
  }


  return (
    <>
      {/* <option disabled hidden selected>난이도</option> */}
      {raidDifficultyCase()}
    </>


  )

}

export default DifficultySelect;