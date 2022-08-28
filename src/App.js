import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coinInfo, setCoinInfo] = useState([]);
  const [myCoin, setMyCoin] = useState();
  const CoinSelect = (event) => {
    const coinName = coins[event.target.selectedIndex - 1].name;
    const price = coins[event.target.selectedIndex - 1].quotes.USD.price;
    const symbol = coins[event.target.selectedIndex - 1].symbol;
    const volume = coins[event.target.selectedIndex - 1].quotes.USD.volume_24h_change_24h;
    setCoinInfo((currentArray) => [coinName, price, symbol, volume]);
  }
  const CoinPrice = (event) => setMyCoin(event.target.value);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, [])
  return (
    <div className='App'>
        <div className='body'>
        <h1 className='Title'>The Coins! {loading ? null : '('+ (coins.length) +')'}</h1>
        <div className='selectCoin'>
          {loading ? (<strong className='Title'>Loading ...</strong>) : 
          (<select onChange={ CoinSelect } className='selectBx'>
              <option>--- select coins!! ---</option>
            {coins.map((coin) => 
              <option key={coin.id}>{coin.name}</option> //({coin.symbol}): ${coin.quotes.USD.price} USD
            )};
          </select>)
          }
        </div>
        {loading ? null : (
          <div className='result'>
            <div>
              <input type="number" placeholder="Enter a number" onChange={CoinPrice} min='0'/>
            </div>
          <hr/>
            <ul className='resultInfo'>
              <li>coin name : {coinInfo[0]}</li>
              <li>coin price : {coinInfo[1] ? "$" + parseFloat(coinInfo[1]).toFixed(2) : " "}</li>
              <li>coin symbol : {coinInfo[2]}</li>
              <li>difference from 24h ago : {coinInfo[3]}</li>
              <li>Available quantities : {myCoin ? Math.floor(myCoin / coinInfo[1]) : ""}</li>
            </ul>
          </div>  
        )}
      </div> 
    </div>
  );
}

export default App;
