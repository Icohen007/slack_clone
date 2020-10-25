import React from 'react';
import styled from 'styled-components';
import { FaSlackHash } from 'react-icons/fa';
import { ButtonUnstyled, Centered } from '../Shared/Shared.style';
import NewMessageButton from './NewMessageButton';

const SidebarHeader = () => (
  <StyledSidebarHeader>
    <HeaderButton type="button">
      <Centered gap={6}>
        <span>
          Slack
          {' '}
        </span>
        <FaSlackHash />
      </Centered>
    </HeaderButton>
    <NewMessageButton />
  </StyledSidebarHeader>
);

const StyledSidebarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    padding: 0 16px;
    box-shadow: 0 1px 0 0 rgba(255,255,255,0.1);
    
    &:hover {
    background: ${({ theme }) => theme.colors.purpleDark2};
    }
    
`;

const HeaderButton = styled(ButtonUnstyled)`
      font-weight: 900;
      user-select: none;
`;

export default SidebarHeader;
