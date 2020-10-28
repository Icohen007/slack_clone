import React from 'react';
import styled from 'styled-components';
import ChannelList from './ChannelList';
import StarredList from './StarredList';

const SidebarMessages = () => {

  return (
    <StyledSidebarMessages>
      {/*<StarredList />*/}
      <ChannelList />
    </StyledSidebarMessages>
  );
};

const StyledSidebarMessages = styled.nav`
  min-height: 0;
  max-height: 100%;
  width: 100%; 
  color: ${({ theme }) => theme.colors.purpleLight};
`;

export default SidebarMessages;
