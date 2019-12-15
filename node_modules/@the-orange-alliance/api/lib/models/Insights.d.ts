import { ISerializable } from './ISerializable';
import Match from './Match';
export default class Insights implements ISerializable {
    private _highScoreMatch;
    private _averageMatchScore;
    private _averageWinningScore;
    private _averageWinningMargin;
    constructor();
    toJSON(): object;
    fromJSON(json: any): Insights;
    get highScoreMatch(): Match | null;
    set highScoreMatch(value: Match | null);
    get averageMatchScore(): number;
    set averageMatchScore(value: number);
    get averageWinningScore(): number;
    set averageWinningScore(value: number);
    get averageWinningMargin(): number;
    set averageWinningMargin(value: number);
}
