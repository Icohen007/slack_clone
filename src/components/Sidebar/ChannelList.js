import React, { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useDispatch, useSelector } from 'react-redux';
import ChannelCategory from './ChannelCategory';
import Channel from './Channel';
import { auth, db } from '../../firebase';
import changePublicChannel from '../../features/channels/changePublicChannel';
import { isDummyActiveChannel } from '../../features/channels/channelSlice';

const ChannelList = () => {
  const [showing, setShowing] = useState(true);
  const query = db.collection('channels').orderBy('createdAt');
  const [channels, loading, error] = useCollectionData(query, { idField: 'id' });
  const starredChannelsRef = db.collection('users').doc(auth.currentUser.uid).collection('starred').orderBy('createdAt');
  const [starredChannels, loading2, error2] = useCollectionData(starredChannelsRef);
  const { activeChannel } = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const isReady = !loading && !error;
  const isReady2 = !loading2 && !error2;

  useEffect(() => {
    if (isReady && isReady2 && isDummyActiveChannel(activeChannel)) {
      dispatch(changePublicChannel(channels[0]));
    }
  }, [activeChannel, isReady, isReady2]);

  if (!isReady || !isReady2 || isDummyActiveChannel(activeChannel)) {
    return null;
  }

  const starredChannelsIds = starredChannels.map((starredChannel) => starredChannel.id);
  const filteredChannels = channels.filter((channel) => !starredChannelsIds.includes(channel.id));

  return (
    <>
      <ChannelCategory
        name="Channels"
        showing={showing}
        onClick={() => setShowing((showingState) => !showingState)}
      />
      {showing && (
      <ul>
        {filteredChannels.map((channel) => <Channel key={channel.id} channel={channel} activeChannel={activeChannel} />)}
      </ul>
      )}
    </>
  );
};

export default ChannelList;
