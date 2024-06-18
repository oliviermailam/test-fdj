import { Request, Response, Router } from 'express';

import { TeamsUseCases } from '../../application/usecases/teams.usecases';
import { validateObjectId } from '../validators/objectId';

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Teams management
 */

export class TeamsController {
  public path = '/teams';
  public router = Router();

  constructor(private readonly teamsUseCases: TeamsUseCases) {
    /**
     * @swagger
     * /teams/{ids}:
     *   get:
     *     summary: Get teams by ids
     *     tags: [Teams]
     *     parameters:
     *       - in: path
     *         name: ids
     *         schema:
     *           type: array
     *           items:
     *             type: string
     *         required: true
     *         description: The teams ids
     *     responses:
     *       200:
     *         description: The list of the teams
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Team'
     *       400:
     *         description: Invalid id
     */
    this.router.get(`${this.path}/:ids`, this.getTeamsByIds.bind(this));
    /**
     * @swagger
     * /teams/{id}:
     *   get:
     *     summary: Get team by id
     *     tags: [Teams]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The team id
     *     responses:
     *       200:
     *         description: The team from the id
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Team'
     *       400:
     *         description: Invalid id
     *       404:
     *         description: The team was not found
     */
    this.router.get(`${this.path}/:id`, this.getTeamById.bind(this));
    /**
     * @swagger
     * /teams/{id}/players:
     *   get:
     *     summary: Get players by teamId
     *     tags: [Teams]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The team id
     *     responses:
     *       200:
     *         description: The players from the team
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Player'
     *       400:
     *         description: Invalid id
     *       404:
     *         description: The team was not found
     */
    this.router.get(
      `${this.path}/:id/players`,
      this.getPlayersByTeamId.bind(this)
    );
  }

  async getTeamsByIds(req: Request, res: Response): Promise<void> {
    const teamsIds = req.params.ids.split(',');

    if (!teamsIds.length || teamsIds.some((id) => !validateObjectId(id))) {
      res.status(400).send({ message: 'Invalid id' });
      return;
    }

    const teams = await this.teamsUseCases.getTeamsByIds(teamsIds);
    res.status(200).send(teams);
  }

  async getTeamById(req: Request, res: Response): Promise<void> {
    if (!validateObjectId(req.params.id)) {
      res.status(400).send({ message: 'Invalid id' });
      return;
    }

    const team = await this.teamsUseCases.getTeamById(req.params.id);

    if (!team) {
      res.status(404).send({ message: 'Team not found' });
      return;
    }

    res.status(200).send(team);
  }

  async getPlayersByTeamId(req: Request, res: Response): Promise<void> {
    if (!validateObjectId(req.params.id)) {
      res.status(400).send({ message: 'Invalid id' });
      return;
    }

    const players = await this.teamsUseCases.getPlayersByTeamId(req.params.id);
    res.status(200).send(players);
  }
}
