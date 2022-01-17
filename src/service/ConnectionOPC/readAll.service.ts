import logger from "../../utils/logger";
import {
  OPCUAClient,
  MessageSecurityMode,
  SecurityPolicy,
  AttributeIds,
  StatusCodes,
  DataType,
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

const maxAge = 0;
const nodeToRead = {
  nodeId: "ns=3;s=Scalar_Simulation_String",
  attributeId: AttributeIds.Value,
};

const client = OPCUAClient.create(options);
logger.info("OPC client created");

class OPCObject {
  nodeID: string;
  valueIN: number;
  valueOUT: any;

  constructor(nodeID: string, valueIN: number, valueOUT: any) {
    this.nodeID = nodeID;
    this.valueIN = valueIN;
    this.valueOUT = valueOUT;
  }
}

async function readAll() {
  try {
    await client.connect(endpointUrl);
    logger.info("OPC cliente Connected(to read)");
    const session = await client.createSession();
    const getTags = getAllReadable()
    console.log(getTags);
    /* const maxAge = 0;
    const nodeToRead = {
      nodeId: ,
      attributeId: AttributeIds.Value,
    }; */
    
    await session.close();
    await client.disconnect();
    logger.info("Session close and client Disconected");
    /* const objMessage = new OPCObject(nodeId, valueIn, Value(valueIn));
    logger.info({ statusCode: statusCode.description, resume: objMessage });
    return objMessage; */
  } catch (error) {
    logger.error("Could not connect to OPC server, check your connection ...");
    process.exit(1);
  }
}

export default readAll;
