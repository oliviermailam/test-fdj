import { Team } from '@fdj/entities';
import { Schema, model } from 'mongoose';

import { ITeamsRepository } from '../../domain/repositories-interfaces/teams.repository.interface';

/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - thumbnail
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the team
 *         name:
 *           type: string
 *           description: The name of the team
 *         thumbnail:
 *           type: string
 *           description: The thumbnail of the team
 *         players:
 *           type: array
 *           items:
 *             type: string
 *           description: The players of the team
 */

const TeamSchema = new Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  players: { type: [Schema.ObjectId], required: true, default: [] },
});

const Teams = model('Team', TeamSchema);

export class TeamsRepository implements ITeamsRepository {
  async findByIds(ids: string[]): Promise<Team[]> {
    const mdbTeams = await Teams.find({ _id: { $in: ids } });

    return mdbTeams.map(
      (team) =>
        new Team({
          id: team._id.toString(),
          name: team.name,
          thumbnail: team.thumbnail,
          players: team.players.map((player) => player.toString()),
        })
    );
  }

  async findById(id: string): Promise<Team | undefined> {
    const mdbTeam = await Teams.findById(id);

    if (!mdbTeam) {
      return undefined;
    }

    return new Team({
      id: mdbTeam._id.toString(),
      name: mdbTeam.name,
      thumbnail: mdbTeam.thumbnail,
      players: mdbTeam.players.map((player) => player.toString()),
    });
  }
}
