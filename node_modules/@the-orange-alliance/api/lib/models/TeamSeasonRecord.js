"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TeamSeasonRecord {
    constructor() {
        this._wins = 0;
        this._losses = 0;
        this._ties = 0;
    }
    toJSON() {
        return {
            wins: this.wins,
            losses: this.losses,
            ties: this.ties,
        };
    }
    fromJSON(json) {
        const teamSeasonRecord = new TeamSeasonRecord();
        teamSeasonRecord.wins = json.wins;
        teamSeasonRecord.ties = json.ties;
        teamSeasonRecord.losses = json.losses;
        return teamSeasonRecord;
    }
    get wins() {
        return this._wins;
    }
    set wins(value) {
        this._wins = value;
    }
    get losses() {
        return this._losses;
    }
    set losses(value) {
        this._losses = value;
    }
    get ties() {
        return this._ties;
    }
    set ties(value) {
        this._ties = value;
    }
}
exports.default = TeamSeasonRecord;
