class HttpError extends Error {
	constructor(message, errorCode) {
		super(message) // add message property
		this.errorCode = errorCode
	}


}

export default HttpError