import { reportComponent, getCredential } from '@serverless-devs/core';
import Core from '@alicloud/pop-core';
import { get, isEmpty } from 'lodash';
import Base from './common/base';
import { ERROR_CODE } from './common/contants';
import { InputProps } from './common/entity';

export interface IResBucket {
  remoteAddress: string;
  remotePort?: string;
  requestUrls?: string;
}

type dnsData = {
  uid?: string,
  access?: string,
  domainName: string,
  rr?: string
  type: string,
  value: string
}

export default class DnsComponent extends Base {
  client;
  /**
 * 使用AK&SK初始化账号Client
 * @param accessKeyId
 * @param accessKeySecret
 * @return Client
 * @throws Exception
 */
  static createClient(accessKeyId: string, accessKeySecret: string): any {
    return new Core({
      accessKeyId,
      accessKeySecret,
      // securityToken: '<your-sts-token>', // use STS Token
      endpoint: 'https://dns.aliyuncs.com',
      apiVersion: '2015-01-09'
    });
  }

  private async request(method: string, data: any, requestOption = { method: 'POST' }) {
    return this.client.request(method, data, requestOption);
  }

  private reportInfo(data: dnsData) {
    this.__report({
      name: 'dns',
      access: data.access,
      content: {
        domainName: data.domainName,
        rr: data.rr,
        type: data.type,
        value: data.value
      }
    });
    reportComponent('dns', {
      uid: data.uid,
      command: 'deploy',
    });
  }

  protected async addDomainRecord(data: dnsData) {
    const { domainName = '', type, value } = data;
    if (!domainName || !value) {
      return;
    }
    const domainArray = domainName.split('.');
    const rr = domainArray[0];
    const _domainName = domainArray.slice(1).join('.');
    let result = {
      domainName,
      value
    };
    try {
      await this.request('AddDomainRecord', { DomainName: _domainName, RR: rr, Type: type, Value: value });
    } catch (e) {
      if (e.code !== ERROR_CODE.DomainRecordDuplicate) { // 忽略已经存在的异常
        result = e.message;
      }
    }
    return result
  }

  async deploy(inputs: InputProps) {
    const access = get(inputs, 'project.access');
    let credentials = get(inputs, 'credentials');
    if (isEmpty(credentials)) {
      credentials = await getCredential(inputs, access);
    }
    const { AccessKeyID, AccessKeySecret } = credentials;
    const { domainName = '', type = 'CNAME', value } = get(inputs, 'props');
    if (!this.client) {
      this.client = DnsComponent.createClient(AccessKeyID, AccessKeySecret);
    }
    const result = await this.addDomainRecord({ domainName, type, value });
    this.reportInfo({
      access,
      domainName,
      type,
      value,
      uid: credentials.AccountID
    })

    return result;
  }
}
