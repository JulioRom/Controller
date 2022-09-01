//import dataTags from "../db/nodeTags.json"; // for opc.tcp://10.115.43.26:4840
//import dataTags from "../db/nodeTagsOPCsiemens.json"; // for opc.tcp://10.115.42.241:4840
import dataTags from "../db/nodeTagsUpdate.json";
import logger from "../utils/logger";

// OBTAIN TAG REQUESTED TO WRITE
export function getTags(
  rackid: number,
  side: number,
  slotid: number,
  method: number
) {
  const rackId = rackid;
  const sideRack = side;
  const slotId = slotid;
  const methodId = method;
  const racks = dataTags.rackTags;
  var verifyRack = racks.find((racks) => racks.rackId === rackId);
  var methodRange = methodId >= 4 || methodId < 0 ? undefined : methodId;

  if (sideRack === 0) {
    var verifySide =
      verifyRack === undefined ? undefined : verifyRack.frontSlots;
  } else if (sideRack === 1) {
    var verifySide =
      verifyRack === undefined ? undefined : verifyRack.backSlots;
  } else {
    return "undefined";
  }

  const verifySlot =
    verifySide === undefined
      ? undefined
      : verifySide.find((verifySide) => verifySide.slotId === slotId);
  const verifyMethod =
    verifySlot === undefined ? undefined : verifySlot.tagsId[methodRange!];

  if (!verifyRack || !verifySlot || !verifyMethod) {
    return "undefined";
  }
  logger.info(
    `Request Tag: ${JSON.stringify(verifySlot.slotId)}, ${JSON.stringify(
      verifySlot.meta
    )}`
  );
  return verifyMethod;
}

// OBTAIN TAG REQUESTED TO READ
export function getReadable(rackid: number, sideid: number, slotid: number) {
  const rackId = rackid;
  const sideId = sideid;
  const slotId = slotid;
  const racks = dataTags.rackTags;
  var verifyRack = racks.find((racks) => racks.rackId === rackId);

  if (sideId === 0) {
    var verifySide =
      verifyRack === undefined ? undefined : verifyRack.frontSlots;
  } else if (sideId === 1) {
    var verifySide =
      verifyRack === undefined ? undefined : verifyRack.backSlots;
  } else {
    return "undefined";
  }

  const verifySlot =
    verifySide === undefined
      ? undefined
      : verifySide.find((verifySide) => verifySide.slotId === slotId);

  const verifyMethod =
    verifySlot === undefined ? undefined : verifySlot.tagsId.at(-1);

  if (!verifyRack || !verifySlot || !verifyMethod) {
    return "undefined";
  }
  return verifyMethod;
}

// OBTAIN ALL TAGS TO READ
export function getAllReadable() {
  const slots = dataTags.readableTags;
  return slots;
}
