"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MatchDetails_1 = require("../MatchDetails");
const SkystoneAllianceDetails_1 = require("./SkystoneAllianceDetails");
class SkystoneMatchDetails extends MatchDetails_1.default {
    constructor() {
        super();
        this._redDtls = new SkystoneAllianceDetails_1.default();
        this._blueDtls = new SkystoneAllianceDetails_1.default();
        this._randomization = 0;
    }
    toJSON() {
        return {
            match_detail_key: this.matchDetailKey,
            match_key: this.matchKey,
            red_min_pen: this.redMinPen,
            blue_min_pen: this.blueMinPen,
            red_maj_pen: this.redMajPen,
            blue_maj_pen: this.blueMajPen,
            red: this.redDtls.toJSON(),
            blue: this.blueDtls.toJSON(),
            randomization: this.randomization
        };
    }
    fromJSON(json) {
        const details = new SkystoneMatchDetails();
        details.matchDetailKey = json.match_detail_key;
        details.matchKey = json.match_key;
        details.redMinPen = json.red_min_pen;
        details.blueMinPen = json.blue_min_pen;
        details.redMajPen = json.red_maj_pen;
        details.blueMajPen = json.blue_maj_pen;
        details.redDtls = new SkystoneAllianceDetails_1.default().fromJSON(json.red);
        details.blueDtls = new SkystoneAllianceDetails_1.default().fromJSON(json.blue);
        details.randomization = json.randomization;
        return details;
    }
    get blueDtls() {
        return this._blueDtls;
    }
    set blueDtls(value) {
        this._blueDtls = value;
    }
    get redDtls() {
        return this._redDtls;
    }
    set redDtls(value) {
        this._redDtls = value;
    }
    get randomization() {
        return this._randomization;
    }
    set randomization(value) {
        this._randomization = value;
    }
}
exports.default = SkystoneMatchDetails;
