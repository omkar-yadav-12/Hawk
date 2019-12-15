"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventType;
(function (EventType) {
    EventType["Unknown"] = "";
    EventType["LeagueChampionship"] = "LGCMP";
    EventType["LeagueMeet"] = "LGMEET";
    EventType["OffSeason"] = "OFFSSN";
    EventType["Qualifier"] = "QUAL";
    EventType["RegionChampionship"] = "RCMP";
    EventType["Scrimmage"] = "SCRIMMAGE";
    EventType["SpringEvent"] = "SPRING";
    EventType["SuperQual"] = "SPRQUAL";
    EventType["SuperRegional"] = "SPRRGNL";
    EventType["WorldChamp"] = "WRLDCMP";
    EventType["Other"] = "OTHER";
})(EventType || (EventType = {}));
const EventTypeStringMapping = {
    [EventType.Unknown]: "",
    [EventType.LeagueChampionship]: "LGCMP",
    [EventType.LeagueMeet]: "LGMEET",
    [EventType.OffSeason]: "OFFSSN",
    [EventType.Qualifier]: "QUAL",
    [EventType.RegionChampionship]: "RCMP",
    [EventType.Scrimmage]: "SCRIMMAGE",
    [EventType.SpringEvent]: "SPRING",
    [EventType.SuperQual]: "SPRQUAL",
    [EventType.SuperRegional]: "SPRRGNL",
    [EventType.WorldChamp]: "WRLDCMP",
    [EventType.Other]: "OTHER"
};
exports.enumerate = (eventType) => {
    return EventType[eventType];
};
exports.stringify = (eventType) => {
    return EventTypeStringMapping[eventType];
};
exports.default = EventType;
