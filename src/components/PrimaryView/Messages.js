import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import Message from './Message';
import { headerHeight, navigationBarHeight } from '../Shared/Shared.style';

const Messages = ({ messagesRef, formHeight }) => {
  const [messagesSnapshot, loading, error] = useCollection(messagesRef.orderBy('createdAt'));
  const { activeChannelSearch } = useSelector((state) => state.channels);

  const bottomContainerRef = useRef();
  const isReady = !loading && !error;

  useEffect(() => {
    if (isReady) {
      messagesSnapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          bottomContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }, [messagesSnapshot]);

  if (!isReady) {
    return null;
  }

  return (
    <StyledMessages formHeight={formHeight}>
      {messagesSnapshot.docs
        .map((message) => ({ id: message.id, ...message.data() }))
        .filter((message) => !message.cleanContent || message.cleanContent.includes(activeChannelSearch))
        .map((message) => (
          <Message
            key={message.id}
            message={message}
          />
        ))}
      <div ref={bottomContainerRef} />
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
