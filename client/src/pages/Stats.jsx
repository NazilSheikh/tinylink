import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getLink } from '../api';

export default function Stats(){
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(()=> {
    setLoading(true);
    getLink(code).then(d => { setLink(d); setLoading(false); })
      .catch(e => { setErr('Not found'); setLoading(false); });
  }, [code]);

  if (loading) return <div>Loading...</div>;
  if (err) return <div className="text-red-500">{err}</div>;

  return (
    // <div className="bg-white shadow rounded p-4">
    //   <h2 className="text-lg font-semibold mb-2">Stats — {link.code}</h2>
    //   <div className="mb-2"><strong>Target:</strong> <a href={link.target} className="text-blue-600" target="_blank" rel="noreferrer">{link.target}</a></div>
    //   <div className="mb-2"><strong>Clicks:</strong> {link.clicks}</div>
    //   <div className="mb-2"><strong>Last clicked:</strong> {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : '-'}</div>
    //   <div className="text-sm text-gray-500">Created at: {new Date(link.createdAt).toLocaleString()}</div>
    // </div>



  <div className="max-w-xl mx-auto bg-white/80 backdrop-blur p-6 rounded-xl shadow-lg border">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
      Stats for <span className="font-mono text-blue-600">{link.code}</span>
    </h2>

    <div className="space-y-3 text-gray-700">
      <p>
        <strong>Target:</strong>{" "}
        <a href={link.target} className="text-blue-600 underline" target="_blank">
          {link.target}
        </a>
      </p>

      <p>
        <strong>Clicks:</strong>{" "}
        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">
          {link.clicks}
        </span>
      </p>

      <p>
        <strong>Last clicked:</strong>{" "}
        {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "-"}
      </p>

      <p className="text-sm text-gray-500">
        Created at: {new Date(link.createdAt).toLocaleString()}
      </p>
    </div>
  </div>
);


}
