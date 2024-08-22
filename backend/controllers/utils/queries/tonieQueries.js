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
  return Tonie.findOne({ name }).collation({ locale: 'en', strength: 2 }).lean().exec();
}

export async function createTonie(tonieObject) {
  return Tonie.create(tonieObject);
}

export function createTonieObject(tonie) {
  return {
    name: tonie.name,
    titleList:
      Array.isArray(tonie.titleList) && tonie.titleList.length === 0
        ? DEFAULT.NOT_AVAILABLE_ARRAY
        : tonie.titleList || DEFAULT.NOT_AVAILABLE_ARRAY,
    description: tonie.description || DEFAULT.NOT_AVAILABLE,
    thumbnailUrl: tonie.thumbnailUrl || DEFAULT.NOT_AVAILABLE,
    imageUrl: tonie.imageUrl || DEFAULT.NOT_AVAILABLE,
    isOnWishlist: tonie.isOnWishlist || DEFAULT.WISHLIST,
  };
}

export async function findTonieById(id) {
  return Tonie.findById(id).exec();
}

export function updateTonieFields(tonie, updatedFields) {
  tonie.name = updatedFields.name;
  tonie.titleList =
    Array.isArray(updatedFields.titleList) && updatedFields.titleList.length === 0
      ? DEFAULT.NOT_AVAILABLE_ARRAY
      : updatedFields.titleList || DEFAULT.NOT_AVAILABLE_ARRAY;
  tonie.description = updatedFields.description || DEFAULT.NOT_AVAILABLE;
  tonie.thumbnailUrl = updatedFields.thumbnailUrl || DEFAULT.NOT_AVAILABLE;
  tonie.imageUrl = updatedFields.imageUrl || DEFAULT.NOT_AVAILABLE;
  tonie.isOnWishlist = updatedFields.isOnWishlist || DEFAULT.WISHLIST;
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
