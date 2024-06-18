import { League } from '@fdj/entities';
import { Schema, model } from 'mongoose';

import { ILeaguesRepository } from '../../domain/repositories-interfaces/leagues.repository.interface';

/**
 * @swagger
 * components:
 *   schemas:
 *     League:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - sport
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the league
 *         name:
 *           type: string
 *           description: The name of the league
 *         sport:
 *           type: string
 *           description: The sport of the league
 *         teams:
 *           type: array
 *           items:
 *             type: string
 *           description: The teams of the league
 */

const LeagueSchema = new Schema({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  teams: { type: [Schema.ObjectId], required: true, default: [] },
});

const Leagues = model('League', LeagueSchema);

export class LeaguesRepository implements ILeaguesRepository {
  async findAll(): Promise<League[]> {
    const mdbLeagues = await Leagues.find();

    return mdbLeagues.map(
      (league) =>
        new League({
          id: league._id.toString(),
          name: league.name,
          sport: league.sport,
          teams: league.teams.map((team) => team.toString()),
        })
    );
  }

  async findById(id: string): Promise<League> {
    const mdbLeague = await Leagues.findById(id);

    if (!mdbLeague) {
      return null;
    }

    return new League({
      id: mdbLeague._id.toString(),
      name: mdbLeague.name,
      sport: mdbLeague.sport,
      teams: mdbLeague.teams.map((team) => team.toString()),
    });
  }
}
