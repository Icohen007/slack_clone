import React from 'react';
import { useDispatch } from 'react-redux';
import { BsCircleFill } from 'react-icons/bs';
import {
  ChannelName, HashIconChannel, StatusIndicator, StyledChannel,
} from './Channel.style';
import { changePrivateChannel } from '../../features/channels/channelFlows';
import { toggleSidebar } from '../../features/sidebar/sidebarSlice';
import { Centered } from '../Shared/Shared.style';
import { UserImage } from '../Shared';

const DirectMessage = ({ user, activeChannel, isOnline }) => {
  const { displayName, id, photoURL } = user;
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(toggleSidebar());
    dispatch(changePrivateChannel(user));
  };

  return (
    <StyledChannel
      onClick={handleClick}
      isActive={activeChannel.id === id}
    >
      <Centered justify="flex-start">
        <HashIconChannel>
          <UserImage
            src={photoURL || '/dummy36.png'}
            alt={displayName || 'User name'}
          />
          <StatusIndicator isOnline={isOnline}><BsCircleFill /></StatusIndicator>
        </HashIconChannel>
        <ChannelName>
          {displayName}
        </ChannelName>
      </Centered>
    </StyledChannel>
  );
};

export default DirectMessage;
