import express from "express";
import { getAllPlayers, getPlayerById } from "../controllers/playersController";
import { z } from "zod";

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
