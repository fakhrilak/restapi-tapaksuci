const {Kejuaraan,Daftar,Table} = require('../models');
const Joi = require('@hapi/joi');


exports.postKejuaraan=async(req,res)=>{
    try{
        const schema = Joi.object({
            nama:   Joi.string().required(),
            dueDate: Joi.string().required(),
            lokasi: Joi.string().required(),
		});
		const { error } = schema.validate(req.body);
		if (error)
			return res.status(400).send({
				error: {
					message: error.details[0].message
				}
            });
        const {id} =req.user
        const {nama}= req.body
        const kejuaraan = await Kejuaraan.findOne({
            where:{
                id:id,
                nama:nama
            }
        })

        if(kejuaraan){
            return res.status(400).send({
                error:{
                     message:"Nama Kejuaraan Sudah Digunakan"
                }              
            })
        }else{
            await Kejuaraan.create({
                ...req.body,
                UserId:id,
                totPeserta:0,
            })
            const resultKejuaraan = await Kejuaraan.findOne({
                where:{
                    UserId:id,
                    nama:nama
                }
            })

            if(resultKejuaraan){
                return res.status(200).send({
                    message:"Berhasil Menambahakan Kejuaraan "+ nama
                })
            }else{
                return res.status(400).send({
                    error:{
                        message:"Kejuaraan " + nama + "Belum Terdaftar Please Try Again"
                    }
                })
            }
        }

    }catch(err){
        console.log(err)
        return res.status(500).send({
            error:{
                message:"Server Error"
            }
        })
    }
}

exports.getKejuaraan=async(req,res)=>{
    try{
        const{id} = req.user
        const kejuaraan =  await Kejuaraan.findAll({
            where:{
                UserId:id
            }
        })
        if(kejuaraan.length > 0){
            return res.status(200).send({
                message:"Rendering Kejuaraan ",
                data:kejuaraan
            })
        }else{
            return res.status(400).send({
                message:"Belom Ada Kejuaraan Diakun Ini"
            })
        }
    }catch(err){
        console.log(err)
        return res.status(500).send({
            error:{
                message:"Server Error"
            }
        })
    }
}

exports.getKejuaraanId=async(req,res)=>{
    try{
        const {id} = req.params
         const kejuaraan =  await Kejuaraan.findOne({
             where:{
                 id:id
             },include:{
                model: Daftar,
                as: "Daftars",
                attributes: {
                  exclude: ["createdAt", "updatedAt"]},
            }
         })
         if (kejuaraan){
             return res.status(200).send({
                 message:"KEJURAAN ID NOMER " + id,
                 data:kejuaraan
             })
         }else{
             return res.status(400).send({
                 error:{
                      message:"Tidak Ada Kejuaraan Dengan Id " + id
                 }             
             })
         }
    }catch(err){
        console.log(err)
        return res.status(500).send({
            error:{
                message:"SERVER ERROR"
            }
        })
    }
}
exports.patchKejuaraan=async()=>{
    try{
        const{id} = req.params
        const editKejuaraan = await Kejuaraan.findOne({
            where:{
                id: id
            }
        })

        if (editKejuaraan){
            await Kejuaraan.update(req.body,{
                where:{
                    id:id
                }
            })
            const result = await Kejuaraan.findOne({
                where:{
                    id:id
                }
            })
            if(result){
                return res.status(200).send({
                    message:"Berhasil Mengupdate Kejuaraa, Nama: " + result.nama + "Tempat : " + result.lokasi + " Tanggal: " + result.dueDate
                })
            }
        }
    }catch(err){
        console.log(err)
        return res.status(500).send({
            message:"Server Error"
        })
    }
}

exports.deletKejuaraan=async()=>{
    try{
        const {id} = req.params
        const beforDelet = await Kejuaraan.findOne({
            where:{
                id:id
            }
        })
        if(beforDelet){
            await Kejuaraan.destroy({
                where:{
                    id:id
                }
            })
            return res.status(200).send({
                message: "Berhasil Menghapus Pertandingan " + beforDelet.nama
            })
        }else{
            return res.status(400).send({
                error:{
                    message:"Tidak Pertandingan Yang Dimaksud"
                }
            })
        }
    }catch(err){
        console.log(err)
        return res.send(500).send({
            error:{
                message:err
            }
        })
    }
}