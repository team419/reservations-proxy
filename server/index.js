const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const bodyParser = require('body-parser');
// Config
const { routes } = require('../proxyconfig.json');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

for (route of routes) {
    app.use(route.route,
        proxy({
            target: route.address,
            pathRewrite: (path, req) => {
                return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
            }
        })
    );
}

app.listen(8888, () => {
    console.log('Proxy listening on port 8888');
});