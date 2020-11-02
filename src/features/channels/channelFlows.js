import { setActiveChannel, setActiveChannelSearch, setIsPrivateChannelMode } from './channelSlice';

export const changePublicChannel = (channel) => (dispatch) => {
  dispatch(setActiveChannel({ channel }));
  dispatch(setIsPrivateChannelMode(false));
  dispatch(setActiveChannelSearch(''));
};

export const changePrivateChannel = (channel) => (dispatch) => {
  dispatch(setActiveChannel({ channel }));
  dispatch(setIsPrivateChannelMode(true));
  dispatch(setActiveChannelSearch(''));
};
