import { ISerializable } from './ISerializable';
export default class League implements ISerializable {
    private _leagueKey;
    private _regionKey;
    private _seasonKey;
    private _description;
    constructor();
    toJSON(): object;
    fromJSON(json: any): League;
    get leagueKey(): string;
    set leagueKey(value: string);
    get regionKey(): string;
    set regionKey(value: string);
    get seasonKey(): string;
    set seasonKey(value: string);
    get description(): string;
    set description(value: string);
}
