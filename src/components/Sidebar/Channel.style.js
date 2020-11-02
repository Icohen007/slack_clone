import styled from 'styled-components';
import { centeredFlex } from '../Shared/Shared.style';

export const StyledChannel = styled.li`
  display: flex;
  align-items: center;
  padding: 3px 12px 3px 30px;
  user-select: none;
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? '#1164A3' : 'inherit')};
  color: ${({ isActive }) => (isActive ? 'white' : 'inherit')};

  &:hover {
    background-color: ${({ theme, isActive }) => (isActive ? '#1164A3' : theme.colors.purpleDark2)};
  }
`;

export const HashIconChannel = styled.span`
  ${centeredFlex};
  background: rgba(255,255,255,0.1);
  height: 20px;
  width: 20px;
  border-radius: 4px;
  margin-right: 8px;
`;

export const ChannelName = styled.span`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export const StatusIndicator = styled.span`
font-size: 20px;
color: ${({ isOnline, theme }) => (isOnline ? theme.colors.greenLight : theme.colors.redDark)};
margin-left: auto;
margin-right: 15px;
`;
