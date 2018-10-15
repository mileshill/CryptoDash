import React from 'react'
import { CoinGrid, CoinTile, CoinHeaderGrid, CoinSymbol, DeleteIcon } from './CoinList';
import { subtleBoxShadow, lightBlueBackground, greenBoxShadow, redBoxShadow } from './Style';



export default function(){
    return(
    <CoinGrid>
    {   this.state.prices.map((price, idx) => {
            let sym = Object.keys(price)[0];
            let data = price[sym]['USD'];
            return (
                <CoinTile key={idx}>
                   <CoinHeaderGrid>
                    <div>{sym}</div>
                    <CoinSymbol>${data.CHANGEPCT24HOUR}</CoinSymbol>
                </CoinHeaderGrid>
                </CoinTile>
        )})}
    </CoinGrid>
    )
    
}