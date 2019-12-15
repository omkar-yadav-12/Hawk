"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Team_1 = require("./Team");
class ModifiedTeam {
    constructor() {
        this._newTeam = new Team_1.default();
        this._originalTeam = new Team_1.default();
        this._discNameShort = false;
        this._discNameLong = false;
        this._discZipCode = false;
        this._discCity = false;
        this._discState = false;
        this._discCountry = false;
        this._discWebsite = false;
    }
    toJSON() {
        return this.newTeam.toJSON();
    }
    fromJSON(json) {
        const team = new ModifiedTeam();
        team.newTeam = new Team_1.default().fromJSON(json);
        team.originalTeam = new Team_1.default().fromJSON(json.toa);
        team.discNameShort = json.discrepencies.team_name_short;
        team.discNameLong = json.discrepencies.team_name_long;
        team.discZipCode = json.discrepencies.zip_code;
        team.discCity = json.discrepencies.city;
        team.discState = json.discrepencies.state_prov;
        team.discCountry = json.discrepencies.country;
        team.discWebsite = json.discrepencies.website;
        return team;
    }
    get newTeam() {
        return this._newTeam;
    }
    set newTeam(value) {
        this._newTeam = value;
    }
    get originalTeam() {
        return this._originalTeam;
    }
    set originalTeam(value) {
        this._originalTeam = value;
    }
    get discNameShort() {
        return this._discNameShort;
    }
    set discNameShort(value) {
        this._discNameShort = value;
    }
    get discNameLong() {
        return this._discNameLong;
    }
    set discNameLong(value) {
        this._discNameLong = value;
    }
    get discZipCode() {
        return this._discZipCode;
    }
    set discZipCode(value) {
        this._discZipCode = value;
    }
    get discCity() {
        return this._discCity;
    }
    set discCity(value) {
        this._discCity = value;
    }
    get discState() {
        return this._discState;
    }
    set discState(value) {
        this._discState = value;
    }
    get discCountry() {
        return this._discCountry;
    }
    set discCountry(value) {
        this._discCountry = value;
    }
    get discWebsite() {
        return this._discWebsite;
    }
    set discWebsite(value) {
        this._discWebsite = value;
    }
}
exports.default = ModifiedTeam;
