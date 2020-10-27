import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChannelCategory from './ChannelCategory';
import Channel from './Channel';
import { db } from '../../firebase';

const ChannelList = () => {
  const [showing, setShowing] = useState(true);
  const channelsRef = db.collection('channels');
  const query = channelsRef.orderBy('createdAt').limit(25);
  const [channels, loading, error] = useCollectionData(query);

  if (loading || error) {
    return null;
  }

  return (
    <>
      <ChannelCategory
        name="Channels"
        showing={showing}
        onClick={() => setShowing((showingState) => !showingState)}
      />
      {showing && (
      <ul>
        {channels.map((channel) => <Channel key={channel.id} name={channel.name} />)}
      </ul>
      )}
    </>
  );
};

export default ChannelList;
