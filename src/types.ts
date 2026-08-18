export type Language = 'en' | 'zh'
export type DegreeLevel = 'Bachelor' | 'Master'
export type Region = 'Europe' | 'Asia' | 'North America' | 'Oceania'
export type Field =
  | 'Game Design'
  | 'Game Art'
  | 'Game Development'
  | 'Interactive / Digital Media'

export interface School {
  id: string
  schoolName: string
  schoolNameZh: string
  searchAliases?: string[]
  country: string
  countryZh: string
  city: string
  cityZh: string
  region: Region
  latitude: number
  longitude: number
  degreeLevel: DegreeLevel[]
  programName: string
  field: Field[]
  teachingLanguage: string
  duration: string
  tuitionEstimateEn: string
  tuitionEstimateZh: string
  tuitionURL: string
  livingCostEstimateEn: string
  livingCostEstimateZh: string
  portfolioRequired: boolean | 'check'
  portfolioSummaryEn: string
  portfolioSummaryZh: string
  descriptionEn: string
  descriptionZh: string
  officialProgrammeURL: string
  portfolioURL: string
  applicationURL: string
}

export interface CountryProfile {
  id: string
  flag: string
  aliases: string[]
  nameEn: string
  nameZh: string
  regionEn: string
  regionZh: string
  latitude: number
  longitude: number
  tuitionEn: string
  tuitionZh: string
  livingCostEn: string
  livingCostZh: string
}

export interface FilterState {
  degree: DegreeLevel[]
  region: Region[]
  field: Field[]
}

export interface GlobeTarget {
  latitude: number
  longitude: number
  altitude: number
  token: number
}
