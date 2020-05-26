import { ISerializable } from './ISerializable';
import Team from './Team';
export default class EventParticipant implements ISerializable {
    private _eventParticipantKey;
    private _eventKey;
    private _teamKey;
    private _isActive;
    private _cardStatus;
    private _team;
    constructor();
    toJSON(): object;
    fromJSON(json: any): EventParticipant;
    get eventParticipantKey(): string;
    set eventParticipantKey(value: string);
    get eventKey(): string;
    set eventKey(value: string);
    get teamKey(): string;
    set teamKey(value: string);
    get isActive(): boolean;
    set isActive(value: boolean);
    get cardStatus(): string;
    set cardStatus(value: string);
    get team(): Team;
    set team(value: Team);
}
