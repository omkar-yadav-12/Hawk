"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Award_1 = require("./Award");
const Team_1 = require("./Team");
class AwardRecipient {
    constructor() {
        this._awardsKey = "";
        this._eventKey = "";
        this._awardKey = "";
        this._teamKey = "";
        this._receiverName = "";
        this._awardName = "";
        this._award = new Award_1.default();
        this._team = new Team_1.default();
    }
    toJSON() {
        return {
            awards_key: this.awardsKey,
            event_key: this.eventKey,
            award_key: this.awardKey,
            team_key: this.teamKey,
            receiver_name: this.receiverName,
            award_name: this.awardName,
            award: this.award.awardKey.length > 0 ? this.award.toJSON() : new Award_1.default(),
            team: this.team.teamKey.length > 0 ? this.team.toJSON() : new Award_1.default()
        };
    }
    fromJSON(json) {
        const award = new AwardRecipient();
        award.awardsKey = json.awards_key;
        award.eventKey = json.event_key;
        award.awardKey = json.award_key;
        award.teamKey = json.team_key;
        award.receiverName = json.receiver_name;
        award.awardName = json.award_name;
        award.award =
            typeof json.award !== "undefined"
                ? new Award_1.default().fromJSON(json.award)
                : new Award_1.default();
        award.team =
            typeof json.team !== "undefined"
                ? new Team_1.default().fromJSON(json.team)
                : new Team_1.default();
        return award;
    }
    get awardsKey() {
        return this._awardsKey;
    }
    set awardsKey(value) {
        this._awardsKey = value;
    }
    get eventKey() {
        return this._eventKey;
    }
    set eventKey(value) {
        this._eventKey = value;
    }
    get awardKey() {
        return this._awardKey;
    }
    set awardKey(value) {
        this._awardKey = value;
    }
    get teamKey() {
        return this._teamKey;
    }
    set teamKey(value) {
        this._teamKey = value;
    }
    get receiverName() {
        return this._receiverName;
    }
    set receiverName(value) {
        this._receiverName = value;
    }
    get awardName() {
        return this._awardName;
    }
    set awardName(value) {
        this._awardName = value;
    }
    get award() {
        return this._award;
    }
    set award(value) {
        this._award = value;
    }
    get team() {
        return this._team;
    }
    set team(value) {
        this._team = value;
    }
}
exports.default = AwardRecipient;
