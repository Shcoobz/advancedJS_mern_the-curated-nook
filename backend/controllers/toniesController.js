import { ENTITY, FIELD } from '../config/common/messages.js';
import Tonie from '../models/Tonie.js';
import {
  createTonie,
  createTonieObject,
  deleteTonieFromDatabase,
  extractTonieDetails,
  fetchAllToniesInCollection,
  findTonieById,
  findTonieByName,
  saveTonie,
  updateTonieFields,
} from './utils/queries/tonieQueries.js';
import {
  sendDuplicateEntity,
  sendEntityCreated,
  sendEntityDeleted,
  sendEntityUpdated,
  sendFieldRequired,
  sendItems,
  sendNotFound,
} from './utils/response.js';

export async function getAllToniesInCollection(req, res) {
  const tonies = await fetchAllToniesInCollection();

  if (!tonies?.length) {
    return sendNotFound(res, ENTITY.TONIE);
  }

  return sendItems(res, tonies);
}

export async function createNewTonie(req, res) {
  const { name, description, imgUrl } = req.body;
  if (!name) return sendFieldRequired(res, ENTITY.TONIE, FIELD.NAME);

  const duplicate = await findTonieByName(name);
  if (duplicate) return sendDuplicateEntity(res, ENTITY.TONIE);

  const tonieObject = createTonieObject(name, description, imgUrl);
  const newTonie = await createTonie(tonieObject);

  if (newTonie) {
    return sendEntityCreated(res, ENTITY.TONIE, newTonie.name);
  } else {
    return sendInvalidData(res, ENTITY.TONIE);
  }
}

export async function updateTonie(req, res) {
  const { id, name, description, imgUrl } = req.body;
  if (!name) return sendFieldRequired(res, ENTITY.TONIE, FIELD.NAME);

  const tonie = await findTonieById(id);
  if (!tonie) return sendNotFound(res, ENTITY.TONIE);

  updateTonieFields(tonie, { name, description, imgUrl });

  const updatedTonie = await saveTonie(tonie);

  return sendEntityUpdated(res, ENTITY.TONIE, updatedTonie.name);
}

export async function deleteTonie(req, res) {
  const { id } = req.body;
  if (!id) return sendFieldRequired(res, ENTITY.TONIE, FIELD.ID);

  const tonie = await findTonieById(id);
  if (!tonie) return sendNotFound(res, ENTITY.TONIE);

  const { name, id: tonieId } = extractTonieDetails(tonie);

  await deleteTonieFromDatabase(tonie);

  return sendEntityDeleted(res, ENTITY.TONIE, name, tonieId);
}

// export async function getTonieCount(req, res) {
//   const count = await Tonie.countDocuments();

//   return res.json({ count });
// }

export async function getTonieCollectionCount(req, res) {
  const count = await Tonie.countDocuments({ isOnWishlist: false });
  return res.json({ count });
}

export async function getTonieWishlistCount(req, res) {
  const count = await Tonie.countDocuments({ isOnWishlist: true });
  return res.json({ count });
}
