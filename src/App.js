import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [authToken, setAuthToken] = useState('');
  // const [searchPar, setSearchPar] = useState('');
  const fetchRes = (e) => {
    axios.get(`http://3.108.244.88:5000/api/data?search_string=${e.target.value}`, { headers: {"user-access-token": `${authToken}`}})
      .then(res => {
        if (res.status === 200) {
          setSearchResults(res.data);
        }
      });
  }
  useEffect(() => {
    axios.get('http://3.108.244.88:5000/api/user-access-token')
      .then(res => {
        if (res.status === 200)
          setAuthToken(res.data.token);
        else 
          alert('Failed to authenticate');
      });
  }, []);
  return (
    <div className="App">
      <input onInput={(e) => fetchRes(e)}></input>
      <ul>
        {searchResults.map(stock => {
          return <li>{stock}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
