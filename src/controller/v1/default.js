const NoSQLKUDW = require('../../engine/nosqldb-movie-comment')

exports.testAPI = async (req, res, next) => {
    res.status(200).send({ msg: 'OK', data: { info: 'NoSQLKUDW API', version: 'v1' } });
}

exports.createUser = async (req, res, next) => {
    let data = req.body

    console.log(data)

    const emailAddr = data.emailAddr
    const address = data.address
    const phone = data.phone
    const name = data.name
    const avatar = data.avatar

    const dataUser = {emailAddr, address, phone, name, avatar }

    NoSQLKUDW.createUser(dataUser)
    return res.status(200).send({ msg: 'User Created', data: {}})
}

exports.getAllUsers = async (req, res, next) => {
    const users = NoSQLKUDW.getAllUsers()
    return res.status(200).send({ msg: 'OK', data: { users }})
}

exports.getUser = async (req, res, next) => {
    const emailAddr = req.query.emailAddr
    const userInfo = NoSQLKUDW.getUser(emailAddr)    
    if (userInfo == null) return res.status(404).send({ msg: 'User not found', data: {}})
    return res.status(200).send({ msg: 'OK', data: { userInfo }})
}

exports.postComment = async (req, res, next) => {
    let data = req.body
    const movie = data.movie
    const emailAddr = data.emailAddr
    const commentStr = data.comment

    const comment = { movie: movie, emailAddr: emailAddr, comment: commentStr }

    NoSQLKUDW.postComment(comment)
    return res.status(200).send({ msg: 'Comment Posted', data: {}})
}

exports.getComment = async (req, res, next) => {
    let movie = req.query.movie
    console.log('movie: ', movie)
    const movieComments = NoSQLKUDW.getComment(movie)
    return res.status(200).send({ msg: 'OK', data: { movieComments }})
}