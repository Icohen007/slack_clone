import React from 'react';
import { HiOutlineHashtag } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { ChannelName, HashIconChannel, StyledChannel } from './Channel.style';
import { changePrivateChannel } from '../../features/channels/channelFlows';
import { toggleSidebar } from '../../features/sidebar/sidebarSlice';

const DirectMessage = ({ user, activeChannel }) => {
  const { displayName, id } = user;
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
      <HashIconChannel>
        <HiOutlineHashtag />
      </HashIconChannel>
      <ChannelName>
        {displayName}
      </ChannelName>
    </StyledChannel>
  );
};

export default DirectMessage;
