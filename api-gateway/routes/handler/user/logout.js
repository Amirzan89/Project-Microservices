const apiAdapter = require('../../apiAdapter');
const {URL_SERVICE_USERS} = process.env;
const api = apiAdapter(URL_SERVICE_USERS);
module.exports = async (req,res)=>{
    try{
        const id = req.user.data.id;
        const userId = req.body.id;
        if(id !== userId){
            return res.status(400).json({
                status:'error',
                message:'Cannot logout other account'
            });
        }
        const user = await api.post('/users/logout',{user_id:id});
        return res.json(user.data);
    }catch(error){
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({status:'error',message:'service unavailable'});
        }
        return res.status(error.response.status).json(error.response.data);
    }
};