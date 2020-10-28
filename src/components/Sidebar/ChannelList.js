import React, { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useDispatch, useSelector } from 'react-redux';
import ChannelCategory from './ChannelCategory';
import Channel from './Channel';
import { db } from '../../firebase';
import changePublicChannel from '../../features/channels/changePublicChannel';
import { isDummyActiveChannel } from '../../features/channels/channelSlice';

const ChannelList = () => {
  const [showing, setShowing] = useState(true);
  const query = db.collection('channels').orderBy('createdAt').limit(25);
  const [channels, loading, error] = useCollectionData(query, { idField: 'id' });
  const { activeChannel } = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const isReady = !loading && !error;

  useEffect(() => {
    if (isReady && isDummyActiveChannel(activeChannel)) {
      dispatch(changePublicChannel(channels[0]));
    }
  }, [activeChannel, isReady]);

  if (!isReady || isDummyActiveChannel(activeChannel)) {
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
        {channels.map((channel) => <Channel key={channel.id} channel={channel} activeChannel={activeChannel} />)}
      </ul>
      )}
    </>
  );
};

export default ChannelList;
