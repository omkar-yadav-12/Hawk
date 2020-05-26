import { ISerializable } from "./ISerializable";
import { MediaTypeTeam, MediaTypeEvent } from "./types/MediaType";
export default class Media implements ISerializable {
    private _mediaKey;
    private _eventKey;
    private _teamKey;
    private _mediaType;
    private _isPrimary;
    private _mediaTitle;
    private _mediaLink;
    constructor();
    toJSON(): object;
    fromJSON(json: any): Media;
    get mediaKey(): string;
    set mediaKey(value: string);
    get eventKey(): string;
    set eventKey(value: string);
    get teamKey(): string;
    set teamKey(value: string);
    get mediaType(): MediaTypeTeam | MediaTypeEvent;
    set mediaType(value: MediaTypeTeam | MediaTypeEvent);
    get isPrimary(): boolean;
    set isPrimary(value: boolean);
    get mediaTitle(): string;
    set mediaTitle(value: string);
    get mediaLink(): string;
    set mediaLink(value: string);
}
