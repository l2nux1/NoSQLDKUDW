require('log-timestamp')
const express = require('express')
const cors = require('cors')
const defaultRouterv1 = require('./router/v1/defaultRouter')
const indexRouter = require('./router/v1/indexRouter')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/', indexRouter)
app.use('/api/v1/default', defaultRouterv1)

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(404).send({ status: 1002, msg: err.message, data: {} }); // Bad request
    }
});

function onStart(){
    console.log(`NoSQLKUDW ${process.env.npm_package_version} Start Listening ${port}`)
}

port = process.env.PORT || 3000
app.listen(port, onStart)
module.exports = app