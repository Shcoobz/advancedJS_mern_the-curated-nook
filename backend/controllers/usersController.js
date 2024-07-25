import { ENTITY, FIELD } from '../config/common/messages.js';
import {
  sendAllFieldsRequired,
  sendDuplicateEntity,
  sendEntityCreated,
  sendEntityDeleted,
  sendEntityUpdated,
  sendFieldRequired,
  sendInvalidData,
  sendItems,
  sendNotFound,
} from './utils/response.js';
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
} from './utils/queries/userQueries.js';

export async function getAllUsers(req, res) {
  const users = await fetchUsersWithoutPasswords();

  if (!users?.length) return sendNotFound(res, ENTITY.USER);

  return sendItems(res, users);
}

export async function createNewUser(req, res) {
  const { username, password, roles } = req.body;
  if (!username || !password) return sendAllFieldsRequired(res, ENTITY.USER);

  const duplicate = await findUserByName(username);
  if (duplicate) return sendDuplicateEntity(res, ENTITY.USER);

  const hashedPwd = await hashPassword(password);
  const userObject = createUserObject(username, hashedPwd, roles);
  const newUser = await createUser(userObject);

  if (newUser) {
    return sendEntityCreated(res, ENTITY.USER, newUser.username);
  } else {
    return sendInvalidData(res, ENTITY.USER);
  }
}

export async function updateUser(req, res) {
  const { id, username, roles, active, password } = req.body;

  if (!isUserValid({ id, username, roles, active }))
    return sendFieldRequired(res, ENTITY.USER, FIELD.PASSWORD);

  const user = await findUserById(id);

  if (!user) return sendNotFound(res, ENTITY.USER);

  const duplicate = await findUserByName(username);

  if (duplicate && duplicate?._id.toString() !== id)
    return sendDuplicateEntity(res, ENTITY.USER);

  updateUserFields(user, { username, roles, active });

  if (password) user.password = await hashPassword(password);

  const updatedUser = await saveUser(user);

  return sendEntityUpdated(res, ENTITY.USER, updatedUser.username);
}

export async function deleteUser(req, res) {
  const { id } = req.body;
  if (!id) return sendFieldRequired(res, ENTITY.USER, FIELD.ID);

  const user = await findUserById(id);
  if (!user) return sendNotFound(res, ENTITY.USER);

  const { username, userId } = extractUserDetails(user);

  await deleteUserFromDatabase(user);

  return sendEntityDeleted(res, ENTITY.USER, username, userId);
}
