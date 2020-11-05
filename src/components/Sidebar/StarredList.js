import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import ChannelCategory from './ChannelCategory';
import Channel from './Channel';
import { auth, db } from '../../firebaseConfig';

const StarredList = () => {
  const [showing, setShowing] = useState(true);
  const starredChannelsRef = db.collection('users').doc(auth.currentUser.uid).collection('starred').orderBy('createdAt');
  const [starredChannels, loading, error] = useCollectionData(starredChannelsRef);
  const { activeChannel } = useSelector((state) => state.channels);
  const isReady = !loading && !error;

  if (!isReady) {
    return null;
  }

  return (
    <>
      <ChannelCategory
        name="Starred"
        showing={showing}
        onClick={() => setShowing((showingState) => !showingState)}
      />
      {showing && (
      <ul>
        {starredChannels.map((starredChannel) => (
          <Channel
            key={starredChannel.id}
            channel={starredChannel}
            activeChannel={activeChannel}
          />
        ))}
      </ul>
      )}
    </>
  );
};

export default StarredList;
