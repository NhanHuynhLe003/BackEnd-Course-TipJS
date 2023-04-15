const bscrypt = require('bcrypt')
const crypto = require('crypto');
const keyTokenService = require('./keyToken.services');
const { createTokenPair } = require('../auth/authUtils');
const shopModel = require('../models/shop.model')

const roleShop = {
    Admin: 'ADMIN',
    Editor: 'EDITOR',
    Writer: 'WRITER',
    Shop: 'SHOP'
    // trong thực tế thì ng ta sẽ ko điền 1 chuỗi như vậy để gửi mà thay bằng các mã do team thống nhất.
}
class AccessServices {
    static signup = async ({name, email, password}) => {
        try {
            //kiem tra email co ton tai hay khong? 
            //tim kiem email bang findOne
            const hoderShop = await shopModel.findOne({email}).lean(); //lean de tra ve obj toi gian
            if(hoderShop){
                //bao e-mail da ton tai
                return {
                    code: "ccc",
                    message: "email registered"
                }
            }
            //Mã hóa mật khẩu bằng hàm băm bscrypt
            const hashPassword = bscrypt.hash(password, 10); //10 là mức độ băm, càng lớn càng bảo mật nhưng càng ngốn cpu

            //khi ko co email => khoi tao shop => dung thuoc tinh create cua mongoose
            const newShop = await shopModel.create({
                name, email, password: hashPassword, roles: [roleShop.Shop]
            })
            //khi da co shop thi ta se tien hanh bao mat du lieu
            if(newShop){
                //ta sẽ bảo mật token bằng phương pháp bất đối xứng rsa của crypto lib
                const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096
                })
                const publicKeyString = await keyTokenService.createKeyToken({
                    userId: newShop,
                    publicKey: publicKey
                })
                if(!publicKeyString){
                    return {
                        code: 'XXXX',
                        message: 'Have Error on publicKeyString!'
                    }
                }
                const tokens = await createTokenPair({userId: newShop._id,email}, publicKey, privateKey)
                console.log(tokens)

                return {
                    code: 201,
                    metadata: {
                        user: newShop,
                        tokens
                    }
                }
            }
            return {
                code: 200,
                metadata: null
            }

        } catch (error){
            return {
                code: 'xxx',
                message: error.message,
                status: 'error in access!'
            }
        }
    }
}

module.exports = AccessServices