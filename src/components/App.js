import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import NavigationBar from './NavigationBar/NavigationBar';
import Sidebar from './Sidebar/Sidebar';
import PrimaryView from './PrimaryView/PrimaryView';
import { toggleMetaPanel, toggleSidebar } from '../features/sidebar/sidebarSlice';
import { useMobile } from '../hooks';
import { navigationBarHeight } from './Shared/Shared.style';
import { auth, db } from '../firebase';
import MetaPanel from './MetaPanel/MetaPanel';

const AppContainer = styled.div`
display: grid;
height: calc(100% - ${navigationBarHeight}px);
grid-template-rows: auto;
overflow: hidden;
position: relative;
grid-template-columns: ${({ metaPanelOpen }) => (metaPanelOpen ? '260px auto 400px' : '260px auto')};
grid-template-areas: 'sidebar primary-view';
transition: all 2s linear;
color: ${({ theme }) => theme.colors.black1};

@media only screen and (max-width: 1200px) {
grid-template-columns: ${({ metaPanelOpen }) => (metaPanelOpen ? '260px auto 300px' : '260px auto')};
}

@media only screen and (max-width: 860px) {
grid-template-columns: ${({ metaPanelOpen }) => (metaPanelOpen ? '260px auto 260px' : '260px auto')};
}

@media only screen and (max-width: 768px) {
grid-template-columns: ${({ metaPanelOpen }) => (metaPanelOpen ? 'auto 260px' : 'auto')};
grid-template-areas: 'primary-view';
}
`;

const getChannelId = (currentUserId, otherUserId) => (
  otherUserId < currentUserId
    ? `${otherUserId}-${currentUserId}`
    : `${currentUserId}-${otherUserId}`
);

const App = () => {
  const { sidebarOpen, metaPanelOpen } = useSelector((state) => state.sidebar);
  const { activeChannel, isPrivateChannelMode } = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const isMobile = useMobile();

  const messagesRef = isPrivateChannelMode
    ? db.collection('privateMessages')
      .doc(getChannelId(auth.currentUser.uid, activeChannel.id))
      .collection('messages')
    : db.collection('channelMessages')
      .doc(activeChannel.id)
      .collection('messages');

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(toggleSidebar());
  };

  if (!auth.currentUser) {
    return null;
  }

  return (
    <>
      {sidebarOpen && isMobile && <ClickBlocker onClick={handleClick} />}
      <NavigationBar />
      <AppContainer metaPanelOpen={metaPanelOpen}>
        <Sidebar />
        <PrimaryView messagesRef={messagesRef} />
        {metaPanelOpen && <MetaPanel messagesRef={messagesRef} onClose={() => dispatch(toggleMetaPanel())} />}
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
