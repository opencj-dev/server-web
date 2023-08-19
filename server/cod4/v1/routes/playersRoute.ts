import express from "express";
import { getAllPlayers, getPlayerById } from "../controllers/playersController";

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
 *       400:
 *        description: Map not found
 *
 */
playersRoute.get("/:playerId", async (req, res) => {
  const playerId = req.params.playerId;

  const cod4Player = await getPlayerById(Number(playerId));

  if (!cod4Player) {
    res.status(400).send();
  } else {
    res.send(cod4Player);
  }
});
