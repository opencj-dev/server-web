/**
 * @swagger
 * components:
 *  schemas:
 *    Cod4DetailedRun:
 *      properties:
 *        run:
 *          type: object
 *          properties:
 *            runID:
 *              type: integer
 *            timePlayed:
 *              type: integer
 *            saveCount:
 *              type: integer
 *            loadCount:
 *              type: integer
 *            explosiveLaunches:
 *              type: integer
 *            startTimeStamp:
 *              type: string
 *            finishTimeStamp:
 *              type: [string, 'null']
 *            lastUsedTimeStamp:
 *              type: string
 *        player:
 *          type: object
 *          properties:
 *            playerID:
 *              type: integer
 *            playerName:
 *              type: string
 *            adminLevel:
 *              type: integer
 *        map:
 *          type: object
 *          properties:
 *            mapID:
 *              type: integer
 *            mapname:
 *              type: string
 */

export class Cod4DetailedRun {
  run: {
    runID: number;
    timePlayed: number;
    saveCount: number;
    loadCount: number;
    explosiveLaunches: number;
    startTimeStamp: Date;
    finishTimeStamp: Date | null;
    lastUsedTimeStamp: Date;
  };
  player: {
    playerID: number;
    playerName: string;
    adminLevel: number;
  };
  map: {
    mapID: number;
    mapname: string;
  };

  constructor(data: {
    runID: number;
    playerID: number;
    mapID: number;
    timePlayed: number;
    saveCount: number;
    loadCount: number;
    explosiveLaunches: number;
    startTimeStamp: Date;
    finishTimeStamp: Date | null;
    lastUsedTimeStamp: Date;
    playerName: string;
    adminLevel: number;
    mapname: string;
  }) {
    this.run = {
      runID: data.runID,
      timePlayed: data.timePlayed,
      explosiveLaunches: data.explosiveLaunches,
      finishTimeStamp: data.finishTimeStamp,
      lastUsedTimeStamp: data.lastUsedTimeStamp,
      loadCount: data.loadCount,
      saveCount: data.saveCount,
      startTimeStamp: data.startTimeStamp,
    };
    this.player = {
      playerID: data.playerID,
      playerName: data.playerName,
      adminLevel: data.adminLevel,
    };
    this.map = {
      mapID: data.mapID,
      mapname: data.mapname,
    };
  }
}
