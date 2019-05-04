const next = require('next');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // Nice permalinks for pages.
    // Sets up a custom route, that then uses next.js to render the about page.
    server.get('/', (req, res) => {
      // const params = { id: req.params.id };
      return app.render(req, res, '/');
    });

    server.get('/:slug', (req, res) => {
      return app.render(req, res, '/movie', { slug: req.params.slug });
    });

    server.get('/:slug/play', (req, res) => {
      return app.render(req, res, '/play', { slug: req.params.slug });
    });

    // For all other routes, use next.js.
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err.stack);

    process.exit(1);
  });
