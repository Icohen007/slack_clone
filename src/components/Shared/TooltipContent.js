import React from 'react';
import styled from 'styled-components';
import { Centered } from './Shared.style';

const TooltipContent = ({ children, notSupported, ...rest }) => (
  <StyledTooltip {...rest}>
    {children}
    {notSupported
     && (
     <span className="not-supported">
       (Not supported)
     </span>
     )}
  </StyledTooltip>
);

export default TooltipContent;

export const StyledTooltip = styled(Centered)`
font-size: 14px;
font-weight: bold;
color: ${({ color }) => (color || 'white')};

.not-supported {
color: #ff4949;
margin-left: 4px;
font-size: 12px;
}

`;
