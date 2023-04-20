const bcrypt = require('bcrypt');
const {User} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
module.exports = async(req,res)=>{
    console.log('update data users')
    const schema = {
        name:'string|empty:false',
        email:'string|empty:false',
        password:'string|min:6',
        profession:'string|optional',
        avatar:'string|optional'
    };
    const validate = v.validate(req.body,schema);
    if(validate.length){
        return res.status(400).json({
            status:'error',
            message:validate
        });
    }
    const id = req.params.id;
    const user = User.findByPk(id);
    if(!user){
        return res.status(400).json({
            status:'error',
            message:'User not found'
        });
    }
    const email = req.body.email;
    if(email){
        const checkEmail = await User.findOne({
            where:{email}
        });
        if(checkEmail && email !== user.email){
            return res.status(400).json({
                status:'error',
                message:'email already exists'
            });
        }
        if(req.body.profession && req.body.avatar){
            await User.update({
                name:req.body.name,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password,15),
                profession:req.body.profession,
                avatar:req.body.avatar
            },{
                where:{
                    id:req.body.id
                }
            }).then((user)=>{
                return res.json({status:'success', message:'update user succes'})
            }).catch((error)=>{
                return res.status(400).json({status:'error',message:'update user failed'});
            });
        }else if(req.body.profession){
            await User.update({
                name:req.body.name,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password,15),
                profession:req.body.profession
            },{
                where:{
                    id:req.body.id
                }
            }).then((user)=>{
                return res.json({status:'success', message:'update user succes'})
            }).catch((error)=>{
                return res.status(400).json({status:'error',message:'update user failed'});
            });
        }else if(req.body.avatar){
            await User.update({
                name:req.body.name,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password,15),
                avatar:req.body.avatar
            },{
                where:{
                    id:req.body.id
                }
            }).then((user)=>{
                return res.json({status:'success', message:'update user succes'})
            }).catch((error)=>{
                return res.status(400).json({status:'error',message:'update user failed'});
            });
        }else {
            await User.update({
                name:req.body.name,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password,15)
            },{
                where:{
                    id:req.body.id
                }
            }).then((user)=>{
                return res.json({status:'success', message:'update user succes'})
            }).catch((error)=>{
                console.log('\n erorr' + error)
                return res.status(400).json({status:'error',message:'update user failed'});
            });
        }
    }
}