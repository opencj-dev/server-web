import express from "express";
import {
  getAllPlayers,
  getPlayerById,
  searchPlayersByName,
} from "../controllers/playersController";
import { z } from "zod";
import { paginationValidator } from "../../../common/validators/paginationValidator";

export const playersRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: The players API
 * /api/cod4/v1/players:
 *   get:
 *     summary: Get all players
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: All players.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cod4Player'
 *
 */

playersRoute.get("/", async (_, res) => {
  const cod4Players = await getAllPlayers();
  res.send(cod4Players);
});

/**
 * @swagger
 * /api/cod4/v1/players/search:
 *  get:
 *    summary: Search for a player by name
 *    tags: [Players]
 *    parameters:
 *      - in: query
 *        name: offset
 *        required: true
 *        default: 0
 *        schema:
 *          type: integer
 *      - in: query
 *        name: limit
 *        required: true
 *        default: 25
 *        schema:
 *          type: integer
 *      - in: query
 *        name: playerName
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Found players.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                items:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Cod4Player'
 *                offset:
 *                  type: integer
 *                limit:
 *                  type: integer
 *                total:
 *                  type: integer
 */
playersRoute.get("/search", async (req, res) => {
  try {
    const queryParams = z
      .object({
        ...paginationValidator,
        playerName: z.coerce.string({
          invalid_type_error: "playerName must be a string",
        }),
      })
      .parse(req.query);

    const cod4Players = await searchPlayersByName(
      queryParams.offset,
      queryParams.limit,
      queryParams.playerName
    );

    res.send(cod4Players);
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

/**
 * @swagger
 * /api/cod4/v1/players/{playerId}:
 *   get:
 *     summary: Get a player by their ID
 *     tags: [Players]
 *     parameters:
 *      - in: path
 *        name: playerId
 *        required: true
 *        schema:
 *           type: number
 *     responses:
 *       200:
 *         description: The player.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cod4Player'
 *       404:
 *        description: Player not found
 *
 */
playersRoute.get("/:playerId", async (req, res) => {
  try {
    const playerId = z.coerce
      .number({ invalid_type_error: "playerId should be a number" })
      .int()
      .parse(req.params.playerId);

    const cod4Player = await getPlayerById(playerId);

    if (!cod4Player) {
      res.status(404).send("Not found");
    } else {
      res.send(cod4Player);
    }
  } catch (e) {
    res.status(400).send({ error: e });
  }
});
