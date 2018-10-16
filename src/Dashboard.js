import React from 'react'
import { CoinGrid, CoinTile, CoinHeaderGrid, CoinSymbol } from './CoinList';
import { fontSizeBig, fontSize3, subtleBoxShadow, lightBlueBackground } from './Style';
import styled, { css } from 'styled-components';

import highchartsConfig from './HighChartsConfig';
import highchartsTheme from './HighChartsTheme';
const ReactHighCharts = require('react-highcharts');
ReactHighCharts.Highcharts.setOptions(highchartsTheme());

const numberFormat = number => {
    return +(number + '').slice(0,7);
}

const ChangePct = styled.div`
    color:green;
    ${props => props.red && css`
        color:red`
    }
`;

const TickerPrice = styled.div`
    ${fontSizeBig}
`;

const CoinTileCompact = CoinTile.extend`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    ${fontSize3}
    grid-gap: 5px;
    justify-items: right;
`;

const PaddingBlue = styled.div`
    ${subtleBoxShadow}
    ${lightBlueBackground}
    padding: 5px; 
`;

const ChartGrid = styled.div`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 3fr;
    margin-top: 15px;
`;

export default function(){
    return [
    <CoinGrid>
    {   this.state.prices.map((price, idx) => {
            let sym = Object.keys(price)[0];
            let data = price[sym]['USD'];
            let tileProps = {
                currentFavorite: sym === this.state.currentFavorite,
                onClick: () => {
                    this.setState({currentFavorite: sym});
                    localStorage.setItem('cryptoDash', JSON.stringify({
                        ...JSON.parse(localStorage.getItem('cryptoDash')),
                        currentFavorite: sym
                    }))
                }
            };
            return idx < 5 ? (
                <CoinTile key={idx} {...tileProps}>
                   <CoinHeaderGrid>
                    <div>{sym}</div>
                    <CoinSymbol>
                        <ChangePct red={data.CHANGEPCT24HOUR < 0}>
                            {numberFormat(data.CHANGEPCT24HOUR)}%
                        </ChangePct>
                    </CoinSymbol>
                </CoinHeaderGrid>
                <div>
                    <TickerPrice>
                        $ {numberFormat(data.PRICE)}
                    </TickerPrice>
                </div>
                </CoinTile>
            ) :
            <CoinTileCompact {...tileProps}>
                <div style={{justifySelf: 'left'}}>{sym}</div>
                    <CoinSymbol>
                        <ChangePct red={data.CHANGEPCT24HOUR < 0}>
                            {numberFormat(data.CHANGEPCT24HOUR)}%
                        </ChangePct>
                    </CoinSymbol>
                    <div>
                        $ {numberFormat(data.PRICE)}
                    </div>
            </CoinTileCompact>
    })}
    </CoinGrid>,
    // END COIN GRID; BEGIN PICTURE
    <ChartGrid>
        <PaddingBlue>
            <h2 style={{textAlign: 'center'}}>{this.state.coinList[this.state.currentFavorite].CoinName}</h2>
            <img style={{height: '200px', width: '200px', display: 'block', margin: 'auto'}} src={`http://cryptocompare.com/${this.state.coinList[this.state.currentFavorite].ImageUrl}`} alt=''/>

        </PaddingBlue>
        <PaddingBlue>
            <ReactHighCharts config={highchartsConfig.call(this)} />
        </PaddingBlue>
    </ChartGrid>
    ]
    
}