import { IDomain, IReferer, ICertInfo, IIpFilter, RefererEnum, IpFilterEnum, IOptimization, IRedirects } from './interface';
export declare const parseDomain: (domain: string) => IDomain;
export declare function sleep(msec: any): any;
export declare function parseReferer(params: IReferer): {
    functionName: RefererEnum;
    functionArgs: {};
};
export declare function parseIpFilter(params: IIpFilter): {
    functionName: IpFilterEnum;
    functionArgs: {};
};
export declare function parseUaFilter(params: IIpFilter): {
    functionName: string;
    functionArgs: {};
};
export declare function parseCertInfo(params: ICertInfo): {
    certType: "free";
    serverCertificateStatus: any;
    certName?: undefined;
    serverCertificate?: undefined;
    privateKey?: undefined;
} | {
    certType: "upload";
    serverCertificateStatus: any;
    certName: string;
    serverCertificate: string;
    privateKey: string;
} | {
    certType: "csr";
    serverCertificateStatus: any;
    serverCertificate: string;
    certName?: undefined;
    privateKey?: undefined;
};
export declare function parseOptimization(params: IOptimization): {};
export declare function parseRedirects(params: IRedirects[]): any;
export declare const waitUntil: (asyncService: () => Promise<any>, stopCondition: (result: any) => boolean, { timeout, timeInterval, timeoutMsg, hint, }: {
    timeInterval?: number;
    timeout?: number;
    timeoutMsg?: string;
    hint?: {
        loading: string;
        success: string;
        fail: string;
    };
}) => unknown;
