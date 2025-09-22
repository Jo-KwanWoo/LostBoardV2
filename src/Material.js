import { useState, useEffect, useRef, useCallback } from "react";
import { level1370Full, level1490Full, level1580Full, level1640Full } from "./materialListByLevelFull";
import { level1370Light, level1490Light, level1580Light, level1640Light } from "./materialListByLevelLight"
import Raid from "./Data";
import raidClearReward from "./raidClearReward";

function Material(props) {
  // props.characterInfo가 없거나 ItemAvgLevel이 없는 경우 기본값 설정
  const itemLevelString = props.characterInfo?.ItemAvgLevel || "0";
  const itemLevel = parseFloat(itemLevelString.replace(/,/g, ""));
  const [material, setMaterial] = useState([]);
  const previousCheckedValues = useRef({}); // 이전 체크 상태 저장
  const previousAdditionalCheckedValues = useRef({});
  const previousGoldCheckedValues = useRef({});



  // 기본 재료 템플릿 가져오기
  const getBaseMaterial = useCallback(() => {
    if (props.tierMaterialSwitch === true) {
      if (itemLevel >= 1640) {
        return [...level1640Light];
      } else if (itemLevel >= 1580) {
        return [...level1580Light];
      } else if (itemLevel >= 1490) {
        return [...level1490Light];
      } else {
        return [...level1370Light];
      }
    } else {
      if (itemLevel >= 1640) {
        return [...level1640Full];
      } else if (itemLevel >= 1580) {
        return [...level1580Full];
      } else if (itemLevel >= 1490) {
        return [...level1490Full];
      } else {
        return [...level1370Full];
      }
    }
  }, [itemLevel, props.tierMaterialSwitch]);

  // 초기 재료 설정 및 템플릿 변경 처리
  useEffect(() => {
    const baseMaterial = getBaseMaterial();

    if (material.length === 0) {
      // 첫 로딩 시
      setMaterial(baseMaterial);
    } else {
      // 템플릿 변경 시 기존 재료의 변경사항을 새 템플릿에 적용
      const updatedMaterial = baseMaterial.map(baseItem => {
        const existingItem = material.find(item =>
          Object.keys(item)[0] === Object.keys(baseItem)[0]
        );

        if (existingItem) {
          const key = Object.keys(baseItem)[0];
          const baseValue = baseItem[key];
          const existingValue = existingItem[key];
          const difference = existingValue - baseValue;

          return { [key]: baseValue + difference };
        }

        return { ...baseItem };
      });

      setMaterial(updatedMaterial);
    }
  }, [getBaseMaterial]);

  // 레이드 클리어 보상, 더보기 보상, 골드 보상 통합 관리 함수
  const processRaidUpdates = (checkedValues, previousCheckedValues, updateFunction, rewardFunction, rewardType) => {
    if (!props.raidAndDiff || !Object.keys(props.raidAndDiff).length) return;

    const raidName = Object.keys(props.raidAndDiff)[0];
    const diff = props.raidAndDiff[raidName];
    let index = null;
    let raidLevel = null;

    for (let i = 0; i < Raid.length; i++) {
      if (Raid[i].RaidName === raidName && Raid[i].RaidDifficulty === diff) {
        index = i;
        raidLevel = Raid[i].RaidItemLevel;
        break;
      }
    }

    if (raidLevel && index !== null) {
      // 보상 타입에 따른 함수 처리. rewardType === '골드' 인 경우 goldReward()함수를 실행.
      // rewardType === '클리어 재료' || '더보기 재료' 인 경우 raidClearReward()함수를 실행.
      const updates = rewardType === '골드' ? { 골드: rewardFunction(index) } : rewardFunction(raidLevel, index, rewardType);
      const prevChecked = previousCheckedValues.current || {};
      const currentChecked = checkedValues || {};

      // 이전 상태와 비교하여 다른 것만 변경
      Object.keys(currentChecked).forEach((key) => {
        const isCheckedBefore = prevChecked[key] || false;
        const isCheckedNow = currentChecked[key] || false;

        if (isCheckedBefore !== isCheckedNow) {
          updateFunction(updates, isCheckedNow);
        }
      });

      previousCheckedValues.current = { ...currentChecked };
    }
  };

  // props.checkedValues 처리
  useEffect(() => {
    processRaidUpdates(
      props.checkedValues,
      previousCheckedValues,
      updateItems,
      raidClearReward,
      '클리어 재료' // 클리어 재료 처리
    );
  }, [props.checkedValues]);

  // props.additionalCheckedValues 처리
  useEffect(() => {
    processRaidUpdates(
      props.additionalCheckedValues,
      previousAdditionalCheckedValues,
      updateItems,
      raidClearReward,
      '더보기 재료' // 더보기 재료 처리
    );
  }, [props.additionalCheckedValues]);

  // props.goldCheckboxes 처리
  useEffect(() => {
    processRaidUpdates(
      props.goldCheckboxes,
      previousGoldCheckedValues,
      updateItems,
      goldReward,
      '골드' // 골드 처리
    );
  }, [props.goldCheckboxes]);

  // 재료 업데이트 함수
  const updateItems = (updates, checked) => {
    setMaterial((prevState) =>
      prevState.map((item) => {
        const updatedItem = { ...item };
        for (const key in updates) {
          if (updatedItem[key] !== undefined) {
            if (checked) {
              updatedItem[key] += updates[key];
            } else {
              updatedItem[key] -= updates[key];
            }
          }
        }
        return updatedItem;
      })
    );
  };

  // 골드 계산 함수
  function goldReward(raidIndex) {
    if (!Raid[raidIndex] || !Raid[raidIndex].clearGold) return 0; // 유효성 검증 추가
    return Raid[raidIndex].clearGold.reduce((acc, gold) => acc + gold, 0);
  }

  // props 유효성 검사
  if (!props.characterInfo) {
    return <div>캐릭터 정보를 불러오는 중...</div>;
  }

  return (
    <div>
      {/* 재료 및 골드 출력 */}
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
