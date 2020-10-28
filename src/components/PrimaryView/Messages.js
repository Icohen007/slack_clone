import React from 'react';
import styled from 'styled-components';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import Message from './Message';
import { db } from '../../firebase';

const Messages = () => {
  const { activeChannel } = useSelector((state) => state.channels);
  const publicMessagesRef = db.collection('channelMessages').doc(activeChannel.id).collection('messages').orderBy('createdAt');
  const [messages, loading, error] = useCollectionData(publicMessagesRef, { idField: 'id' });
  const isReady = !loading && !error;

  if (!isReady) {
    return null;
  }

  return (
    <StyledMessages>
      {messages.map((message) => <Message key={message.id} message={message} />)}
    </StyledMessages>

  );
};

const StyledMessages = styled.div`
flex: 1;
overflow-y: auto;
max-height: calc(100vh - 38px - 64px - 110px);
min-height: calc(100vh - 38px - 64px - 110px);
position: relative;
`;

export default Messages;
