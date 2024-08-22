import { memo } from 'react';
import UserData from './UserData';

const UserDataWrapper = ({ userId, onEdit, index }) => {
  return <UserData userId={userId} onEdit={onEdit} index={index} />;
};

const User = memo(UserDataWrapper);

export default User;
