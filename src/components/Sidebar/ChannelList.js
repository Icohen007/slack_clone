import React, { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useDispatch, useSelector } from 'react-redux';
import ChannelCategory from './ChannelCategory';
import Channel from './Channel';
import { auth, db } from '../../firebaseConfig';
import { changePublicChannel } from '../../features/channels/channelFlows';
import { isDummyActiveChannel } from '../../features/channels/channelSlice';
import { enhance } from '../../lib/firebaseUtils';

const ChannelList = () => {
  const [showing, setShowing] = useState(true);
  const dispatch = useDispatch();
  const { activeChannel } = useSelector((state) => state.channels);

  const channelsRef = db.collection('channels').orderBy('createdAt');
  const [channels, isChannelsReady] = enhance(useCollectionData(channelsRef, { idField: 'id' }));
  const starredChannelsRef = db.collection('users').doc(auth.currentUser.uid).collection('starred').orderBy('createdAt');
  const [starredChannels, isStarredChannelsReady] = enhance(useCollectionData(starredChannelsRef));

  useEffect(() => {
    if (isChannelsReady && isStarredChannelsReady && isDummyActiveChannel(activeChannel)) {
      dispatch(changePublicChannel(channels[0]));
    }
  }, [activeChannel, isChannelsReady, isStarredChannelsReady, channels, dispatch]);

  if (!isChannelsReady || !isStarredChannelsReady || isDummyActiveChannel(activeChannel)) {
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
        isChannels
      />
      {showing && (
      <ul>
        {filteredChannels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            activeChannel={activeChannel}
          />
        ))}
      </ul>
      )}
    </>
  );
};

export default ChannelList;
