import React from 'react';
import styled from 'styled-components';
import Message from './Message';
import MessageForm from './MessageForm';

const Messages = () => (
  <StyledMessages>
    <MessagesContainer>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </MessagesContainer>
    <MessageForm />
  </StyledMessages>

);

const StyledMessages = styled.div`
display: flex;
flex-direction: column;
position: relative;
`;

const MessagesContainer = styled.div`
flex: 1;
overflow-y: auto;
max-height: calc(100vh - 38px - 64px - 130px);
min-height: calc(100vh - 38px - 64px - 130px);
`;

export default Messages;
