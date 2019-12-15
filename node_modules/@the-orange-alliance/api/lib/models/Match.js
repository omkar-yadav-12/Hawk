"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MatchDetails_1 = require("./MatchDetails");
const MatchParticipant_1 = require("./MatchParticipant");
const Event_1 = require("./Event");
class Match {
    constructor() {
        this._matchKey = "";
        this._eventKey = "";
        this._tournamentLevel = 0;
        this._scheduledTime = "";
        this._matchName = "";
        this._playNumber = 0;
        this._fieldNumber = 0;
        this._prestartTime = "";
        this._prestartCount = 0;
        this._cycleTime = "";
        this._redScore = 0;
        this._blueScore = 0;
        this._redPenalty = 0;
        this._bluePenalty = 0;
        this._redAutoScore = 0;
        this._blueAutoScore = 0;
        this._redEndScore = 0;
        this._blueEndScore = 0;
        this._redTeleScore = 0;
        this._blueTeleScore = 0;
        this._videoURL = "";
        this._matchParticipants = [];
        this._event = new Event_1.default();
        this._matchDetails = new MatchDetails_1.default();
    }
    toJSON() {
        return {
            match_key: this.matchKey,
            event_key: this.eventKey,
            tournament_level: this.tournamentLevel,
            scheduled_time: this.scheduledTime,
            match_name: this.matchName,
            play_number: this.playNumber,
            field_number: this.fieldNumber,
            prestart_time: this.prestartTime,
            prestart_count: this.prestartCount,
            cycle_time: this.cycleTime,
            red_score: this.redScore,
            blue_score: this.blueScore,
            red_penalty: this.redPenalty,
            blue_penalty: this.bluePenalty,
            red_auto_score: this.redAutoScore,
            blue_auto_score: this.blueAutoScore,
            red_tele_score: this.redTeleScore,
            blue_tele_score: this.blueTeleScore,
            red_end_score: this.redEndScore,
            blue_end_score: this.blueEndScore,
            video_url: this.videoURL
        };
    }
    fromJSON(json) {
        const match = new Match();
        match.matchKey = json.match_key;
        match.eventKey = json.event_key;
        match.tournamentLevel = json.tournament_level;
        match.scheduledTime = json.scheduled_time;
        match.matchName = json.match_name;
        match.playNumber = json.play_number;
        match.fieldNumber = json.field_number;
        match.prestartTime = json.prestart_time;
        match.prestartCount = json.prestart_count;
        match.cycleTime = json.cycle_time;
        match.redScore = json.red_score;
        match.blueScore = json.blue_score;
        match.redPenalty = json.red_penalty;
        match.bluePenalty = json.blue_penalty;
        match.redAutoScore = json.red_auto_score;
        match.blueAutoScore = json.blue_auto_score;
        match.redTeleScore = json.red_tele_score;
        match.blueTeleScore = json.blue_tele_score;
        match.redEndScore = json.red_end_score;
        match.blueEndScore = json.blue_end_score;
        match.videoURL = json.video_url;
        match.participants =
            typeof json.participants !== "undefined"
                ? json.participants.map((participantJSON) => new MatchParticipant_1.default().fromJSON(participantJSON))
                : [];
        return match;
    }
    getShortName() {
        switch (this.tournamentLevel) {
            case 0:
                return "Practice Match";
            case 1:
                return "Qualification Match";
            case 21:
                return "Quarterfinal Match";
            case 22:
                return "Quarterfinal Match";
            case 23:
                return "Quarterfinal Match";
            case 24:
                return "Quarterfinal Match";
            case 31:
                return "Semifinals Match";
            case 32:
                return "Semifinals Match";
            case 4:
                return "Finals Match";
            default:
                return "Match";
        }
    }
    get matchKey() {
        return this._matchKey;
    }
    set matchKey(value) {
        this._matchKey = value;
    }
    get eventKey() {
        return this._eventKey;
    }
    set eventKey(value) {
        this._eventKey = value;
    }
    get tournamentLevel() {
        return this._tournamentLevel;
    }
    set tournamentLevel(value) {
        this._tournamentLevel = value;
    }
    get scheduledTime() {
        return this._scheduledTime;
    }
    set scheduledTime(value) {
        this._scheduledTime = value;
    }
    get matchName() {
        return this._matchName;
    }
    set matchName(value) {
        this._matchName = value;
    }
    get playNumber() {
        return this._playNumber;
    }
    set playNumber(value) {
        this._playNumber = value;
    }
    get fieldNumber() {
        return this._fieldNumber;
    }
    set fieldNumber(value) {
        this._fieldNumber = value;
    }
    get prestartTime() {
        return this._prestartTime;
    }
    set prestartTime(value) {
        this._prestartTime = value;
    }
    get prestartCount() {
        return this._prestartCount;
    }
    set prestartCount(value) {
        this._prestartCount = value;
    }
    get cycleTime() {
        return this._cycleTime;
    }
    set cycleTime(value) {
        this._cycleTime = value;
    }
    get redScore() {
        return this._redScore;
    }
    set redScore(value) {
        this._redScore = value;
    }
    get blueScore() {
        return this._blueScore;
    }
    set blueScore(value) {
        this._blueScore = value;
    }
    get redPenalty() {
        return this._redPenalty;
    }
    set redPenalty(value) {
        this._redPenalty = value;
    }
    get bluePenalty() {
        return this._bluePenalty;
    }
    set bluePenalty(value) {
        this._bluePenalty = value;
    }
    get redAutoScore() {
        return this._redAutoScore;
    }
    set redAutoScore(value) {
        this._redAutoScore = value;
    }
    get blueAutoScore() {
        return this._blueAutoScore;
    }
    set blueAutoScore(value) {
        this._blueAutoScore = value;
    }
    get redTeleScore() {
        return this._redTeleScore;
    }
    set redTeleScore(value) {
        this._redTeleScore = value;
    }
    get blueTeleScore() {
        return this._blueTeleScore;
    }
    set blueTeleScore(value) {
        this._blueTeleScore = value;
    }
    get redEndScore() {
        return this._redEndScore;
    }
    set redEndScore(value) {
        this._redEndScore = value;
    }
    get blueEndScore() {
        return this._blueEndScore;
    }
    set blueEndScore(value) {
        this._blueEndScore = value;
    }
    get videoURL() {
        return this._videoURL;
    }
    set videoURL(value) {
        this._videoURL = value;
    }
    get details() {
        return this._matchDetails;
    }
    set details(value) {
        this._matchDetails = value;
    }
    get participants() {
        return this._matchParticipants;
    }
    set participants(value) {
        this._matchParticipants = value;
    }
    get event() {
        return this._event;
    }
    set event(value) {
        this._event = value;
    }
}
exports.default = Match;
