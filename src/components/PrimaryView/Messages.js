import React from 'react';
import styled from 'styled-components';
import Message from './Message';

const Messages = () => (
  <StyledMessages>
    <Message />
    <Message />
    <Message />
    <Message />

  </StyledMessages>
);

const StyledMessages = styled.div`
`;

export default Messages;
