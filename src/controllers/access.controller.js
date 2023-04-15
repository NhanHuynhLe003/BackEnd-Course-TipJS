const AccessServices = require("../services/acesss.services");

class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log('[P]::signUp::', req.body);
            return res.status(201).json({
                code: '20001',
                metadata: {
                    userId: 1,
                    name: 'Nhan Huynh'
                }
            })
        } catch(err){
            next(err)
        }
    }
}

module.exports = new AccessController()