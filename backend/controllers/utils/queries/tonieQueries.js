import Tonie from '../../../models/Tonie.js';

export async function fetchAllTonies() {
  return Tonie.find().lean().exec();
}
