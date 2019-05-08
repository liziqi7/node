const http = require('http');
const path = require('path');
const url = require('url');
let router = [];

class Application {
  get(pathName, handler) {
    router.push({
      pathName,
      method: 'get',
      handler
    });
  }
  listen() {
    http
      .createServer((req, res) => {
        let { pathname } = url.parse(req.url, true);
        for (const route of router) {         
          if (pathname === route.pathName) {
            route.handler(req, res);
            return;
          }
        }
      })
      .listen(...arguments);
  }
}

module.exports = function() {
  return new Application(...arguments);
};
