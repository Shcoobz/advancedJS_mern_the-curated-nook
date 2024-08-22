import { BCRYPT } from '../../../config/common/constants.js';
import bcrypt from 'bcrypt';
import User from '../../../models/User.js';

export async function fetchUsersWithoutPasswords() {
  const users = await User.find().select('-password').lean();

  return users;
}

export async function findUserByName(username) {
  return User.findOne({ username })
    .collation({ locale: 'en', strength: 2 })
    .lean()
    .exec();
}

export async function hashPassword(password) {
  return await bcrypt.hash(password, BCRYPT.SALT_ROUNDS);
}

export function createUserObject(username, hashedPwd, roles) {
  if (!Array.isArray(roles) || !roles.length) {
    return { username, password: hashedPwd };
  } else {
    return { username, password: hashedPwd, roles };
  }
}

export async function createUser(userObject) {
  const newUser = await User.create(userObject);

  return newUser;
}

export function isUserValid(user) {
  const { id, username, roles, active } = user;

  return (
    id &&
    username &&
    Array.isArray(roles) &&
    roles.length > 0 &&
    typeof active === 'boolean'
  );
}

export async function findUserById(id) {
  const user = await User.findById(id).exec();

  return user;
}

export function updateUserFields(user, { username, roles, active }) {
  user.username = username;
  user.roles = roles;
  user.active = active;
}

export async function saveUser(user) {
  const savedUser = await user.save();

  return savedUser;
}

export function extractUserDetails(user) {
  const { username, _id: userId } = user;

  return { username, userId };
}

export async function deleteUserFromDatabase(user) {
  const result = await user.deleteOne();

  return result;
}
