import React from 'react';
import { HiOutlineHashtag } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { ChannelName, HashIconChannel, StyledChannel } from './Channel.style';
import { changePublicChannel } from '../../features/channels/channelFlows';

const Channel = ({ channel, activeChannel }) => {
  const { name, id } = channel;
  const dispatch = useDispatch();

  // clearNotifications
  // remove typing

  return (
    <StyledChannel
      onClick={() => dispatch(changePublicChannel(channel))}
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
