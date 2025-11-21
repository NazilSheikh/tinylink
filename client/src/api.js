// const BASE = 'http://localhost:5000';

// export async function listLinks() {
//   const r = await fetch(`${BASE}/api/links`);
//   if (!r.ok) throw new Error('Failed to list links');
//   return r.json();
// }

// export async function createLink(payload) {
//   const r = await fetch(`${BASE}/api/links`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload)
//   });
//   const data = await r.json();
//   if (!r.ok) throw { status: r.status, body: data };
//   return data;
// }

// export async function getLink(code) {
//   const r = await fetch(`${BASE}/api/links/${code}`);
//   if (!r.ok) throw { status: r.status, body: await r.json() };
//   return r.json();
// }

// export async function deleteLink(code) {
//   const r = await fetch(`${BASE}/api/links/${code}`, { method: 'DELETE' });
//   if (!r.ok) throw { status: r.status, body: await r.json() };
//   return r.json();
// }
   


const BASE = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

export async function listLinks() {
  const r = await fetch(`${BASE}/api/links`);
  if (!r.ok) throw new Error('Failed to list links');
  return r.json();
}

export async function createLink(payload) {
  const r = await fetch(`${BASE}/api/links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await r.json();
  if (!r.ok) throw { status: r.status, body: data };
  return data;
}

export async function getLink(code) {
  const r = await fetch(`${BASE}/api/links/${code}`);
  if (!r.ok) throw { status: r.status, body: await r.json() };
  return r.json();
}

export async function deleteLink(code) {
  const r = await fetch(`${BASE}/api/links/${code}`, { method: 'DELETE' });
  if (!r.ok) throw { status: r.status, body: await r.json() };
  return r.json();
}
