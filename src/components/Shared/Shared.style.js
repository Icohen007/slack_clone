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

export const Image = styled.img`
  display: block;
  height: 100%;
  width: 100%;
`;

export const TooltipContent = styled(Centered)`
font-size: 14px;
font-weight: bold;
color: ${({ color }) => (color || 'white')}
`;

export const AccordionButton = styled(ButtonUnstyled)`
  ${centeredFlex};
  border-radius: 4px;
  margin-right: 4px;
  height: 26px;
  width: 26px;
  &:hover {
    background: rgba(255,255,255,0.1);
  }
  
  svg {
      font-size: 18px;
  }
`;
