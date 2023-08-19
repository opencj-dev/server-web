import express from "express";
import { getAllDetailedRunsByPlayerId } from "../controllers/detailedRunsController";

export const detailedRunsRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: DetailedRun
 *   description: The players API
 * /api/cod4/v1/detailedRuns:
 *   get:
 *     summary: Get all runs, with player or map filter
 *     tags: [DetailedRun]
 *     parameters:
 *      - in: query
 *        name: offset
 *        schema:
 *           type: integer
 *        required: true
 *        default: 0
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        required: true
 *        default: 25
 *      - in: query
 *        name: playerId
 *        schema:
 *          type: integer
 *      - in: query
 *        name: mapId
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: All players.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cod4DetailedRun'
 *
 */
detailedRunsRoute.get("/", async (req, res) => {
  const offset = req.query.offset as string | undefined;
  const limit = req.query.limit as string | undefined;
  const playerId = req.query.playerId as string | undefined;
  const mapId = req.query.mapId as string | undefined;

  const cod4DetailedRuns = await getAllDetailedRunsByPlayerId(
    Number(offset ?? 0),
    Number(limit ?? 1),
    {
      playerId: playerId ? Number(playerId) : undefined,
      mapId: mapId ? Number(mapId) : undefined,
    }
  );

  res.send(cod4DetailedRuns);
});
