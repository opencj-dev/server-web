import { cod4DB } from "../db/cod4DB";
import { Cod4Player } from "../models/cod4Player";

export async function getAllPlayers() {
  const players = await cod4DB
    .selectFrom("playerInformation")
    .selectAll()
    .execute();

  const cod4Players = players.map((player) => new Cod4Player(player));

  return cod4Players;
}

export async function getPlayerById(playerId: number) {
  const player = await cod4DB
    .selectFrom("playerInformation")
    .selectAll()
    .where("playerID", "=", playerId)
    .executeTakeFirst();

  if (!player) {
    return null;
  }

  const cod4Player = new Cod4Player(player);

  return cod4Player;
}
