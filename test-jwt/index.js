const jwt = require('jsonwebtoken');
const JWT_SECRET = 'BWAmicro!123';
//create basic token dengan jwt Asynchronous
jwt.sign({data:{kelas:'bwamicro'}},JWT_SECRET,{expiresIn:'1m'},(err,token)=>{
    console.log("hasil token "+token);
});
//create basic token dengan jwt synchronous
const token = jwt.sign({
    data:{kelas:'bwamicro'}}
    ,JWT_SECRET,
    {expiresIn:'30s'}
    );
console.log(token);
console.log('terserah');
const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImtlbGFzIjoiYndhbWljcm8ifSwiaWF0IjoxNjgxNzExODk1LCJleHAiOjE2ODE3MTE5MjV9.6F9bXvfR_TdvcTPX-w2KvyPa0zO361hMbXXZXX6Tmt4";
jwt.verify(token1,JWT_SECRET,(err,decode)=>{
    if(err){
        console.log(err.message);
        return
    }
    console.log(decode)
});
try{
    const decode = jwt.verify(token1,JWT_SECRET);
    console.log("hasil "+decode);
}catch(err){
    console.log('token adios')
    console.log(err.message);
}