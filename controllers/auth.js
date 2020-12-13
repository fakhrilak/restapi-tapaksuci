const { User} = require('../models');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

exports.Auth = async(req,res)=>{
	try{
        const user = await User.findOne({
            where:{
                id: req.user.id
            },
            attributes:{
                exclude:[ 'createdAt', 'updatedAt', 'categoryId', 'password' ]
			}         
        })
        res.status(200).send({
             massage:'Auth Success',
             data:user   
		})
    }catch(error){
        res.status(500).send('Server Error')
    }
}
exports.Login = async (req, res) => {
	try {
		const schema = Joi.object({
			email: Joi.string().email().min(6).required(),
			password: Joi.string().min(6).required()
		});
		const { error } = schema.validate(req.body);
		if (error)
			return res.status(400).send({
				error: {
					message: error.details[0].message
				}
			});
		const { email, password } = req.body;
		const user = await User.findOne({
			where: { email }
		});
		if (!user) {
			return res.status(400).send({ message: 'Invalid Login' });
		}

		const validPass = await bcrypt.compare(password, user.password);

		if (!validPass){
			return res.status(400).send({
				error:{
					message: 'Wrong Email or Password'
				}				 
			});
		}else{
			const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
			return res.status(200).send({
				data: {
					message:"Login Succes",
					email,
					token
				}
			});
		}
		
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: 'Server Error' });
	}
};

exports.Register = async (req, res) => {
	try {
		const schema = Joi.object({
			nama: Joi.string().min(3).required(),
			email: Joi.string().email().min(6).required(),
			password: Joi.string().min(6).required(),
		});
		const { error } = schema.validate(req.body);
		if (error)
			return res.status(400).send({
				error: {
					message: error.details[0].message
				}
			});
		const { email, password } = req.body;
		const Email = await User.findOne({
			where: {
				email 
			}
		});
		if (Email){
			return res.status(400).send({
				error: {
					message: 'Email sudah ada'
				}
			});
		}
		else if(!Email){
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await User.create({
				...req.body,
            	password: hashedPassword,
				role:1
			});
			const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user: 'zilogtapaksuci@gmail.com',
			  pass: 'dariziloguntukts'
			}
		  });
		  
		  var mailOptions = {
			from: 'zilogtapaksuci@gmail.com',
			to: email,
			subject: 'Zilog Applikasi',
			text: 'WELCOME ZILOG-APP. Applikasi ini dikembangkan oleh ig:fakhrilak pada bidang pencak silat, jika ada bug silahkan hubungi developer ig: fakhrilak twitter: fakhrilak'
		  };

		  transporter.sendMail(mailOptions, (err, info) => {
			if (err) throw err;
			console.log('Email sent: ' + info.response);
		});
		return res.status(200).send({
			data: {
				message: "Registrasi sukses, anda login sekarang",
				email,
				token
			}
		});
		}
		
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: error });
	}
};