import express = require('express')

class Server {
    private port;
    private app;

    constructor(port: number) {
        this.port = port
        this.app = express()

        this.app.get('/', (req, res) => res.send('Express + TypeScript Server'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port: ${this.port}`)
        })
    }
}

export default Server;