import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import NavigationBar from './NavigationBar/NavigationBar';
import Sidebar from './Sidebar/Sidebar';
import PrimaryView from './PrimaryView/PrimaryView';
import { toggleSidebar } from '../features/sidebar/sidebarSlice';
import { useMobile } from '../hooks';
import { navigationBarHeight } from './Shared/Shared.style';

const AppContainer = styled.div`
display: grid;
height: calc(100% - ${navigationBarHeight}px);
grid-template-rows: auto;
overflow: hidden;
position: relative;
grid-template-columns: 260px auto;
grid-template-areas: 'sidebar primary-view';
transition: all 2s linear;

@media only screen and (max-width: 768px) {
grid-template-columns: auto;
grid-template-areas: 'primary-view';
}
`;

const App = () => {
  const { sidebarOpen } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const isMobile = useMobile();

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(toggleSidebar());
  };

  return (
    <>
      {sidebarOpen && isMobile && <ClickBlocker onClick={handleClick} />}
      <NavigationBar />
      <AppContainer>
        <Sidebar />
        <PrimaryView />
      </AppContainer>
    </>
  );
};

const ClickBlocker = styled.div`
  content: ' ';
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

export default App;
