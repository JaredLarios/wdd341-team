const express = require('express');
const cors = require('cors');
const app = express();


const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app
  .use(cors(corsOptions))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', require('./routes'))
  .use((err, req, res, next) => {
    res
      .status(err.status || 500)
      .json({ error: { status: err.status || 500, message: err.message }})
  });

const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
