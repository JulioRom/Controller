import dataTags from "../db/nodeTags.json";
import logger from "../utils/logger";

export function getTags(slotid: number, method: number) {
  const slotId = slotid;
  const methodId = method;
  const slots = dataTags.nodeTags;

  const verifySlot = slots.find((slots) => slots.slotId === slotId);
  const verifyMethod = verifySlot?.tagsId[methodId];

  if (!verifySlot || !verifyMethod) {
    return "undefined";
  }

  return verifyMethod;
}
