"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventType {
    constructor() {
        this._eventTypeKey = '';
        this._description = '';
    }
    toJSON() {
        return {
            event_type_key: this.eventTypeKey,
            description: this.description
        };
    }
    fromJSON(json) {
        const eventType = new EventType();
        eventType.eventTypeKey = json.event_type_key;
        eventType.description = json.description;
        return eventType;
    }
    get eventTypeKey() {
        return this._eventTypeKey;
    }
    set eventTypeKey(value) {
        this._eventTypeKey = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
}
exports.default = EventType;
