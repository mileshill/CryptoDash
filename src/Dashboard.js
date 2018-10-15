import React from 'react'
import { CoinGrid, CoinTile, CoinHeaderGrid, CoinSymbol } from './CoinList';
import { fontSizeBig, fontSize3, subtleBoxShadow, lightBlueBackground } from './Style';
import styled, { css } from 'styled-components';

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
    padding:10px;
`;

export default function(){
    return(
    <CoinGrid>
    {   this.state.prices.map((price, idx) => {
            let sym = Object.keys(price)[0];
            let data = price[sym]['USD'];
            return idx < 5 ? (
                <CoinTile key={idx}>
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
            <CoinTileCompact>
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
    </CoinGrid>
    )
    
}