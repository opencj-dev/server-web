import { cod4DB } from "../db/cod4DB";
import { Cod4DetailedRun } from "../models/cod4DetailedRun";

export async function getAllDetailedRunsByPlayerId(
  offset: number,
  limit: number,
  filters: {
    playerId?: number;
    mapId?: number;
  }
) {
  let query = cod4DB
    .selectFrom("playerRuns")
    .innerJoin(
      "playerInformation",
      "playerInformation.playerID",
      "playerRuns.playerID"
    )
    .innerJoin("mapids", "mapids.mapID", "playerRuns.mapID")
    .select([
      "playerInformation.adminLevel",
      "playerInformation.playerID",
      "playerInformation.playerName",
      "mapids.mapname",
      "mapids.mapID",
      "playerRuns.explosiveLaunches",
      "playerRuns.finishTimeStamp",
      "playerRuns.lastUsedTimeStamp",
      "playerRuns.startTimeStamp",
      "playerRuns.loadCount",
      "playerRuns.runID",
      "playerRuns.saveCount",
      "playerRuns.timePlayed",
    ])
    .orderBy("playerRuns.runID", "desc")
    .limit(limit)
    .offset(offset);

  if (filters.playerId) {
    query = query.where("playerRuns.playerID", "=", filters.playerId);
  }
  if (filters.mapId) {
    query = query.where("playerRuns.mapID", "=", filters.mapId);
  }

  const detailedRuns = await query.execute();

  const cod4DetailedRuns = detailedRuns.map((run) => new Cod4DetailedRun(run));

  return cod4DetailedRuns;
}
