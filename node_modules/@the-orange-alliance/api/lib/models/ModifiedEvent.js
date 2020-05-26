"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("./Event");
class ModifiedEvent {
    constructor() {
        this._newEvent = new Event_1.default();
        this._originalEvent = new Event_1.default();
        this._discStartDate = false;
        this._discEndDate = false;
        this._discVenue = false;
        this._discCity = false;
        this._discState = false;
        this._discCountry = false;
        this._discWebsite = false;
    }
    toJSON() {
        return this.newEvent.toJSON();
    }
    fromJSON(json) {
        const event = new ModifiedEvent();
        event.newEvent = new Event_1.default().fromJSON(json);
        event.originalEvent = new Event_1.default().fromJSON(json.toa);
        event.discStartDate = json.discrepencies.start_date;
        event.discEndDate = json.discrepencies.end_date;
        event.discVenue = json.discrepencies.venue;
        event.discCity = json.discrepencies.city;
        event.discState = json.discrepencies.state_prov;
        event.discCountry = json.discrepencies.country;
        event.discWebsite = json.discrepencies.website;
        return event;
    }
    get newEvent() {
        return this._newEvent;
    }
    set newEvent(value) {
        this._newEvent = value;
    }
    get originalEvent() {
        return this._originalEvent;
    }
    set originalEvent(value) {
        this._originalEvent = value;
    }
    get discStartDate() {
        return this._discStartDate;
    }
    set discStartDate(value) {
        this._discStartDate = value;
    }
    get discEndDate() {
        return this._discEndDate;
    }
    set discEndDate(value) {
        this._discEndDate = value;
    }
    get discVenue() {
        return this._discVenue;
    }
    set discVenue(value) {
        this._discVenue = value;
    }
    get discCity() {
        return this._discCity;
    }
    set discCity(value) {
        this._discCity = value;
    }
    get discState() {
        return this._discState;
    }
    set discState(value) {
        this._discState = value;
    }
    get discCountry() {
        return this._discCountry;
    }
    set discCountry(value) {
        this._discCountry = value;
    }
    get discWebsite() {
        return this._discWebsite;
    }
    set discWebsite(value) {
        this._discWebsite = value;
    }
}
exports.default = ModifiedEvent;
