import { Player } from '@fdj/entities';
import { Schema, model } from 'mongoose';

import { IPlayersRepository } from '../../domain/repositories-interfaces/players.repository.interface';

/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - position
 *         - thumbnail
 *         - signin
 *         - born
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the player
 *         name:
 *           type: string
 *           description: The name of the player
 *         position:
 *           type: string
 *           description: The position of the player
 *         thumbnail:
 *           type: string
 *           description: The thumbnail of the player
 *         signin:
 *           type: object
 *           properties:
 *             amount:
 *               type: number
 *             currency:
 *               type: string
 *           description: The signin of the player
 *         born:
 *           type: string
 *           description: The birthdate of the player
 */

const PlayerSchema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  thumbnail: { type: String, required: true },
  signin: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  born: { type: Date, required: true },
});

const Players = model('Player', PlayerSchema);

export class PlayersRepository implements IPlayersRepository {
  async findById(id: string): Promise<Player | undefined> {
    const mdbPlayer = await Players.findById(id);

    if (!mdbPlayer) {
      return undefined;
    }

    return new Player({
      id: mdbPlayer._id.toString(),
      name: mdbPlayer.name,
      position: mdbPlayer.position,
      thumbnail: mdbPlayer.thumbnail,
      signin: mdbPlayer.signin,
      born: mdbPlayer.born,
    });
  }

  async findByIds(ids: string[]): Promise<Player[]> {
    const mdbPlayers = await Players.find({ _id: { $in: ids } });

    return mdbPlayers.map(
      (player) =>
        new Player({
          id: player._id.toString(),
          name: player.name,
          position: player.position,
          thumbnail: player.thumbnail,
          signin: player.signin,
          born: player.born,
        })
    );
  }
}
