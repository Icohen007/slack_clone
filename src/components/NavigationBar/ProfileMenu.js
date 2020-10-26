import React from 'react';
import styled from 'styled-components';
import Divider from '../Auth/Divider';
import { auth } from '../../firebase';
import { Image } from '../Shared/Shared.style';
// color: ${({ theme }) => theme.colors.black1};
const StyledProfileMenu = styled.div`
width: 300px;
max-width: 360px;
min-width: 200px;
overflow-y: auto;
max-height: calc(100vh - 20px);
background-color: rgb(248,248,248);
border-radius: 6px;
user-select: none;
padding: 12px 0;

.user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 20px 12px 24px;
  color: #1D1C1D;
  
  .img-container {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  overflow: hidden;
  }
  
  .user-name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 900;
  }
}
`;
const StyledProfileMenuButtonContainer = styled.div`
    color: rgb(29,28,29);
    cursor: pointer;
    &:hover {
    background: rgb(18,100,163);
    color: white;
    }
`;

const StyledProfileMenuButton = styled.button`
    border: 0;
    color: inherit;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    min-height: 28px;
    width: 100%;
    overflow-x: hidden;
    padding: 0 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
`;

const ProfileMenu = () => (
  <StyledProfileMenu>
    <div className="user">
      <div className="img-container">
        <Image src={(auth.currentUser && auth.currentUser.photoURL) || '/dummy36.png'} alt={(auth.currentUser && auth.currentUser.displayName) || 'User name'} />
      </div>
      <div className="user-name">{(auth.currentUser && auth.currentUser.displayName) || 'User name'}</div>
    </div>
    <Divider />
    <StyledProfileMenuButtonContainer>
      <StyledProfileMenuButton type="button" onClick={() => auth.signOut()}>Sign out of Slack</StyledProfileMenuButton>
    </StyledProfileMenuButtonContainer>
  </StyledProfileMenu>
);

export default ProfileMenu;
