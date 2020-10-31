import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import useResizeObserver from 'use-resize-observer';
import PublicMessagesHeader from './PublicMessagesHeader';
import Messages from './Messages';
import MessageForm from './MessageForm';
import PrivateMessagesHeader from './PrivateMessagesHeader';
import { db, auth } from '../../firebase';

const StyledPrimaryView = styled.section`
grid-area: primary-view;
color: ${({ theme }) => theme.colors.black1};
height: 100%;
position: relative;
overflow: hidden;
`;

const PrimaryView = () => {
  const { activeChannel, isPrivateChannelMode } = useSelector((state) => state.channels);
  const { ref: containerRef, height = 1 } = useResizeObserver();

  const getChannelId = (userId) => {
    const currentUserId = auth.currentUser.uid;
    return userId < currentUserId
      ? `${userId}-${currentUserId}`
      : `${currentUserId}-${userId}`;
  };

  const messagesRef = isPrivateChannelMode ? db.collection('privateMessages').doc(getChannelId(activeChannel.id)).collection('messages')
    : db.collection('channelMessages').doc(activeChannel.id).collection('messages');

  return (
    <StyledPrimaryView>
      {isPrivateChannelMode ? (
        <PrivateMessagesHeader activeChannel={activeChannel} />
      ) : (
        <PublicMessagesHeader activeChannel={activeChannel} />
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
