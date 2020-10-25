import React from 'react';
import styled from 'styled-components';
import { CgSearch } from 'react-icons/cg';
import { FcHome } from 'react-icons/fc';
import { Tooltip } from 'react-tippy';
import ProfileMenu from './ProfileMenu';
import { TooltipContent } from '../Shared/Shared.style';

const NavigationBar = () => (
  <StyledNavigationBar role="navigation" aria-label="Search and info">
    <StyledSearchButtonContainer>
      <StyledSearchButton type="button">
        <CgSearch />
        <span>Search in Slack</span>
      </StyledSearchButton>
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
        <button type="button" className="side-button">
          <span>
            <FcHome />
          </span>
        </button>
      </Tooltip>
      <Tooltip
        position="bottom"
        theme="light"
        trigger="click"
        interactive
        html={<ProfileMenu />}
      >
        <button type="button" className="side-button">
          <span>
            <FcHome />
          </span>
        </button>
      </Tooltip>
    </StyledSideButtons>
  </StyledNavigationBar>
);

const StyledNavigationBar = styled.nav`
height: 38px;
display: flex;
align-items: center;
justify-content: space-between;
position: relative;
z-index: 100;
background: ${({ theme }) => theme.colors.purpleDark2};
color: white;
box-shadow: 0 1px 0 0 rgba(255,255,255,0.1);
`;

const StyledSearchButtonContainer = styled.div`
  max-width: 70%;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding: 0 10px;
`;

const StyledSearchButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center; 
    min-width: 0;
    max-width: 500px;
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
    
    svg {
      margin-right: 8px;
      opacity: .8;
    }
`;

const StyledSideButtons = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-right: 12px;

.side-button {
    cursor: pointer;
    border: 0;
    padding: 0;
    outline: none;
    border-radius: 4px 0 0 4px;
    background: rgb(73,37,74);
    margin: 0 2px;
    font-size: 18px;
    
    &:hover {
    background: rgb(99,69,100);
    }
    
    span {
    margin: 0;
    display: inline-block;
    padding: 6px;
    height: 28px;
    }
}

`;

export default NavigationBar;
