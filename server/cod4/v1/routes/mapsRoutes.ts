import express from "express";
import {
  getAllMaps,
  getMapByName,
  searchMapByName,
} from "../controllers/mapsController";

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
  const { mapname } = req.query;

  // find better way to map this
  const cod4Maps = await searchMapByName((mapname as string | undefined) ?? "");

  res.send(cod4Maps);
});

/**
 * @swagger
 * /api/cod4/v1/maps/{mapname}:
 *   get:
 *     summary: Get a map by mapname
 *     tags: [Maps]
 *     parameters:
 *      - in: path
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
mapRouter.get("/:mapname", async (req, res) => {
  const mapName = req.params.mapname;
  // add validation
  const cod4Map = await getMapByName(mapName);

  if (!cod4Map) {
    res.status(400).send("");
  } else {
    res.send(cod4Map);
  }
});
