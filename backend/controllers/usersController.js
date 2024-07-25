import User from '../models/User.js';
import {
  sendSpecificFieldsRequired,
  sendUserAllFieldsRequired,
  sendUserCreated,
  sendUserDeleted,
  sendUserDuplicateUsername,
  sendUserIdRequired,
  sendUserInvalidData,
  sendUserNotFound,
  sendUserUpdated,
} from './utils/userResponses.js';
import {
  createUser,
  createUserObject,
  deleteUserFromDatabase,
  extractUserDetails,
  fetchUsersWithoutPasswords,
  findUserById,
  findUserByName,
  hashPassword,
  isUserValid,
  saveUser,
  updateUserFields,
} from './utils/userQueries.js';

export async function getAllUsers(req, res) {
  const users = await fetchUsersWithoutPasswords();

  if (!users?.length) return sendUserNotFound(res);

  res.json(users);
}

export async function createNewUser(req, res) {
  const { username, password, roles } = req.body;
  if (!username || !password) return sendUserAllFieldsRequired(res);

  const duplicate = await findUserByName(username);
  if (duplicate) return sendUserDuplicateUsername(res);

  const hashedPwd = await hashPassword(password);
  const userObject = createUserObject(username, hashedPwd, roles);
  const newUser = await createUser(userObject);

  if (newUser) {
    return sendUserCreated(res, newUser.username);
  } else {
    return sendUserInvalidData(res);
  }
}

export async function updateUser(req, res) {
  const { id, username, roles, active, password } = req.body;

  if (!isUserValid({ id, username, roles, active }))
    return sendSpecificFieldsRequired(res);

  const user = await findUserById(id);

  if (!user) return sendUserNotFound(res);

  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id)
    return sendUserDuplicateUsername(res);

  updateUserFields(user, { username, roles, active });

  if (password) user.password = await hashPassword(password);

  const updatedUser = await saveUser(user);

  sendUserUpdated(res, updatedUser.username);
}

export async function deleteUser(req, res) {
  const { id } = req.body;
  if (!id) return sendUserIdRequired(res);

  const user = await findUserById(id);
  if (!user) return sendUserNotFound(res);

  const { username, userId } = extractUserDetails(user);

  await deleteUserFromDatabase(user);

  sendUserDeleted(res, username, userId);
}
