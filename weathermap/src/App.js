import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const API_KEY = "6bf6b9fcc70b186f91f2aff88b83dbab";   // 각자 개인의 API KEY를 발급받아 사용해주세요. 내꺼 쓰면 혼나용
  const [locatiion, setLocation] = useState('');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=$(location)&appid=$(API_KEY)`;
  const [result, setResult] = useState({});

  const searchWeather = async (e) => {
    if(e.key === 'Enter') {
      try {
        const data = await axios({
          method: 'get',
          url: url,
        })
        console.log(data);
        setResult(data);
      } 
      catch(err) {
        alert(err);
      }
    }
  }

  return (
    <div className='Main'>
      <div className='MiniTitle'>MWR</div>
      <div className='MainTitle'>오늘도 당신의 날씨를 위해</div>
      <div className='appContentWrap'>
        <input className='Search'
          placeholder='당신이 알고싶은 지역의 이름을 적어주세요'
          value={locatiion}
          onChange={(e)=>setLocation(e.target.value)}
          type='text'
          onKeyDown={searchWeather}
        />
        {
          Object.keys(result).length !== 0 && ( // 우리가 보는 온도 작업때문에 temperature가 더 코드가 많음
            <div className='ResultWrap'>
            <div className='city'>{result.data.name}</div>
            <div className='temperature'> 
              {Math.round(result.data.main.temp -273.15 * 10) /10}°C
            </div>
            <div className='sky'>{result.data.weather[0].main}</div>
          </div>
          )
        }
      </div>
    </div>
  );
}
export default App;
