import { ISerializable } from './ISerializable';
export default class EventType implements ISerializable {
    private _eventTypeKey;
    private _description;
    constructor();
    toJSON(): object;
    fromJSON(json: any): EventType;
    get eventTypeKey(): string;
    set eventTypeKey(value: string);
    get description(): string;
    set description(value: string);
}
