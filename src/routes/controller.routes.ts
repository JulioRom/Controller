import { Express } from "express";
import { writer } from "../controllers/writer.controller";
import { readerAll, readOne } from "../controllers/reader.controller";

function routes(app: Express) {

  /**
   * @swagger
   * components:
   *  schemas:
   *    Response200:
   *      type: object
   *      properties:
   *        data:
   *          type: string
   *          description: Descripción del resultado de la operación
   *        meta:
   *          type: object
   *          description: Objeto con detalles del slot modificado
   *      required:
   *        - data
   *        - meta
   *      example:
   *        data: "SUCCESSFULLY_EXECUTED_METHOD"
   *        meta: Objeto con detalles del slot modificado
   *    Response404:
   *      type: object
   *      properties:
   *        error:
   *          type: string
   *          description: Descripción del error
   *      required:
   *        - error
   *      example:
   *        data: "SLOT_OR_METHOD_NOT_FOUND"
   *    ResponseReader:
   *      type: object
   *      properties:
   *        slotID:
   *          type: number
   *          description: ID del slot
   *        Value:
   *          type: boolean
   *          description: Valor actual de la luz del slot
   *        Node:
   *          type: string
   *          description: Tag asociado al slot
   *      required:
   *        - data
   *      example:
   *        data:
   *          list:
   *            slotID: 1
   *            Value: true
   *            Node: ns=1;s=S7-TEST.Flags.S1_Output
   *        
   */
  /**
     * @swagger
     * /api/controller/rack/{rackid}/side/{sideid}/slot/{slotid}/method/{methodid}/value/{value}:
     *  post:
     *     summary: Controlador de slots
     *     tags:  [Controller]
     *     parameters:
     *      - name: rackid
     *        in: path
     *        description: Id del rack [1 2 3 4]
     *        required: true
     *      - name: sideid
     *        in: path
     *        description: Cara del rack [0 1] [front back]
     *        required: true
     *      - name: slotid
     *        in: path
     *        description: Id del slot [1 2 3 4]
     *        required: true
     *      - name: methodid
     *        in: path
     *        description: Id del metodo [ 0, 1, 2, 3 ] [ asignado, completo, intermitente, apagar ]
     *        required: true
     *      - name: value
     *        in: path
     *        description: Estado del tag booleano [ 0 1 ]
     *        required: true
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *          application/json:
     *           schema:
     *              $ref: '#/components/schemas/Response200'
     *       404:
     *         description: Error
     *         content:
     *          application/json:
     *           schema:
     *              $ref: '#/components/schemas/Response404'
     */
  app.post("/api/controller/rack/:rackid/side/:side/slot/:slotid/method/:methodid/value/:value", writer);



  /**
   * @swagger
   * /api/controller/showAll:
   *  get:
   *     summary: Muestra el estado de la luz de todos los Slots
   *     tags:  [AllSlots]
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/ResponseReader'
   */
  app.get("/api/controller/showAll", readerAll);



  /**
   * @swagger
   * /api/controller/{slotid}:
   *  get:
   *     summary: Muestra el estado de la luz de un slot en especifico
   *     tags:  [oneSlot]
   *     parameters:
   *      - name: slotid
   *        in: path
   *        description: Id del slot
   *        required: true 
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/ResponseReader'
   */
  app.get("/api/controller/:slotid", readOne);

}

export default routes;
