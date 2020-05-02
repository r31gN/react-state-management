import users from './users';
import jokes from './jokes';
import { createSystemStorage } from 'simpply';

export default createSystemStorage({
  users,
  jokes,
});
