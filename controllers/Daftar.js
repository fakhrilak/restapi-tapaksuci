const {Daftar,Kejuaraan} = require('../models');
const Joi = require('@hapi/joi');

exports.postDaftar =async(req,res)=>{
    try{
        const schema = Joi.object({
            nama: Joi.string().required(),
            kontingen: Joi.string().required(),
            kelas: Joi.string().required(),
            KejuaraanId: Joi.string().required()
          });
        const { error } = schema.validate(req.body);
      
          if (error)
            res.status(400).send({
              error: {
                message: error.details[0].message,
              },
            });
        const {nama,KejuaraanId,kelas}= req.body
        const {id}=req.user
        const data = await Daftar.findOne({
            where:{
                nama:nama,
                UserId:id,
                KejuaraanId:KejuaraanId,
                kelas:kelas
            }
        })
        if(!data){
            
            await Daftar.create({
                ...req.body,
                nilai:0,
                UserId:id,
            })
            const updatejumlahpeserta = await Kejuaraan.findOne({
                where:{
                    id:KejuaraanId
                }
            })
            let update = {}
            update.totPeserta = +updatejumlahpeserta.totPeserta + +1
            console.log(update)
            await Kejuaraan.update(update,{
                where:{
                    id:KejuaraanId
                }
            })
            const afterCreate = await Daftar.findOne({
                where:{
                    nama:nama,
                    UserId:id,
                    KejuaraanId:KejuaraanId,
                    kelas:kelas
                }
            })
            if (afterCreate){
                return res.status(200).send({
                    message: "BERHASIL MENAMBAHKAN "+afterCreate.nama +" " + afterCreate.kelas +" " +afterCreate.kontingen,
                    data: afterCreate
                })
            }
        }else{
            return res.status(400).send({
                error:{
                    message: "NAMA SUDAH ADA"
                }
                
            })
        }
    }catch(err){
        console.log(err)
        return res.status(400).send({
            error:{
                message:err
            }
        })
    }
}

exports.getPeserta=async(req,res)=>{
    try{
       const Peserta =  await Daftar.findAll({
            attributes: {
				exclude: [ 'createdAt', 'updatedAt']
            } 
        })
        if(Peserta.length > 0 ){
            return res.status(200).send({
                massage:"Get Data Berhasil",
                data: Peserta
            })
        }else{
            return res.status(400).send({
                massage:"TIDAK ADA PESERTA"
            })
        }
    }catch(err){
        return res.status(500).send({
            massage:"SERVER ERROR"
        })
    }
}

// exports.patchData=async(req,res)=>{
//     try{
//         const {}
//     }catch(err){

//     }
// }