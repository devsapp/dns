import Base from './common/base';
import { InputProps } from './common/entity';
export interface IResBucket {
    remoteAddress: string;
    remotePort?: string;
    requestUrls?: string;
}
declare type dnsData = {
    uid?: string;
    access?: string;
    domainName: string;
    rr?: string;
    type: string;
    value: string;
};
export default class DnsComponent extends Base {
    client: any;
    /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
    static createClient(accessKeyId: string, accessKeySecret: string): any;
    private request;
    private reportInfo;
    protected addDomainRecord(data: dnsData): unknown;
    deploy(inputs: InputProps): unknown;
}
export {};
