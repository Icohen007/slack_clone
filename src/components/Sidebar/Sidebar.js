import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import SidebarHeader from './SidebarHeader';
import SidebarMessages from './SidebarMessages';

const Sidebar = () => {
  const { sidebarOpen } = useSelector((state) => state.sidebar);
  return (
    <StyledSidebar onClick={(e) => e.stopPropagation()} sidebarOpen={sidebarOpen}>
      <SidebarHeader />
      <SidebarMessages />
    </StyledSidebar>
  );
};

const StyledSidebar = styled.section`
grid-area: sidebar;
background: ${({ theme }) => theme.colors.purpleDark};
color: white;
height: 100%;
overflow: hidden;
transition: transform .15s ease-in-out;

@media only screen and (max-width: 768px) {
position: absolute;
left: 0;
top: 0;
z-index: 2; // to override ClickBlocker
width: 260px;
transform: ${({ sidebarOpen }) => (sidebarOpen ? 'translateX(0px)' : 'translateX(-260px)')};
}
`;

export default Sidebar;
