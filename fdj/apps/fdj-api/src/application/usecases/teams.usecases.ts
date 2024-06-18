import { Team, Player } from '@fdj/entities';

import { ITeamsRepository } from '../../domain/repositories-interfaces/teams.repository.interface';
import { IPlayersRepository } from '../../domain/repositories-interfaces/players.repository.interface';

export class TeamsUseCases {
  constructor(
    private readonly teamsRepository: ITeamsRepository,
    private readonly playersRepository: IPlayersRepository
  ) {}

  async getTeamsByIds(ids: string[]): Promise<Team[]> {
    return this.teamsRepository.findByIds(ids);
  }

  async getTeamById(id: string): Promise<Team | undefined> {
    return this.teamsRepository.findById(id);
  }

  async getPlayersByTeamId(id: string): Promise<Player[]> {
    const team = await this.teamsRepository.findById(id);

    if (!team) {
      return [];
    }

    return this.playersRepository.findByIds(team.players);
  }
}
