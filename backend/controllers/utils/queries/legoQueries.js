import { DEFAULT } from '../../../config/common/constants.js';
import Lego from '../../../models/Lego.js';

export async function fetchAllLegoInCollection() {
  const lego = await Lego.find({ isOnWishlist: false }).lean();

  return lego;
}

export async function fetchAllLegoOnWishlist() {
  const lego = await Lego.find({ isOnWishlist: true }).lean();

  return lego;
}

export function createLegoObject(lego) {
  return {
    name: lego.name,
    thumbnailUrl: lego.thumbnailUrl || DEFAULT.NOT_AVAILABLE,
    imageUrl: lego.imageUrl || DEFAULT.NOT_AVAILABLE,
    setNumber: lego.setNumber,
    isOnWishlist: lego.isOnWishlist || DEFAULT.WISHLIST,
  };
}

export function isLegoValid(lego) {
  if (!lego.name) return false;

  if (!lego.setNumber || !lego.setNumber.length) return false;

  return true;
}

export async function findLegoBySetNumber(setNumber) {
  return Lego.findOne({ setNumber: { $in: setNumber } })
    .lean()
    .exec();
}

export async function createLegoInDatabase(legoObject) {
  return await Lego.create(legoObject);
}

export async function saveLego(lego) {
  return await lego.save();
}

export async function findLegoById(id) {
  return Lego.findById(id).exec();
}

export async function findLegoBySetNumberExcludingId(setNumbers, excludeId) {
  return Lego.find({
    setNumber: { $in: setNumbers },
    _id: { $ne: excludeId },
  })
    .lean()
    .exec();
}

export function updateLegoFields(lego, updatedFields) {
  lego.name = updatedFields.name;
  lego.setNumber = updatedFields.setNumber;
  lego.thumbnail = updatedFields.thumbnail || DEFAULT.EMPTY_STRING;
  lego.imageUrl = updatedFields.imageUrl || DEFAULT.EMPTY_STRING;
  lego.isOnWishlist = updatedFields.isOnWishlist || DEFAULT.WISHLIST;
}

export function extractLegoDetails(lego) {
  return {
    name: lego.name,
    legoId: lego._id,
  };
}

export async function deleteLegoFromDatabase(lego) {
  await lego.deleteOne();
}
