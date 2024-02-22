

export interface IReportCategory {
  ReportCategoryId?: string
  CategoryName: string
}

export interface IReport {
  ReportId?: string
  ReportCategoryId: string
  Text: string
}

export interface ICustomReport {
  ReportId?: string
  Text: string
  UserId: string
  HelperId: string
  Type: "ACC_REP" | "POST_REP"
}

export interface IBugReport {
  ReportId?: string
  Text: string
  UserId: string
  Files: FilesModel[]

}

interface FilesModel {
  FileId: string
  filePublicId: string
  fileURL: string
  files?: string[]
}
