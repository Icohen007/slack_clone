import React, { useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import ChannelCategory from './ChannelCategory';
import Channel from './Channel';
import { auth, db } from '../../firebase';

const StarredList = () => {
  const [showing, setShowing] = useState(true);
  const currentUserRef = db.collection('users').doc(auth.currentUser.uid);
  const [currentUser, loading, error] = useDocumentData(currentUserRef);

  console.log({ currentUser });

  if (loading || error) {
    return null;
  }

  return (
    <>
      <ChannelCategory
        name="Starred"
        showing={showing}
        onClick={() => setShowing((showingState) => !showingState)}
        isStarred
      />
      {showing && (
      <ul>
        <Channel name="channel name" />
        <Channel name="channel name" />
      </ul>
      )}
    </>
  );
};

export default StarredList;
