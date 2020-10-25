import React from 'react';
import styled from 'styled-components';
import MessagesHeader from './MessagesHeader';
import Messages from './Messages';

const StyledPrimaryView = styled.section`
grid-area: primary-view;
color: ${({ theme }) => theme.colors.black1};
height: calc(100% - 38px);
`;

const PrimaryView = () => (
  <StyledPrimaryView>
    <MessagesHeader />
    <Messages />
  </StyledPrimaryView>
);

export default PrimaryView;
