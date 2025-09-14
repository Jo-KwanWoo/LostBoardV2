import Grid from '@mui/material/Grid2';
import calcEfficiency from '../calcEfficiency';

function Tier4(props) {
  const raidList = ['모르둠', '아브렐슈드 2막', '에기르', '베히모스', '에키드나',]
  let arr = calcEfficiency(raidList, props.itemData);
  console.log(arr)
  return (
    <div>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {raidList.map((raidName, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <img src={`${process.env.PUBLIC_URL}/Raid/${raidName}.jpg`}
            width="70%" style={{ marginLeft: "30px", borderRadius:"20px" }} />
            <p></p>
            {raidName}
            <p></p>
            {
              arr[index].map((a, i) => (
                <div>
                  {a}
                </div>
              ))
            }
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
export default Tier4