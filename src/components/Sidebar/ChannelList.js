import React, { useState } from 'react';
import ChannelCategory from './ChannelCategory';
import Channel from './Channel';

const ChannelList = ({ categoryName }) => {
  const [showing, setShowing] = useState(true);

  return (
    <>
      <ChannelCategory
        name={categoryName}
        showing={showing}
        onClick={() => setShowing((showingState) => !showingState)}
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

export default ChannelList;
