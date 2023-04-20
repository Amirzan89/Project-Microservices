const apiAdapter = require('../../apiAdapter');
const {URL_SERVICE_MEDIA} = process.env;
const api = apiAdapter(URL_SERVICE_MEDIA);
module.exports = async (req,res)=>{
    try{
        const media = await api.get('/media',req.body);
        return res.json(media.data);
    }catch(error){
        const {status,data} = error.response;
        if(error.code ==='ECONNREFUSED'){
            return res.status(500).json({status:'error',message:'service unavailable'});
        }
        return res.status(error.response.status).json(error.response.data);
    }
};