import React from 'react';
import { HiOutlineHashtag } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { ChannelName, HashIconChannel, StyledChannel } from './Channel.style';
import { changePublicChannel } from '../../features/channels/channelFlows';
import { toggleSidebar } from '../../features/sidebar/sidebarSlice';

const Channel = ({ channel, activeChannel }) => {
  const { name, id } = channel;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleSidebar());
    dispatch(changePublicChannel(channel));
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
        {name}
      </ChannelName>
    </StyledChannel>
  );
};

export default Channel;
