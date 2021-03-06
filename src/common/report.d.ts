declare namespace ServerlessDevsReport {
  export interface Nas {
    region: string;
    mountPointDomain?: string;
    mountPointDomains?: string[];
    fileSystemId: string;
  }
  export interface ReportData {
    name: string;
    access: string;
    content: Nas;
  }
}
