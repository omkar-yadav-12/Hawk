"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MatchDetails {
    constructor() {
        this._matchDetailKey = '';
        this._matchKey = '';
        this._redMinPen = 0;
        this._blueMinPen = 0;
        this._redMajPen = 0;
        this._blueMajPen = 0;
    }
    toJSON() {
        return {
            match_detail_key: this.matchDetailKey,
            match_key: this.matchKey,
            red_min_pen: this.redMinPen,
            blue_min_pen: this.blueMinPen,
            red_maj_pen: this.redMajPen,
            blue_maj_pen: this.blueMajPen
        };
    }
    fromJSON(json) {
        const details = new MatchDetails();
        details.matchDetailKey = json.match_detail_key;
        details.matchKey = json.match_key;
        details.redMinPen = json.red_min_pen;
        details.blueMinPen = json.blue_min_pen;
        details.redMajPen = json.red_maj_pen;
        details.blueMajPen = json.blue_maj_pen;
        return details;
    }
    get matchDetailKey() {
        return this._matchDetailKey;
    }
    set matchDetailKey(value) {
        this._matchDetailKey = value;
    }
    get matchKey() {
        return this._matchKey;
    }
    set matchKey(value) {
        this._matchKey = value;
    }
    get blueMinPen() {
        return this._blueMinPen;
    }
    set blueMinPen(value) {
        this._blueMinPen = value;
    }
    get redMajPen() {
        return this._redMajPen;
    }
    set redMajPen(value) {
        this._redMajPen = value;
    }
    get redMinPen() {
        return this._redMinPen;
    }
    set redMinPen(value) {
        this._redMinPen = value;
    }
    get blueMajPen() {
        return this._blueMajPen;
    }
    set blueMajPen(value) {
        this._blueMajPen = value;
    }
}
exports.default = MatchDetails;
