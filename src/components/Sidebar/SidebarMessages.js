import React from 'react';
import styled from 'styled-components';
import ChannelList from './ChannelList';
import StarredList from './StarredList';
import DirectMessagesList from './DirectMessagesList';

const SidebarMessages = () => (
  <StyledSidebarMessages>
    <StarredList />
    <ChannelList />
    <DirectMessagesList />
  </StyledSidebarMessages>
);

const StyledSidebarMessages = styled.nav`
  min-height: 0;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  max-height: calc(100vh - 38px - 64px);
  padding-bottom: 12px;
  color: ${({ theme }) => theme.colors.purpleLight}
`;

export default SidebarMessages;
