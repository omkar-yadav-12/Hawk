import { ISerializable } from '../ISerializable';
import MatchDetails from '../MatchDetails';
import SkystoneAllianceDetails from './SkystoneAllianceDetails';
export default class SkystoneMatchDetails extends MatchDetails implements ISerializable {
    private _redDtls;
    private _blueDtls;
    private _randomization;
    constructor();
    toJSON(): object;
    fromJSON(json: any): SkystoneMatchDetails;
    get blueDtls(): SkystoneAllianceDetails;
    set blueDtls(value: SkystoneAllianceDetails);
    get redDtls(): SkystoneAllianceDetails;
    set redDtls(value: SkystoneAllianceDetails);
    get randomization(): number;
    set randomization(value: number);
}
