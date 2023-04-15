const express = require('express');
const router = express.Router();

// router.get('/' , (req,res,next) => {
//     return res.status(200).json({
//         message: 'Welcome to NhanProject!'
//     })
// })

router.use("/v1/api", require('./access')); //ở đường dẫn này ta sẽ tiến hành lấy api từ access

//sau khi cai dat routes de use, ta can import vao app.js
module.exports = router