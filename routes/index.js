const express = require('express');
const router = express.Router();

const {postDaftar,getPeserta}=require('../controllers/Daftar')
const {postTable,getTable,patchTable}=require("../controllers/Table")
const {Login,Register,Auth}=require("../controllers/auth")
const {auth}=require("../middleware/auth")
const {postKejuaraan,getKejuaraan,deletKejuaraan,patchKejuaraan,getKejuaraanId}=require("../controllers/Kejuaraan");

module.exports = function(io){
    let nama =""
    let id = ""
    let params = ""
    io.on('connection',(socket)=>{
        socket.on('listening',(data)=>{
            nama = data.nama
            id =  data.id
            params = data.params
            // console.log(data.data)
            let sendData = {
                nilai : parseInt(data.data),
                babak : parseInt(data.babak)
            }
            socket.broadcast.emit(`${nama}${id}${params}`,sendData)
        })

    })

    router.post("/register",Register)
    router.post('/login',Login);
    router.get('/auth',auth, Auth)

    router.post("/kejuaraan",auth,postKejuaraan)
    router.get("/kejuaraan",auth,getKejuaraan)
    router.get("/kejuaraan/:id",auth,getKejuaraanId)
    router.delete("/kejuaraan/:id",auth,deletKejuaraan)
    router.patch("/kejuaraan/:id",auth,patchKejuaraan)

    router.post("/daftar",auth,postDaftar)
    router.get("/daftar",getPeserta)

    router.post("/table",auth,postTable)
    router.get("/table/:KejuaraanId",auth,getTable)
    router.patch("/table",patchTable)
    return router
};