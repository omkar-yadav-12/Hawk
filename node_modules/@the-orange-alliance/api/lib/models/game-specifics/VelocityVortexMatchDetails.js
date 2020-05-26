"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MatchDetails_1 = require("../MatchDetails");
class VelocityVortexMatchDetails extends MatchDetails_1.default {
    constructor() {
        super();
        this._redAutoBeacons = 0;
        this._redAutoCap = false;
        this._redAutoPartCen = 0;
        this._redAutoPartCor = 0;
        this._redAutoRobot1 = 0;
        this._redAutoRobot2 = 0;
        this._redTeleBeacons = 0;
        this._redTelePartCen = 0;
        this._redTelePartCor = 0;
        this._redTeleCap = 0;
        this._blueAutoBeacons = 0;
        this._blueAutoCap = false;
        this._blueAutoPartCen = 0;
        this._blueAutoPartCor = 0;
        this._blueAutoRobot1 = 0;
        this._blueAutoRobot2 = 0;
        this._blueTeleBeacons = 0;
        this._blueTelePartCen = 0;
        this._blueTelePartCor = 0;
        this._blueTeleCap = 0;
    }
    toJSON() {
        return {
            match_detail_key: this.matchDetailKey,
            match_key: this.matchKey,
            red_min_pen: this.redMinPen,
            blue_min_pen: this.blueMinPen,
            red_maj_pen: this.redMajPen,
            blue_maj_pen: this.blueMajPen,
            red_auto_beacons: this.redAutoBeacons,
            red_auto_cap: this.redAutoCap,
            red_auto_part_cen: this.redAutoPartCen,
            red_auto_part_cor: this.redAutoPartCor,
            red_auto_robot_1: this.redAutoRobot1,
            red_auto_robot_2: this.redAutoRobot2,
            red_tele_beacons: this.redTeleBeacons,
            red_tele_part_cen: this.redTelePartCen,
            red_tele_part_cor: this.redTelePartCor,
            red_tele_cap: this.redTeleCap,
            blue_auto_beacons: this.blueAutoBeacons,
            blue_auto_cap: this.blueAutoCap,
            blue_auto_part_cen: this.blueAutoPartCen,
            blue_auto_part_cor: this.blueAutoPartCor,
            blue_auto_robot_1: this.blueAutoRobot1,
            blue_auto_robot_2: this.blueAutoRobot2,
            blue_tele_beacons: this.blueTeleBeacons,
            blue_tele_part_cen: this.blueTelePartCen,
            blue_tele_part_cor: this.blueTelePartCor,
            blue_tele_cap: this.blueTeleCap
        };
    }
    fromJSON(json) {
        const details = new VelocityVortexMatchDetails();
        details.matchDetailKey = json.match_detail_key;
        details.matchKey = json.match_key;
        details.redMinPen = json.red_min_pen;
        details.blueMinPen = json.blue_min_pen;
        details.redMajPen = json.red_maj_pen;
        details.blueMajPen = json.blue_maj_pen;
        details.redAutoBeacons = json.red_auto_beacons;
        details.redAutoCap = json.red_auto_cap;
        details.redAutoPartCen = json.red_auto_part_cen;
        details.redAutoPartCor = json.red_auto_part_cor;
        details.redAutoRobot1 = json.red_auto_robot_1;
        details.redAutoRobot2 = json.red_auto_robot_2;
        details.redTeleBeacons = json.red_tele_beacons;
        details.redTelePartCen = json.red_tele_part_cen;
        details.redTelePartCor = json.red_tele_part_cor;
        details.redTeleCap = json.red_tele_cap;
        details.blueAutoBeacons = json.blue_auto_beacons;
        details.blueAutoCap = json.blue_auto_cap;
        details.blueAutoPartCen = json.blue_auto_part_cen;
        details.blueAutoPartCor = json.blue_auto_part_cor;
        details.blueAutoRobot1 = json.blue_auto_robot_1;
        details.blueAutoRobot2 = json.blue_auto_robot_2;
        details.blueTeleBeacons = json.blue_tele_beacons;
        details.blueTelePartCen = json.blue_tele_part_cen;
        details.blueTelePartCor = json.blue_tele_part_cor;
        details.blueTeleCap = json.blue_tele_cap;
        return details;
    }
    /**
     * Getter redAutoBeacons
     * @return {number}
     */
    get redAutoBeacons() {
        return this._redAutoBeacons;
    }
    /**
     * Getter redAutoCap
     * @return {boolean}
     */
    get redAutoCap() {
        return this._redAutoCap;
    }
    /**
     * Getter redAutoPartCen
     * @return {number}
     */
    get redAutoPartCen() {
        return this._redAutoPartCen;
    }
    /**
     * Getter redAutoPartCor
     * @return {number}
     */
    get redAutoPartCor() {
        return this._redAutoPartCor;
    }
    /**
     * Getter redAutoRobot1
     * @return {number}
     */
    get redAutoRobot1() {
        return this._redAutoRobot1;
    }
    /**
     * Getter redAutoRobot2
     * @return {number}
     */
    get redAutoRobot2() {
        return this._redAutoRobot2;
    }
    /**
     * Getter redTeleBeacons
     * @return {number}
     */
    get redTeleBeacons() {
        return this._redTeleBeacons;
    }
    /**
     * Getter redTelePartCen
     * @return {number}
     */
    get redTelePartCen() {
        return this._redTelePartCen;
    }
    /**
     * Getter redTelePartCor
     * @return {number}
     */
    get redTelePartCor() {
        return this._redTelePartCor;
    }
    /**
     * Getter redTeleCap
     * @return {number}
     */
    get redTeleCap() {
        return this._redTeleCap;
    }
    /**
     * Getter blueAutoBeacons
     * @return {number}
     */
    get blueAutoBeacons() {
        return this._blueAutoBeacons;
    }
    /**
     * Getter blueAutoCap
     * @return {boolean}
     */
    get blueAutoCap() {
        return this._blueAutoCap;
    }
    /**
     * Getter blueAutoPartCen
     * @return {number}
     */
    get blueAutoPartCen() {
        return this._blueAutoPartCen;
    }
    /**
     * Getter blueAutoPartCor
     * @return {number}
     */
    get blueAutoPartCor() {
        return this._blueAutoPartCor;
    }
    /**
     * Getter blueAutoRobot1
     * @return {number}
     */
    get blueAutoRobot1() {
        return this._blueAutoRobot1;
    }
    /**
     * Getter blueAutoRobot2
     * @return {number}
     */
    get blueAutoRobot2() {
        return this._blueAutoRobot2;
    }
    /**
     * Getter blueTeleBeacons
     * @return {number}
     */
    get blueTeleBeacons() {
        return this._blueTeleBeacons;
    }
    /**
     * Getter blueTelePartCen
     * @return {number}
     */
    get blueTelePartCen() {
        return this._blueTelePartCen;
    }
    /**
     * Getter blueTelePartCor
     * @return {number}
     */
    get blueTelePartCor() {
        return this._blueTelePartCor;
    }
    /**
     * Getter blueTeleCap
     * @return {number}
     */
    get blueTeleCap() {
        return this._blueTeleCap;
    }
    /**
     * Setter redAutoBeacons
     * @param {number} value
     */
    set redAutoBeacons(value) {
        this._redAutoBeacons = value;
    }
    /**
     * Setter redAutoCap
     * @param {boolean} value
     */
    set redAutoCap(value) {
        this._redAutoCap = value;
    }
    /**
     * Setter redAutoPartCen
     * @param {number} value
     */
    set redAutoPartCen(value) {
        this._redAutoPartCen = value;
    }
    /**
     * Setter redAutoPartCor
     * @param {number} value
     */
    set redAutoPartCor(value) {
        this._redAutoPartCor = value;
    }
    /**
     * Setter redAutoRobot1
     * @param {number} value
     */
    set redAutoRobot1(value) {
        this._redAutoRobot1 = value;
    }
    /**
     * Setter redAutoRobot2
     * @param {number} value
     */
    set redAutoRobot2(value) {
        this._redAutoRobot2 = value;
    }
    /**
     * Setter redTeleBeacons
     * @param {number} value
     */
    set redTeleBeacons(value) {
        this._redTeleBeacons = value;
    }
    /**
     * Setter redTelePartCen
     * @param {number} value
     */
    set redTelePartCen(value) {
        this._redTelePartCen = value;
    }
    /**
     * Setter redTelePartCor
     * @param {number} value
     */
    set redTelePartCor(value) {
        this._redTelePartCor = value;
    }
    /**
     * Setter redTeleCap
     * @param {number} value
     */
    set redTeleCap(value) {
        this._redTeleCap = value;
    }
    /**
     * Setter blueAutoBeacons
     * @param {number} value
     */
    set blueAutoBeacons(value) {
        this._blueAutoBeacons = value;
    }
    /**
     * Setter blueAutoCap
     * @param {boolean} value
     */
    set blueAutoCap(value) {
        this._blueAutoCap = value;
    }
    /**
     * Setter blueAutoPartCen
     * @param {number} value
     */
    set blueAutoPartCen(value) {
        this._blueAutoPartCen = value;
    }
    /**
     * Setter blueAutoPartCor
     * @param {number} value
     */
    set blueAutoPartCor(value) {
        this._blueAutoPartCor = value;
    }
    /**
     * Setter blueAutoRobot1
     * @param {number} value
     */
    set blueAutoRobot1(value) {
        this._blueAutoRobot1 = value;
    }
    /**
     * Setter blueAutoRobot2
     * @param {number} value
     */
    set blueAutoRobot2(value) {
        this._blueAutoRobot2 = value;
    }
    /**
     * Setter blueTeleBeacons
     * @param {number} value
     */
    set blueTeleBeacons(value) {
        this._blueTeleBeacons = value;
    }
    /**
     * Setter blueTelePartCen
     * @param {number} value
     */
    set blueTelePartCen(value) {
        this._blueTelePartCen = value;
    }
    /**
     * Setter blueTelePartCor
     * @param {number} value
     */
    set blueTelePartCor(value) {
        this._blueTelePartCor = value;
    }
    /**
     * Setter blueTeleCap
     * @param {number} value
     */
    set blueTeleCap(value) {
        this._blueTeleCap = value;
    }
}
exports.default = VelocityVortexMatchDetails;
