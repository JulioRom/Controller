import { Request, Response } from "express";
import { getTags } from "../service/searcher";
import logger from "../utils/logger";
import writeTag from "../service/ConnectionOPC/write.service";

export async function writer(req: Request, res: Response) {
  const slot = parseInt(req.params.slotid);
  const method = parseInt(req.params.methodid);
  const value = parseInt(req.params.value);

  const tag = getTags(slot, method);
  if (tag === "undefined") {
    logger.error("slot or method not found");
    const error = "SLOT_OR_METHOD_NOT_FOUND";
    res.formatter.notFound(error);
  } else {
    const changeOPC = await writeTag(tag, value);
    logger.info("Change OPC executed successfully");
    const success = "SUCCESSFULLY_EXECUTED_METHOD";
    res.formatter.ok(success, changeOPC);
  }
}
