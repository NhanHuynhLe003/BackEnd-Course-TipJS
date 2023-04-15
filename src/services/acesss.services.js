const crypto = require('crypto');
const keyTokenService = require('./keyToken.services');
const { createTokenPair } = require('../auth/authUtils');
const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt');

const roleShop = {
    ADMIN: 'ADMIN',
    EDITOR: 'EDITOR',
    WRITER: 'WRITER',
    SHOP: 'SHOP'
    // trong thực tế thì ng ta sẽ ko điền 1 chuỗi như vậy để gửi mà thay bằng các mã do team thống nhất.
}
class AccessServices {
    static signUp = async ({name, email, password}) => {
        try {
            //kiem tra email co ton tai hay khong? 
            //tim kiem email bang findOne
            const holderShop = await shopModel.findOne({email}).lean(); //lean de tra ve obj toi gian
            
            if(holderShop){
                //bao e-mail da ton tai
                return {
                    code: "xxxx",
                    message: "email registered!"
                }
            }
            //Mã hóa mật khẩu bằng hàm băm bcrypt
            // const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, 10); //10 là mức độ băm, càng lớn càng bảo mật nhưng càng ngốn cpu

            //khi ko co email => khoi tao shop => dung thuoc tinh create cua mongoose
            const newShop = await shopModel.create({
                name, email, password: hashPassword, roles: [roleShop.SHOP]
            })
            //khi da co shop thi ta se tien hanh bao mat du lieu
            if(newShop){
                //ta sẽ bảo mật token bằng phương pháp bất đối xứng rsa của crypto lib
                const {privateKey , publicKey} = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096
                })
                
                const publicKeyString = await keyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKeys: publicKey
                })
                if(!publicKeyString){
                    return {
                        code: 'XXXX',
                        message: 'Have Error on publicKeyString!'
                    }
                }
                //khi thanh cong dky shop thi tien hanh tao token
                const tokens = await createTokenPair({userId: newShop._id , email}, publicKey, privateKey)
                console.log(tokens)

                return {
                    code: 201,
                    metadata: {
                        shop: newShop,
                        tokens: tokens
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