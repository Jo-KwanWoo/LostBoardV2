import Raid from "./Data";

function raidClearReward(raidLevel, index, rewardType) {
    let updates = {}
    if (raidLevel >= 1640) {
        updates = {
            '운명의 파괴석': 0,
            '운명의 수호석': 0,
            '운명의 파편': 0,
            '운명의 돌파석': 0,
        };
    } else if (raidLevel >= 1580) {
        updates = {
            '정제된 파괴강석': 0,
            '정제된 수호강석': 0,
            '명예의 파편': 0,
            '찬란한 명예의 돌파석': 0,
        };
    }
    else if (raidLevel >= 1490) {
        updates = {
            '파괴강석': 0,
            '수호강석': 0,
            '명예의 파편': 0,
            '경이로운 명예의 돌파석': 0,
        };
    } else {
        updates = {
            '파괴석 결정': 0,
            '수호석 결정': 0,
            '명예의 파편': 0,
            '위대한 명예의 돌파석': 0,
        };
    }
    
    let rewards = Object.keys(updates)
    if(rewardType === '클리어 재료'){
        for (let i = 0; i < Raid[index].clearReward.length; i++) { 
            for (let j = 0; j < rewards.length; j++) {
                updates[rewards[j]] += Raid[index].clearReward[i][j] || 0; 
            }
        }
        return updates;
    }else if(rewardType === '더보기 재료'){
        updates['골드'] = 0;
        for (let i = 0; i < Raid[index].additionalReward.length; i++) { 
            for (let j = 0; j < rewards.length; j++) {
                updates[rewards[j]] += Raid[index].additionalReward[i][j] || 0; 
            }
            updates['골드'] -= Raid[index].additionalGold[i]; 
        }
        return updates;
    }
    

}

export default raidClearReward