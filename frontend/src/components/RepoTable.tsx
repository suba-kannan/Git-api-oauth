import { useEffect, useState } from 'react';
import { fetchRepos, fetchFromGithub, updateRepo, deleteRepo } from '../services/api';

interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  language: string;
}

export default function RepoTable() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Repo>>({});

  useEffect(() => {
    fetchRepos().then(res => setRepos(res.data));
  }, []);

  const handleFetchFromGithub = async () => {
    const res = await fetchFromGithub();
    setRepos(res.data);
  };

  const handleUpdate = async (id: number) => {
    await updateRepo(id, editData);
    const updated = repos.map(r => r.id === id ? { ...r, ...editData } : r);
    setRepos(updated);
    setEditingId(null);
  };

  const handleDelete = async (id: number) => {
    await deleteRepo(id);
    setRepos(repos.filter(r => r.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={handleFetchFromGithub}>Fetch From GitHub</button>
      <table border={1} style={{ width: '100%', marginTop: 10, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Full Name</th>
            <th>URL</th>
            <th>Description</th>
            <th>Language</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {repos.map(repo => (
            <tr key={repo.id}>
              <td>
                {editingId === repo.id ? (
                  <input
                    value={editData.name || ''}
                    onChange={e => setEditData({ ...editData, name: e.target.value })}
                  />
                ) : (
                  repo.name
                )}
              </td>
              <td>
                {editingId === repo.id ? (
                  <input
                    value={editData.full_name || ''}
                    onChange={e => setEditData({ ...editData, full_name: e.target.value })}
                  />
                ) : (
                  repo.full_name
                )}
              </td>
              <td>
                {editingId === repo.id ? (
                  <input
                    value={editData.html_url || ''}
                    onChange={e => setEditData({ ...editData, html_url: e.target.value })}
                  />
                ) : (
                  <a href={repo.html_url} target="_blank" rel="noreferrer">Link</a>
                )}
              </td>
              <td>
                {editingId === repo.id ? (
                  <input
                    value={editData.description || ''}
                    onChange={e => setEditData({ ...editData, description: e.target.value })}
                  />
                ) : (
                  repo.description
                )}
              </td>
              <td>
                {editingId === repo.id ? (
                  <input
                    value={editData.language || ''}
                    onChange={e => setEditData({ ...editData, language: e.target.value })}
                  />
                ) : (
                  repo.language
                )}
              </td>
              <td>
                {editingId === repo.id ? (
                  <>
                    <button onClick={() => handleUpdate(repo.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setEditingId(repo.id); setEditData({
  name: repo.name,
  full_name: repo.full_name,
  html_url: repo.html_url,
  description: repo.description,
  language: repo.language,
});
 }}>Edit</button>
                    <button onClick={() => handleDelete(repo.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
