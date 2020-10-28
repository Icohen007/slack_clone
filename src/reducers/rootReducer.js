import { combineReducers } from 'redux';
import channelsReducer from '../features/channels/channelSlice';

export default combineReducers({
  channels: channelsReducer,
});
