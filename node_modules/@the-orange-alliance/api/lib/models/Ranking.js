"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Team_1 = require("./Team");
class Ranking {
    constructor() {
        this._rankKey = '';
        this._eventKey = '';
        this._teamKey = '';
        this._teamNumber = 0;
        this._rank = 0;
        this._rankChange = 0;
        this._opr = 0;
        this._wins = 0;
        this._losses = 0;
        this._ties = 0;
        this._highestQualScore = 0;
        this._rankingPoints = 0;
        this._qualifyingPoints = 0;
        this._tieBreakerPoints = 0;
        this._disqualified = 0;
        this._played = 0;
        this._team = new Team_1.default();
    }
    toJSON() {
        return {
            rank_key: this.rankKey,
            event_key: this.eventKey,
            team_key: this.teamKey,
            team_number: this.teamNumber,
            rank: this.rank,
            rank_change: this.rankChange,
            opr: this.opr,
            wins: this.wins,
            losses: this.losses,
            ties: this.ties,
            highest_qual_score: this.highestQualScore,
            ranking_points: this.rankingPoints,
            qualifying_points: this.qualifyingPoints,
            tie_breaker_points: this.tieBreakerPoints,
            disqualified: this.disqualified,
            played: this.played,
            team: this.team.teamNumber > 0 ? this.team.toJSON() : undefined
        };
    }
    fromJSON(json) {
        const ranking = new Ranking();
        ranking.rankKey = json.rank_key;
        ranking.eventKey = json.event_key;
        ranking.teamKey = json.team_key;
        ranking.teamNumber = json.team_number;
        ranking.rank = json.rank;
        ranking.rankChange = json.rank_change;
        ranking.opr = json.opr;
        ranking.wins = json.wins;
        ranking.losses = json.losses;
        ranking.ties = json.ties;
        ranking.highestQualScore = json.highest_qual_score;
        ranking.rankingPoints = json.ranking_points;
        ranking.qualifyingPoints = json.qualifying_points;
        ranking.tieBreakerPoints = json.tie_breaker_points;
        ranking.disqualified = json.disqualified;
        ranking.played = json.played;
        ranking.team = new Team_1.default().fromJSON(json.team);
        return ranking;
    }
    get rankKey() {
        return this._rankKey;
    }
    set rankKey(value) {
        this._rankKey = value;
    }
    get eventKey() {
        return this._eventKey;
    }
    set eventKey(value) {
        this._eventKey = value;
    }
    get teamKey() {
        return this._teamKey;
    }
    set teamKey(value) {
        this._teamKey = value;
    }
    get teamNumber() {
        return this._teamNumber;
    }
    set teamNumber(value) {
        this._teamNumber = value;
    }
    get rank() {
        return this._rank;
    }
    set rank(value) {
        this._rank = value;
    }
    get rankChange() {
        return this._rankChange;
    }
    set rankChange(value) {
        this._rankChange = value;
    }
    get opr() {
        return this._opr;
    }
    set opr(value) {
        this._opr = value;
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
    get highestQualScore() {
        return this._highestQualScore;
    }
    set highestQualScore(value) {
        this._highestQualScore = value;
    }
    get rankingPoints() {
        return this._rankingPoints;
    }
    set rankingPoints(value) {
        this._rankingPoints = value;
    }
    get qualifyingPoints() {
        return this._qualifyingPoints;
    }
    set qualifyingPoints(value) {
        this._qualifyingPoints = value;
    }
    get tieBreakerPoints() {
        return this._tieBreakerPoints;
    }
    set tieBreakerPoints(value) {
        this._tieBreakerPoints = value;
    }
    get disqualified() {
        return this._disqualified;
    }
    set disqualified(value) {
        this._disqualified = value;
    }
    get played() {
        return this._played;
    }
    set played(value) {
        this._played = value;
    }
    get team() {
        return this._team;
    }
    set team(value) {
        this._team = value;
    }
}
exports.default = Ranking;
