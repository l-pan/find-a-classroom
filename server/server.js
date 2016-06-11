import Express from 'express';
import path from 'path';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

import serverConfig from './config';
import roomsRoutes from './rooms/rooms.route';

// Apply server public assets and routes
app.use(Express.static(path.resolve(__dirname, '../static')));
app.use('/rooms', roomsRoutes);

// Render Initial HTML
const renderFullPage = (initialState) => {
  const cssPath = process.env.NODE_ENV === 'production' ? '/css/app.min.css' : '/css/app.css';
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Find an empty classroom at Marianopolis College">
        <meta name="author" content="Lawrence Pan">
        <link rel="shortcut icon" href="/img/icon.png" />
        <title>Marianopolis Empty Classroom Finder</title>
        <link rel="stylesheet" href=${cssPath} />
      </head>
      <body>
        <div id="root"></div>
        <script src="/dist/bundle.js"></script>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-71554871-5', 'auto');
          ga('send', 'pageview');

        </script>
      </body>
    </html>
  `;
};

app.get('/', (req, res) => {
  const initialState = require('../algorithms/output/room_time.json');
  res.send(renderFullPage(initialState));
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;
