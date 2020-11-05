import React from 'react';
import styled from 'styled-components';
import ChannelList from './ChannelList';
import StarredList from './StarredList';
import DirectMessagesList from './DirectMessagesList';
import { headerHeight, navigationBarHeight } from '../Shared/Shared.style';

const SidebarMessages = React.memo(() => (
  <StyledSidebarMessages>
    <StarredList />
    <ChannelList />
    <DirectMessagesList />
  </StyledSidebarMessages>
));

const StyledSidebarMessages = styled.nav`
  min-height: 0;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  max-height: calc(100vh - ${navigationBarHeight}px - ${headerHeight}px);
  padding-bottom: 12px;
  color: ${({ theme }) => theme.colors.purpleLight}
`;

export default SidebarMessages;
