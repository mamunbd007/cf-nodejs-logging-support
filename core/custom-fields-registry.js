
class CustomFieldsRegistry {
    constructor() {
        this.registeredCustomFields = [];
    }

    // Registers a (white)list of allowed custom field names
    registerCustomFields(fieldNames) {
        this.registeredCustomFields = [];

        if (!Array.isArray(fieldNames)) return false;

        var list = [];
        for (var name of fieldNames) {
            if (typeof name != "string") {
                return false;
            } else {
                list.push(name);
            }
        }

        // copy without references
        this.registeredCustomFields = JSON.parse(JSON.stringify(list));
        return true;
    }

    // Testing if a given field is registered
    isRegisteredField(fieldName) {
        if (typeof(fieldName) == "string") {
            if (this.registeredCustomFields.includes(fieldName)) {
                return true;
            }
        }
        return false;
    }
}