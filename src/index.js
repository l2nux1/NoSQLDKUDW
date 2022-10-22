require('log-timestamp')
const NoSQLDBKUDW = require('./engine/nosqldb-movie-comment')
const express = require('express')
const cors = require('cors')
const defaultRouterv1 = require('./router/v1/default')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/api/v1/default', defaultRouterv1)

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(404).send({ status: 1002, msg: err.message, data: {} }); // Bad request
    }
});

function onStart(){
    console.log(`NoSQLKUDW ${process.env.npm_package_version} Start Listening ${port}`)
    NoSQLDBKUDW.saveDBToFile()
    NoSQLDBKUDW.loadDBFromFile()
}

port = process.env.LOCAL_PORT
app.listen(port, onStart)
module.exports = app