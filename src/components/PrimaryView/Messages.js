import React from 'react';
import styled from 'styled-components';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Message from './Message';
import { headerHeight, navigationBarHeight } from '../Shared/Shared.style';

const Messages = ({ messagesRef, formHeight }) => {
  const [messages, loading, error] = useCollectionData(messagesRef.orderBy('createdAt'), { idField: 'id' });
  const isReady = !loading && !error;

  if (!isReady) {
    return null;
  }

  return (
    <StyledMessages formHeight={formHeight}>
      {messages.map((message) => <Message key={message.id} message={message} />)}
    </StyledMessages>

  );
};

const StyledMessages = styled.div`
flex: 1;
overflow-y: auto;
max-height: calc(100vh - ${navigationBarHeight}px - ${headerHeight}px - ${({ formHeight }) => formHeight}px - 10px);
position: relative;
`;

export default Messages;
