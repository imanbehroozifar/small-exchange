import React, { useEffect, useState } from 'react';
import Coin from '../Coin/Coin';
//api
import { getCoins } from '../../Services/api';
//gif
import Loading from '../../gif/loading2.gif'
// Styles
import styles from "./Landing.module.css";
const Landing = () => {
    const [coins , setCoins] = useState([])
    const [search , setSearch] = useState("")
    useEffect(() => {
        const fetchAPI = async () => {
            const data = await getCoins();
            setCoins(data)
            console.log(data)
        } 
        fetchAPI()
    }, [])
    const searchHandler = (event) => {
        setSearch(event.target.value)
    }
    const searchCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()) )
    return (
        <>
        
            <input
                className={styles.input}
                type="text"
                placeholder='Search'
                value={search}
                onChange={searchHandler}
            />
            
            {
                coins.length ?
                    <div className={styles.coinContainer}>
                        {
                            searchCoins.map((coin) => <Coin
                                key={coin.id}
                                name={coin.name}
                                image={coin.image}
                                symbol={coin.symbol}
                                price={coin.current_price}
                                marketCap={coin.market_cap}
                                priceChange={coin.price_change_percentage_24h}
                            />)
                        }
                    </div> :
                    <div>
                        <img src={Loading} alt='Loading' />
                    </div>
            } 
        </>
    );
};

export default Landing;