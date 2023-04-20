const {User,RefreshToken} = require('../../../models');
module.exports = async(req,res)=>{
    const userId = req.body.id;
    const user = await User.findByPk(userId);
    if(!user){
        return res.status(400).json({
            status:'error',
            message:'User not found'
        });
    }
    
    await RefreshToken.destroy({
        where:{users_id:userId}
    });
    return res.json({
        status:'success',
        mesage:'Refresh Token deleted'
    })
}