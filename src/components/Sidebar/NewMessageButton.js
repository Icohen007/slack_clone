import React from 'react';
import styled from 'styled-components';
import { FiEdit } from 'react-icons/fi';
import { Tooltip } from 'react-tippy';
import { ButtonUnstyled, centeredFlex } from '../Shared/Shared.style';
import TooltipContent from '../Shared/TooltipContent';

const StyledNewMessageButton = styled(ButtonUnstyled)`
${centeredFlex};
width: 36px;
height: 36px;
border-radius: 50%;
background: white;
box-shadow: 0 1px 3px rgba(0,0,0,.08);
transition-property: box-shadow,transform,background-color;
transition-duration: 80ms;
transition-timing-function: cubic-bezier(.175,.875,.5,1.5);
color: ${({ theme }) => theme.colors.purpleDark};
 
    &:active {
    transform: scale(.95);
    background-color: rgb(232,226,232);
    }
`;

const NewMessageButton = () => (
  <Tooltip position="bottom" arrow html={<TooltipContent> New message </TooltipContent>}>
    <StyledNewMessageButton>
      <FiEdit />
    </StyledNewMessageButton>
  </Tooltip>
);

export default NewMessageButton;
