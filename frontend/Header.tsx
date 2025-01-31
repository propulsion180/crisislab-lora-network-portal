import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';


export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const goToTable = () => { navigate('/table')};
  const goToMap = () => { navigate('/map')}
  return (
    <div className='header-div'>
      <div className='title-format'>
        <a onClick={goToMap}><h1>CrisisLab Lora Network Portal</h1></a>
      </div>
      <div className='center'>
        <a
          className={`nav-button ${location.pathname === '/table' ? 'active' : ''}`}
          onClick={goToTable}
        >
          Table
        </a>
        <a
          className={`nav-button ${location.pathname === '/map' ? 'active' : ''}`}
          onClick={goToMap}
        >
          Map
        </a>
      </div>
     </div> 
  )
}
