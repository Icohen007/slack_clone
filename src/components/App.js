import React from 'react';
import styled from 'styled-components';
import NavigationBar from './NavigationBar/NavigationBar';
import Sidebar from './Sidebar/Sidebar';
import PrimaryView from './PrimaryView/PrimaryView';

const AppContainer = styled.div`
display: grid;
grid-template-rows: auto;
overflow: hidden;
position: relative;
grid-template-columns: 260px auto;
grid-template-areas: 'sidebar primary-view';
`;

const App = () => (
  <div>
    <NavigationBar />
    <AppContainer>
      <Sidebar />
      <PrimaryView />
    </AppContainer>
  </div>
);

export default App;
