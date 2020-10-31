import React from 'react';
import styled from 'styled-components';
import { FixedFullscreen } from './Shared.style';

const Spinner = ({
  size = 70, primaryColor = '#22addb', secondaryColor = '#cecece', fullWindow, ...rest
}) => (
  fullWindow ? (
    <FullWindow>
      <StyledSpinner
        size={size}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        {...rest}
      />
    </FullWindow>
  )
    : (
      <StyledSpinner
        size={size}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        {...rest}
      />
    )
);

const StyledSpinner = styled.div`
width: ${({ size }) => size}px;
height: ${({ size }) => size}px;
border: ${({ size }) => size / 10}px solid ${({ secondaryColor }) => secondaryColor};
border-top: ${({ size }) => size / 10}px solid ${({ primaryColor }) => primaryColor};
border-radius: 50%;
animation: spinner 1.2s linear 0s infinite;

@keyframes spinner {
0% {
transform: rotate(0deg);
}

100% {
transform: rotate(360deg);

}

}
`;

const FullWindow = styled(FixedFullscreen)`
background-color: rgba(0,15,54,0.15);
`;

export default Spinner;
