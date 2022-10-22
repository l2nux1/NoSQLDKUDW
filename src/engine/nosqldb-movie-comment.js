
const fs = require('fs')

let obj = {
    tableUser: [], //one user to many comment
    comment: [], 
    commentReply: [] 
}

exports.postComment = (data) => {

}

exports.readAllComment = () => {

}

exports. replyComment = () => {

}

exports.createUser = () => {

}

exports.updateUser = () => {

}

exports.deleteUser = () => {

}

exports.clearDBFile = () => {

}

exports.loadDBFromFile = () => {
    fs.readFile('./db-storage', 'utf8', (err, data) => {
      if (err)  {
        console.log('Error to load data from file')
        return false
      }

      obj = JSON.parse(data)
      obj.tableUser.push({ id: 3, email: 'coba@gmail.com', name: 'coba'})      

      console.log(obj)

      return true
    })
}

exports.saveDBToFile = () => {
    obj.tableUser.push({ id: 1, email: 'test@gmail.com', name: 'test'})
    obj.tableUser.push({ id: 2, email: 'coba@gmail.com', name: 'coba'})

    const jsonData = JSON.stringify(obj);
    fs.writeFile('./db-storage', jsonData, 'utf8', (err) => {
        if (err){
            console.log('Write database error: ', err)
        }
        else{
            console.log('Tables are written to file')
        }
    })

}