import React from 'react';
import styled from 'styled-components';
import { CgSearch } from 'react-icons/cg';
import { FcHome } from 'react-icons/fc';

const NavigationBar = () => (
  <StyledNavigationBar role="navigation" aria-label="Search and info">
    <StyledSearchButtonContainer>
      <StyledSearchButton type="button">
        <CgSearch />
        <span>Search in Slack</span>
      </StyledSearchButton>
    </StyledSearchButtonContainer>
    <StyledSideButtons>
      <button type="button" className="side-button">
        <span>
          <FcHome />
        </span>
      </button>
      <button type="button" className="side-button">
        <span>
          <FcHome />
        </span>
      </button>
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
  padding: 0 10rem;
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
      font-size: 13rem;
      line-height: 1.38463;
      font-weight: 400;
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      opacity: .8;
    }
    
    svg {
      margin-right: 8rem;
      font-size: 15rem;
      opacity: .8;
    }
`;

const StyledSideButtons = styled.div`
display: flex;
justify-content: center;
align-items: center;

.side-button {
    cursor: pointer;
    border: 0;
    padding: 0;
    outline: none;
    height: 28px;
    width: 28px;
    border-radius: 4px 0 0 4px;
    background: rgb(73,37,74);
    margin: 0 2rem;
    
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
