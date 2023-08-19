import type { ColumnType } from "kysely";

export type Decimal = ColumnType<string, string | number, string | number>;

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface CheckpointBrothers {
  cpID: number;
  bigBrotherID: number;
}

export interface CheckpointConnections {
  cpID: number;
  childcpID: number;
}

export interface Checkpoints {
  cpID: Generated<number>;
  x: Generated<number>;
  y: Generated<number>;
  z: Generated<number>;
  radius: Generated<number | null>;
  onGround: Generated<number>;
  mapID: Generated<number>;
  ender: string | null;
  elevate: Generated<number>;
  endShaderColor: "blue" | "cyan" | "green" | "orange" | "purple" | "red" | "yellow" | null;
}

export interface CheckpointStatistics {
  runID: number;
  cpID: number;
  timePlayed: number;
  saveCount: number;
  loadCount: number;
  explosiveJumps: number;
  explosiveLaunches: number;
  doubleExplosives: number;
  FPSMode: Generated<"125" | "hax" | "mix">;
  ele: Generated<number>;
  anyPct: Generated<number>;
  hardTAS: Generated<number>;
}

export interface DemoEvents {
  eventID: Generated<number>;
  rpg: number | null;
  saveNum: number | null;
  loadNum: number | null;
}

export interface LongCountry {
  country: string;
  longCountry: Generated<string>;
  continent: string;
}

export interface Mapids {
  mapID: Generated<number>;
  mapname: string;
  releaseDate: Date | null;
  inRotation: Generated<number>;
}

export interface MapMappers {
  mapID: number;
  mapperID: number;
}

export interface Mappers {
  mapperID: Generated<number>;
  name: string;
}

export interface Messages {
  messageID: Generated<number>;
  playerID: number;
  message: string;
  server: Generated<string>;
}

export interface PlayerIgnore {
  playerID: number;
  ignoreID: number;
}

export interface PlayerInformation {
  playerID: Generated<number>;
  playerName: Generated<string>;
  adminLevel: Generated<number>;
  mutedUntil: Date | null;
}

export interface PlayerRuns {
  runID: Generated<number>;
  playerID: number;
  mapID: number;
  finishcpID: number | null;
  runLabel: Generated<string>;
  archived: Generated<Buffer>;
  timePlayed: Generated<number>;
  saveCount: Generated<number>;
  loadCount: Generated<number>;
  explosiveLaunches: Generated<number>;
  instanceNumber: Generated<number>;
  lastParsed: Generated<number>;
  startTimeStamp: Generated<Date>;
  finishTimeStamp: Date | null;
  lastUsedTimeStamp: Generated<Date>;
}

export interface PlayerSaves {
  runID: number;
  saveNumber: number;
  x: Generated<Decimal>;
  y: Generated<Decimal>;
  z: Generated<Decimal>;
  alpha: number;
  beta: number;
  gamma: number;
  explosiveJumps: number;
  doubleExplosives: number;
  checkpointID: number | null;
  flags: number;
  entTargetName: string | null;
  numOfEnt: number | null;
  FPSMode: Generated<"125" | "hax" | "mix">;
}

export interface DB {
  checkpointBrothers: CheckpointBrothers;
  checkpointConnections: CheckpointConnections;
  checkpoints: Checkpoints;
  checkpointStatistics: CheckpointStatistics;
  demoEvents: DemoEvents;
  longCountry: LongCountry;
  mapids: Mapids;
  mapMappers: MapMappers;
  mappers: Mappers;
  messages: Messages;
  playerIgnore: PlayerIgnore;
  playerInformation: PlayerInformation;
  playerRuns: PlayerRuns;
  playerSaves: PlayerSaves;
}
