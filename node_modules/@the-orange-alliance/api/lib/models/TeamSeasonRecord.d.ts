import { ISerializable } from './ISerializable';
export default class TeamSeasonRecord implements ISerializable {
    private _wins;
    private _losses;
    private _ties;
    constructor();
    toJSON(): object;
    fromJSON(json: any): TeamSeasonRecord;
    get wins(): number;
    set wins(value: number);
    get losses(): number;
    set losses(value: number);
    get ties(): number;
    set ties(value: number);
}
