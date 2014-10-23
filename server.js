var connect = require('connect') ,
	serverStatic = require('serve-static')

connect()
.use(serverStatic('./app'))
.listen(5000) ;