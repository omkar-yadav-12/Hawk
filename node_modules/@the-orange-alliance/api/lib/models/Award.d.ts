import { ISerializable } from './ISerializable';
export default class Award implements ISerializable {
    private _awardKey;
    private _awardType;
    private _awardDescription;
    private _displayOrder;
    constructor();
    toJSON(): object;
    fromJSON(json: any): Award;
    get awardKey(): string;
    set awardKey(value: string);
    get awardType(): string;
    set awardType(value: string);
    get awardDescription(): string;
    set awardDescription(value: string);
    get displayOrder(): number;
    set displayOrder(value: number);
}
