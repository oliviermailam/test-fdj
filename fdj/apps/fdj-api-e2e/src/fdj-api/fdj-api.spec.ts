import axios from 'axios';

describe('GET /leagues', () => {
  it('should return a list of leagues', async () => {
    try {
      const res = await axios.get(`/api/leagues`);

      expect(res.status).toBe(200);
      expect(res.data).toBeInstanceOf(Array);
    } catch (err) {
      console.error(err);
    }
  });
});

describe('GET /teams/:ids', () => {
  it('should return a list of teams', async () => {
    try {
      const res = await axios.get(
        `/api/teams/5d2d01fdda07b95bb8f16f0a,5d2d02d7da07b95bb8f16f2a`
      );

      expect(res.status).toBe(200);
      expect(res.data).toBeInstanceOf(Array);
    } catch (err) {
      console.error(err);
    }
  });

  it('should return a 400 error', async () => {
    try {
      await axios.get(`/api/teams/5d2d01fdda07b95bb8f16f0a,123`);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });
});

describe('GET /teams/:id', () => {
  it('should return a team', async () => {
    try {
      const res = await axios.get(`/api/teams/5d2d01fdda07b95bb8f16f0a`);

      expect(res.status).toBe(200);
      expect(res.data).toBeInstanceOf(Object);
    } catch (err) {
      console.error(err);
    }
  });

  it('should return a 404 error', async () => {
    try {
      await axios.get(`/api/teams/5d2d01fdca09b95bb8f16f0a`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  it('should return a 400 error', async () => {
    try {
      await axios.get(`/api/teams/123`);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });
});

describe('GET /players/:id', () => {
  it('should return a player', async () => {
    try {
      const res = await axios.get(`/api/players/5d2d058cda07b95bb8f16f80`);

      expect(res.status).toBe(200);
      expect(res.data).toBeInstanceOf(Object);
    } catch (err) {
      console.error(err);
    }
  });

  it('should return a 404 error', async () => {
    try {
      await axios.get(`/api/players/5d2d958cda07a95bb8f16f81`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  it('should return a 400 error', async () => {
    try {
      await axios.get(`/api/players/1`);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });
});
