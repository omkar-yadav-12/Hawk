"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Match_1 = require("./Match");
class Insights {
    constructor() {
        this._highScoreMatch = null;
        this._averageMatchScore = 0;
        this._averageWinningScore = 0;
        this._averageWinningMargin = 0;
    }
    toJSON() {
        return {
            high_score_match: this.highScoreMatch ? this.highScoreMatch.toJSON() : null,
            average_match_score: this.averageMatchScore,
            average_winning_score: this.averageWinningScore,
            average_winning_margin: this.averageWinningMargin
        };
    }
    fromJSON(json) {
        const insights = new Insights();
        insights.highScoreMatch = json.high_score_match ? new Match_1.default().fromJSON(json.high_score_match) : null;
        insights.averageMatchScore = json.average_match_score;
        insights.averageWinningScore = json.average_winning_score;
        insights.averageWinningMargin = json.average_winning_margin;
        return insights;
    }
    get highScoreMatch() {
        return this._highScoreMatch;
    }
    set highScoreMatch(value) {
        this._highScoreMatch = value;
    }
    get averageMatchScore() {
        return this._averageMatchScore;
    }
    set averageMatchScore(value) {
        this._averageMatchScore = value;
    }
    get averageWinningScore() {
        return this._averageWinningScore;
    }
    set averageWinningScore(value) {
        this._averageWinningScore = value;
    }
    get averageWinningMargin() {
        return this._averageWinningMargin;
    }
    set averageWinningMargin(value) {
        this._averageWinningMargin = value;
    }
}
exports.default = Insights;
