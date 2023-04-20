const apiAdapter = require('../../apiAdapter');
const jwt = require('jsonwebtoken');
const {
    URL_SERVICE_USERS,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env;
const api = apiAdapter(URL_SERVICE_USERS);
module.exports = async (req,res)=>{
    try{
        const email = req.body.email;
        const refreshToken = req.body.refresh_token;
        if(!email || !refreshToken){
            return res.status(400).json({
                status:'error',
                message:'invalid token'
            });
        }
        await api.get('/refresh_token',{params:{refresh_token:refreshToken}});
        jwt.verify(refreshToken,JWT_SECRET_REFRESH_TOKEN,(err,decoded)=>{
            if(err){
                return res.status(400).json({
                    status:'error',
                    message:err.message
                });
            }
            if(email !== decoded.data.email){
                return res.status(400).json({
                    status:'error',
                    message:'email is not valid'
                });
            }
            const token = jwt.sign({data:decoded.data},JWT_SECRET,{expiresIn:JWT_ACCESS_TOKEN_EXPIRED});
            return res.json({
                status:'succes',
                data:{
                    token
                }
            })
        });
    }catch(error){
        console.log('error '+error)
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({status:'error',message:'service unavailable'});
        }
        if(error.response){
            return res.status(error.response.status).json(error.response.data);
        }
        return res.status(400).json({
            status:'error',
            message:error
        })
    }
};   