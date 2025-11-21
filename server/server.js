// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const linksRouter = require('./routes/links');
// const Link = require('./models/Link');

// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;
// const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// const app = express();
// app.use(cors());
// app.use(express.json());

// // healthz
// app.get('/healthz', (req, res) => {
//   res.json({ ok: true, version: "1.0" });
// });

// // API
// app.use('/api/links', linksRouter);

// // Redirect: GET /:code -> 302 or 404
// app.get('/:code', async (req, res) => {
//   try {
//     const { code } = req.params;
//     // exclude healthz and api prefix by letting API routes hit earlier
//     const link = await Link.findOne({ code });
//     if (!link) return res.status(404).send('Not found');

//     // increment clicks and update lastClicked atomically
//     link.clicks = link.clicks + 1;
//     link.lastClicked = new Date();
//     await link.save();

//     return res.redirect(302, link.target);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send('Server error');
//   }
// });

// // connect and start
// // mongoose.connect(MONGO_URI, { })
// //   .then(()=> {
// //     app.listen(PORT, () => {
// //       console.log(`Server listening on port ${PORT}`);
// //       console.log(`Base URL: ${BASE_URL}`);
// //     });
// //   })
// //   .catch(err => {
// //     console.error('Mongo connect error', err);
// //   });

// mongoose.connect(MONGO_URI, {
//   ssl: true,
//   serverSelectionTimeoutMS: 5000,
// })
// .then(() => {
//   console.log("MongoDB connected successfully");
// })
// .catch((err) => {
//   console.error("MongoDB connection error:", err);
// });

// app.listen(process.env.PORT || 5000, () => {
//   console.log('Server listening on port 5000');
// });




require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const linksRouter = require('./routes/links');
const Link = require('./models/Link');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*';

const app = express();

// --- Middlewares ---
app.use(express.json());
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// --- Health Check ---
app.get('/healthz', (req, res) => {
  res.json({ ok: true, version: "1.0" });
});

// --- API Routes ---
app.use('/api/links', linksRouter);

// --- Redirection Route ---
app.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });

    if (!link) return res.status(404).send('Not found');

    link.clicks += 1;
    link.lastClicked = new Date();
    await link.save();

    return res.redirect(302, link.target);
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).send('Server error');
  }
});

// --- Start Server After Mongo Connect ---
mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
