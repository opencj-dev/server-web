import { cod4DB } from "../db/cod4DB";
import { Cod4Map } from "../models/cod4Map";

export async function getAllMaps() {
  const maps = await cod4DB.selectFrom("mapids").selectAll().execute();

  const cod4Maps = maps.map((map) => new Cod4Map(map));

  return cod4Maps;
}

export async function getMapByName(mapName: string) {
  const map = await cod4DB
    .selectFrom("mapids")
    .selectAll()
    .where("mapname", "=", mapName)
    .executeTakeFirst();

  if (!map) {
    return;
  }

  return new Cod4Map(map);
}

export async function searchMapByName(mapName: string) {
  const maps = await cod4DB
    .selectFrom("mapids")
    .selectAll()
    .where("mapname", "like", `${mapName}%`)
    .execute();

  const cod4Maps = maps.map((map) => new Cod4Map(map));

  return cod4Maps;
}
