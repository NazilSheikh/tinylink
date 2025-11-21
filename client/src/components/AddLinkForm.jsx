// import React, {useState} from 'react';

// export default function AddLinkForm({ onAdd }) {
//   const [target, setTarget] = useState('');
//   const [code, setCode] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

//   async function submit(e) {
//     e.preventDefault();
//     setError(null);
//     if (!target) return setError('Please enter a URL');
//     if (code && !CODE_REGEX.test(code)) return setError('Custom code must be 6-8 alphanumeric characters');

//     setLoading(true);
//     const result = await onAdd({ target, code: code || undefined });
//     setLoading(false);
//     if (!result.ok) {
//       setError(result.error || 'Failed to create');
//     } else {
//       setTarget('');
//       setCode('');
//       alert('Created: ' + result.link.code);
//     }
//   }

//   return (
//     <form onSubmit={submit} className="bg-white p-4 rounded shadow">
//       <div className="flex gap-2 flex-col sm:flex-row">
//         <input value={target} onChange={e=>setTarget(e.target.value)} placeholder="https://example.com/long/url" className="flex-1 border p-2 rounded" />
//         <input value={code} onChange={e=>setCode(e.target.value)} placeholder="custom code (optional)" className="w-48 border p-2 rounded" />
//         <button disabled={loading} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-70">
//           {loading ? 'Creating...' : 'Create'}
//         </button>
//       </div>
//       {error && <div className="text-red-500 mt-2">{error}</div>}
//     </form>
//   );
// }





import React, { useState } from "react";

export default function AddLinkForm({ onAdd }) {
  const [target, setTarget] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

  async function submit(e) {
    e.preventDefault();
    setError(null);

    if (!target) return setError("Please enter a URL");
    if (code && !CODE_REGEX.test(code))
      return setError("Custom code must be 6-8 alphanumeric characters");

    setLoading(true);
    const result = await onAdd({ target, code: code || undefined });
    setLoading(false);

    if (!result.ok) {
      setError(result.error || "Failed to create");
    } else {
      setTarget("");
      setCode("");
    }
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-200"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Create a Short Link
      </h2>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Enter long URL (https://...)"
          className="flex-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 p-3 rounded-lg outline-none transition"
        />

        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Custom code (optional)"
          className="sm:w-52 border border-gray-300 focus:ring-2 focus:ring-blue-500 p-3 rounded-lg outline-none transition"
        />

        <button
          disabled={loading}
          type="submit"
          className="px-5 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 active:scale-95 transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>

      {error && <div className="text-red-500 mt-2 font-medium">{error}</div>}
    </form>
  );
}
