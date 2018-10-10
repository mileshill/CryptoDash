import React from 'react';
import styled, { css } from 'styled-components';
import _ from 'lodash';
import { subtleBoxShadow, lightBlueBackground, greenBoxShadow, redBoxShadow } from './Style';

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
        ${greenBoxShadow}
    }
    ${props => props.favorite && css`
        &:hover{
            ${redBoxShadow}
        }   
    `}
    ${props => props.chosen && !props.favorite && css`
       pointer-events: none;
       opacity: 0.4; 
    `}
    }`;

const CoinHeaderGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;`;

const CoinSymbol = styled.div`
    justify-self: right;`; 

const DeleteIcon = styled.div`
    display: none;
    justify-self: right;
    ${CoinTile}:hover & {
        display: block;
        color:red;
    }
`;

export default function(favorites=false) {
    let coinKeys = favorites ? 
        this.state.favorites : 
        (Object.keys(this.state.filteredCoins || {}) || Object.keys(this.state.coinList).slice(0, 50));
    return (
        <CoinGrid>
        {
            coinKeys.map((coinKey, idx) => 
                <CoinTile 
                    key={idx} 
                    favorite={favorites}
                    chosen={this.isInFavorites(coinKey)} 
                    onClick={favorites ? () => this.removeCoinFromFavorites(coinKey) : () => this.addCoinToFavorites(coinKey)}>
                <CoinHeaderGrid>
                    <div>{this.state.coinList[coinKey].CoinName}</div>
                    {favorites ? 
                        <DeleteIcon>X</DeleteIcon> : 
                        <CoinSymbol>{this.state.coinList[coinKey].Symbol}</CoinSymbol>}
                </CoinHeaderGrid>
                <img style={{height: '50px'}} src={`http://cryptocompare.com/${this.state.coinList[coinKey].ImageUrl}`} alt=''/>
                </CoinTile>)
        }
        </CoinGrid>
    );
}