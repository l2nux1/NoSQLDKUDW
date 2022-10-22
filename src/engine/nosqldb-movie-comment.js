
const fs = require('fs')

let obj = {
    user: [], 
    comment: []
}

const avatarDir = './src/avatar'

Array.prototype.customCommentFilter = function (fn) {
    const filtered = []

    for(let i=0; i<this.length; i++){
        if(fn(this[i])){
            const getUserInfo = obj.user.map(x => x.emailAddr).indexOf(this[i].emailAddr)
            const userAlias = obj.user[getUserInfo].name
            const userAvatar = obj.user[getUserInfo].avatar
            filtered.push({userAlias, userAvatar, comment: this[i].comment})
        }
    }

    return filtered
}

exports.postComment = (comment) => {
    obj.comment.push(comment)
    
    console.log(obj.comment);
    saveDBToFile()
}

exports.getComment = (movie) => {
    return obj.comment.customCommentFilter((data) => {
        console.log(data.movie, movie)
        return data.movie === movie
    })    
}

exports.createUser = (data) => {
    obj.user.push(data)
    console.log('users: ', obj.user)
    saveDBToFile()
}

exports.getAllUsers = () => {
    return obj.user
}

exports.getUser = (emailAddr) => {
    const getUserInfo = obj.user.map(x => x.emailAddr).indexOf(emailAddr)
    if (getUserInfo == -1) return null

    console.log('result: ', obj.user[getUserInfo])
    return obj.user[getUserInfo]
}

exports.reloadDB = () => {
    return loadDBFromFile()
}

exports.getAvatarFileName = async () => {
    return new Promise((resolve, reject) => {
        fs.readdir(avatarDir, (err,files) => {
            //console.log(files)
            if (err){
                reject(err)
            }
            resolve(files)
        })    
    })
}

exports.getAvatarImage = async (avatarName) => {
    return new Promise((resolve, reject) => {
        fs.access(`${avatarDir}/${avatarName}`, fs.F_OK, (err) => {
            if (err){
                reject(err)
            }
            resolve(avatarName)
        })
    })
}

function loadDBFromFile(){
    fs.readFile('./db-storage', 'utf8', (err, data) => {
        if (err)  {
          console.log('Error to load data from file, use default object')
          return
        }
        obj = JSON.parse(data)
        console.log(obj)
    })
}

function saveDBToFile(){
    
    const jsonData = JSON.stringify(obj);    
    fs.writeFile('./db-storage', jsonData, 'utf8', (err) => {
        if (err){
            console.log('Write database error: ', err)
            return false
        }
        console.log('New data is written to file')
        return true
    })

}