import { ENTITY } from '../config/common/messages.js';

import { fetchAllTonies } from './utils/queries/tonieQueries.js';
import { sendItems, sendNotFound } from './utils/response.js';

export async function getAllTonies(req, res) {
  const tonies = await fetchAllTonies();

  if (!tonies?.length) {
    return sendNotFound(res, ENTITY.TONIE);
  }

  return sendItems(res, tonies);
}
