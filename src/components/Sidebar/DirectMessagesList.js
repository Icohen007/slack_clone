import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import ChannelCategory from './ChannelCategory';
import { db, auth } from '../../firebase';
import { enhance } from '../../firebaseUtils';
import DirectMessage from './DirectMessage';

const isUserOnline = (user, statusCollection) => {
  const foundStatus = statusCollection.find((status) => status.id === user.id);
  return Boolean(foundStatus) && foundStatus.state === 'online';
};

const DirectMessagesList = () => {
  const [showing, setShowing] = useState(true);
  const usersRef = db.collection('users');
  const statusRef = db.collection('status');
  const [users, isReady] = enhance(useCollectionData(usersRef, { idField: 'id' }));
  const [statuses, isStatusesReady] = enhance(useCollectionData(statusRef, { idField: 'id' }));
  const { activeChannel } = useSelector((state) => state.channels);

  if (!isReady || !isStatusesReady) {
    return null;
  }

  const filteredUsers = users.filter((user) => user.id !== auth.currentUser.uid);

  return (
    <>
      <ChannelCategory
        name="Direct Messages"
        showing={showing}
        onClick={() => setShowing((showingState) => !showingState)}
      />
      {showing && (
      <ul>
        {filteredUsers.map((user) => (
          <DirectMessage
            key={user.id}
            user={user}
            activeChannel={activeChannel}
            isOnline={isUserOnline(user, statuses)}
          />
        ))}
      </ul>
      )}
    </>
  );
};

export default DirectMessagesList;
