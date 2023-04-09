const dev = {
	app: {
		port: process.env.DEV_APP_PORT || 8040
	},
	db: {
		host: process.env.DEV_DB_HOST || 'localhost',
		name: process.env.DEV_DB_NAME || 'shopDEV',
		port: process.env.DEV_DB_PORT || 27017
	}
}

const prod = {
	app: {
		port: process.env.PROD_APP_PORT || 8040
	},
	db: {
		host: process.env.PROD_DB_HOST || 'localhost',
		name: process.env.PROD_DB_NAME || 'shopPROD',
		port: process.env.PROD_DB_PORT || 27017
	}
}

const config  = {dev, prod};
const env = process.env.NODE_ENV || 'dev' //mac định thì config sẽ lấy theo dev
module.exports = config[env]