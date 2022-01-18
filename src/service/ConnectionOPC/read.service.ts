import logger from "../../utils/logger";
import {
  OPCUAClient,
  MessageSecurityMode,
  SecurityPolicy,
  AttributeIds,
} from "node-opcua-client";
import { getAllReadable } from "../searcher";

const endpointUrl = "opc.tcp://10.115.43.26:4840";

const connectionStrategy = {
  initialDelay: 1000,
  maxRetry: 1,
};

const options = {
  connectionStrategy: connectionStrategy,
  securityMode: MessageSecurityMode.None,
  securityPolicy: SecurityPolicy.None,
  endpointMustExist: false,
};

const client = OPCUAClient.create(options);
logger.info("OPC client created");

class OPCObject {
  slotID: number;
  nodeID: string;
  value: string;

  constructor(slotID: number, value: string, nodeID: string) {
    this.slotID = slotID;
    this.value = value;
    this.nodeID = nodeID;
  }
}

export async function readAll() {
  try {
    await client.connect(endpointUrl);
    logger.info("OPC cliente Connected(to read)");
    const session = await client.createSession();
    const getTags = getAllReadable();
    const maxAge = 0;
    const list: any[] = [];
    for (let index = 0; index < getTags.length; index++) {
      const slot = getTags[index];
      const tag = slot.tagsId;

      const nodeToRead = {
        nodeId: tag,
        attributeId: AttributeIds.Value,
      };
      // read the tag and keep the value
      const dataValue = await session.read(nodeToRead, maxAge);
      const objData = new OPCObject(slot.slotId, dataValue.value.value, tag);
      const sortData = {
        slotID: objData.slotID,
        Value: objData.value,
        Node: objData.nodeID,
      };
      //create an array of object with the info a return it back
      list.push(sortData);
    }
    await session.close();
    await client.disconnect();
    logger.info("Session close and client Disconected");
    logger.info({ list });
    return { list };
  } catch (error) {
    logger.error("Could not connect to OPC server, check your connection ...");
    process.exit(1);
  }
}

export async function readOnly(nodeId: string) {
  try {
    await client.connect(endpointUrl);
    logger.info("OPC cliente Connected(to read)");
    const session = await client.createSession();
    const maxAge = 0;
    const nodeToRead = {
      nodeId: nodeId,
      attributeId: AttributeIds.Value,
    };
    // read the tag and keep the value
    const dataValue = await session.read(nodeToRead, maxAge);
    await session.close();
    await client.disconnect();
    logger.info("Session close and client Disconected");
    logger.info({ dataValue });
    return { dataValue };
    
    }
   catch (error) {
    logger.error("Could not connect to OPC server, check your connection ...");
    process.exit(1);
  }
}