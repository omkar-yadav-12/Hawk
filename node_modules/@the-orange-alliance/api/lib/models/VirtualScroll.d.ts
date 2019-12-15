export default class VirtualScroll<T> {
    private _containerHeight;
    private _rowHeight;
    private _listItems;
    private _scrollPosition;
    constructor(containerHeight: number, rowHeight: number, listItems: T[]);
    getRenderedItems(): T[];
    getTopOffset(): number;
    getListHeight(): number;
    getStartIndex(): number;
    getEndIndex(): number;
    get scrollPosition(): number;
    set scrollPosition(value: number);
    get listItems(): T[];
    set listItems(value: T[]);
}
