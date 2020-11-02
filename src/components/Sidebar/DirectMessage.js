import React from 'react';
import { HiOutlineHashtag } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import {
  ChannelName, HashIconChannel, StatusIndicator, StyledChannel,
} from './Channel.style';
import { changePrivateChannel } from '../../features/channels/channelFlows';
import { toggleSidebar } from '../../features/sidebar/sidebarSlice';
import { Centered } from '../Shared/Shared.style';

const DirectMessage = ({ user, activeChannel, isOnline }) => {
  const { displayName, id } = user;
  const dispatch = useDispatch();
  console.log({ isOnline });
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
          <HiOutlineHashtag />
        </HashIconChannel>
        <ChannelName>
          {displayName}
        </ChannelName>
      </Centered>
      <StatusIndicator isOnline={isOnline}>●</StatusIndicator>
    </StyledChannel>
  );
};

export default DirectMessage;
