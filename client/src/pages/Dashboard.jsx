import React, {useEffect, useState} from 'react';
import { listLinks, createLink, deleteLink } from '../api';
import AddLinkForm from '../components/AddLinkForm';
import LinkRow from '../components/LinkRow';

export default function Dashboard(){
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  async function load(){
    setLoading(true);
    try {
      const data = await listLinks();
      setLinks(data);
    } catch(err){
      setError('Failed to load links');
    } finally { setLoading(false); }
  }

  useEffect(()=>{ load(); }, []);

  async function handleAdd(payload){
    try {
      const created = await createLink(payload);
      setLinks(prev => [created, ...prev]);
      return { ok: true, link: created };
    } catch(e){
      if (e.status === 409) return { ok:false, error: 'Code already exists' };
      if (e.status === 400) return { ok:false, error: e.body?.error || 'Validation error' };
      return { ok:false, error: 'Server error' };
    }
  }

  async function handleDelete(code){
    if (!window.confirm(`Delete ${code}?`)) return;
    try {
      await deleteLink(code);
      setLinks(prev => prev.filter(l => l.code !== code));
    } catch(err){
      alert('Failed to delete');
    }
  }

  const filtered = links.filter(l => l.code.includes(query) || l.target.includes(query));

  return (
    // <div>
    //   <div className="mb-4">
    //     <AddLinkForm onAdd={handleAdd} />
    //   </div>

    //   <div className="mb-4 flex items-center gap-2">
    //     <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by code or URL" className="border p-2 rounded flex-1" />
    //     <button onClick={load} className="px-4 py-2 bg-gray-200 rounded">Refresh</button>
    //   </div>

    //   {loading && <div>Loading...</div>}
    //   {error && <div className="text-red-500">{error}</div>}
    //   {!loading && !filtered.length && <div className="text-gray-500">No links yet.</div>}

    //   {!loading && filtered.length > 0 &&
    //     <div className="bg-white shadow rounded">
    //       <table className="w-full text-sm">
    //         <thead>
    //           <tr className="text-left">
    //             <th className="p-2">Code</th>
    //             <th className="p-2">Target</th>
    //             <th className="p-2">Clicks</th>
    //             <th className="p-2">Last Clicked</th>
    //             <th className="p-2">Actions</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {filtered.map(link => (
    //             <LinkRow key={link.code} link={link} onDelete={()=>handleDelete(link.code)} />
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   }
    // </div>
    <div>
  <h1 className="text-2xl font-bold mb-4 text-gray-800">Your Short Links</h1>

  <div className="mb-6">
    <AddLinkForm onAdd={handleAdd} />
  </div>

  <div className="mb-4 flex items-center gap-3">
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search by code or URL"
      className="border border-gray-300 p-3 rounded-lg w-full max-w-md focus:ring-2 focus:ring-blue-500 outline-none"
    />

    <button
      onClick={load}
      className="px-4 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 active:scale-95 transition"
    >
      Refresh
    </button>
  </div>

  {loading && <div className="text-gray-500">Loading...</div>}
  {error && <div className="text-red-500">{error}</div>}
  {!loading && !filtered.length && (
    <div className="text-gray-500">No links yet.</div>
  )}

  {!loading && filtered.length > 0 && (
    <div className="bg-white/80 backdrop-blur-lg shadow-md rounded-xl overflow-hidden border">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Target</th>
            <th className="p-3 text-left">Clicks</th>
            <th className="p-3 text-left">Last Clicked</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>{filtered.map(link => (
          <LinkRow key={link.code} link={link} onDelete={() => handleDelete(link.code)} />
        ))}</tbody>
      </table>
    </div>
  )}
</div>

  );
}




