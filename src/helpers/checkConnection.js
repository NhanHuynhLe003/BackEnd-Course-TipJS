const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _Second = 5000;

const countConnect = () => {
	const numConnection = mongoose.connections.length;
	console.log("Numbers of connections: ", numConnection );
    return numConnection
}

const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        //khi vuot qua maxConnection thi se bao loi
        const maxConnection = numCores * 6;
        const memoryProcess = process.memoryUsage().rss;

        console.log("Connect activated: ", numConnection);
        console.log("memory usage: ",memoryProcess/1024/1024,"MB");
        if(numConnection > maxConnection){
            console.log('overload connection !')
        }
    },_Second)

}
module.exports = {
	countConnect,
    checkOverload
}