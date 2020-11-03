import React, { useContext } from 'react';
import styled from 'styled-components';
import { FcHome } from 'react-icons/fc';
import Divider from '../Auth/Divider';
import { auth } from '../../firebase';
import { ButtonUnstyled } from '../Shared/Shared.style';
import { ThemeContext } from '../ThemeProvider';
import { UserImage } from '../Shared';

const StyledProfileMenu = styled.div`
width: 300px;
max-width: 360px;
min-width: 200px;
overflow-y: auto;
max-height: calc(100vh - 20px);
background-color: ${({ theme }) => theme.colors.white2};
color: ${({ theme }) => theme.colors.black1};
border-radius: 6px;
user-select: none;
padding: 12px 0;

.user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 20px 12px 24px;
  text-align: left;
  line-height: 1.2;
  
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
    
    .active {
    font-weight: 400;
    font-size: 14px;
    
    .dot {
    color: ${({ theme }) => theme.colors.greenLight};
    font-size: 20px;
    }
    }
  }
}

.status-container {
  padding: 0 24px 8px;
  .status {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 7px;
  background-color: ${({ theme }) => theme.colors.white};
  
    .status-name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: ${({ theme }) => theme.colors.black1};
  }
  
  svg {
  font-size: 18px;
  }
  }
}


`;
const StyledProfileMenuButtonContainer = styled.div`
    color: ${({ theme }) => theme.colors.black1};
    cursor: pointer;
    &:hover {
    background: rgb(18,100,163);
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
    outline: none;
`;

const ToggleContainer = styled(ButtonUnstyled)`
  background: ${({ theme }) => theme.colors.gradient};
  border: 2px solid ${({ theme }) => theme.colors.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding: 3px;
  position: relative;
  width: 90px;
  height: 40px;

  img {
    height: auto;
    width: 30px;
    transition: all 0.3s linear;
    
    // sun icon
    &:first-child {
      transform: ${({ lightTheme }) => (lightTheme ? 'translateY(0)' : 'translateY(100px)')};
    }
    
    // moon icon
    &:nth-child(2) {
      transform: ${({ lightTheme }) => (lightTheme ? 'translateY(-100px)' : 'translateY(0)')};
    }
  }
`;

const ChangeThemeText = styled.span`
margin-right: 5px;
cursor: auto;
`;

const ProfileMenu = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <StyledProfileMenu>
      <div className="user">
        <div className="img-container">
          <UserImage
            src={auth.currentUser.photoURL || '/dummy36.png'}
            alt={auth.currentUser.displayName || 'User name'}
          />
        </div>
        <div className="user-name">
          {auth.currentUser.displayName || 'User name'}
          <div className="active">
            <span className="dot">
              ●
              {' '}
            </span>
            Active
          </div>
        </div>
      </div>
      <div className="status-container">
        <div className="status">
          <FcHome />
          <div className="status-name">Working remotely</div>
        </div>
      </div>
      <StyledProfileMenuButton>
        <ChangeThemeText>Change theme</ChangeThemeText>
        <ToggleContainer type="button" onClick={toggleTheme} lightTheme={theme === 'light'}>
          <UserImage src="./sun.svg" />
          <UserImage src="./moon.svg" />
        </ToggleContainer>
      </StyledProfileMenuButton>
      <Divider />
      <StyledProfileMenuButtonContainer>
        <StyledProfileMenuButton type="button" onClick={() => auth.signOut()}>
          Sign out of
          Slack
        </StyledProfileMenuButton>
      </StyledProfileMenuButtonContainer>
    </StyledProfileMenu>
  );
};

export default ProfileMenu;
