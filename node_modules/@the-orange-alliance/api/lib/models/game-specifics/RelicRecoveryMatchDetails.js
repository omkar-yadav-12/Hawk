"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MatchDetails_1 = require("../MatchDetails");
class RelicRecoveryMatchDetails extends MatchDetails_1.default {
    constructor() {
        super();
        this._redAutoJewels = 0;
        this._redAutoGlyphs = 0;
        this._redAutoKeys = 0;
        this._redAutoParks = 0;
        this._redTeleGlyphs = 0;
        this._redTeleRows = 0;
        this._redTeleColumns = 0;
        this._redTeleCypher = 0;
        this._redEndRelic1 = 0;
        this._redEndRelic2 = 0;
        this._redEndRelic3 = 0;
        this._redEndRelicStanding = 0;
        this._redEndRobotBalances = 0;
        this._blueAutoJewels = 0;
        this._blueAutoGlyphs = 0;
        this._blueAutoKeys = 0;
        this._blueAutoParks = 0;
        this._blueTeleGlyphs = 0;
        this._blueTeleRows = 0;
        this._blueTeleColumns = 0;
        this._blueTeleCypher = 0;
        this._blueEndRelic1 = 0;
        this._blueEndRelic2 = 0;
        this._blueEndRelic3 = 0;
        this._blueEndRelicStanding = 0;
        this._blueEndRobotBalances = 0;
    }
    toJSON() {
        return {
            match_detail_key: this.matchDetailKey,
            match_key: this.matchKey,
            red_min_pen: this.redMinPen,
            blue_min_pen: this.blueMinPen,
            red_maj_pen: this.redMajPen,
            blue_maj_pen: this.blueMajPen,
            red_auto_jewels: this.redAutoJewels,
            red_auto_glyphs: this.redAutoGlyphs,
            red_auto_keys: this.redAutoKeys,
            red_auto_parks: this.redAutoParks,
            red_tele_glyphs: this.redTeleGlyphs,
            red_tele_rows: this.redTeleRows,
            red_tele_cols: this.redTeleColumns,
            red_tele_cyphers: this.redTeleCypher,
            red_end_relic_1: this.redEndRelic1,
            red_end_relic_2: this.redEndRelic2,
            red_end_relic_3: this.redEndRelic3,
            red_end_relic_standing: this.redEndRelicStanding,
            red_end_robot_balances: this.redEndRobotBalances,
            blue_auto_jewels: this.blueAutoJewels,
            blue_auto_glyphs: this.blueAutoGlyphs,
            blue_auto_keys: this.blueAutoKeys,
            blue_auto_parks: this.blueAutoParks,
            blue_tele_glyphs: this.blueTeleGlyphs,
            blue_tele_rows: this.blueTeleRows,
            blue_tele_cols: this.blueTeleColumns,
            blue_tele_cyphers: this.blueTeleCypher,
            blue_end_relic_1: this.blueEndRelic1,
            blue_end_relic_2: this.blueEndRelic2,
            blue_end_relic_3: this.blueEndRelic3,
            blue_end_relic_standing: this.blueEndRelicStanding,
            blue_end_robot_balances: this.blueEndRobotBalances
        };
    }
    fromJSON(json) {
        const details = new RelicRecoveryMatchDetails();
        details.matchDetailKey = json.match_detail_key;
        details.matchKey = json.match_key;
        details.redMinPen = json.red_min_pen;
        details.blueMinPen = json.blue_min_pen;
        details.redMajPen = json.red_maj_pen;
        details.blueMajPen = json.blue_maj_pen;
        details.redAutoJewels = json.red_auto_jewels;
        details.redAutoGlyphs = json.red_auto_glyphs;
        details.redAutoKeys = json.red_auto_keys;
        details.redAutoParks = json.red_auto_parks;
        details.redTeleGlyphs = json.red_tele_glyphs;
        details.redTeleRows = json.red_tele_rows;
        details.redTeleColumns = json.red_tele_cols;
        details.redTeleCypher = json.red_tele_cyphers;
        details.redEndRelic1 = json.red_end_relic_1;
        details.redEndRelic2 = json.red_end_relic_2;
        details.redEndRelic3 = json.red_end_relic_3;
        details.redEndRelicStanding = json.red_end_relic_standing;
        details.redEndRobotBalances = json.red_end_robot_balances;
        details.blueAutoJewels = json.blue_auto_jewels;
        details.blueAutoGlyphs = json.blue_auto_glyphs;
        details.blueAutoKeys = json.blue_auto_keys;
        details.blueAutoParks = json.blue_auto_parks;
        details.blueTeleGlyphs = json.blue_tele_glyphs;
        details.blueTeleRows = json.blue_tele_rows;
        details.blueTeleColumns = json.blue_tele_cols;
        details.blueTeleCypher = json.blue_tele_cyphers;
        details.blueEndRelic1 = json.blue_end_relic_1;
        details.blueEndRelic2 = json.blue_end_relic_2;
        details.blueEndRelic3 = json.blue_end_relic_3;
        details.blueEndRelicStanding = json.blue_end_relic_standing;
        details.blueEndRobotBalances = json.blue_end_robot_balances;
        return details;
    }
    get redAutoJewels() {
        return this._redAutoJewels;
    }
    set redAutoJewels(value) {
        this._redAutoJewels = value;
    }
    get redAutoGlyphs() {
        return this._redAutoGlyphs;
    }
    set redAutoGlyphs(value) {
        this._redAutoGlyphs = value;
    }
    get redAutoKeys() {
        return this._redAutoKeys;
    }
    set redAutoKeys(value) {
        this._redAutoKeys = value;
    }
    get redAutoParks() {
        return this._redAutoParks;
    }
    set redAutoParks(value) {
        this._redAutoParks = value;
    }
    get redTeleGlyphs() {
        return this._redTeleGlyphs;
    }
    set redTeleGlyphs(value) {
        this._redTeleGlyphs = value;
    }
    get redTeleRows() {
        return this._redTeleRows;
    }
    set redTeleRows(value) {
        this._redTeleRows = value;
    }
    get redTeleColumns() {
        return this._redTeleColumns;
    }
    set redTeleColumns(value) {
        this._redTeleColumns = value;
    }
    get redTeleCypher() {
        return this._redTeleCypher;
    }
    set redTeleCypher(value) {
        this._redTeleCypher = value;
    }
    get redEndRelic1() {
        return this._redEndRelic1;
    }
    set redEndRelic1(value) {
        this._redEndRelic1 = value;
    }
    get redEndRelic2() {
        return this._redEndRelic2;
    }
    set redEndRelic2(value) {
        this._redEndRelic2 = value;
    }
    get redEndRelic3() {
        return this._redEndRelic3;
    }
    set redEndRelic3(value) {
        this._redEndRelic3 = value;
    }
    get redEndRelicStanding() {
        return this._redEndRelicStanding;
    }
    set redEndRelicStanding(value) {
        this._redEndRelicStanding = value;
    }
    get redEndRobotBalances() {
        return this._redEndRobotBalances;
    }
    set redEndRobotBalances(value) {
        this._redEndRobotBalances = value;
    }
    get blueAutoJewels() {
        return this._blueAutoJewels;
    }
    set blueAutoJewels(value) {
        this._blueAutoJewels = value;
    }
    get blueAutoGlyphs() {
        return this._blueAutoGlyphs;
    }
    set blueAutoGlyphs(value) {
        this._blueAutoGlyphs = value;
    }
    get blueAutoKeys() {
        return this._blueAutoKeys;
    }
    set blueAutoKeys(value) {
        this._blueAutoKeys = value;
    }
    get blueAutoParks() {
        return this._blueAutoParks;
    }
    set blueAutoParks(value) {
        this._blueAutoParks = value;
    }
    get blueTeleGlyphs() {
        return this._blueTeleGlyphs;
    }
    set blueTeleGlyphs(value) {
        this._blueTeleGlyphs = value;
    }
    get blueTeleRows() {
        return this._blueTeleRows;
    }
    set blueTeleRows(value) {
        this._blueTeleRows = value;
    }
    get blueTeleColumns() {
        return this._blueTeleColumns;
    }
    set blueTeleColumns(value) {
        this._blueTeleColumns = value;
    }
    get blueTeleCypher() {
        return this._blueTeleCypher;
    }
    set blueTeleCypher(value) {
        this._blueTeleCypher = value;
    }
    get blueEndRelic1() {
        return this._blueEndRelic1;
    }
    set blueEndRelic1(value) {
        this._blueEndRelic1 = value;
    }
    get blueEndRelic2() {
        return this._blueEndRelic2;
    }
    set blueEndRelic2(value) {
        this._blueEndRelic2 = value;
    }
    get blueEndRelic3() {
        return this._blueEndRelic3;
    }
    set blueEndRelic3(value) {
        this._blueEndRelic3 = value;
    }
    get blueEndRelicStanding() {
        return this._blueEndRelicStanding;
    }
    set blueEndRelicStanding(value) {
        this._blueEndRelicStanding = value;
    }
    get blueEndRobotBalances() {
        return this._blueEndRobotBalances;
    }
    set blueEndRobotBalances(value) {
        this._blueEndRobotBalances = value;
    }
}
exports.default = RelicRecoveryMatchDetails;
