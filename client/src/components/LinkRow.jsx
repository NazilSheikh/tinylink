// import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';

// function truncate(str, n=60) {
//   return str.length > n ? str.slice(0,n-1)+'…' : str;
// }

// export default function LinkRow({ link, onDelete }) {
//   const base =   'http://localhost:5000';
//   const short = `${base}/${link.code}`;

//   return (
//     <tr className="border-t">
//       <td className="p-2 align-top">
//         <div className="font-mono text-sm">{link.code}</div>
//         <div className="mt-1">
//           <RouterLink to={`/code/${link.code}`} className="text-sm text-blue-600">Stats</RouterLink>
//         </div>
//       </td>
//       <td className="p-2 align-top">
//         <div title={link.target} className="text-sm">{truncate(link.target)}</div>
//         <div className="mt-1 text-xs text-gray-500">{short}</div>
//       </td>
//       <td className="p-2 align-top">{link.clicks}</td>
//       <td className="p-2 align-top">{link.lastClicked ? new Date(link.lastClicked).toLocaleString() : '-' }</td>
//       <td className="p-2 align-top">
//         <div className="flex gap-2">
//           <button onClick={() => { navigator.clipboard?.writeText(short); }} className="px-2 py-1 border rounded">Copy</button>
//           <button onClick={onDelete} className="px-2 py-1 border rounded text-red-600">Delete</button>
//         </div>
//       </td>
//     </tr>
//   );
// }




import React from "react";
import { Link as RouterLink } from "react-router-dom";

function truncate(str, n = 60) {
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}

export default function LinkRow({ link, onDelete }) {
  const base = "http://localhost:5000";
  const short = `${base}/${link.code}`;

  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="p-3 font-mono text-blue-700 font-semibold">
        {link.code}
        <div>
          <RouterLink
            to={`/code/${link.code}`}
            className="text-xs mt-1 inline-block text-blue-500 hover:underline"
          >
            View Stats →
          </RouterLink>
        </div>
      </td>

      <td className="p-3 text-gray-700">
        <p title={link.target}>{truncate(link.target)}</p>
        <span className="text-xs text-gray-500">{short}</span>
      </td>

      <td className="p-3">
        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium">
          {link.clicks}
        </span>
      </td>

      <td className="p-3 text-gray-600">
        {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "-"}
      </td>

      <td className="p-3">
        <div className="flex gap-2">
          <button
            onClick={() => navigator.clipboard.writeText(short)}
            className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100 active:scale-95 transition"
          >
            Copy
          </button>

          <button
            onClick={onDelete}
            className="px-3 py-1 border border-red-500 text-red-600 rounded-md text-sm hover:bg-red-50 active:scale-95 transition"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
