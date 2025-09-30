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
              <div className="home-content">
                <h1 className="home-title">LostBoard</h1>
                <p className="home-subtitle">
                  Lost Ark 플레이어를 위한 레이드 효율성 분석 도구<br/>
                </p>
                
                <div className="search-container">
                  <div className="search-input-wrapper">
                    <TextField
                      id="character-search"
                      label="캐릭터명"
                      variant="outlined"
                      value={characterName}
                      onChange={handleInputChange}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleSearch();
                        }
                      }}
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--text-primary)',
                          borderRadius: '12px',
                          '& fieldset': {
                            borderColor: 'var(--border-color)',
                            borderWidth: '2px',
                          },
                          '&:hover fieldset': {
                            borderColor: 'var(--primary-gold)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'var(--primary-gold)',
                            boxShadow: '0 0 10px var(--primary-gold-glow)',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'var(--text-secondary)',
                          '&.Mui-focused': {
                            color: 'var(--primary-gold)',
                          },
                        },
                      }}
                    />
                  </div>
                  
                  <Button
                    variant="contained"
                    className="search-button"
                    onClick={handleSearch}
                    size="large"
                  >
                    검색하기
                  </Button>
                </div>
              </div>
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
