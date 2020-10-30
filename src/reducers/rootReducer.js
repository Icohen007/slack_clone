import { combineReducers } from 'redux';
import channelsReducer from '../features/channels/channelSlice';
import sidebarReducer from '../features/sidebar/sidebarSlice';

export default combineReducers({
  channels: channelsReducer,
  sidebar: sidebarReducer,
});
