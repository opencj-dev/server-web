/**
 * @swagger
 * components:
 *  schemas:
 *    Cod4Map:
 *      properties:
 *        mapID:
 *          type: integer
 *        mapname:
 *          type: string
 *        releaseDate:
 *          type: [string, 'null']
 *        inRotation:
 *          type: boolean
 */
export class Cod4Map {
  mapID: number;
  mapname: string;
  releaseDate: Date | null;
  inRotation: boolean;

  constructor(data: {
    mapID: number;
    mapname: string;
    releaseDate: Date | null;
    inRotation: number;
  }) {
    this.inRotation = Boolean(data.inRotation);
    this.mapID = data.mapID;
    this.mapname = data.mapname;
    this.releaseDate = data.releaseDate;
  }
}
