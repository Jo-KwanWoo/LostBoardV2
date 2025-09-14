import Grid from '@mui/material/Grid2';
import calcEfficiency from '../calcEfficiency';

function Tier3(props) {
  const raidList = ['카멘', '혼돈의 상아탑', '일리아칸',
    '카양겔', '아브렐슈드', '쿠크세이튼', '비아키스', '발탄', '아르고스'];
  
  let arr = calcEfficiency(raidList, props.itemData);

  console.log(arr); // 디버깅용

  return (
    <div>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {raidList.map((raidName, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <img src={`${process.env.PUBLIC_URL}/Raid/${raidName}.jpg`}
              width="70%" style={{ marginLeft: "30px", borderRadius: "20px" }} />
            <p></p>
            {raidName}
            <p></p>
            {Array.isArray(arr[index]) ? (
              arr[index].map((a, i) => (
                <div key={i}>
                  {Array.isArray(a) ? (
                    a.map((b, j) => <div key={j}>{b}</div>)
                  ) : (
                    <div>{a}</div> // 배열이 아닐 경우 직접 출력
                  )}
                </div>
              ))
            ) : (
              <div>{arr[index]}</div> // `arr[index]` 자체가 배열이 아닐 경우 처리
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Tier3;
