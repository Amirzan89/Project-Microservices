const apiAdapter = require('../../apiAdapter');
const {URL_SERVICE_USERS} = process.env;
const api = apiAdapter(URL_SERVICE_USERS);
module.exports = async (req,res)=>{
    try{
        const id = req.body.id;
        const user = await api.get(`/users/${id}`,req.body);
        return res.json(user.data);
    }catch(error){
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({status:'error',message:'service unavailable'});
        }
        return res.status(error.response.status).json(error.response.data);
    }
};