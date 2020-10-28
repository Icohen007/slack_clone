import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import ChannelCategory from './ChannelCategory';
import { db, auth } from '../../firebase';
import { enhance } from '../../firebaseUtils';
import DirectMessage from './DirectMessage';

const DirectMessagesList = () => {
  const [showing, setShowing] = useState(true);
  const usersRef = db.collection('users');
  const [users, isReady] = enhance(useCollectionData(usersRef, { idField: 'id' }));
  const { activeChannel } = useSelector((state) => state.channels);

  if (!isReady) {
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
          />
        ))}
      </ul>
      )}
    </>
  );
};

export default DirectMessagesList;
