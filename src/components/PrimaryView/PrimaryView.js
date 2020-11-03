import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import useResizeObserver from 'use-resize-observer';
import PublicMessagesHeader from './PublicMessagesHeader';
import Messages from './Messages';
import MessageForm from './MessageForm';
import PrivateMessagesHeader from './PrivateMessagesHeader';

const StyledPrimaryView = styled.section`
grid-area: primary-view;
background: ${({ theme }) => theme.colors.white};
color: ${({ theme }) => theme.colors.black1};
height: 100%;
position: relative;
overflow: hidden;
`;

const PrimaryView = ({ messagesRef }) => {
  const { activeChannel, isPrivateChannelMode } = useSelector((state) => state.channels);
  const { ref: containerRef, height = 1 } = useResizeObserver();

  return (
    <StyledPrimaryView>
      {isPrivateChannelMode ? (
        <PrivateMessagesHeader activeChannel={activeChannel} />
      ) : (
        <PublicMessagesHeader activeChannel={activeChannel} messagesRef={messagesRef} />
      )}
      <Messages
        activeChannel={activeChannel}
        isPrivateChannelMode={isPrivateChannelMode}
        messagesRef={messagesRef}
        formHeight={height}
      />
      <MessageForm messagesRef={messagesRef} containerRef={containerRef} />
    </StyledPrimaryView>
  );
};

export default PrimaryView;
