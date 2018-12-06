import users from './users';
import jokes from './jokes';
import { combineReducers } from '../maze';

export default combineReducers({
  users,
  jokes
});
