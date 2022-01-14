import express, { Request, Response } from "express";
import {
    OPCUAClient,
    MessageSecurityMode, SecurityPolicy,
    AttributeIds,
    makeBrowsePath,
    ClientSubscription,
    TimestampsToReturn,
    MonitoringParametersOptions,
    ClientMonitoredItem,
    DataValue
 } from "node-opcua-client";
import { getTags } from "../service/searcher";
import logger from "../utils/logger";
import connectOPC from "../utils/connect"


 export async function writer (req: Request ,res: Response){

    const slot = parseInt(req.params.slotid);
    const method = parseInt(req.params.methodid);
    const value = parseInt(req.params.value);
    
    const tag = getTags(slot,method);

    if (tag === undefined) {
        logger.info("slot or method not found")
        res.status(404).json({
            error: {
              message: "SLOT_OR_METHOD_NOT_FOUND",
            },
          })
    }

    const changeOPC = await connectOPC(tag,value);
    res.status(200).json({changeOPC})
}