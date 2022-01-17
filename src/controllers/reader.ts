import { Request, Response } from "express";
import logger from "../utils/logger";
import readAll from "../service/ConnectionOPC/readAll.service";

export async function readerAll(req: Request, res: Response) {

    readAll()

    //format the info and send in a response
}
