import './App.css';
import Axios  from 'axios';
import { useState } from 'react';
function App() {
  const [name, setName] = useState('')
  const [data, setData] = useState(null)
  const fetchData = async (e) => {
    try {
      const response = await Axios.get(`https://api.nationalize.io?name=${name}`);
      const data = response.data;
      const countrydata = data.country.map((country)=>({
        countryName : country.country_id,
        probability : country.probability,
      }))
      setData(countrydata);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return(
    <div className='container'>
    <h1 className='heading'>Nationality Predictor</h1>
    <div className="input"><input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Search Name" className='box' /></div>
    <div className="submitbutton"><button className='submit' onClick={fetchData}>Search</button></div>
    {data && (
        <div className='results'>
          <h2 className='resultheading'>Results:</h2>
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <strong>Country:</strong> {item.countryName},{' '}
                <strong>Probability:</strong> {item.probability}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

}

export default App;
