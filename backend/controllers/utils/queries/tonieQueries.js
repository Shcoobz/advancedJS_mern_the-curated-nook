import Tonie from '../../../models/Tonie.js';
import { DEFAULT } from '../../../config/common/constants.js';

export async function fetchAllToniesInCollection() {
  const tonies = await Tonie.find({ isOnWishlist: false }).lean().exec();

  return tonies;
}

export async function fetchAllToniesOnWishlist() {
  const tonies = await Tonie.find({ isOnWishlist: true }).lean().exec();

  return tonies;
}

export async function findTonieByName(name) {
  return Tonie.findOne({ name }).lean().exec();
}

export async function createTonie(tonieObject) {
  return Tonie.create(tonieObject);
}

export function createTonieObject(name, description, imgUrl) {
  const tonieObject = { name };

  if (description) {
    tonieObject.description = description;
  }

  if (imgUrl) {
    tonieObject.imgUrl = imgUrl;
  }

  return tonieObject;
}

export async function findTonieById(id) {
  return Tonie.findById(id).exec();
}

export function updateTonieFields(tonie, updatedFields) {
  tonie.name = updatedFields.name;
  tonie.description = updatedFields.description || DEFAULT.NO_DESCRIPTION;
  tonie.imgUrl = updatedFields.imgUrl || DEFAULT.EMPTY_STRING;
}

export async function saveTonie(tonie) {
  const savedTonie = await tonie.save();

  return savedTonie;
}

export function extractTonieDetails(tonie) {
  return {
    name: tonie.name,
    id: tonie._id,
  };
}

export async function deleteTonieFromDatabase(tonie) {
  const result = await tonie.deleteOne();

  return result;
}
