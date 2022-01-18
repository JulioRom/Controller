import dataTags from "../db/nodeTags.json";

export function getTags(slotid: number, method: number) {
  const slotId = slotid;
  const methodId = method;
  const slots = dataTags.writableTags;

  const verifySlot = slots.find((slots) => slots.slotId === slotId);
  const verifyMethod = verifySlot?.tagsId[methodId];

  if (!verifySlot || !verifyMethod) {
    return "undefined";
  }
  return verifyMethod;
}

export function getReadable(slotid: number) {
  const slotId = slotid;
  const slots = dataTags.readableTags;

  const verifySlot = slots.find((slots) => slots.slotId === slotId);
  const verifyMethod = verifySlot?.tagsId;

  if (!verifySlot || !verifyMethod) {
    return "undefined";
  }
  return verifyMethod;
}

export function getAllReadable() {
  const slots = dataTags.readableTags;
  return slots;
}
