"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Region {
    constructor() {
        this._regionKey = '';
        this._description = '';
    }
    toJSON() {
        return {
            region_key: this.regionKey,
            description: this.description
        };
    }
    fromJSON(json) {
        const region = new Region();
        region.regionKey = json.region_key;
        region.description = json.description;
        return region;
    }
    get regionKey() {
        return this._regionKey;
    }
    set regionKey(value) {
        this._regionKey = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
}
exports.default = Region;
