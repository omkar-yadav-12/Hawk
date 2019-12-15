import { ISerializable } from './ISerializable';
export default class MatchDetails implements ISerializable {
    private _matchDetailKey;
    private _matchKey;
    private _redMinPen;
    private _blueMinPen;
    private _redMajPen;
    private _blueMajPen;
    constructor();
    toJSON(): object;
    fromJSON(json: any): MatchDetails;
    get matchDetailKey(): string;
    set matchDetailKey(value: string);
    get matchKey(): string;
    set matchKey(value: string);
    get blueMinPen(): number;
    set blueMinPen(value: number);
    get redMajPen(): number;
    set redMajPen(value: number);
    get redMinPen(): number;
    set redMinPen(value: number);
    get blueMajPen(): number;
    set blueMajPen(value: number);
}
