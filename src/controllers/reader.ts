import { Request, Response } from "express";
import logger from "../utils/logger";
import * as read from "../service/ConnectionOPC/read.service";
import { getReadable } from "../service/searcher";

export async function readerAll(req: Request, res: Response) {
  try {
    const states = await read.readAll();
    res.formatter.ok(states);
  } catch (error) {
    logger.error("Error responding to request: " + error);
    res.formatter.badRequest(error);
  }
}

export async function readOne(req: Request, res: Response) {
  try {
    const slot = parseInt(req.params.slotid);
    const tag = getReadable(slot);

    if (tag === "undefined") {
      logger.error("slot or method not found (reader)");
      const error = "SLOT_OR_METHOD_NOT_FOUND(reader)";
      res.formatter.notFound(error);
    } else {
      const slotReaded = await read.readOnly(tag);
      const objRes = {
        slotID: slot,
        dataType: slotReaded.dataValue.value.dataType,
        Value: slotReaded.dataValue.value.value,
        Node: tag,
      };
      logger.info({ slotReaded });
      res.formatter.ok(objRes);
    }
  } catch (error) {
    logger.error("Error responding to request");
    res.formatter.badRequest(error);
  }
}
