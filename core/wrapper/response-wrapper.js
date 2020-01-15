
class IResponseWrapper {

    constructor(res) {
        this.res = res;
    }

    getHeader(name, defaultValue) {
        throw new Error('Method has to be implemented in subclass');
    }

    getStatusCode(defaultValue) {
        throw new Error('Method has to be implemented in subclass');
    }

    setSendCallback(callback) {
        throw new Error('Method has to be implemented in subclass');
    }
}

module.exports = IResponseWrapper;