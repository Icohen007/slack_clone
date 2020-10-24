import React from 'react';
import styled from 'styled-components';
import ChannelList from './ChannelList';

const SidebarMessages = () => (
  <StyledSidebarMessages>
    <ChannelList categoryName="Starred" />
    <ChannelList categoryName="Channels" />
  </StyledSidebarMessages>
);

const StyledSidebarMessages = styled.nav`
  min-height: 0;
  width: 100%; 
  height: 100vh;
  color: ${({ theme }) => theme.colors.purpleLight};
  font-size: 15px;
`;

export default SidebarMessages;
