import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import Message from './Message';
import { headerHeight, navigationBarHeight } from '../Shared/Shared.style';

const Messages = React.memo(({ messagesRef, formHeight }) => {
  const [messages, loading, error] = useCollectionData(messagesRef.orderBy('createdAt'), { idField: 'id' });
  const { activeChannelSearch } = useSelector((state) => state.channels);

  const bottomContainerRef = useRef();
  const isReady = !loading && !error;

  useEffect(() => {
    messagesRef.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (bottomContainerRef.current && change.type === 'added') {
          setTimeout(() => bottomContainerRef.current.scrollIntoView({ behavior: 'smooth' }));
        }
      });
    });
  }, [messagesRef]);

  useEffect(() => {
    if (isReady) {
      bottomContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <StyledMessages formHeight={formHeight}>
      {messages
        .filter((message) => !message.cleanContent
                             || message.cleanContent.toLowerCase()
                               .includes(activeChannelSearch.toLowerCase()))
        .map((message) => (
          <Message
            key={message.id}
            message={message}
          />
        ))}
      <div ref={bottomContainerRef} />
    </StyledMessages>

  );
});

const StyledMessages = styled.div`
flex: 1;
overflow-y: auto;
max-height: calc(100vh - ${navigationBarHeight}px - ${headerHeight}px - ${({ formHeight }) => formHeight}px - 10px);
position: relative;
background: ${({ theme }) => theme.colors.white};
color: ${({ theme }) => theme.colors.black1};
`;

export default Messages;
