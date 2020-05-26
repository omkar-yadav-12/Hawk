import { ISerializable } from "./ISerializable";
import StationStatus from "./types/StationStatus";
export default class MatchParticipant implements ISerializable {
    private _matchParticipantKey;
    private _matchKey;
    private _teamKey;
    private _teamNumber;
    private _station;
    private _stationStatus;
    private _refStatus;
    constructor();
    toJSON(): object;
    fromJSON(json: any): MatchParticipant;
    get matchParticipantKey(): string;
    set matchParticipantKey(value: string);
    get matchKey(): string;
    set matchKey(value: string);
    get teamKey(): string;
    set teamKey(value: string);
    get teamNumber(): number;
    set teamNumber(value: number);
    get station(): number;
    set station(value: number);
    get stationStatus(): StationStatus;
    set stationStatus(value: StationStatus);
    get refStatus(): number;
    set refStatus(value: number);
}
