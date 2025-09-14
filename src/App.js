import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import MainNavbar from './pages/MainNavbar';
import Board from './pages/Board';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from './store';
import { useState } from 'react';
import Efficiency from './pages/Efficiency';
import Calculation from './pages/Calculation';

function App() {
  const navigate = useNavigate();
  const state = useSelector((state) => state.characterName); // Redux 상태
  const [characterName, setCharacterName] = useState(""); // 로컬 상태
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setCharacterName(value); // 로컬 상태 업데이트
  };

  const handleSearch = () => {
    if (characterName.trim() === "") {
      alert("캐릭터명을 입력하세요!"); // 빈 값 처리
      return;
    }

    // Redux 상태에 업데이트 후 navigate 실행
    dispatch(setName(characterName));
    navigate(`/board/${characterName}`);
  };

  return (
    <div className="App">
      <MainNavbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="content">
              {/* 텍스트 필드 */}
              <TextField
                id="standard-basic"
                label="캐릭터명"
                variant="standard"
                value={characterName}
                onChange={handleInputChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch(); // Enter 키 입력 시 검색 실행
                  }
                }}
              />
              {/* 검색 버튼 */}
              <Button
                variant="contained"
                style={{ marginTop: "11px", marginLeft: "8px" }}
                onClick={handleSearch}
              >
                검색
              </Button>
            </div>
          }
        />
        <Route path="/board/:characterName" element={<Board />} />
        <Route path="/efficiency" element={<Efficiency />}/>
        <Route path="/calculation" element={<Calculation />}/>
      </Routes>
    </div>
  );
}

export default App;
