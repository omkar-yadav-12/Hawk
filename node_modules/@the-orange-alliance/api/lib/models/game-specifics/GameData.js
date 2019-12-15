"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MatchDetails_1 = require("../MatchDetails");
const RelicRecoveryMatchDetails_1 = require("./RelicRecoveryMatchDetails");
const VelocityVortexMatchDetails_1 = require("./VelocityVortexMatchDetails");
const RoverRuckusMatchDetails_1 = require("./RoverRuckusMatchDetails");
const SkystoneMatchDetails_1 = require("./SkystoneMatchDetails");
function getMatchDetails(seasonKey) {
    switch (seasonKey) {
        case '1617':
            return new VelocityVortexMatchDetails_1.default();
        case '1718':
            return new RelicRecoveryMatchDetails_1.default();
        case '1819':
            return new RoverRuckusMatchDetails_1.default();
        case '1920':
            return new SkystoneMatchDetails_1.default();
        default:
            return new MatchDetails_1.default();
    }
}
exports.getMatchDetails = getMatchDetails;
