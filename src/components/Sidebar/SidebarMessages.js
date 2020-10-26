import React from 'react';
import styled from 'styled-components';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChannelList from './ChannelList';
import { db } from '../../firebase';

const SidebarMessages = () => {
  const channelsRef = db.collection('channels');
  const query = channelsRef.orderBy('createdAt').limit(25);
  const [channels] = useCollectionData(query);

  return (
    <StyledSidebarMessages>
      <ChannelList categoryName="Starred" />
      <ChannelList categoryName="Channels" />
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
