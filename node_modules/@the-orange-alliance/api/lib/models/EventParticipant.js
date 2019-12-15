"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Team_1 = require("./Team");
class EventParticipant {
    constructor() {
        this._eventParticipantKey = '';
        this._eventKey = '';
        this._teamKey = '';
        this._isActive = false;
        this._cardStatus = '';
        this._team = new Team_1.default();
    }
    toJSON() {
        return {
            event_participant_key: this.eventParticipantKey,
            event_key: this.eventKey,
            team_key: this.teamKey,
            team_number: this.teamKey,
            is_active: this.isActive,
            card_status: this.cardStatus,
            team: this.team.teamNumber > 0 ? this.team.toJSON() : undefined
        };
    }
    fromJSON(json) {
        const participant = new EventParticipant();
        participant.eventParticipantKey = json.event_participant_key;
        participant.eventKey = json.event_key;
        participant.teamKey = json.team_key;
        participant.isActive = json.is_active;
        participant.cardStatus = json.card_status;
        participant.team = new Team_1.default().fromJSON(json.team);
        return participant;
    }
    get eventParticipantKey() {
        return this._eventParticipantKey;
    }
    set eventParticipantKey(value) {
        this._eventParticipantKey = value;
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
    get isActive() {
        return this._isActive;
    }
    set isActive(value) {
        this._isActive = value;
    }
    get cardStatus() {
        return this._cardStatus;
    }
    set cardStatus(value) {
        this._cardStatus = value;
    }
    get team() {
        return this._team;
    }
    set team(value) {
        this._team = value;
    }
}
exports.default = EventParticipant;
