import React from 'react';
import { HiOutlineHashtag } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { ChannelName, HashIconChannel, StyledChannel } from './Channel.style';
import { changePrivateChannel } from '../../features/channels/channelFlows';

const DirectMessage = ({ user, activeChannel }) => {
  const { displayName, id } = user;
  const dispatch = useDispatch();

  return (
    <StyledChannel
      onClick={() => dispatch(changePrivateChannel(user))}
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
