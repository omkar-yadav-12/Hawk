"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebAnnouncement {
    constructor() {
        this._announcementKey = '';
        this._title = '';
        this._publishDate = '';
        this._isActive = false;
        this._text = '';
        this._author = '';
    }
    toJSON() {
        return {
            announcement_key: this.announcementKey,
            title: this.title,
            publish_date: this.publishDate,
            is_active: this.isActive,
            text: this.text,
            author: this.author
        };
    }
    fromJSON(json) {
        const announcement = new WebAnnouncement();
        announcement.announcementKey = json.announcement_key;
        announcement.title = json.title;
        announcement.publishDate = json.publish_date;
        announcement.isActive = json.is_active;
        announcement.text = json.text;
        announcement.author = json.author;
        return announcement;
    }
    get announcementKey() {
        return this._announcementKey;
    }
    set announcementKey(value) {
        this._announcementKey = value;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get publishDate() {
        return this._publishDate;
    }
    set publishDate(value) {
        this._publishDate = value;
    }
    get isActive() {
        return this._isActive;
    }
    set isActive(value) {
        this._isActive = value;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
    }
    get author() {
        return this._author;
    }
    set author(value) {
        this._author = value;
    }
}
exports.default = WebAnnouncement;
