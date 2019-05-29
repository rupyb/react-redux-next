const express = require('express');
const next = require('next');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';


console.log('numCPUs', numCPUs);
if (!dev && cluster.isMaster) {
    console.log(`Node cluster master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });
} else {
    const app = next({ dir: '.', dev  });
    const handle = app.getRequestHandler();

    app.prepare()
    .then(() => {
        const server = express();
        
        server.get('*', (req, res, next) => {
            return handle(req, res);
        });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`Ready on http://localhost:${port}`)
        })
    });
}
