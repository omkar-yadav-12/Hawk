"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Award {
    constructor() {
        this._awardKey = '';
        this._awardType = '';
        this._awardDescription = '';
        this._displayOrder = 0;
    }
    toJSON() {
        return {
            award_key: this.awardKey,
            award_type: this.awardType,
            award_description: this.awardDescription,
            display_order: this.displayOrder
        };
    }
    fromJSON(json) {
        const award = new Award();
        award.awardKey = json.award_key;
        award.awardType = json.award_type;
        award.awardDescription = json.award_description;
        award.displayOrder = json.display_order;
        return award;
    }
    get awardKey() {
        return this._awardKey;
    }
    set awardKey(value) {
        this._awardKey = value;
    }
    get awardType() {
        return this._awardType;
    }
    set awardType(value) {
        this._awardType = value;
    }
    get awardDescription() {
        return this._awardDescription;
    }
    set awardDescription(value) {
        this._awardDescription = value;
    }
    get displayOrder() {
        return this._displayOrder;
    }
    set displayOrder(value) {
        this._displayOrder = value;
    }
}
exports.default = Award;
