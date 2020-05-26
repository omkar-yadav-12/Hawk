declare enum EventType {
    Unknown = "",
    LeagueChampionship = "LGCMP",
    LeagueMeet = "LGMEET",
    OffSeason = "OFFSSN",
    Qualifier = "QUAL",
    RegionChampionship = "RCMP",
    Scrimmage = "SCRIMMAGE",
    SpringEvent = "SPRING",
    SuperQual = "SPRQUAL",
    SuperRegional = "SPRRGNL",
    WorldChamp = "WRLDCMP",
    Other = "OTHER"
}
export declare const enumerate: (eventType: "Unknown" | "LeagueChampionship" | "LeagueMeet" | "OffSeason" | "Qualifier" | "RegionChampionship" | "Scrimmage" | "SpringEvent" | "SuperQual" | "SuperRegional" | "WorldChamp" | "Other") => EventType;
export declare const stringify: (eventType: EventType) => "Unknown" | "LeagueChampionship" | "LeagueMeet" | "OffSeason" | "Qualifier" | "RegionChampionship" | "Scrimmage" | "SpringEvent" | "SuperQual" | "SuperRegional" | "WorldChamp" | "Other";
export default EventType;
