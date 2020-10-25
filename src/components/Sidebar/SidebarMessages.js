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
  max-height: 100%;
  width: 100%; 
  color: ${({ theme }) => theme.colors.purpleLight};
`;

export default SidebarMessages;
