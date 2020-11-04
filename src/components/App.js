import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import NavigationBar from './NavigationBar/NavigationBar';
import Sidebar from './Sidebar/Sidebar';
import PrimaryView from './PrimaryView/PrimaryView';
import { toggleSidebar } from '../features/sidebar/sidebarSlice';
import { useMobile } from '../hooks';
import { ClickBlocker, navigationBarHeight } from './Shared/Shared.style';
import { auth, db } from '../firebase';
import PublicMetaPanel from './MetaPanel/PublicMetaPanel';
import { watchForStatus } from '../firebaseUtils';
import PrivateMetaPanel from './MetaPanel/PrivateMetaPanel';

const AppContainer = styled.div`
display: grid;
height: calc(100% - ${navigationBarHeight}px);
grid-template-rows: auto;
overflow: hidden;
position: relative;
grid-template-columns: ${({ metaPanelOpen }) => (metaPanelOpen ? '260px auto 400px' : '260px auto')};
grid-template-areas: 'sidebar primary-view';
transition: all 2s linear;
background: ${({ theme }) => theme.colors.white};
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

@media only screen and (max-width: 560px) {
grid-template-columns: ${({ metaPanelOpen }) => (metaPanelOpen ? 'auto 200px' : 'auto')};
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

  useEffect(() => {
    if (auth.currentUser) {
      watchForStatus();
    }
  }, []);

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
        {metaPanelOpen
         && (isPrivateChannelMode ? <PrivateMetaPanel />
           : <PublicMetaPanel messagesRef={messagesRef} />)}
      </AppContainer>
    </>
  );
};

export default App;
