import '../App.css'
import { useState, useEffect } from 'react';
import instance from '../instance';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import CustomTabPanel from '../CustomTabPanel';
import Tier4 from './Tier4';
import Tier3 from './Tier3';
import itemNamesList from '../itemNamesList';

function Efficiency() {
  const [value, setValue] = useState('1');
  const [itemData, setItemData] = useState();

  const getAPIData = async () => {
    try {
      const requests = itemNamesList.map((name) =>
        instance.post("markets/items", {
          Sort: "GRADE",
          CategoryCode: 50010,
          ItemName: name,
          PageNo: 0,
          SortCondition: "ASC",
        })
      );
      const responses = await Promise.all(requests);
    
      // 데이터를 변환하여 { Name: RecentPrice } 형태로 저장
      const transformedData = responses.map((res) => {
        const item = res.data.Items[0]; // 첫 번째 아이템만 가져옴
        const originalName = item.Name;
    
        // 키값 변경 조건
        const newName =
          originalName === "운명의 파편 주머니(대)"
            ? "운명의 파편"
            : originalName === "명예의 파편 주머니(대)"
            ? "명예의 파편"
            : originalName; // 조건에 맞지 않으면 기존 이름 사용
    
        return { [newName]: item.RecentPrice };
      });
    
      setItemData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className='content'>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="4티어" {...a11yProps(0)} />
            <Tab label="3티어" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Tier4 itemData={itemData}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Tier3 itemData={itemData}/>
        </CustomTabPanel>
      </Box>
    </div>

  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default Efficiency;