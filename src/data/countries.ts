import type { CountryProfile } from '../types'

export const countries: CountryProfile[] = [
  { id: 'denmark', flag: '🇩🇰', aliases: ['Denmark'], nameEn: 'Denmark', nameZh: '丹麦', regionEn: 'Northern Europe', regionZh: '北欧', latitude: 56.1, longitude: 9.5, tuitionEn: 'EU/EEA often tuition-free; non-EU programme fees vary', tuitionZh: '欧盟/欧洲经济区学生通常免学费；非欧盟课程费用各异', livingCostEn: 'DKK 7,500–12,000 / month', livingCostZh: 'DKK 7,500–12,000 / 月' },
  { id: 'finland', flag: '🇫🇮', aliases: ['Finland'], nameEn: 'Finland', nameZh: '芬兰', regionEn: 'Northern Europe', regionZh: '北欧', latitude: 64.2, longitude: 26, tuitionEn: 'EU/EEA often tuition-free; non-EU fees vary', tuitionZh: '欧盟/欧洲经济区学生通常免学费；非欧盟费用各异', livingCostEn: '€800–1,300 / month', livingCostZh: '€800–1,300 / 月' },
  { id: 'sweden', flag: '🇸🇪', aliases: ['Sweden'], nameEn: 'Sweden', nameZh: '瑞典', regionEn: 'Northern Europe', regionZh: '北欧', latitude: 62, longitude: 15, tuitionEn: 'EU/EEA often tuition-free; non-EU fees vary', tuitionZh: '欧盟/欧洲经济区学生通常免学费；非欧盟费用各异', livingCostEn: 'SEK 9,000–12,000 / month', livingCostZh: 'SEK 9,000–12,000 / 月' },
  { id: 'germany', flag: '🇩🇪', aliases: ['Germany'], nameEn: 'Germany', nameZh: '德国', regionEn: 'Western Europe', regionZh: '西欧', latitude: 51.1, longitude: 10.4, tuitionEn: 'Many public programmes charge semester contributions', tuitionZh: '许多公立课程收取学期注册费', livingCostEn: '€900–1,250 / month', livingCostZh: '€900–1,250 / 月' },
  { id: 'netherlands', flag: '🇳🇱', aliases: ['Netherlands'], nameEn: 'Netherlands', nameZh: '荷兰', regionEn: 'Western Europe', regionZh: '西欧', latitude: 52.2, longitude: 5.3, tuitionEn: 'Statutory or institutional fees vary by status', tuitionZh: '法定或院校学费因学生身份而异', livingCostEn: '€900–1,400 / month', livingCostZh: '€900–1,400 / 月' },
  { id: 'united-kingdom', flag: '🇬🇧', aliases: ['United Kingdom', 'England'], nameEn: 'United Kingdom', nameZh: '英国', regionEn: 'Northern Europe', regionZh: '北欧', latitude: 54.5, longitude: -3.4, tuitionEn: 'Home and international fees vary by programme', tuitionZh: '本土与国际学生学费因课程而异', livingCostEn: '£800–1,600 / month', livingCostZh: '£800–1,600 / 月' },
  { id: 'usa', flag: '🇺🇸', aliases: ['USA', 'United States of America', 'United States'], nameEn: 'United States', nameZh: '美国', regionEn: 'North America', regionZh: '北美洲', latitude: 39.8, longitude: -98.6, tuitionEn: 'Public/private and residency rates vary widely', tuitionZh: '公立/私立及居民身份学费差异较大', livingCostEn: 'US$1,300–3,200 / month', livingCostZh: 'US$1,300–3,200 / 月' },
  { id: 'canada', flag: '🇨🇦', aliases: ['Canada'], nameEn: 'Canada', nameZh: '加拿大', regionEn: 'North America', regionZh: '北美洲', latitude: 56.1, longitude: -106.3, tuitionEn: 'Domestic and international fees vary by province', tuitionZh: '本地与国际学生学费因省份而异', livingCostEn: 'CA$1,300–2,500 / month', livingCostZh: 'CA$1,300–2,500 / 月' },
  { id: 'japan', flag: '🇯🇵', aliases: ['Japan'], nameEn: 'Japan', nameZh: '日本', regionEn: 'East Asia', regionZh: '东亚', latitude: 36.2, longitude: 138.2, tuitionEn: 'National, public, and private rates vary', tuitionZh: '国立、公立与私立院校学费各异', livingCostEn: '¥90,000–160,000 / month', livingCostZh: '¥90,000–160,000 / 月' },
  { id: 'singapore', flag: '🇸🇬', aliases: ['Singapore'], nameEn: 'Singapore', nameZh: '新加坡', regionEn: 'Southeast Asia', regionZh: '东南亚', latitude: 1.35, longitude: 103.82, tuitionEn: 'Fees vary by citizenship and subsidy status', tuitionZh: '学费因国籍与补贴资格而异', livingCostEn: 'S$1,200–2,200 / month', livingCostZh: 'S$1,200–2,200 / 月' },
  { id: 'australia', flag: '🇦🇺', aliases: ['Australia'], nameEn: 'Australia', nameZh: '澳大利亚', regionEn: 'Oceania', regionZh: '大洋洲', latitude: -25.3, longitude: 133.8, tuitionEn: 'Domestic and international fees differ', tuitionZh: '本地与国际学生学费不同', livingCostEn: 'A$1,700–2,800 / month', livingCostZh: 'A$1,700–2,800 / 月' },
  { id: 'hong-kong', flag: '🇭🇰', aliases: ['Hong Kong'], nameEn: 'Hong Kong', nameZh: '中国香港', regionEn: 'East Asia', regionZh: '东亚', latitude: 22.32, longitude: 114.17, tuitionEn: 'Local and non-local fees differ by degree', tuitionZh: '本地与非本地学生学费因学位而异', livingCostEn: 'HK$8,000–14,000 / month', livingCostZh: 'HK$8,000–14,000 / 月' },
  { id: 'macao', flag: '🇲🇴', aliases: ['Macao', 'Macau'], nameEn: 'Macao', nameZh: '中国澳门', regionEn: 'East Asia', regionZh: '东亚', latitude: 22.19, longitude: 113.55, tuitionEn: 'Local and non-local fees vary by institution and degree', tuitionZh: '本地与非本地学生学费因院校及学位而异', livingCostEn: 'MOP 6,000–10,000 / month', livingCostZh: 'MOP 6,000–10,000 / 月' },
]

export const findCountry = (name: string) => {
  const normalized = name.toLowerCase().trim()
  return countries.find((country) =>
    [country.nameEn, country.nameZh, ...country.aliases].some((alias) => alias.toLowerCase() === normalized),
  )
}

export const getCountryFlag = (name: string) => findCountry(name)?.flag ?? ''

export const getCountryFlagAsset = (name: string) => {
  const country = findCountry(name)
  return country ? `/flags/${country.id}.svg` : ''
}
