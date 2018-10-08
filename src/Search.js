import React from 'react';
import styled from 'styled-components';
import { backgroundColor2, fontSize2 } from './Style';
import { WhiteText }  from './Text'; 

const SearchContainer = styled.div`
    margin-top: 40px;
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-gap: 20px;
`;

const SearchInput = styled.input`
    ${backgroundColor2}
    color: white;
    border: 1px solid;
    ${fontSize2}
    place-self: center left;
    margin: 5px;
    height: 25px;
`;

export default function(){
    return (
        <SearchContainer>
            <WhiteText>Search all coins</WhiteText>
            <SearchInput />
        </SearchContainer>
    )
};
