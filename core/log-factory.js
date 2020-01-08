const customFieldsRegistry = require("./custom-fields-registry")

class LogFactory {
    constructor() {}

    createLog(message) {}

    loadConfig() {}
}

class Log {
    constructor() {
        this.data;
    }

    addData(newData, overwrite) {
        if (overwrite) {
            this.data = {...this.data,...newData};
        } 
        else {
            this.data = {...newData,...this.data};
        }
    }

    getData() {
        return this.data;
    }

    addCustomFields(customData) {
        
    }

}

var logFactory = new LogFactory();
module.exports = logFactory;