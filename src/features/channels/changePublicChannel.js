import { setActiveChannel, setIsPrivateChannelMode } from './channelSlice';

const changePublicChannel = (channel) => (dispatch) => {
  const { createdAt, ...rest } = channel;
  dispatch(setActiveChannel({ channel: rest }));
  dispatch(setIsPrivateChannelMode(false));
};

export default changePublicChannel;
