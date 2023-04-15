const JWT = require('jsonwebtoken')
const createTokenPair = async (payload, publicKey, privateKey) => {
    // publicKey: verify token
    try {
        //create accesstoken thong qua private
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: '2 days'
        })
        // payload để chứa thông tin truyền từ page này sang page khác

        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: '7 days'
        })
        
        //bình thường dùng keySecret để sign và verify vì khi hacker bắt đc keySecret thì hoàn toàn
        //có thể verify và thậm chí giả dạng cả sign
        JWT.verify(accessToken, privateKey, (err, decode) => {
            if(err){
                console.log('error happen when verify:: ', err);
            } else {
                console.log('decode:: ', decode);
            }
        })
        return {accessToken, refreshToken}
    } catch(err){
        return err
    }
}

module.exports = {
    createTokenPair
}