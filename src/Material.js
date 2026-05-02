import { useState, useEffect, useCallback } from "react";
import { level1370Full, level1490Full, level1580Full, level1640Full, level1730Full } from "./materialListByLevelFull";
import { level1370Light, level1490Light, level1580Light, level1640Light, level1730Light } from "./materialListByLevelLight"
import Raid from "./Data";
import raidClearReward from "./raidClearReward";

function Material(props) {
  const itemLevelString = props.characterInfo?.ItemAvgLevel || "0";
  const itemLevel = parseFloat(itemLevelString.replace(/,/g, ""));
  const [material, setMaterial] = useState([]);

  // 기본 재료 템플릿 가져오기
  const getBaseMaterial = useCallback(() => {
    if (props.tierMaterialSwitch === true) {
      if (itemLevel >= 1730) return [...level1730Light];
      if (itemLevel >= 1640) return [...level1640Light];
      if (itemLevel >= 1580) return [...level1580Light];
      if (itemLevel >= 1490) return [...level1490Light];
      return [...level1370Light];
    } else {
      if (itemLevel >= 1730) return [...level1730Full];
      if (itemLevel >= 1640) return [...level1640Full];
      if (itemLevel >= 1580) return [...level1580Full];
      if (itemLevel >= 1490) return [...level1490Full];
      return [...level1370Full];
    }
  }, [itemLevel, props.tierMaterialSwitch]);

  // 초기 재료 설정 및 템플릿 변경 처리
  useEffect(() => {
    const baseMaterial = getBaseMaterial();
    if (material.length === 0) {
      setMaterial(baseMaterial);
    } else {
      const updatedMaterial = baseMaterial.map(baseItem => {
        const existingItem = material.find(item =>
          Object.keys(item)[0] === Object.keys(baseItem)[0]
        );
        if (existingItem) {
          const key = Object.keys(baseItem)[0];
          const difference = existingItem[key] - baseItem[key];
          return { [key]: baseItem[key] + difference };
        }
        return { ...baseItem };
      });
      setMaterial(updatedMaterial);
    }
  }, [getBaseMaterial]);

  // 재료 업데이트 함수
  const updateItems = (updates, checked) => {
    setMaterial((prevState) =>
      prevState.map((item) => {
        const updatedItem = { ...item };
        for (const key in updates) {
          if (updatedItem[key] !== undefined) {
            updatedItem[key] = checked
              ? updatedItem[key] + updates[key]
              : updatedItem[key] - updates[key];
          }
        }
        return updatedItem;
      })
    );
  };

  // 골드 계산 함수
  const goldReward = (raidIndex) => {
    if (!Raid[raidIndex] || !Raid[raidIndex].clearGold) return 0;
    return Raid[raidIndex].clearGold.reduce((acc, gold) => acc + gold, 0);
  };

  // lastChangedRaid 기반으로 재료/골드 업데이트
  useEffect(() => {
    const changed = props.lastChangedRaid;
    if (!changed) return;

    // 이 Material이 해당 캐릭터 것인지 확인
    if (changed.characterIndex !== props.characterIndex) return;

    const { raidName, difficulty, isChecked, type } = changed;

    // Raid 데이터에서 해당 레이드 찾기
    let index = null;
    let raidLevel = null;
    for (let i = 0; i < Raid.length; i++) {
      if (Raid[i].RaidName === raidName && Raid[i].RaidDifficulty === difficulty) {
        index = i;
        raidLevel = Raid[i].RaidItemLevel;
        break;
      }
    }
    if (index === null || raidLevel === null) return;

    if (type === 'clear') {
      const updates = raidClearReward(raidLevel, index, '클리어 재료', itemLevel);
      updateItems(updates, isChecked);
    } else if (type === 'additional') {
      const updates = raidClearReward(raidLevel, index, '더보기 재료', itemLevel);
      updateItems(updates, isChecked);
    } else if (type === 'gold') {
      const gold = goldReward(index);
      updateItems({ 골드: gold }, isChecked);
    }
  }, [props.lastChangedRaid]);

  if (!props.characterInfo) {
    return <div>캐릭터 정보를 불러오는 중...</div>;
  }

  return (
    <div>
      {material.map((a, i) => (
        <div
          key={i}
          style={{
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            marginBottom: '4px',
            padding: '2px 0'
          }}
        >
          {`${Object.keys(a)[0]} x ${a[Object.keys(a)[0]]}`}
        </div>
      ))}
    </div>
  );
}

export default Material;
