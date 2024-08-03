import { INDEX } from '../config/common/constants.js';
import { ENTITY, FIELD } from '../config/common/messages.js';
import {
  createLegoInDatabase,
  createLegoObject,
  deleteLegoFromDatabase,
  extractLegoDetails,
  fetchAllLegoInCollection,
  fetchAllLegoOnWishlist,
  findLegoById,
  findLegoBySetNumber,
  findLegoBySetNumberExcludingId,
  saveLego,
  updateLegoFields,
} from './utils/queries/legoQueries.js';
import {
  sendDuplicateEntity,
  sendEntityCreated,
  sendEntityDeleted,
  sendEntityUpdated,
  sendFieldRequired,
  sendInvalidData,
  sendItems,
  sendNotFound,
} from './utils/response.js';

import Lego from '../models/Lego.js';

export async function getAllLegoInCollection(req, res) {
  const lego = await fetchAllLegoInCollection();

  if (!lego?.length) return sendNotFound(res, ENTITY.LEGO);

  return sendItems(res, lego);
}

export async function getAllLegoOnWishlist(req, res) {
  const lego = await fetchAllLegoOnWishlist();

  if (!lego?.length) return sendNotFound(res, ENTITY.LEGO);

  return sendItems(res, lego);
}

export async function createNewLego(req, res) {
  const { name, setNumber } = req.body;
  if (!name) return sendFieldRequired(res, ENTITY.LEGO, FIELD.NAME);
  if (!setNumber || !setNumber.length)
    return sendFieldRequired(res, ENTITY.LEGO, FIELD.SET_NUMBER);

  const duplicate = await findLegoBySetNumber(setNumber);
  if (duplicate) return sendDuplicateEntity(res, ENTITY.LEGO);

  const legoObject = createLegoObject(req.body);
  const newLego = await createLegoInDatabase(legoObject);

  if (newLego) {
    return sendEntityCreated(res, ENTITY.LEGO, newLego.name);
  } else {
    return sendInvalidData(res, ENTITY.LEGO);
  }
}

export async function updateLego(req, res) {
  const { id, name, setNumber } = req.body;
  if (!name) return sendFieldRequired(res, ENTITY.LEGO, FIELD.NAME);
  if (!setNumber || !setNumber.length)
    return sendFieldRequired(res, ENTITY.LEGO, FIELD.SET_NUMBER);

  const lego = await findLegoById(id);
  if (!lego) return sendNotFound(res, ENTITY.LEGO);

  const duplicate = await findLegoBySetNumberExcludingId(setNumber, id);
  if (duplicate && duplicate.length > INDEX.EMPTY_ARRAY)
    return sendDuplicateEntity(res, ENTITY.LEGO);

  updateLegoFields(lego, req.body);

  const updatedLego = await saveLego(lego);

  return sendEntityUpdated(res, ENTITY.LEGO, updatedLego.name);
}

export async function deleteLego(req, res) {
  const { id } = req.body;
  if (!id) return sendFieldRequired(res, ENTITY.LEGO, FIELD.ID);

  const lego = await findLegoById(id);
  if (!lego) return sendNotFound(res, ENTITY.LEGO);

  const { name, legoId } = extractLegoDetails(lego);

  await deleteLegoFromDatabase(lego);

  return sendEntityDeleted(res, ENTITY.LEGO, name, legoId);
}

// export async function getLegoCount(req, res) {
//   const count = await Lego.countDocuments();

//   return res.json({ count });
// }

export async function getLegoCollectionCount(req, res) {
  const count = await Lego.countDocuments({ isOnWishlist: false });
  return res.json({ count });
}

export async function getLegoWishlistCount(req, res) {
  const count = await Lego.countDocuments({ isOnWishlist: true });
  return res.json({ count });
}
