import express from 'express';
import path from 'node:path';
import indexRouter from './routes/indexRouter.js';
import newMessageRouter from './routes/newMessageRouter.js';
import messageRouter from './routes/messageRouter.js';

const app = express();

const port = process.env.PORT || 3000;

const __dirname = path.join(import.meta.dirname);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.use('/new', newMessageRouter);
app.use('/message', messageRouter);
app.use('/', indexRouter);

app.use((req, res) => {
  res.status(404).render('404');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('500', { message: err.message });
});

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on port ${port} (•‿•)`);
});
