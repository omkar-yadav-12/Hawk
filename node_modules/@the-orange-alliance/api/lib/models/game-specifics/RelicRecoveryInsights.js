"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Insights_1 = require("../Insights");
const Match_1 = require("../Match");
class RelicRecoveryInsights extends Insights_1.default {
    constructor() {
        super();
        this._autoAverageGlyphs = 0;
        this._teleAverageGlyphs = 0;
        this._teleAverageCiphers = 0;
        this._endAverageRelic1 = 0;
        this._endAverageRelic2 = 0;
        this._endAverageRelic3 = 0;
        this._endPercentRelicStanding = 0;
        this._endAverageBalanced = 0;
    }
    toJSON() {
        return {
            high_score_match: this.highScoreMatch,
            average_match_score: this.averageMatchScore,
            average_winning_score: this.averageWinningScore,
            average_winning_margin: this.averageWinningMargin,
            game: {
                auto_average_glyphs: this.autoAverageGlyphs,
                tele_average_glyphs: this.teleAverageGlyphs,
                tele_average_ciphers: this.teleAverageCiphers,
                end_average_relic1: this.endAverageRelic1,
                end_average_relic2: this.endAverageRelic2,
                end_average_relic3: this.endAverageRelic3,
                end_percent_relics_standing: this.endPercentRelicStanding,
                end_average_balanced: this.endAverageBalanced
            }
        };
    }
    fromJSON(json) {
        const insights = new RelicRecoveryInsights();
        insights.highScoreMatch = json.high_score_match ? new Match_1.default().fromJSON(json.high_score_match) : null;
        insights.averageMatchScore = json.average_match_score;
        insights.averageWinningScore = json.average_winning_score;
        insights.averageWinningMargin = json.average_winning_margin;
        insights.autoAverageGlyphs = json.game.auto_average_glyphs;
        insights.teleAverageGlyphs = json.game.tele_average_glyphs;
        insights.teleAverageCiphers = json.game.tele_average_ciphers;
        insights.endAverageRelic1 = json.game.end_average_relic1;
        insights.endAverageRelic2 = json.game.end_average_relic2;
        insights.endAverageRelic3 = json.game.end_average_relic3;
        insights.endPercentRelicStanding = json.game.end_percent_relics_standing;
        insights.endAverageBalanced = json.game.end_average_balanced;
        return insights;
    }
    get autoAverageGlyphs() {
        return this._autoAverageGlyphs;
    }
    set autoAverageGlyphs(value) {
        this._autoAverageGlyphs = value;
    }
    get teleAverageGlyphs() {
        return this._teleAverageGlyphs;
    }
    set teleAverageGlyphs(value) {
        this._teleAverageGlyphs = value;
    }
    get teleAverageCiphers() {
        return this._teleAverageCiphers;
    }
    set teleAverageCiphers(value) {
        this._teleAverageCiphers = value;
    }
    get endAverageRelic1() {
        return this._endAverageRelic1;
    }
    set endAverageRelic1(value) {
        this._endAverageRelic1 = value;
    }
    get endAverageRelic2() {
        return this._endAverageRelic2;
    }
    set endAverageRelic2(value) {
        this._endAverageRelic2 = value;
    }
    get endAverageRelic3() {
        return this._endAverageRelic3;
    }
    set endAverageRelic3(value) {
        this._endAverageRelic3 = value;
    }
    get endPercentRelicStanding() {
        return this._endPercentRelicStanding;
    }
    set endPercentRelicStanding(value) {
        this._endPercentRelicStanding = value;
    }
    get endAverageBalanced() {
        return this._endAverageBalanced;
    }
    set endAverageBalanced(value) {
        this._endAverageBalanced = value;
    }
}
exports.default = RelicRecoveryInsights;
