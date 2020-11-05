import React, { useState } from 'react';
import styled from 'styled-components';
import { CgSearch } from 'react-icons/cg';
import { FcHome } from 'react-icons/fc';
import { BsClock } from 'react-icons/bs';
import { FiHelpCircle } from 'react-icons/fi';
import { Tooltip } from 'react-tippy';
import { useSelector } from 'react-redux';
import ProfileMenu from './ProfileMenu';
import {
  Centered, centeredFlex, ClickBlocker, navigationBarHeight,
} from '../Shared/Shared.style';
import { auth } from '../../firebaseConfig';
import TooltipContent from '../Shared/TooltipContent';
import Search from './Search';
import { UserImage } from '../Shared';

const NavigationBar = React.memo(() => {
  const [showSearch, setShowSearch] = useState(false);
  const { activeChannel, isPrivateChannelMode } = useSelector((state) => state.channels);

  return (
    <StyledNavigationBar role="navigation" aria-label="Search and info">
      <StyledSearchButtonContainer>
        <Tooltip
          position="bottom"
          arrow
          html={(
            <TooltipContent notSupported>
              History
            </TooltipContent>
          )}
        >
          <IconButton type="button" notSupported>
            <span className="wrapper" style={{ padding: 2 }}>
              <BsClock color="white" />
            </span>
          </IconButton>
        </Tooltip>
        {showSearch && <ClickBlocker onClick={() => setShowSearch(false)} />}
        <StyledSearchButton type="button" onClick={() => setShowSearch((show) => !show)}>
          <CgSearch className="search-icon" />
          <span>
            {isPrivateChannelMode ? `Search in @ ${activeChannel.displayName}` : `Search in # ${activeChannel.name}`}
          </span>
          {showSearch && <Search closeSearch={() => setShowSearch(false)} />}
        </StyledSearchButton>
        <Tooltip
          position="bottom"
          arrow
          html={(
            <TooltipContent notSupported>
              Help
            </TooltipContent>
          )}
        >
          <IconButton type="button" notSupported>
            <span className="wrapper" style={{ padding: 2 }}>
              <FiHelpCircle color="white" />
            </span>
          </IconButton>
        </Tooltip>
      </StyledSearchButtonContainer>
      <StyledSideButtons>
        <Tooltip
          position="bottom"
          arrow
          html={(
            <TooltipContent gap={6}>
              <FcHome />
              <span>Working remotely </span>
            </TooltipContent>
          )}
        >
          <IconButton type="button">
            <span className="wrapper">
              <FcHome />
            </span>
          </IconButton>
        </Tooltip>
        <Tooltip
          position="bottom"
          theme="light"
          trigger="click"
          interactive
          useContext
          html={<ProfileMenu />}
        >
          <IconButton type="button">
            <span className="wrapper image">
              <UserImage
                src={auth.currentUser.photoURL || '/dummy36.png'}
                alt={(auth.currentUser.displayName) || 'User name'}
              />
            </span>
          </IconButton>
        </Tooltip>
      </StyledSideButtons>
    </StyledNavigationBar>
  );
});

const StyledNavigationBar = styled.nav`
height: ${navigationBarHeight}px;
display: flex;
align-items: center;
justify-content: space-between;
position: relative;
z-index: 100;
background: ${({ theme }) => theme.colors.purpleDark2};
color: white;
box-shadow: 0 1px 0 0 rgba(255,255,255,0.1);
`;
const StyledSearchButtonContainer = styled(Centered)`
  flex: 1;
  padding: 0 10px;
  gap: 4px;
`;

const StyledSearchButton = styled.button`
    ${centeredFlex};
    min-width: 0;
    max-width: clamp(300px, 50%, 500px);
    width: 100%;
    background: #431e44;
    box-shadow: inset 0 0 0 1px #684a68;
    padding: 0 16px;
    height: 24px;
    color: white;
    outline: none;
    border-radius: 6px;
    margin: 0;
    cursor: pointer;
    border: 0;
    position: relative;
    
    &:hover{
    background: #49254a;
    box-shadow: inset 0 0 0 1px #9a869b;
    
    span, svg {
    opacity: 1;
    }
    }
    
    span {
      font-size: 13px;
      line-height: 1.38463;
      font-weight: 400;
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      opacity: .8;
    }
    
    .search-icon {
      margin-right: 8px;
      opacity: .8;
    }
`;

const StyledSideButtons = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-right: 12px;
`;

const IconButton = styled.button`
    cursor: ${({ notSupported }) => (notSupported ? 'not-allowed' : 'pointer')};
    border: 0;
    padding: 0;
    outline: none;
    border-radius: 4px 0 0 4px;
    background: rgb(73,37,74);
    margin: 0 2px;
    
    &:hover {
    background: rgb(99,69,100);
    }
    
    .wrapper {
    margin: 0;
    display: inline-block;
    padding: 4px;

    &.image {
    padding: 0;
    height: 28px;
    width: 28px;
    
    &:hover {
    filter: brightness(1.1);
    }
    }
    }
    
    svg {
    font-size: 18px;
    }
`;

export default NavigationBar;
