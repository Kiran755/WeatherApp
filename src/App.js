import './App.css';
import {useState} from 'react';
import {useEffect} from 'react';
function App() {
const api = {
  base:"https://api.openweathermap.org/data/2.5/",
  key:"3b79a35a662d1f2a68a6797865ae06e6"
}

const [query,setQuery] = useState("");
const [weather,setWeather] = useState({});
const input = document.getElementById("input");

const fetchData = (evt)=>{
  if(evt.key==="Enter")
  {
    fetch( `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(res=>res.json())
    .then(result=>{
      setWeather(result);
      setQuery("");
      console.log(result);
    });
  }
  console.log(evt.key);
}
  const datebuilder = (d)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    const day = days[d.getDay()];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const date = d.getDate();

    return `${day} ${date} ${month} ${year}`;
  }
  return (
    <div className={typeof weather.main!="undefined"?(weather.main.temp>18)?"App warm":"App cold":"App"}>
        <div className='container'>
            <div className='search-div'>
                <input type="text" placeholder='Enter City name' id="input"
                onChange={(e)=>{setQuery(e.target.value)}}
                value={query}
                onKeyDown={fetchData}
                />
            </div>
            {(typeof weather.main != "undefined")?(
              <>
                  <div className='location-box'>
                      <div className='location'>
                            {weather.name},{weather.sys.country}
                      </div>
                      <div className='date'>
                            {datebuilder(new Date())}
                      </div>
                  </div>
                  <div className='weather'>
                    <div className='temp'>
                        {Math.round(weather.main.temp)}°C
                    </div>
                  
                  <div className='climate'>
                          {weather.weather[0].main}
                  </div>
                  </div>
                </>
                ):('')
                
                }
        </div>
    </div>
  );
}

export default App;
