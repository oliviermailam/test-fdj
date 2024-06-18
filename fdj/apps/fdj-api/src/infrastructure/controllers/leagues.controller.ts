import { Request, Response, Router } from 'express';

import { LeaguesUseCases } from '../../application/usecases/leagues.usecases';
import { validateObjectId } from '../validators/objectId';

/**
 * @swagger
 * tags:
 *   name: Leagues
 *   description: Leagues management
 */

export class LeaguesController {
  public path = '/leagues';
  public router = Router();

  constructor(private readonly leaguesUseCases: LeaguesUseCases) {
    /**
     * @swagger
     * /leagues:
     *   get:
     *     summary: Get all leagues
     *     tags: [Leagues]
     *     responses:
     *       200:
     *         description: The list of the leagues
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *               $ref: '#/components/schemas/League'
     */
    this.router.get(this.path, this.getAllLeagues.bind(this));
    /**
     * @swagger
     * /leagues/{id}:
     *   get:
     *     summary: Get a league by id
     *     tags: [Leagues]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: The id of the league
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: The league from the id
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/League'
     *       400:
     *         description: Invalid id
     *       404:
     *         description: The league was not found
     */
    this.router.get(`${this.path}/:id`, this.getLeagueById.bind(this));
  }

  async getAllLeagues(_req: Request, res: Response): Promise<void> {
    const result = await this.leaguesUseCases.getAllLeagues();
    res.status(200).send(result);
  }

  async getLeagueById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      res.status(400).send({ error: 'Invalid id' });
      return;
    }

    const result = await this.leaguesUseCases.getLeagueById(id);
    res.status(200).send(result);
  }
}
