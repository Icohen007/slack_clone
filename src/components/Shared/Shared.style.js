import styled, { css } from 'styled-components';

export const Centered = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: ${({ gap }) => gap}px;
`;

export const ButtonUnstyled = styled.button`
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    margin: 0;
    line-height: inherit;
    overflow: initial;
    padding: 0;
    text-align: initial;
    vertical-align: initial;
    cursor: pointer;
    outline: none;
`;

export const centeredFlex = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TooltipContent = styled(Centered)`
font-size: 14px;
font-weight: bold;
`;
