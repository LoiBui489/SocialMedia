export interface FileDetailResponse {
    width: number,
    height: number,
    filePath: string,
    url: string,
    fileType: string,
    customMetadata?: { isSensitive: boolean}
};