"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Insights_1 = require("../Insights");
const Match_1 = require("../Match");
class RoverRuckusInsights extends Insights_1.default {
    constructor() {
        super();
        this._autoPercentLanding = 0;
        this._autoPercentSampling = 0;
        this._autoPercentClaiming = 0;
        this._autoPercentParking = 0;
        this._teleAvgGolds = 0;
        this._teleAvgSilvers = 0;
        this._teleAvgDepotMinerals = 0;
        this._endPercentLatched = 0;
        this._endPercentParked = 0;
    }
    toJSON() {
        return {
            high_score_match: this.highScoreMatch,
            average_match_score: this.averageMatchScore,
            average_winning_score: this.averageWinningScore,
            average_winning_margin: this.averageWinningMargin,
            game: {
                auto_percent_landing: this.autoPercentLanding,
                auto_percent_sampling: this.autoPercentSampling,
                auto_percent_claiming: this.autoPercentClaiming,
                auto_percent_parking: this.autoPercentParking,
                tele_avg_golds: this.teleAvgGolds,
                tele_avg_silvers: this.teleAvgSilvers,
                tele_avg_depot_minerals: this.teleAvgDepotMinerals,
                end_percent_latched: this.endPercentLatched,
                end_percent_parked: this.endPercentParked
            }
        };
    }
    fromJSON(json) {
        const insights = new RoverRuckusInsights();
        insights.highScoreMatch = json.high_score_match ? new Match_1.default().fromJSON(json.high_score_match) : null;
        insights.averageMatchScore = json.average_match_score;
        insights.averageWinningScore = json.average_winning_score;
        insights.averageWinningMargin = json.average_winning_margin;
        insights.autoPercentLanding = json.game.auto_percent_landing;
        insights.autoPercentSampling = json.game.auto_percent_sampling;
        insights.autoPercentClaiming = json.game.auto_percent_claiming;
        insights.autoPercentParking = json.game.auto_percent_parking;
        insights.teleAvgGolds = json.game.tele_avg_golds;
        insights.teleAvgSilvers = json.game.tele_avg_silvers;
        insights.teleAvgDepotMinerals = json.game.tele_avg_depot_minerals;
        insights.endPercentLatched = json.game.end_percent_latched;
        insights.endPercentParked = json.game.end_percent_parked;
        return insights;
    }
    get autoPercentLanding() {
        return this._autoPercentLanding;
    }
    set autoPercentLanding(value) {
        this._autoPercentLanding = value;
    }
    get autoPercentSampling() {
        return this._autoPercentSampling;
    }
    set autoPercentSampling(value) {
        this._autoPercentSampling = value;
    }
    get autoPercentClaiming() {
        return this._autoPercentClaiming;
    }
    set autoPercentClaiming(value) {
        this._autoPercentClaiming = value;
    }
    get autoPercentParking() {
        return this._autoPercentParking;
    }
    set autoPercentParking(value) {
        this._autoPercentParking = value;
    }
    get teleAvgGolds() {
        return this._teleAvgGolds;
    }
    set teleAvgGolds(value) {
        this._teleAvgGolds = value;
    }
    get teleAvgSilvers() {
        return this._teleAvgSilvers;
    }
    set teleAvgSilvers(value) {
        this._teleAvgSilvers = value;
    }
    get teleAvgDepotMinerals() {
        return this._teleAvgDepotMinerals;
    }
    set teleAvgDepotMinerals(value) {
        this._teleAvgDepotMinerals = value;
    }
    get endPercentLatched() {
        return this._endPercentLatched;
    }
    set endPercentLatched(value) {
        this._endPercentLatched = value;
    }
    get endPercentParked() {
        return this._endPercentParked;
    }
    set endPercentParked(value) {
        this._endPercentParked = value;
    }
}
exports.default = RoverRuckusInsights;
