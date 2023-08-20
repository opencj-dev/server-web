import { cod4DB } from "../db/cod4DB";
import { Cod4Map } from "../models/cod4Map";

export async function getAllMaps() {
  const maps = await cod4DB.selectFrom("mapids").selectAll().execute();

  const cod4Maps = maps.map((map) => new Cod4Map(map));

  return cod4Maps;
}

export async function getMapByName(mapId: number) {
  const map = await cod4DB
    .selectFrom("mapids")
    .selectAll()
    .where("mapID", "=", mapId)
    .executeTakeFirst();

  if (!map) {
    return;
  }

  return new Cod4Map(map);
}

export async function searchMapByName(mapName: string) {
  const upperMapName = mapName.toUpperCase();
  const maps = await cod4DB
    .selectFrom("mapids")
    .selectAll()
    .where(({ eb, fn }) =>
      eb(fn("upper", ["mapname"]), "like", `%${upperMapName}%`)
    )
    .execute();

  const cod4Maps = maps.map((map) => new Cod4Map(map));

  return cod4Maps;
}
