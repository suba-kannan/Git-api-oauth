import axios from 'axios';

const API_URL = 'http://localhost:5000/api/repos';

export const fetchRepos = () => axios.get(API_URL);
export const fetchFromGithub = () => axios.get(`${API_URL}/fetch`);
export const updateRepo = (id: number, data: any) => axios.put(`${API_URL}/${id}`, data);
export const deleteRepo = (id: number) => axios.delete(`${API_URL}/${id}`);
