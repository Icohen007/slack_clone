import { setActiveChannel, setIsPrivateChannelMode } from './channelSlice';

export const changePublicChannel = (channel) => (dispatch) => {
  dispatch(setActiveChannel({ channel }));
  dispatch(setIsPrivateChannelMode(false));
};

export const changePrivateChannel = (channel) => (dispatch) => {
  dispatch(setActiveChannel({ channel }));
  dispatch(setIsPrivateChannelMode(true));
};
