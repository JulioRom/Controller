import { Express } from "express";
import { writer } from "../controllers/writer";
import { readerAll } from "../controllers/reader";

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
   *      required:
   *        - data
   *      example:
   *        data: "SUCCESSFULLY_EXECUTED_METHOD"
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
   *        
   */

  /**
   * @swagger
   * /api/controller/{slotid}/{methodid}/{value}:
   *  post:
   *     summary: Get a single product by the productId
   *     tags:  [Response]
   *     parameters:
   *      - name: slotid
   *        in: path
   *        description: Id del slot
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
  app.post("/api/controller/:slotid/:methodid/:value", writer);



  app.get("/api/controller/showAll", readerAll);

}

export default routes;
