"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class League {
    constructor() {
        this._leagueKey = '';
        this._regionKey = '';
        this._seasonKey = '';
        this._description = '';
    }
    toJSON() {
        return {
            league_key: this.leagueKey,
            region_key: this.regionKey,
            season_key: this.seasonKey,
            league_description: this.description,
        };
    }
    fromJSON(json) {
        const league = new League();
        league.leagueKey = json.league_key;
        league.regionKey = json.region_key;
        league.seasonKey = json.season_key;
        league.description = json.league_description;
        return league;
    }
    get leagueKey() {
        return this._leagueKey;
    }
    set leagueKey(value) {
        this._leagueKey = value;
    }
    get regionKey() {
        return this._regionKey;
    }
    set regionKey(value) {
        this._regionKey = value;
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
exports.default = League;
