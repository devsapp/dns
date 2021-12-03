declare namespace ServerlessDevsReport {
  export interface DNS {
    type: string;
    value: string;
    rr: string;
    domainName: string;
    ttl?:string,
    line?:string,
    priority?:string
  }
  export interface ReportData {
    name: string;
    access: string;
    content: DNS;
  }
}
