// // require('dotenv').config();
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const linksRouter = require('./routes/links');
// // const Link = require('./models/Link');

// // const PORT = process.env.PORT || 5000;
// // const MONGO_URI = process.env.MONGO_URI;
// // const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // healthz
// // app.get('/healthz', (req, res) => {
// //   res.json({ ok: true, version: "1.0" });
// // });

// // // API
// // app.use('/api/links', linksRouter);

// // // Redirect: GET /:code -> 302 or 404
// // app.get('/:code', async (req, res) => {
// //   try {
// //     const { code } = req.params;
// //     // exclude healthz and api prefix by letting API routes hit earlier
// //     const link = await Link.findOne({ code });
// //     if (!link) return res.status(404).send('Not found');

// //     // increment clicks and update lastClicked atomically
// //     link.clicks = link.clicks + 1;
// //     link.lastClicked = new Date();
// //     await link.save();

// //     return res.redirect(302, link.target);
// //   } catch (err) {
// //     console.error(err);
// //     return res.status(500).send('Server error');
// //   }
// // });

// // // connect and start
// // // mongoose.connect(MONGO_URI, { })
// // //   .then(()=> {
// // //     app.listen(PORT, () => {
// // //       console.log(`Server listening on port ${PORT}`);
// // //       console.log(`Base URL: ${BASE_URL}`);
// // //     });
// // //   })
// // //   .catch(err => {
// // //     console.error('Mongo connect error', err);
// // //   });

// // mongoose.connect(MONGO_URI, {
// //   ssl: true,
// //   serverSelectionTimeoutMS: 5000,
// // })
// // .then(() => {
// //   console.log("MongoDB connected successfully");
// // })
// // .catch((err) => {
// //   console.error("MongoDB connection error:", err);
// // });

// // app.listen(process.env.PORT || 5000, () => {
// //   console.log('Server listening on port 5000');
// // });


// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// const linksRouter = require('./routes/links');
// const Link = require('./models/Link');

// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;
// const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// const app = express();

// // Configure CORS: allow specific origin(s) or all for now
// // const clientOrigin = process.env.CLIENT_ORIGIN || '*'; // set CLIENT_ORIGIN to your Vercel URL later
// app.use(cors({ origin: clientOrigin }));


// app.use(cors({
//   origin: (origin, callback) => {
//     const allowed = [
//       "https://tinylink-olive.vercel.app",
//     ];
//     if (!origin || allowed.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("CORS: Not allowed"));
//     }
//   }
// }));


// app.use(express.json());

// // healthz
// app.get('/healthz', (req, res) => res.json({ ok: true, version: "1.0" }));

// // API
// app.use('/api/links', linksRouter);

// // redirect short link
// app.get('/:code', async (req, res) => {
//   try {
//     const { code } = req.params;
//     // protect against matching other routes (healthz / api handled above)
//     const link = await Link.findOne({ code });
//     if (!link) return res.status(404).send('Not found');
//     link.clicks = (link.clicks || 0) + 1;
//     link.lastClicked = new Date();
//     await link.save();
//     return res.redirect(302, link.target);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send('Server error');
//   }
// });

// // OPTIONAL: serve client static files if you build client into server/public
// if (process.env.SERVE_CLIENT === 'true') {
//   const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
//   app.use(express.static(clientBuildPath));
//   app.get('*', (req, res) => res.sendFile(path.join(clientBuildPath, 'index.html')));
// }

// // connect to mongo
// mongoose.connect(MONGO_URI, {
//   // let driver choose best TLS options; you can add options if needed
//   serverSelectionTimeoutMS: 10000,
// })
// .then(() => console.log("MongoDB connected successfully"))
// .catch(err => {
//   console.error("MongoDB connection error:", err);
//   process.exit(1); // exit so Render shows failure logs
// });

// app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));








require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const linksRouter = require("./routes/links");
const Link = require("./models/Link");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ------------------------------------------------------
//  CORS — FIXED
// ------------------------------------------------------
const allowedOrigins = [
  "https://tinylink-olive.vercel.app",   // your Vercel URL
  "https://tinylink-seven-theta.vercel.app", // optional
  "http://localhost:5173", // local frontend
];

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server/no-origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ CORS BLOCKED:", origin);
        return callback(new Error("CORS Not Allowed: " + origin));
      }
    },
  })
);

app.use(express.json());

// ------------------------------------------------------
// healthz (required by assignment)
// ------------------------------------------------------
app.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});

// ------------------------------------------------------
// API Routes
// ------------------------------------------------------
app.use("/api/links", linksRouter);

// ------------------------------------------------------
// Redirect short link: GET /:code
// ------------------------------------------------------
app.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    // Check database
    const link = await Link.findOne({ code });
    if (!link) return res.status(404).send("Not found");

    // Increment stats
    link.clicks = (link.clicks || 0) + 1;
    link.lastClicked = new Date();
    await link.save();

    return res.redirect(302, link.target);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

// ------------------------------------------------------
// Connect to MongoDB
// ------------------------------------------------------
mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// ------------------------------------------------------
// Start server
// ------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
