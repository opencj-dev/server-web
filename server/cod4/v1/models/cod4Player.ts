/**
 * @swagger
 * components:
 *  schemas:
 *    Cod4Player:
 *      properties:
 *        playerID:
 *          type: integer
 *        playerName:
 *          type: string
 *        adminLevel:
 *          type: integer
 *        mutedUntil:
 *          type: string
 */
export class Cod4Player {
  playerID: number;
  playerName: string;
  adminLevel: number;
  mutedUntil: Date | null;

  constructor(data: {
    playerID: number;
    playerName: string;
    adminLevel: number;
    mutedUntil: Date | null;
  }) {
    this.playerID = data.playerID;
    this.playerName = data.playerName;
    this.adminLevel = data.adminLevel;
    this.mutedUntil = data.mutedUntil;
  }
}
