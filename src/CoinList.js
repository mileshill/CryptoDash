import React from 'react';
import styled from 'styled-components';
import { subtleBoxShadow, lightBlueBackground, greenBoxShadow } from './Style';

const CoinGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
    margin-top: 40px;
`;

const CoinTile = styled.div`
    ${subtleBoxShadow}
    ${lightBlueBackground}
    padding: 10px;
    transition: transform .2s;
    
    &:hover{
        cursor: pointer;
        color: white;
        font-weight: bold;
        transform: scale(1.1);
        ${greenBoxShadow}
    }
    }`;

const CoinHeaderGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;`;

const CoinSymbol = styled.div`
    justify-self: right;`; 

export default function() {
    console.log('CoinSample', this.state.coinList['BTC']);
    return (
        <CoinGrid>
        {
            Object.keys(this.state.coinList).slice(0, 50).map((coin, idx) => 
                <CoinTile key={idx}>
                <CoinHeaderGrid>
                    <div>{this.state.coinList[coin].CoinName}</div>
                    <CoinSymbol>{this.state.coinList[coin].Symbol}</CoinSymbol>
                </CoinHeaderGrid>
                <img style={{height: '50px'}} src={`http://cryptocompare.com/${this.state.coinList[coin].ImageUrl}`} alt=''/>
                </CoinTile>)
        }
        </CoinGrid>
    );
}