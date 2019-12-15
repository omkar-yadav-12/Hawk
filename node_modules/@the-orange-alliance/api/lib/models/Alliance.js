"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Team_1 = require("./Team");
class Alliance {
    constructor() {
        this._seed = 0;
        this._captain = new Team_1.default();
        this._pick1 = new Team_1.default();
        this._pick2 = null;
    }
    toJSON() {
        return {
            seed: this.seed,
            captain: this.captain.teamNumber > 0 ? this.captain.toJSON() : null,
            pick1: this.pick1.teamNumber > 0 ? this.pick1.toJSON() : null,
            pick2: this.pick2 ? this.pick2.toJSON() : null
        };
    }
    fromJSON(json) {
        const alliance = new Alliance();
        alliance.seed = json.seed;
        alliance.captain = new Team_1.default().fromJSON(json.captain);
        alliance.pick1 = new Team_1.default().fromJSON(json.pick1);
        alliance.pick2 = json.pick2 ? new Team_1.default().fromJSON(json.pick2) : null;
        return alliance;
    }
    get seed() {
        return this._seed;
    }
    set seed(value) {
        this._seed = value;
    }
    get captain() {
        return this._captain;
    }
    set captain(value) {
        this._captain = value;
    }
    get pick1() {
        return this._pick1;
    }
    set pick1(value) {
        this._pick1 = value;
    }
    get pick2() {
        return this._pick2;
    }
    set pick2(value) {
        this._pick2 = value;
    }
}
exports.default = Alliance;
