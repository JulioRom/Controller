import { Request, Response } from "express";
import { getTags } from "../service/searcher";
import logger from "../utils/logger";
import readAll from "../service/ConnectionOPC/readAll.service";

export async function readerAll() {

    readAll()
}
