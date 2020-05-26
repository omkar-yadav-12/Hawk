"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventType_1 = require("./types/EventType");
class Event {
    constructor() {
        this._eventKey = "";
        this._seasonKey = "";
        this._regionKey = "";
        this._leagueKey = "";
        this._eventCode = "";
        this._eventTypeKey = EventType_1.default.Unknown;
        this._eventRegionNumber = 0;
        this._firstEventCode = "";
        this._divisionKey = 100;
        this._divisionName = "";
        this._eventName = "";
        this._startDate = "";
        this._endDate = "";
        this._weekKey = "";
        this._city = "";
        this._stateProv = "";
        this._country = "";
        this._venue = "";
        this._website = "";
        this._timeZone = "";
        this._isActive = false;
        this._isPublic = false;
        this._activeTournamentLevel = "";
        this._allianceCount = 0;
        this._fieldCount = 0;
        this._advanceSpots = 0;
        this._advanceEvent = "";
        this._teamCount = -1;
        this._matchCount = -1;
        this._matches = [];
        this._rankings = [];
        this._awards = [];
        this._teams = [];
        this._alliances = [];
    }
    toJSON() {
        return {
            event_key: this.eventKey,
            season_key: this.seasonKey,
            region_key: this.regionKey,
            league_key: this.leagueKey,
            event_code: this.eventCode,
            event_type_key: EventType_1.stringify(this.eventTypeKey),
            division_key: this.divisionKey,
            division_name: this.divisionName,
            first_event_code: this.firstEventCode,
            event_name: this.eventName,
            start_date: this.startDate,
            end_date: this.endDate,
            week_key: this.weekKey,
            city: this.city,
            state_prov: this.stateProv,
            country: this.country,
            venue: this.venue,
            website: this.website,
            time_zone: this.timeZone,
            is_active: this.isActive,
            is_public: this.isPublic,
            active_tournament_level: this.activeTournamentLevel,
            alliance_count: this.allianceCount,
            field_count: this.fieldCount,
            advance_spots: this.advanceSpots,
            advance_event: this.advanceEvent
        };
    }
    fromJSON(json) {
        const event = new Event();
        event.eventKey = json.event_key;
        event.seasonKey = json.season_key;
        event.regionKey = json.region_key;
        event.leagueKey = json.league_key;
        event.eventCode = json.event_code;
        event.eventRegionNumber = parseInt(json.event_region_number, 10);
        event.divisionKey = json.division_key;
        event.eventTypeKey = EventType_1.enumerate(json.eventTypeKey);
        event.firstEventCode = json.first_event_code;
        event.eventName = json.event_name;
        event.divisionName = json.division_name;
        event.startDate = this.fixDate(json.start_date);
        event.endDate = this.fixDate(json.end_date);
        event.weekKey = json.week_key;
        event.city = json.city;
        event.stateProv = json.state_prov;
        event.country = json.country;
        event.venue = json.venue;
        event.website = json.website;
        event.timeZone = json.time_zone;
        event.isActive = json.is_active;
        event.isPublic = json.is_public;
        event.activeTournamentLevel = json.active_tournament_level;
        event.allianceCount = parseInt(json.alliance_count, 10);
        event.fieldCount = parseInt(json.field_count, 10);
        event.advanceSpots = parseInt(json.advance_spots, 10);
        event.advanceEvent = json.advance_event;
        event.teamCount =
            json.team_count && parseInt(json.team_count, 10) > -1
                ? parseInt(json.team_count, 10)
                : -1;
        event.matchCount =
            json.match_count && parseInt(json.match_count, 10) > -1
                ? parseInt(json.match_count, 10)
                : -1;
        return event;
    }
    get eventKey() {
        return this._eventKey;
    }
    set eventKey(value) {
        this._eventKey = value;
    }
    get seasonKey() {
        return this._seasonKey;
    }
    set seasonKey(value) {
        this._seasonKey = value;
    }
    get regionKey() {
        return this._regionKey;
    }
    set regionKey(value) {
        this._regionKey = value;
    }
    get leagueKey() {
        return this._leagueKey;
    }
    set leagueKey(value) {
        this._leagueKey = value;
    }
    get eventCode() {
        return this._eventCode;
    }
    set eventCode(value) {
        this._eventCode = value;
    }
    get eventTypeKey() {
        return this._eventTypeKey;
    }
    set eventTypeKey(value) {
        this._eventTypeKey = value;
    }
    get eventRegionNumber() {
        return this._eventRegionNumber;
    }
    set eventRegionNumber(value) {
        this._eventRegionNumber = value;
    }
    get firstEventCode() {
        return this._firstEventCode;
    }
    set firstEventCode(value) {
        this._firstEventCode = value;
    }
    get divisionKey() {
        return this._divisionKey;
    }
    set divisionKey(value) {
        this._divisionKey = value;
    }
    get divisionName() {
        return this._divisionName;
    }
    set divisionName(value) {
        this._divisionName = value;
    }
    get eventName() {
        return this._eventName;
    }
    set eventName(value) {
        this._eventName = value;
    }
    get startDate() {
        return this._startDate;
    }
    set startDate(value) {
        this._startDate = value;
    }
    get endDate() {
        return this._endDate;
    }
    set endDate(value) {
        this._endDate = value;
    }
    get weekKey() {
        return this._weekKey;
    }
    set weekKey(value) {
        this._weekKey = value;
    }
    get city() {
        return this._city;
    }
    set city(value) {
        this._city = value;
    }
    get stateProv() {
        return this._stateProv;
    }
    set stateProv(value) {
        this._stateProv = value;
    }
    get country() {
        return this._country;
    }
    set country(value) {
        this._country = value;
    }
    get venue() {
        return this._venue;
    }
    set venue(value) {
        this._venue = value;
    }
    get website() {
        return this._website;
    }
    set website(value) {
        this._website = value;
    }
    get timeZone() {
        return this._timeZone;
    }
    set timeZone(value) {
        this._timeZone = value;
    }
    get isActive() {
        return this._isActive;
    }
    set isActive(value) {
        this._isActive = value;
    }
    get isPublic() {
        return this._isPublic;
    }
    set isPublic(value) {
        this._isPublic = value;
    }
    get activeTournamentLevel() {
        return this._activeTournamentLevel;
    }
    set activeTournamentLevel(value) {
        this._activeTournamentLevel = value;
    }
    get allianceCount() {
        return this._allianceCount;
    }
    set allianceCount(value) {
        this._allianceCount = value;
    }
    get fieldCount() {
        return this._fieldCount;
    }
    set fieldCount(value) {
        this._fieldCount = value;
    }
    get advanceSpots() {
        return this._advanceSpots;
    }
    set advanceSpots(value) {
        this._advanceSpots = value;
    }
    get advanceEvent() {
        return this._advanceEvent;
    }
    set advanceEvent(value) {
        this._advanceEvent = value;
    }
    get teamCount() {
        return this._teamCount;
    }
    set teamCount(value) {
        this._teamCount = value;
    }
    get matchCount() {
        return this._matchCount;
    }
    set matchCount(value) {
        this._matchCount = value;
    }
    get matches() {
        return this._matches;
    }
    set matches(value) {
        this._matches = value;
    }
    get rankings() {
        return this._rankings;
    }
    set rankings(value) {
        this._rankings = value;
    }
    get awards() {
        return this._awards;
    }
    set awards(value) {
        this._awards = value;
    }
    get teams() {
        return this._teams;
    }
    set teams(value) {
        this._teams = value;
    }
    get alliances() {
        return this._alliances;
    }
    set alliances(value) {
        this._alliances = value;
    }
    fixDate(date) {
        if (date.endsWith("Z")) {
            return date.substr(0, date.length - 1);
        }
        else {
            return date;
        }
    }
    getLocation(venue = true) {
        return ((this.venue && venue ? this.venue + ", " : "") +
            this.city +
            ", " +
            (this.stateProv ? this.stateProv + ", " : "") +
            this.country);
    }
    get fullEventName() {
        return this._divisionName
            ? this._eventName + " - " + this._divisionName + " Division"
            : this._eventName;
    }
}
exports.default = Event;
