import { ISerializable } from './ISerializable';
export default class Region implements ISerializable {
    private _regionKey;
    private _description;
    constructor();
    toJSON(): object;
    fromJSON(json: any): Region;
    get regionKey(): string;
    set regionKey(value: string);
    get description(): string;
    set description(value: string);
}
