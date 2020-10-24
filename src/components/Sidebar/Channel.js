import React from 'react';
import { HiOutlineHashtag } from 'react-icons/hi';
import styled from 'styled-components';
import { centeredFlex } from '../Shared/Shared.style';

const Channel = ({ name }) => (
  <StyledChannel>
    <HashIconChannel>
      <HiOutlineHashtag />
    </HashIconChannel>
    <ChannelName>
      {name}
    </ChannelName>
  </StyledChannel>
);

const StyledChannel = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 4px 12px 4px 30px;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.purpleDark2};
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
