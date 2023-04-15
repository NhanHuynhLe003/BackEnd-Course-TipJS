
const {Schema, model, Types} = require('mongoose')
// Declare the Schema of the Mongo model

const DOCUMENT_NAME = "Key"
const COLLECTION_NAME = "Keys"

var keysSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Shop'
    },
    publicKey: {
        type: String,
        required: true
    },
    refreshToken: {
        // dùng để kiểm tra các truy cập hợp lệ
        type: Array,
        default: []
    }
    
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, keysSchema);