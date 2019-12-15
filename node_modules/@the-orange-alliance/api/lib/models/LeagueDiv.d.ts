import { ISerializable } from './ISerializable';
export default class League implements ISerializable {
    private _divisionKey;
    private _leagueKey;
    private _regionKey;
    private _seasonKey;
    private _description;
    private _leagueDesc;
    constructor();
    toJSON(): object;
    fromJSON(json: any): League;
    get divisionKey(): string;
    set divisionKey(value: string);
    get leagueKey(): string;
    set leagueKey(value: string);
    get regionKey(): string;
    set regionKey(value: string);
    get seasonKey(): string;
    set seasonKey(value: string);
    get description(): string;
    set description(value: string);
    get leagueDesc(): string;
    set leagueDesc(value: string);
}
