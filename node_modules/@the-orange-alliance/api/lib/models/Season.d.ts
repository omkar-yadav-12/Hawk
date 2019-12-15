import { ISerializable } from './ISerializable';
export default class Season implements ISerializable {
    private _seasonKey;
    private _description;
    constructor();
    toJSON(): object;
    fromJSON(json: any): Season;
    get seasonKey(): string;
    set seasonKey(value: string);
    get description(): string;
    set description(value: string);
}
