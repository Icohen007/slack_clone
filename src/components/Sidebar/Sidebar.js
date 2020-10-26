import React from 'react';
import styled from 'styled-components';
import SidebarHeader from './SidebarHeader';
import SidebarMessages from './SidebarMessages';

const Sidebar = () => (
  <StyledSidebar>
    <SidebarHeader />
    <SidebarMessages />
  </StyledSidebar>
);

const StyledSidebar = styled.section`
grid-area: sidebar;
background: ${({ theme }) => theme.colors.purpleDark};
color: white;
height: 100%;
overflow: hidden;
`;

export default Sidebar;
