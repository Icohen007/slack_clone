import React from 'react';
import styled from 'styled-components';
import { FaSlackHash } from 'react-icons/fa';
import { Centered } from '../Shared/Shared.style';
import NewMessageButton from './NewMessageButton';

const StyledSidebar = styled.section`
grid-area: sidebar;
background: ${({ theme }) => theme.colors.purpleDark};
color: white;

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    padding: 0 16px;
    
    &:hover {
    background: ${({ theme }) => theme.colors.purpleDark2};
    }
    
    .header-button {
      font-size: 15px;
      font-weight: 900;
      user-select: none;
    }
    
    
}
`;

const Sidebar = () => (
  <StyledSidebar>
    <div className="header-container">
      <div className="header-button" role="button">
        <Centered gap={6}>
          <span>
            Slack
            {' '}
          </span>
          <FaSlackHash />
        </Centered>
      </div>
      <NewMessageButton />
    </div>
  </StyledSidebar>
);

export default Sidebar;
