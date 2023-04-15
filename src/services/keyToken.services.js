const keysModel = require("../models/keys.model");

class keyTokenService{
    static createKeyToken = async ({userId, publicKeys}) => {
        try{
            const publicKeyStr = publicKeys.toString(); //kiểu dữ liệu trả về của publickey là buffer vì vậy ta cần trả về str để lưu trữ
            const tokens = keysModel.create({
                user: userId,
                publicKey: publicKeyStr
            })

            return tokens ? publicKeyStr : null
        } catch(error) {
            return error
        }
    }
}

module.exports = keyTokenService