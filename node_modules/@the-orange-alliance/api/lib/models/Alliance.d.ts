import { ISerializable } from './ISerializable';
import Team from './Team';
export default class Alliance implements ISerializable {
    private _seed;
    private _captain;
    private _pick1;
    private _pick2;
    constructor();
    toJSON(): object;
    fromJSON(json: any): Alliance;
    get seed(): number;
    set seed(value: number);
    get captain(): Team;
    set captain(value: Team);
    get pick1(): Team;
    set pick1(value: Team);
    get pick2(): Team | null;
    set pick2(value: Team | null);
}
