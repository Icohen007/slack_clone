import { setActiveChannel, setIsPrivateChannelMode } from './channelSlice';

const changePublicChannel = (channel) => (dispatch) => {
  dispatch(setActiveChannel({ channel }));
  dispatch(setIsPrivateChannelMode(false));
};

export default changePublicChannel;
