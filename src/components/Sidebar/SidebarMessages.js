import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChannelList from './ChannelList';
import { db, auth } from '../../firebase';

const addChannel = async (channelsRef, channel) => {
  try {
    await channelsRef.add(channel);
  } catch (serverError) {
    console.log(serverError);
  }
};

const SidebarMessages = () => {
  const channelsRef = db.collection('channels');
  const query = channelsRef.orderBy('createdAt').limit(25);
  const [channels] = useCollectionData(query);

  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }

    console.log({ channels });
    console.log(auth.currentUser.displayName);
    console.log(auth.currentUser.photoURL);

    // addChannel(channelsRef, {
    //   name: 'bla',
    //   description: 'blabla',
    //   createdBy: {
    //     name: auth.currentUser.displayName,
    //   },
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    // });
  }, [auth.currentUser]);

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
