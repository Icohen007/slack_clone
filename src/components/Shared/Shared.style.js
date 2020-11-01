import styled, { css } from 'styled-components';

export const navigationBarHeight = 38;
export const headerHeight = 64;

export const Centered = styled.div`
display: flex;
align-items: center;
justify-content: ${({ justify }) => justify || 'center'};
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

export const FixedFullscreen = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;
