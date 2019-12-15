import { ISerializable } from '../ISerializable';
import MatchDetails from '../MatchDetails';
export default class VelocityVortexMatchDetails extends MatchDetails implements ISerializable {
    private _redAutoBeacons;
    private _redAutoCap;
    private _redAutoPartCen;
    private _redAutoPartCor;
    private _redAutoRobot1;
    private _redAutoRobot2;
    private _redTeleBeacons;
    private _redTelePartCen;
    private _redTelePartCor;
    private _redTeleCap;
    private _blueAutoBeacons;
    private _blueAutoCap;
    private _blueAutoPartCen;
    private _blueAutoPartCor;
    private _blueAutoRobot1;
    private _blueAutoRobot2;
    private _blueTeleBeacons;
    private _blueTelePartCen;
    private _blueTelePartCor;
    private _blueTeleCap;
    constructor();
    toJSON(): object;
    fromJSON(json: any): VelocityVortexMatchDetails;
    /**
     * Getter redAutoBeacons
     * @return {number}
     */
    get redAutoBeacons(): number;
    /**
     * Getter redAutoCap
     * @return {boolean}
     */
    get redAutoCap(): boolean;
    /**
     * Getter redAutoPartCen
     * @return {number}
     */
    get redAutoPartCen(): number;
    /**
     * Getter redAutoPartCor
     * @return {number}
     */
    get redAutoPartCor(): number;
    /**
     * Getter redAutoRobot1
     * @return {number}
     */
    get redAutoRobot1(): number;
    /**
     * Getter redAutoRobot2
     * @return {number}
     */
    get redAutoRobot2(): number;
    /**
     * Getter redTeleBeacons
     * @return {number}
     */
    get redTeleBeacons(): number;
    /**
     * Getter redTelePartCen
     * @return {number}
     */
    get redTelePartCen(): number;
    /**
     * Getter redTelePartCor
     * @return {number}
     */
    get redTelePartCor(): number;
    /**
     * Getter redTeleCap
     * @return {number}
     */
    get redTeleCap(): number;
    /**
     * Getter blueAutoBeacons
     * @return {number}
     */
    get blueAutoBeacons(): number;
    /**
     * Getter blueAutoCap
     * @return {boolean}
     */
    get blueAutoCap(): boolean;
    /**
     * Getter blueAutoPartCen
     * @return {number}
     */
    get blueAutoPartCen(): number;
    /**
     * Getter blueAutoPartCor
     * @return {number}
     */
    get blueAutoPartCor(): number;
    /**
     * Getter blueAutoRobot1
     * @return {number}
     */
    get blueAutoRobot1(): number;
    /**
     * Getter blueAutoRobot2
     * @return {number}
     */
    get blueAutoRobot2(): number;
    /**
     * Getter blueTeleBeacons
     * @return {number}
     */
    get blueTeleBeacons(): number;
    /**
     * Getter blueTelePartCen
     * @return {number}
     */
    get blueTelePartCen(): number;
    /**
     * Getter blueTelePartCor
     * @return {number}
     */
    get blueTelePartCor(): number;
    /**
     * Getter blueTeleCap
     * @return {number}
     */
    get blueTeleCap(): number;
    /**
     * Setter redAutoBeacons
     * @param {number} value
     */
    set redAutoBeacons(value: number);
    /**
     * Setter redAutoCap
     * @param {boolean} value
     */
    set redAutoCap(value: boolean);
    /**
     * Setter redAutoPartCen
     * @param {number} value
     */
    set redAutoPartCen(value: number);
    /**
     * Setter redAutoPartCor
     * @param {number} value
     */
    set redAutoPartCor(value: number);
    /**
     * Setter redAutoRobot1
     * @param {number} value
     */
    set redAutoRobot1(value: number);
    /**
     * Setter redAutoRobot2
     * @param {number} value
     */
    set redAutoRobot2(value: number);
    /**
     * Setter redTeleBeacons
     * @param {number} value
     */
    set redTeleBeacons(value: number);
    /**
     * Setter redTelePartCen
     * @param {number} value
     */
    set redTelePartCen(value: number);
    /**
     * Setter redTelePartCor
     * @param {number} value
     */
    set redTelePartCor(value: number);
    /**
     * Setter redTeleCap
     * @param {number} value
     */
    set redTeleCap(value: number);
    /**
     * Setter blueAutoBeacons
     * @param {number} value
     */
    set blueAutoBeacons(value: number);
    /**
     * Setter blueAutoCap
     * @param {boolean} value
     */
    set blueAutoCap(value: boolean);
    /**
     * Setter blueAutoPartCen
     * @param {number} value
     */
    set blueAutoPartCen(value: number);
    /**
     * Setter blueAutoPartCor
     * @param {number} value
     */
    set blueAutoPartCor(value: number);
    /**
     * Setter blueAutoRobot1
     * @param {number} value
     */
    set blueAutoRobot1(value: number);
    /**
     * Setter blueAutoRobot2
     * @param {number} value
     */
    set blueAutoRobot2(value: number);
    /**
     * Setter blueTeleBeacons
     * @param {number} value
     */
    set blueTeleBeacons(value: number);
    /**
     * Setter blueTelePartCen
     * @param {number} value
     */
    set blueTelePartCen(value: number);
    /**
     * Setter blueTelePartCor
     * @param {number} value
     */
    set blueTelePartCor(value: number);
    /**
     * Setter blueTeleCap
     * @param {number} value
     */
    set blueTeleCap(value: number);
}
