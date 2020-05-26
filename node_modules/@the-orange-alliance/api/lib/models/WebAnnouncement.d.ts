import { ISerializable } from './ISerializable';
export default class WebAnnouncement implements ISerializable {
    private _announcementKey;
    private _title;
    private _publishDate;
    private _isActive;
    private _text;
    private _author;
    constructor();
    toJSON(): object;
    fromJSON(json: any): WebAnnouncement;
    get announcementKey(): string;
    set announcementKey(value: string);
    get title(): string;
    set title(value: string);
    get publishDate(): string;
    set publishDate(value: string);
    get isActive(): boolean;
    set isActive(value: boolean);
    get text(): string;
    set text(value: string);
    get author(): string;
    set author(value: string);
}
