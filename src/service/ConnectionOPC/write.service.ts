import logger from "../../utils/logger";
import {
  OPCUAClient,
  MessageSecurityMode,
  SecurityPolicy,
  AttributeIds,
  StatusCodes,
  DataType,
} from "node-opcua-client";

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

const booleanTrue = {
  dataType: DataType.Boolean,
  value: true,
};

const booleanFalse = {
  dataType: DataType.Boolean,
  value: false,
};

const client = OPCUAClient.create(options);
logger.info("OPC client created");

var valueState: { dataType: DataType; value: boolean } | undefined = undefined;

function Value(value: number) {
  if (value === 0) {
    logger.info("value false");
    return (valueState = booleanFalse);
  }
  if (value === 1) {
    logger.info("value true");
    return (valueState = booleanTrue);
  } else {
    logger.info("value undefined");
    return (valueState = undefined);
  }
}

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

async function writeTag(nodeId: string, valueIn: number) {
  try {
    await client.connect(endpointUrl);
    logger.info("OPC cliente Connected");
    const session = await client.createSession();
    const statusCode = await session.write({
      nodeId: nodeId,
      attributeId: AttributeIds.Value,
      value: {
        statusCode: StatusCodes.Good,
        value: Value(valueIn),
      },
    });
    await session.close();
    await client.disconnect();
    logger.info("Session close and client Disconected");
    const objMessage = new OPCObject(nodeId, valueIn, Value(valueIn));
    logger.info({ statusCode: statusCode.description, resume: objMessage });
    return objMessage;
  } catch (error) {
    logger.error("Could not connect to OPC server, check your connection ...");
    process.exit(1);
  }
}

export default writeTag;
