"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Season {
    constructor() {
        this._seasonKey = '';
        this._description = '';
    }
    toJSON() {
        return {
            season_key: this.seasonKey,
            description: this.description
        };
    }
    fromJSON(json) {
        const season = new Season();
        season.seasonKey = json.season_key;
        season.description = json.description;
        return season;
    }
    get seasonKey() {
        return this._seasonKey;
    }
    set seasonKey(value) {
        this._seasonKey = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
}
exports.default = Season;
