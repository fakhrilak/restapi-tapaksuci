const{Table}=require("../models")
const{Daftar}=require("../models")
const{Stabilisasi,Strabilizelength}=require("./stabilisasi")
exports.postTable=async(req,res)=>{
    try{
        const {data,KejuaraanId,kelas} =req.body
        const {id} = req.user
        const validatecreate = await Table.findAll({
            where:{
                UserId:id,
                KejuaraanId:KejuaraanId,
                kelas: kelas
            }
        })
        if(validatecreate.length > 0){
            console.log(validatecreate)
            return res.status(400).send({
                error:{
                    message:"Table Untuk Kelas Ini Sudah Ada"
                }
            })
        }else{
            const newdata = Stabilisasi(data,kelas)
            let param = newdata.length * 2
            let layer = []
            while (param !== 1) {
                param = param/2  //note:tambahin IDunik
                layer.push(param)
            }    
            let cout= 0
            for(let a=0;a<layer.length;a++){            
                for(let b = 0;b<layer[a];b++){
                    cout+=1
                    await Table.create({
                            nama:"Menunggu Permainan",
                            nilai:"0",
                            KejuaraanId:KejuaraanId,
                            UserId:id,
                            no:cout,
                            kelas:kelas
                        })
                }
            }
            const cari = await Table.findAll({
                where:{
                    UserId:id,
                    KejuaraanId:KejuaraanId,
                    kelas: kelas.toString()
                }
            })
            if (cari.length > 0 ){
                let x = {}
                for(let a = 1; a<newdata.length+1;a++){
                    x.nama=newdata[a-1].nama
                    x.nilai= newdata[a-1].nilai
                    x.kontingen= newdata[a-1].kontingen
                    x.kelas = newdata[a-1].kelas
                    await Table.update(x,{
                        where:{
                            no : a,
                            kelas: kelas.toString()
                        }
                    })
                }
                return res.status(200).send({
                    massage : "SUKSES CREATE Table",
                })
            }
            else{
                return res.status(400).send({
                    massage:"Tidak Ada Table"
                })
            }
        }
    }catch(err){
        console.log(err)
        return res.status(400).send({
            massage:"Server Error"
        })
    }
}

exports.getTable=async(req,res)=>{
    try{
        const {KejuaraanId} = req.params
        const {id} = req.user
        const cari = await Table.findAll({
            where:{
                UserId:id,
                KejuaraanId:KejuaraanId
            },
            attributes: {
				exclude: [ 'createdAt', 'updatedAt']
            } 
        })
        if (cari.length > 0 ){
            return res.status(200).send({
                message : "SUKSES CREATE TABLE",
                data: cari
            })
        }
        
        else{
            return res.status(400).send({
                error:{
                    message:"Tidak Ada Table"
                }               
            })
        }
    }catch(err){
        console.log(err)
        return res.status(400).send({
            error:{
                 message:"Server Error"
            }
           
        })
    }
}

exports.patchTable=async(req,res)=>{
    try{
        const {index,NilaiKuning,NilaiBiru}=req.body
        const IdKuning = index*2+1
        const IdBiru = IdKuning+1

        let updateNilaiKuning = {}
        updateNilaiKuning.nilai = NilaiKuning
        await Table.update(updateNilaiKuning,{
            where:{
                id: IdKuning
            }
        })

        let updateNilaiBiru = {}
        updateNilaiBiru.nilai = NilaiBiru
        await Table.update(updateNilaiBiru,{
            where:{
                id:IdBiru
            }
        })

        const Kuning = await Table.findOne({
            where:{
                id :IdKuning
            }
        })

        const Biru = await  Table.findOne({
            where:{
                id: IdBiru
            }
        })

        const data  = await Daftar.findAll()

        if(Kuning.dataValues.nilai > Biru.dataValues.nilai){
            let update = {}
            update.nama = Kuning.dataValues.nama,
            update.kontingen = Kuning.dataValues.kontingen
            update.kelas = Kuning.dataValues.kelas
            await Table.update(update,{
                where:{
                    id:+Strabilizelength(data) + +index+1
                }
            })
            return res.status(200).send({
                massage:"PERMAINAN DIMENANGKAN SUDUT KUNING "+ Kuning.dataValues.nama + "BAGAN NO "+" "+ +Strabilizelength(data)+ +index+1 + " " +" BERHASIL DI UPDATE"
            })
        }else if(Kuning.dataValues.nilai < Biru.dataValues.nilai){
            let update = {}
            update.nama = Biru.dataValues.nama,
            update.kontingen = Biru.dataValues.kontingen
            update.kelas = Biru.dataValues.kelas
            await Table.update(update,{
                where:{
                    id:+Strabilizelength(data) + +index+1
                }
            })
            return res.status(200).send({
                massage:"PERMAINAN DIMENANGKAN SUDUT KUNING "+ Biru.dataValues.nama + "BAGAN NO "+" "+ +Strabilizelength(data) + +index+1+" "+" BERHASIL DI UPDATE"
            })
        }
    }catch(err){

    }
}