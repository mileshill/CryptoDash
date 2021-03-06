import React from 'react';
import styled, { css } from 'styled-components';
//import _ from 'lodash';
import { subtleBoxShadow, lightBlueBackground, greenBoxShadow, redBoxShadow } from './Style';

export const CoinGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    ${props => props.count && css`
        grid-template-columns: repeat(${props.count > 5 ? props.count : 5}, 1fr);
    `}
    grid-gap: 15px;
    margin-top: 40px;
`;

export const CoinTile = styled.div`
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
    ${props => props.currentFavorite && css`
       ${greenBoxShadow}
        &:hover{
           pointer-events: none,
       } 
    `}
    }`;

export const CoinHeaderGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;`;

export const CoinSymbol = styled.div`
    justify-self: right;`; 

export const DeleteIcon = styled.div`
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
        ((this.state.filteredCoins && Object.keys(this.state.filteredCoins)) || Object.keys(this.state.coinList).slice(0, 50));
    return (
        <CoinGrid count={favorites && this.state.favorites.length}>
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