declare namespace ServerlessDevsReport {
  export interface Nas {
    region: string;
    mountPointDomain: string;
    fileSystemId: string;
  }
  export interface ReportData {
    name: string;
    access: string;
    content: Nas;
  }
}
