const NoSQLKUDW = require('../../engine/nosqldb-movie-comment')
const { dirname } = require('path');

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

exports.getAllAvatar = async (req, res, next) => {
    NoSQLKUDW.getAvatarFileName().then((avatars) => {
        console.log('Total Avatar:', avatars.length)
        return res.status(200).send({ msg: 'OK', data: {avatars}})
    },(error) => {
        return res.status(500).send({ msg: 'No Avatar found', data: {}})
    })        
}

exports.getAvatarByName = async (req, res, next) => {
    let avatarName = req.query.avatarName
    console.log('avatarName: ',avatarName)
    NoSQLKUDW.getAvatarImage(avatarName).then((filename) => {
        const baseDir = dirname(require.main.filename)
        const fullName = `${baseDir}/avatar/${filename}`
        console.log('filename: ', fullName)
        return res.sendFile(fullName)
    }, (error) => {
        return res.status(404).send({ msg: 'Image not found', data: {}})
    })
}