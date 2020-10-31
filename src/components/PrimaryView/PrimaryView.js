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

const getChannelId = (currentUserId, otherUserId) => (
  otherUserId < currentUserId
    ? `${otherUserId}-${currentUserId}`
    : `${currentUserId}-${otherUserId}`
);

const PrimaryView = () => {
  const { activeChannel, isPrivateChannelMode } = useSelector((state) => state.channels);
  const { ref: containerRef, height = 1 } = useResizeObserver();
  const messagesRef = isPrivateChannelMode
    ? db.collection('privateMessages')
      .doc(getChannelId(auth.currentUser.uid, activeChannel.id))
      .collection('messages')
    : db.collection('channelMessages')
      .doc(activeChannel.id)
      .collection('messages');

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
