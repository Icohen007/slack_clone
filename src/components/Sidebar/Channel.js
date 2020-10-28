import React from 'react';
import { HiOutlineHashtag } from 'react-icons/hi';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { centeredFlex } from '../Shared/Shared.style';
import changePublicChannel from '../../features/channels/changePublicChannel';

const Channel = ({ channel, activeChannel }) => {
  const { name, id } = channel;
  const dispatch = useDispatch();

  // clearNotifications
  // remove typing

  return (
    <StyledChannel onClick={() => dispatch(changePublicChannel(channel))} isActive={activeChannel.id === id}>
      <HashIconChannel>
        <HiOutlineHashtag />
      </HashIconChannel>
      <ChannelName>
        {name}
      </ChannelName>
    </StyledChannel>
  );
};

const StyledChannel = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 4px 12px 4px 30px;
  user-select: none;
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? '#1164A3' : 'inherit')};
  color: ${({ isActive }) => (isActive ? 'white' : 'inherit')};

  &:hover {
    background-color: ${({ theme, isActive }) => (isActive ? '#1164A3' : theme.colors.purpleDark2)};
  }
`;

const HashIconChannel = styled.span`
  ${centeredFlex};
  background: rgba(255,255,255,0.1);
  height: 20px;
  width: 20px;
  border-radius: 4px;
  margin-right: 8px;
`;

const ChannelName = styled.span`

`;

export default Channel;
