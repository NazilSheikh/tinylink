const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const { isValidUrl, isValidCode } = require('../utils/validate');

// POST /api/links - create link
router.post('/', async (req, res) => {
  try {
    const { target, code } = req.body;
    if (!target) return res.status(400).json({ error: 'target is required' });
    if (!isValidUrl(target)) return res.status(400).json({ error: 'invalid url (must include http/https)' });

    let finalCode = code && code.trim() ? code.trim() : null;
    if (finalCode) {
      if (!isValidCode(finalCode)) return res.status(400).json({ error: 'code must match [A-Za-z0-9]{6,8}' });
      // check exists
      const exists = await Link.findOne({ code: finalCode });
      if (exists) return res.status(409).json({ error: 'code already exists' });
    } else {
      // generate random code of length 6
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const generate = () => Array.from({length:6}).map(()=>chars[Math.floor(Math.random()*chars.length)]).join('');
      do {
        finalCode = generate();
      } while (await Link.findOne({ code: finalCode }));
    }

    const link = new Link({ code: finalCode, target });
    await link.save();
    // return res.status(201).json(link);
    return res.status(201).json({
  ...link.toObject(),
  shortUrl: `${process.env.BASE_URL}/${finalCode}`
});

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

// GET /api/links - list all
router.get('/', async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });
    return res.status(200).json(links);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

// GET /api/links/:code - stats for one code
router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });
    if (!link) return res.status(404).json({ error: 'not found' });
    return res.status(200).json(link);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

// DELETE /api/links/:code - delete
router.delete('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const deleted = await Link.findOneAndDelete({ code });
    if (!deleted) return res.status(404).json({ error: 'not found' });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
