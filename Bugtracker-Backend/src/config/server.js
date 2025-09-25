const express = require('express');

class Server {
    constructor() {
        this.port = process.env.PORT || 3000;
        this.app = express();

        this.issuePath = "/api/issue";
        this.routes();
    }

    routes() {
        this.app.use(this.issuePath, require('../routes/IssueRoutes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`The server is listening on the port: ${this.port}`);
        });
    }
}

module.exports = Server;