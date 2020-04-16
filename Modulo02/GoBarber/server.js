import app from './src/app';

const port = 3333;

// app.use(express.json({ limit: '5mb' }));
// app.use(app().urlencoded({ limit: '5mb', extended: true }));

app.listen(port, () => {
  console.log(`Server online... port ${port}`);
});
