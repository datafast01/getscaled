const jwt = require('jsonwebtoken');
const SECERET_KEY = "NOTESAPT"
const auth = async(req,res,next)=>{
    try {
        console.log('middleware is running....');
        //get token from header
        let token = req.headers.authorization;
        console.log(token, '____________________')
        token = token.split(" ");
        let decodeedToken = await jwt.verify(token[1], SECERET_KEY);
        console.log(decodeedToken, 'decoded token')
        //verify
        if(1==2){
            next()
        }
        throw new Error("Invalid username or password")
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = auth