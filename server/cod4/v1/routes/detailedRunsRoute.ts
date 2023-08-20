import express from "express";
import { getAllDetailedRunsByPlayerId } from "../controllers/detailedRunsController";
import { z } from "zod";

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
  try {
    const queryParams = z
      .object({
        offset: z.coerce
          .number({ invalid_type_error: "offset must be a number" })
          .int()
          .nonnegative(),
        limit: z.coerce
          .number({ invalid_type_error: "limit must be a number" })
          .int()
          .nonnegative(),
        playerId: z.optional(
          z.coerce
            .number({ invalid_type_error: "playerId must be a number" })
            .int()
        ),
        mapId: z.optional(
          z.coerce
            .number({ invalid_type_error: "mapId must be a number" })
            .int()
        ),
      })
      .parse(req.query);

    const cod4DetailedRuns = await getAllDetailedRunsByPlayerId(
      queryParams.offset,
      queryParams.limit,
      {
        playerId: queryParams.playerId,
        mapId: queryParams.mapId,
      }
    );

    res.send(cod4DetailedRuns);
  } catch (e) {
    res.status(400).send({ error: e });
  }
});
