"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MatchDetails_1 = require("../MatchDetails");
class RoverRuckusMatchDetails extends MatchDetails_1.default {
    constructor() {
        super();
        this._redAutoLand = 0;
        this._redAutoSamp = 0;
        this._redAutoClaim = 0;
        this._redAutoPark = 0;
        this._redDriverGold = 0;
        this._redDriverSilver = 0;
        this._redDriverDepot = 0;
        this._redEndLatch = 0;
        this._redEndIn = 0;
        this._redEndComp = 0;
        this._blueAutoLand = 0;
        this._blueAutoSamp = 0;
        this._blueAutoClaim = 0;
        this._blueAutoPark = 0;
        this._blueDriverGold = 0;
        this._blueDriverSilver = 0;
        this._blueDriverDepot = 0;
        this._blueEndLatch = 0;
        this._blueEndIn = 0;
        this._blueEndComp = 0;
    }
    toJSON() {
        return {
            match_detail_key: this.matchDetailKey,
            match_key: this.matchKey,
            red_min_pen: this.redMinPen,
            blue_min_pen: this.blueMinPen,
            red_maj_pen: this.redMajPen,
            blue_maj_pen: this.blueMajPen,
            red_auto_land: this.redAutoLand,
            red_auto_samp: this.redAutoSamp,
            red_auto_claim: this.redAutoClaim,
            red_auto_park: this.redAutoPark,
            red_tele_gold: this.redDriverGold,
            red_tele_silver: this.redDriverSilver,
            red_tele_depot: this.redDriverDepot,
            red_end_latch: this.redEndLatch,
            red_end_in: this.redEndIn,
            red_end_comp: this.redEndComp,
            blue_auto_land: this.blueAutoLand,
            blue_auto_samp: this.blueAutoSamp,
            blue_auto_claim: this.blueAutoClaim,
            blue_auto_park: this.blueAutoPark,
            blue_tele_gold: this.blueDriverGold,
            blue_tele_silver: this.blueDriverSilver,
            blue_tele_depot: this.blueDriverDepot,
            blue_end_latch: this.blueEndLatch,
            blue_end_in: this.blueEndIn,
            blue_end_comp: this.blueEndComp,
        };
    }
    fromJSON(json) {
        const details = new RoverRuckusMatchDetails();
        details.matchDetailKey = json.match_detail_key;
        details.matchKey = json.match_key;
        details.redMinPen = json.red_min_pen;
        details.blueMinPen = json.blue_min_pen;
        details.redMajPen = json.red_maj_pen;
        details.blueMajPen = json.blue_maj_pen;
        details.redAutoLand = json.red_auto_land;
        details.redAutoSamp = json.red_auto_samp;
        details.redAutoClaim = json.red_auto_claim;
        details.redAutoPark = json.red_auto_park;
        details.redDriverGold = json.red_tele_gold;
        details.redDriverSilver = json.red_tele_silver;
        details.redDriverDepot = json.red_tele_depot;
        details.redEndLatch = json.red_end_latch;
        details.redEndIn = json.red_end_in;
        details.redEndComp = json.red_end_comp;
        details.blueAutoLand = json.blue_auto_land;
        details.blueAutoSamp = json.blue_auto_samp;
        details.blueAutoClaim = json.blue_auto_claim;
        details.blueAutoPark = json.blue_auto_park;
        details.blueDriverGold = json.blue_tele_gold;
        details.blueDriverSilver = json.blue_tele_silver;
        details.blueDriverDepot = json.blue_tele_depot;
        details.blueEndLatch = json.blue_end_latch;
        details.blueEndIn = json.blue_end_in;
        details.blueEndComp = json.blue_end_comp;
        return details;
    }
    get redAutoLand() {
        return this._redAutoLand;
    }
    set redAutoLand(value) {
        this._redAutoLand = value;
    }
    get redAutoSamp() {
        return this._redAutoSamp;
    }
    set redAutoSamp(value) {
        this._redAutoSamp = value;
    }
    get redAutoClaim() {
        return this._redAutoClaim;
    }
    set redAutoClaim(value) {
        this._redAutoClaim = value;
    }
    get redAutoPark() {
        return this._redAutoPark;
    }
    set redAutoPark(value) {
        this._redAutoPark = value;
    }
    get redDriverGold() {
        return this._redDriverGold;
    }
    set redDriverGold(value) {
        this._redDriverGold = value;
    }
    get redDriverSilver() {
        return this._redDriverSilver;
    }
    set redDriverSilver(value) {
        this._redDriverSilver = value;
    }
    get redDriverDepot() {
        return this._redDriverDepot;
    }
    set redDriverDepot(value) {
        this._redDriverDepot = value;
    }
    get redEndLatch() {
        return this._redEndLatch;
    }
    set redEndLatch(value) {
        this._redEndLatch = value;
    }
    get redEndIn() {
        return this._redEndIn;
    }
    set redEndIn(value) {
        this._redEndIn = value;
    }
    get redEndComp() {
        return this._redEndComp;
    }
    set redEndComp(value) {
        this._redEndComp = value;
    }
    get blueAutoLand() {
        return this._blueAutoLand;
    }
    set blueAutoLand(value) {
        this._blueAutoLand = value;
    }
    get blueAutoSamp() {
        return this._blueAutoSamp;
    }
    set blueAutoSamp(value) {
        this._blueAutoSamp = value;
    }
    get blueAutoClaim() {
        return this._blueAutoClaim;
    }
    set blueAutoClaim(value) {
        this._blueAutoClaim = value;
    }
    get blueAutoPark() {
        return this._blueAutoPark;
    }
    set blueAutoPark(value) {
        this._blueAutoPark = value;
    }
    get blueDriverGold() {
        return this._blueDriverGold;
    }
    set blueDriverGold(value) {
        this._blueDriverGold = value;
    }
    get blueDriverSilver() {
        return this._blueDriverSilver;
    }
    set blueDriverSilver(value) {
        this._blueDriverSilver = value;
    }
    get blueDriverDepot() {
        return this._blueDriverDepot;
    }
    set blueDriverDepot(value) {
        this._blueDriverDepot = value;
    }
    get blueEndLatch() {
        return this._blueEndLatch;
    }
    set blueEndLatch(value) {
        this._blueEndLatch = value;
    }
    get blueEndIn() {
        return this._blueEndIn;
    }
    set blueEndIn(value) {
        this._blueEndIn = value;
    }
    get blueEndComp() {
        return this._blueEndComp;
    }
    set blueEndComp(value) {
        this._blueEndComp = value;
    }
}
exports.default = RoverRuckusMatchDetails;
