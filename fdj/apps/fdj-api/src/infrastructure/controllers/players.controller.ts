import { Request, Response, Router } from 'express';

import { PlayersUseCases } from '../../application/usecases/players.usecases';
import { validateObjectId } from '../validators/objectId';

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: Players management
 */

export class PlayersController {
  public path = '/players';
  public router = Router();

  constructor(private readonly playersUseCases: PlayersUseCases) {
    /**
     * @swagger
     * /players/{id}:
     *   get:
     *     summary: Get player by id
     *     tags: [Players]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The player id
     *     responses:
     *       200:
     *         description: The player from the id
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Player'
     *       400:
     *         description: Invalid id
     *       404:
     *         description: The player was not found
     */
    this.router.get(`${this.path}/:id`, this.getPlayerById.bind(this));
  }

  async getPlayerById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    if (!validateObjectId(id)) {
      res.status(400).send({ message: 'Invalid id' });
      return;
    }

    const player = await this.playersUseCases.getPlayerById(id);

    if (!player) {
      res.status(404).send();
      return;
    }

    res.status(200).send(player);
  }
}
