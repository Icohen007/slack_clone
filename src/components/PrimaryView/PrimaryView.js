import React from 'react';
import styled from 'styled-components';
import MessagesHeader from './MessagesHeader';
import Messages from './Messages';
import MessageForm from './MessageForm';

const StyledPrimaryView = styled.section`
grid-area: primary-view;
color: ${({ theme }) => theme.colors.black1};
height: 100%;
position: relative;
overflow: hidden;
`;

const PrimaryView = () => (
  <StyledPrimaryView>
    <MessagesHeader />
    <Messages />
    <MessageForm />
  </StyledPrimaryView>
);

export default PrimaryView;
