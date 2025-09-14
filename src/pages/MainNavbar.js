import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useSelector } from "react-redux"

function MainNavbar() {
  let navigate = useNavigate()
  let state = useSelector((state) => state.characterName)

  return (
    <div className='navbar'>
      <img className='lost-board' src={`${process.env.PUBLIC_URL}/logo_gold.png`}
        width="10%" onClick={() => {
          navigate('/')}}/>
      <span className='menu' onClick={() => {
        navigate(`/board/${state}`)}}>현황판</span>
      <span className='menu' onClick={() => {
        navigate('/efficiency')}}>더보기 효율</span>
      <span className='menu' onClick={() => {
        navigate('/calculation')}}>계산기</span>

    </div>
  );
}


export default MainNavbar;