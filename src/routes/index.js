const nextRoutes = require('next-routes')
const routes = (module.exports = nextRoutes())

routes.add('index', 'index');
routes.add('page', '/page/:slug');
routes.add('post', '/post/:slug');
routes.add('posts', '/posts/:category');
routes.add('packages', '/packages/:slug');
routes.add('package', '/package/:slug');
