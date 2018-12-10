import users from './users';
import jokes from './jokes';
import { combineReducers } from 'simpply';

export default combineReducers({
  users,
  jokes
});
