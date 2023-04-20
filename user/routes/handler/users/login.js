const bcrypt = require('bcrypt');
const {User, Sequelize, sequelize} = require('../../../models');
module.exports = async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    if(!req.body.email || email.length <= 0){
        return res.status(400).json({status:'error',message:'email cannot null'});
    }else {
        const findUser = await User.findOne({
            attribute:['email','password'],
            where:{
                email:email
            }
        });
        if(!findUser){
            return res.status(400).json({status:'error',message:'Email is not registered'});
        }else if(!req.body.password || password.length <= 0 ){
            return res.status(400).json({status:'error',message:'password cannot null'});
        }else if(!bcrypt.compareSync(password,findUser.password)){
            return res.status(400).json({status:'error',message:'wrong password'});
        }
        return res.json({status:'success',data:findUser});
    }
}