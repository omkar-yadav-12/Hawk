"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VirtualScroll {
    constructor(containerHeight, rowHeight, listItems) {
        this._containerHeight = containerHeight;
        this._rowHeight = rowHeight;
        this._listItems = listItems;
        this._scrollPosition = 0;
    }
    getRenderedItems() {
        return this._listItems.slice(this.getStartIndex(), this.getEndIndex());
    }
    getTopOffset() {
        return this.getStartIndex() * this._rowHeight;
    }
    getListHeight() {
        return this.listItems.length * this._rowHeight;
    }
    getStartIndex() {
        return Math.floor(this.scrollPosition / this._rowHeight);
    }
    getEndIndex() {
        return Math.ceil((this.scrollPosition + this._containerHeight) / this._rowHeight);
    }
    get scrollPosition() {
        return this._scrollPosition;
    }
    set scrollPosition(value) {
        this._scrollPosition = value;
    }
    get listItems() {
        return this._listItems;
    }
    set listItems(value) {
        this._listItems = value;
    }
}
exports.default = VirtualScroll;
