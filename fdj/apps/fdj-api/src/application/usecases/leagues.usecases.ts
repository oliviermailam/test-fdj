import { League } from '@fdj/entities';

import { ILeaguesRepository } from '../../domain/repositories-interfaces/leagues.repository.interface';

export class LeaguesUseCases {
  constructor(private readonly leaguesRepository: ILeaguesRepository) {}

  async getAllLeagues(): Promise<League[]> {
    return this.leaguesRepository.findAll();
  }

  async getLeagueById(id: string): Promise<League> {
    return this.leaguesRepository.findById(id);
  }
}
