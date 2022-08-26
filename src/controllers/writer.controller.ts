import { Request, Response } from "express";
import { getTags } from "../service/searcher.service";
import logger from "../utils/logger";
import writeTag from "../service/ConnectionOPC/write.service";

export async function writer(req: Request, res: Response) {
  const rack = parseInt(req.params.rackid);
  const side = parseInt(req.params.side);
  const slot = parseInt(req.params.slotid);
  const method = parseInt(req.params.methodid);
  const value = parseInt(req.params.value);

  const tag = getTags(rack,side,slot, method);
  try {
    if (tag === "undefined") {
      logger.error("rack, side, slot or method not found (writer)");
      const error = "RACK_SIDE_SLOT_OR_METHOD_NOT_FOUND_W";
      res.formatter.notFound(error);
    } else {
      const changeOPC = await writeTag(tag!, value);
      logger.info("Change OPC executed successfully");
      const success = "SUCCESSFULLY_EXECUTED_METHOD";
      res.formatter.ok(success, changeOPC);
    }
  } catch (error) {
    logger.error("Error responding to request: " + error);
    res.formatter.badRequest(error);
  }
}
