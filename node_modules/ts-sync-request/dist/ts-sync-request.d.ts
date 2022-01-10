export interface ISyncRequestClient {
    addHeader(key: string, value: string): ISyncRequestClient;
    addHeaders(headers: SyncRequestHeader[]): ISyncRequestClient;
    get<TModel>(url: string): TModel;
    post<TRequestModel, TResponseModel>(url: string, req: TRequestModel): TResponseModel;
    create<TModel>(url: string, req: TModel): TModel;
    put<TModel>(url: string, req: TModel): any;
    delete<TModel>(url: string): TModel;
}
export declare class SyncRequestClient implements ISyncRequestClient {
    private options?;
    private service;
    private headers;
    constructor(options?: SyncRequestOptions | undefined);
    addHeader(key: string, value: string): ISyncRequestClient;
    addHeaders(headers: SyncRequestHeader[]): ISyncRequestClient;
    get<TModel>(url: string): TModel;
    post<TRequestModel, TResponseModel>(url: string, req: TRequestModel): TResponseModel;
    create<TModel>(url: string, req: TModel): TModel;
    put<TModel>(url: string, req: TModel): void;
    delete<TModel>(url: string): TModel;
}
export declare class SyncRequestService {
    get<TModel>(url: string, headers?: SyncRequestHeader[], opts?: SyncRequestOptions): TModel;
    post<TRequestModel, TResponseModel>(url: string, req: TRequestModel, headers?: SyncRequestHeader[], opts?: SyncRequestOptions): TResponseModel;
    create<TModel>(url: string, req: TModel, headers?: SyncRequestHeader[], opts?: SyncRequestOptions): TModel;
    put<TModel>(url: string, req: TModel, headers?: SyncRequestHeader[], opts?: SyncRequestOptions): void;
    delete<TModel>(url: string, headers?: SyncRequestHeader[], opts?: SyncRequestOptions): TModel;
    private addHeaders;
    private addOptions;
}
export declare class SyncRequestHeader {
    private key;
    private val;
    constructor(key: string, val: string);
    Key: string;
    Value: string;
}
export declare class SyncRequestOptions {
    followRedirects: boolean;
    maxRedirects: number;
    timeout: boolean;
    retry: boolean;
    retryDelay: number;
    maxRetries: number;
}
