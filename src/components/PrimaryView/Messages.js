import React from 'react';
import styled from 'styled-components';
import Message from './Message';

const Messages = () => (
  <StyledMessages>
    <Message />
    <Message />
    <Message />
    <Message />
    <Message />
    <Message />
    <Message />
    <Message />
    <Message />
  </StyledMessages>

);

const StyledMessages = styled.div`
flex: 1;
overflow-y: auto;
max-height: calc(100vh - 38px - 64px - 110px);
min-height: calc(100vh - 38px - 64px - 110px);
position: relative;
`;

export default Messages;
