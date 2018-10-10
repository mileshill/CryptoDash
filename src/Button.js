import styled from 'styled-components';
import { fontSize1, greenBoxShadow } from './Style';

export const ConfirmButton = styled.div`
    margin: 20px;
    color: #1163c9;
    ${fontSize1}
    font-family: Exo 2, sans-serif;
    color: #42ff3a;
    padding: 5px;
    &: hover {
        ${greenBoxShadow}
        cursor: pointer;
    }
`;