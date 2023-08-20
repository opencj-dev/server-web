import express from "express";
import {
  getAllMaps,
  getMapByName,
  searchMapByName,
} from "../controllers/mapsController";
import { z } from "zod";

export const mapRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Maps
 *   description: The maps managing API
 * /api/cod4/v1/maps:
 *   get:
 *     summary: Get all maps
 *     tags: [Maps]
 *     responses:
 *       200:
 *         description: All maps.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cod4Map'
 *
 */
mapRouter.get("/", async (_, res) => {
  const cod4Map = await getAllMaps();
  res.send(cod4Map);
});

/**
 * @swagger
 * /api/cod4/v1/maps/search:
 *   get:
 *     summary: Search for maps by map name
 *     tags: [Maps]
 *     parameters:
 *      - in: query
 *        name: mapname
 *        required: true
 *        schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The map.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cod4Map'
 *       400:
 *        description: Map not found
 *
 */
mapRouter.get("/search", async (req, res) => {
  try {
    const queryParams = z
      .object({
        mapname: z.string(),
      })
      .parse(req.query);

    const cod4Maps = await searchMapByName(queryParams.mapname);
    res.send(cod4Maps);
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

/**
 * @swagger
 * /api/cod4/v1/maps/{mapId}:
 *   get:
 *     summary: Get a map by mapname
 *     tags: [Maps]
 *     parameters:
 *      - in: path
 *        name: mapId
 *        required: true
 *        schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The map.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cod4Map'
 *       404:
 *        description: Map not found
 *
 */
mapRouter.get("/:mapId", async (req, res) => {
  try {
    const mapId = z.coerce
      .number({ invalid_type_error: "mapId should be a number" })
      .int()
      .parse(req.params.mapId);

    const cod4Map = await getMapByName(mapId);

    if (!cod4Map) {
      res.status(404).send("Not found");
    } else {
      res.send(cod4Map);
    }
  } catch (e) {
    res.status(400).send({ error: e });
  }
});
