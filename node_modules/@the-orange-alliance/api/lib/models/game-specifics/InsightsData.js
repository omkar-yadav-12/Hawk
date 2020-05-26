"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Insights_1 = require("../Insights");
const RelicRecoveryInsights_1 = require("./RelicRecoveryInsights");
const RoverRuckusInsights_1 = require("./RoverRuckusInsights");
function getInsights(seasonKey) {
    switch (seasonKey) {
        // case '1617':
        //   return new VelocityVortexInsights();
        case '1718':
            return new RelicRecoveryInsights_1.default();
        case '1819':
            return new RoverRuckusInsights_1.default();
        default:
            return new Insights_1.default();
    }
}
exports.getInsights = getInsights;
