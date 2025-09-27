import Grid from '@mui/material/Grid2';
import calcEfficiency from '../calcEfficiency';

function Tier3(props) {
  const raidList = ['카멘', '혼돈의 상아탑', '일리아칸',
    '카양겔', '아브렐슈드', '쿠크세이튼', '비아키스', '발탄', '아르고스'];
  
  let arr = calcEfficiency(raidList, props.itemData);

  // 데이터 로딩 중일 때 표시
  if (!props.itemData) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-secondary)' }}>
        <div>재료 가격 데이터를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {raidList.map((raidName, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <div className="efficiency-raid-card">
              <img 
                src={`${process.env.PUBLIC_URL}/Raid/${raidName}.jpg`}
                alt={raidName}
                className="efficiency-raid-image"
              />
              <div className="efficiency-raid-title">
                {raidName}
              </div>
              <div className="efficiency-raid-info">
                {Array.isArray(arr[index]) ? (
                  arr[index].map((a, i) => (
                    <div key={i}>
                      {Array.isArray(a) ? (
                        a.map((b, j) => <div key={j}>{b}</div>)
                      ) : (
                        <div>{a}</div>
                      )}
                    </div>
                  ))
                ) : (
                  <div>{arr[index]}</div>
                )}
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Tier3;
