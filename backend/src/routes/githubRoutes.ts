import { Router } from 'express';
import { fetchReposFromGithub, getRepos, updateRepo, deleteRepo } from '../controller/githubController';

const router = Router();

router.get('/fetch', fetchReposFromGithub);
router.get('/', getRepos);
router.put('/:id', updateRepo);
router.delete('/:id', deleteRepo);

export default router;
