const express = require('express');
const cors = require('cors');
const connectDB = require('../config/database');

class Server {
    constructor() {
        this.port = process.env.PORT || 3000;
        this.app = express();

        this.issuePath = "/api/issues";
        this.middlewares();
        this.routes();
        connectDB();
    }

    routes() {
        this.app.use(this.issuePath, require('../routes/IssueRoutes'));
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors())
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`The server is listening on the port: ${this.port}`);
        });
    }
}

module.exports = Server;