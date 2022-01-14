import { Express } from "express";
import { writer } from "../controllers/writer";

function routes(app: Express) {

  /**
   * @swagger
   * components:
   *  schemas:
   *    Response:
   *      type: object
   *      properties:
   *        reserve:
   *          type: string
   *          description: Reserva asociada a lpns
   *        lpnAssociates:
   *          type: array of strings
   *          description: lpns asociados a la reserva
   *        reserveStatus:
   *          type: string
   *          description: estado de la reserva
   *      required:
   *        - reserve
   *        - lpnAssociates
   *        - reserveStatus
   *      example:
   *        reserve: "ABC4442"
   *        lpnAssociates: 
   *          ["300400500600733331",
   *           "300400500600733332",
   *           "300400500600733333",
   *           "300400500600733334"]
   *        reserveStatus: "created"
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
   *              $ref: '#/components/schemas/Response'
   *       404:
   *         description: Product not found
   */
  app.post("/api/controller/:slotid/:methodid/:value", writer);

}

export default routes;
