class AppError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode, 
        this.message = message,
        // 400 = error ||  500 = fail
        this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail';
        // if(statusCode >= 400 && statusCode < 500){
        //     this.status = 'error'
        // }else if(statusCode >= 500 && statusCode < 600){
        //     this.status = 'fail'
        // }
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {
    AppError
}