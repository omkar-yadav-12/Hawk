"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Team {
    constructor() {
        this._teamKey = '';
        this._regionKey = '';
        this._leagueKey = '';
        this._teamNumber = 0;
        this._teamNameShort = '';
        this._teamNameLong = '';
        this._robotName = '';
        this._lastActive = '';
        this._city = '';
        this._stateProv = '';
        this._zipCode = 0;
        this._country = '';
        this._rookieYear = 0;
        this._website = '';
        this._events = [];
        this._rankings = [];
        this._awards = [];
        this._media = [];
    }
    toJSON() {
        return {
            team_key: this.teamKey,
            region_key: this.regionKey,
            league_key: this.leagueKey,
            team_number: this.teamNumber,
            team_name_short: this.teamNameShort,
            team_name_long: this.teamNameLong,
            robot_name: this.robotName,
            last_active: this.lastActive,
            city: this.city,
            state_prov: this.stateProv,
            zip_code: this.zipCode,
            country: this.country,
            rookie_year: this.rookieYear,
            team_website: this.website
        };
    }
    fromJSON(json) {
        const team = new Team();
        team.teamKey = json.team_key;
        team.regionKey = json.region_key;
        team.leagueKey = json.league_key;
        team.teamNumber = json.team_number;
        team.teamNameShort = json.team_name_short;
        team.teamNameLong = json.team_name_long;
        team.robotName = json.robot_name;
        team.lastActive = json.last_active;
        team.city = json.city;
        team.stateProv = json.state_prov;
        team.zipCode = json.zip_code;
        team.country = json.country;
        team.rookieYear = json.rookie_year;
        team.website = json.team_website;
        return team;
    }
    get teamKey() {
        return this._teamKey;
    }
    set teamKey(value) {
        this._teamKey = value;
    }
    get regionKey() {
        return this._regionKey;
    }
    set regionKey(value) {
        this._regionKey = value;
    }
    get leagueKey() {
        return this._leagueKey;
    }
    set leagueKey(value) {
        this._leagueKey = value;
    }
    get teamNumber() {
        return this._teamNumber;
    }
    set teamNumber(value) {
        this._teamNumber = value;
    }
    get teamNameShort() {
        return this._teamNameShort;
    }
    set teamNameShort(value) {
        this._teamNameShort = value;
    }
    get teamNameLong() {
        return this._teamNameLong;
    }
    set teamNameLong(value) {
        this._teamNameLong = value;
    }
    get robotName() {
        return this._robotName;
    }
    set robotName(value) {
        this._robotName = value;
    }
    get lastActive() {
        return this._lastActive;
    }
    set lastActive(value) {
        this._lastActive = value;
    }
    get city() {
        return this._city;
    }
    set city(value) {
        this._city = value;
    }
    get stateProv() {
        return this._stateProv;
    }
    set stateProv(value) {
        this._stateProv = value;
    }
    get zipCode() {
        return this._zipCode;
    }
    set zipCode(value) {
        this._zipCode = value;
    }
    get country() {
        return this._country;
    }
    set country(value) {
        this._country = value;
    }
    get rookieYear() {
        return this._rookieYear;
    }
    set rookieYear(value) {
        this._rookieYear = value;
    }
    get website() {
        return this._website;
    }
    set website(value) {
        this._website = value;
    }
    get events() {
        return this._events;
    }
    set events(value) {
        this._events = value;
    }
    get rankings() {
        return this._rankings;
    }
    set rankings(value) {
        this._rankings = value;
    }
    get awards() {
        return this._awards;
    }
    set awards(value) {
        this._awards = value;
    }
    get media() {
        return this._media;
    }
    set media(value) {
        this._media = value;
    }
}
exports.default = Team;
