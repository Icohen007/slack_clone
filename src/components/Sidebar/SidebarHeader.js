import React from 'react';
import styled from 'styled-components';
import {
  ButtonUnstyled, Centered, headerHeight,
} from '../Shared/Shared.style';
import NewMessageButton from './NewMessageButton';
import { UserImage } from '../Shared';

const SidebarHeader = () => (
  <StyledSidebarHeader>
    <HeaderButton type="button">
      <Centered style={{ height: 50 }}>
        <UserImage src="./slack_text_logo.svg" style={{ width: 'auto' }} />
      </Centered>
    </HeaderButton>
    <NewMessageButton />
  </StyledSidebarHeader>
);

const StyledSidebarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${headerHeight}px;
    padding: 0 16px;
    box-shadow: 0 1px 0 0 rgba(255,255,255,0.1);
    
    &:hover {
    background: ${({ theme }) => theme.colors.purpleDark2};
    }
    
`;

const HeaderButton = styled(ButtonUnstyled)`
      font-weight: 900;
      user-select: none;
      cursor: auto;
      
      svg {
      font-size: 16px;
      }
`;

export default SidebarHeader;
