import axios from 'axios';
import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Repo } from '../entity/Repo';

const repoRepo = AppDataSource.getRepository(Repo);

export const fetchReposFromGithub = async (_: Request, res: Response) => {
  try {
    const { data } = await axios.get('https://api.github.com/orgs/crystaldelta/repos');
    const repos = data.map((repo: any) => repoRepo.create({
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description || '',
      language: repo.language || 'N/A',
    }));
    await repoRepo.save(repos);
    res.json(repos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch GitHub repos', error: err });
  }
};

export const getRepos = async (_: Request, res: Response) => {
  const repos = await repoRepo.find();
  res.json(repos);
};

export const updateRepo = async (req: Request, res: Response) => {
  const repoRepo = AppDataSource.getRepository(Repo);
  const id = parseInt(req.params.id);

  try {
    const existing = await repoRepo.findOneBy({ id });
    if (!existing) {
       res.status(404).json({ message: "Repo not found" });
       return;
    }

    repoRepo.merge(existing, req.body);
    const result = await repoRepo.save(existing);
    res.json(result);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update repo" });
  }
};

export const deleteRepo = async (req: Request, res: Response) => {
  await repoRepo.delete(req.params.id);
  res.json({ message: 'Repo deleted' });
};
