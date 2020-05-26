"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class League {
    constructor() {
        this._divisionKey = '';
        this._leagueKey = '';
        this._regionKey = '';
        this._seasonKey = '';
        this._description = '';
        this._leagueDesc = '';
    }
    toJSON() {
        return {
            division_key: this.divisionKey,
            league_key: this.leagueKey,
            region_key: this.regionKey,
            season_key: this.seasonKey,
            division_description: this.description,
            league_description: (this.leagueDesc && this.leagueDesc.length > 0) ? this.leagueDesc : undefined
        };
    }
    fromJSON(json) {
        const league = new League();
        league.divisionKey = json.division_key;
        league.leagueKey = json.league_key;
        league.regionKey = json.region_key;
        league.seasonKey = json.season_key;
        league.description = json.division_description;
        league.leagueDesc = json.league_description;
        return league;
    }
    get divisionKey() {
        return this._divisionKey;
    }
    set divisionKey(value) {
        this._divisionKey = value;
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
    get leagueDesc() {
        return this._leagueDesc;
    }
    set leagueDesc(value) {
        this._leagueDesc = value;
    }
}
exports.default = League;
