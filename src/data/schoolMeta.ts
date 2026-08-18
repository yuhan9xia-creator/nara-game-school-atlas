interface SchoolMeta {
  schoolNameZh: string
  tuitionEn: string
  tuitionZh: string
  tuitionURL: string
}

// Names are display translations only. Official English university names remain unchanged.
// Tuition figures point to an official university or government source and state the fee basis.
export const schoolMeta: Record<string, SchoolMeta> = {
  'royal-danish-academy': {
    schoolNameZh: '丹麦皇家艺术学院',
    tuitionEn: 'Non-EU/EEA: €9,000 / semester · €36,000 total (4 semesters)',
    tuitionZh: '非欧盟/欧洲经济区：€9,000 / 学期 · 四学期合计 €36,000',
    tuitionURL: 'https://studyindenmark.dk/portal/royal-danish-academy-architecture-design-and/copenhagen/visual-game-and-media-design',
  },
  'itu-copenhagen': {
    schoolNameZh: '哥本哈根信息技术大学',
    tuitionEn: 'Non-EU/EEA: €8,250 / semester · €33,000 total (2026)',
    tuitionZh: '非欧盟/欧洲经济区：€8,250 / 学期 · 2026 两年合计 €33,000',
    tuitionURL: 'https://en.itu.dk/Programmes/MSc-Programmes/Applying-to-a-MSc-programme/Non-EU-EOES',
  },
  aalto: {
    schoolNameZh: '阿尔托大学',
    tuitionEn: 'Non-EU/EEA: €17,000–20,000 / year · route dependent',
    tuitionZh: '非欧盟/欧洲经济区：€17,000–20,000 / 年 · 依艺术或技术方向而定',
    tuitionURL: 'https://www.aalto.fi/en/study-options/game-design-and-development-master-of-arts-art-and-design',
  },
  skovde: {
    schoolNameZh: '舍夫德大学',
    tuitionEn: 'SEK 135,000 total · latest published 60-credit Serious Games route',
    tuitionZh: '总学费 SEK 135,000 · 官网最近公布的 60 学分 Serious Games 路径',
    tuitionURL: 'https://www.his.se/en/education/game-development/serious-games-masters-programme-segma/',
  },
  'cologne-game-lab': {
    schoolNameZh: '科隆游戏实验室 · 科隆应用技术大学',
    tuitionEn: 'No tuition · €352.70 semester contribution (Winter 2026/27)',
    tuitionZh: '免学费 · 2026/27 冬季学期注册费 €352.70',
    tuitionURL: 'https://www.th-koeln.de/studium/beitraege-und-gebuehren_5343.php',
  },
  breda: {
    schoolNameZh: '布雷达应用科学大学',
    tuitionEn: '2026/27: EEA €3,650 / year · non-EEA €14,250 / year',
    tuitionZh: '2026/27：欧洲经济区 €3,650 / 年 · 非欧洲经济区 €14,250 / 年',
    tuitionURL: 'https://www.buas.nl/en/programmes/creative-media-and-game-technologies/study-costs',
  },
  abertay: {
    schoolNameZh: '阿伯泰大学',
    tuitionEn: 'International: £17,950 / year (2026/27)',
    tuitionZh: '国际学生：£17,950 / 年（2026/27）',
    tuitionURL: 'https://www.abertay.ac.uk/study-apply/money-fees-and-funding/tuition-fees/',
  },
  'usc-games': {
    schoolNameZh: '南加州大学',
    tuitionEn: 'US$75,384 / year tuition (2026/27)',
    tuitionZh: '学费 US$75,384 / 年（2026/27）',
    tuitionURL: 'https://admission.usc.edu/cost-and-financial-aid/financial-aid-and-scholarships/',
  },
  utah: {
    schoolNameZh: '犹他大学',
    tuitionEn: 'Non-resident undergraduate: US$32,932 / year tuition & fees (2026/27)',
    tuitionZh: '非居民本科：学费及必缴费用 US$32,932 / 年（2026/27）',
    tuitionURL: 'https://financialaid.utah.edu/tuition-and-fees/cost-of-attendance.php',
  },
  'nyu-game-center': {
    schoolNameZh: '纽约大学',
    tuitionEn: 'Tisch undergraduate: US$75,326 / year tuition (2026/27)',
    tuitionZh: 'Tisch 本科：学费 US$75,326 / 年（2026/27）',
    tuitionURL: 'https://bulletins.nyu.edu/undergraduate/arts/cost-attendance/',
  },
  'digipen-redmond': {
    schoolNameZh: '迪吉彭理工学院',
    tuitionEn: 'International undergraduate: US$44,260 / year (2026/27)',
    tuitionZh: '国际本科：US$44,260 / 年（2026/27）',
    tuitionURL: 'https://www.digipen.edu/admissions/tuition-and-cost',
  },
  'york-digital-media': {
    schoolNameZh: '约克大学（加拿大）',
    tuitionEn: 'International MA/MSc: CA$19,716 / year incl. compulsory fees (2026/27)',
    tuitionZh: '国际硕士：约 CA$19,716 / 年，含必缴费用（2026/27）',
    tuitionURL: 'https://www.yorku.ca/wp-content/uploads/sites/184/2023/02/york-2026-2027-grad-studies-handbook.pdf',
  },
  'sheridan-game-design': {
    schoolNameZh: '谢尔丹学院',
    tuitionEn: 'International: CA$22,575.70 for the first two semesters (2026/27 estimate)',
    tuitionZh: '国际学生：前两个学期预计 CA$22,575.70（2026/27）',
    tuitionURL: 'https://www.sheridancollege.ca/programs/bachelor-of-game-design',
  },
  ritsumeikan: {
    schoolNameZh: '立命馆大学',
    tuitionEn: 'Image Arts: ¥2,120,400 / year (AY2027 published fee)',
    tuitionZh: '映像学部：¥2,120,400 / 年（校方已公布 2027 学年费用）',
    tuitionURL: 'https://www.ritsumei.ac.jp/features/zengakkyo/eng/council/2026/page05-4.html/',
  },
  'digipen-singapore': {
    schoolNameZh: '迪吉彭理工学院新加坡校区',
    tuitionEn: 'International: S$115,366 total with subsidy · S$162,062 without subsidy',
    tuitionZh: '国际学生：获补贴总学费 S$115,366 · 无补贴总学费 S$162,062',
    tuitionURL: 'https://www.singaporetech.edu.sg/undergraduate-programmes/user-experience-and-game-design',
  },
  'rmit-games': {
    schoolNameZh: '皇家墨尔本理工大学',
    tuitionEn: 'International: AU$46,080 / year (2026)',
    tuitionZh: '国际学生：AU$46,080 / 年（2026）',
    tuitionURL: 'https://www.rmit.edu.au/content/dam/rmit/documents/staff-site/servicesandtools/finance/2026-inton-fees.pdf',
  },
  'cityu-creative-media': {
    schoolNameZh: '香港城市大学',
    tuitionEn: 'Non-local BA: HK$190,000 / year · Creative Media MA: HK$7,100 / credit (2026/27)',
    tuitionZh: '非本地本科：HK$190,000 / 年 · 创意媒体硕士：HK$7,100 / 学分（2026/27）',
    tuitionURL: 'https://www.cityu.edu.hk/sgs/tuitionfee/sf_p81.htm',
  },
  'teesside-games': {
    schoolNameZh: '提赛德大学',
    tuitionEn: 'International: £17,000 / year (2026/27)',
    tuitionZh: '国际学生：£17,000 / 年（2026/27）',
    tuitionURL: 'https://www.tees.ac.uk/undergraduate_courses/computer_games/ba_%28hons%29_games_design.cfm',
  },
  'goldsmiths-games': {
    schoolNameZh: '伦敦大学金史密斯学院',
    tuitionEn: 'International MA: £21,000 total programme fee (2026/27)',
    tuitionZh: '国际硕士：课程总学费 £21,000（2026/27）',
    tuitionURL: 'https://www.gold.ac.uk/pg/ma-computer-games-art-design/',
  },
  'ual-lcc-games': {
    schoolNameZh: '伦敦艺术大学',
    tuitionEn: 'International BA: £30,890 / year (2026/27)',
    tuitionZh: '国际本科：£30,890 / 年（2026/27）',
    tuitionURL: 'https://www.arts.ac.uk/subjects/animation-interactive-film-and-sound/undergraduate/ba-hons-games-design-lcc',
  },
  'falmouth-game-development': {
    schoolNameZh: '法尔茅斯大学',
    tuitionEn: 'International BA: £19,950 / year (2026/27)',
    tuitionZh: '国际本科：£19,950 / 年（2026/27）',
    tuitionURL: 'https://www.falmouth.ac.uk/study/undergraduate/game-development',
  },
  'staffordshire-games': {
    schoolNameZh: '斯塔福德郡大学',
    tuitionEn: 'International BA: £17,085 / year (2026/27)',
    tuitionZh: '国际本科：£17,085 / 年（2026/27）',
    tuitionURL: 'https://www.staffs.ac.uk/course/computer-games-design-bsc',
  },
  'norwich-games': {
    schoolNameZh: '诺里奇艺术大学',
    tuitionEn: 'International BA: £18,860 / year (2026/27)',
    tuitionZh: '国际本科：£18,860 / 年（2026/27）',
    tuitionURL: 'https://norwichuni.ac.uk/courses/find-your-course/ba-hons-games-art-design/',
  },
  'hertfordshire-games': {
    schoolNameZh: '赫特福德大学',
    tuitionEn: 'International BA: £17,450 / year (2026/27)',
    tuitionZh: '国际本科：£17,450 / 年（2026/27）',
    tuitionURL: 'https://www.herts.ac.uk/courses/undergraduate/ba-hons-3d-games-art-and-design',
  },
  'cmu-etc': {
    schoolNameZh: '卡内基梅隆大学',
    tuitionEn: 'ETC master: US$61,628 / year (2026/27)',
    tuitionZh: 'ETC 硕士：US$61,628 / 年（2026/27）',
    tuitionURL: 'https://etc.cmu.edu/tuition-financial-aid',
  },
  'smu-guildhall': {
    schoolNameZh: '南卫理公会大学 Guildhall',
    tuitionEn: '2026/27: US$22,487 fall + US$22,487 spring + US$14,992 summer',
    tuitionZh: '2026/27：秋季 US$22,487 + 春季 US$22,487 + 夏季 US$14,992',
    tuitionURL: 'https://www.smu.edu/businessfinance/officeoffinanceandplanning/bursar/tuition_and_fees/graduate/jay2026-2027',
  },
  'rit-games': {
    schoolNameZh: '罗切斯特理工学院',
    tuitionEn: 'Undergraduate: US$63,508 / year (2026/27)',
    tuitionZh: '本科：US$63,508 / 年（2026/27）',
    tuitionURL: 'https://www.rit.edu/admissions/tuition-and-fees',
  },
  'scad-games': {
    schoolNameZh: '萨凡纳艺术与设计学院',
    tuitionEn: 'Undergraduate: US$42,975 / year (2026/27)',
    tuitionZh: '本科：US$42,975 / 年（2026/27）',
    tuitionURL: 'https://www.scad.edu/admission/tuition-and-fees/undergraduate',
  },
  'ucsc-games': {
    schoolNameZh: '加州大学圣克鲁兹分校',
    tuitionEn: 'Non-resident tuition & fees: US$56,760 / year (2026/27)',
    tuitionZh: '非居民学费及必缴费用：US$56,760 / 年（2026/27）',
    tuitionURL: 'https://financialaid.ucsc.edu/managing-aid/budget-cost-to-attend/',
  },
  'depaul-games': {
    schoolNameZh: '德保罗大学',
    tuitionEn: 'Undergraduate: US$48,180 / year (2026/27)',
    tuitionZh: '本科：US$48,180 / 年（2026/27）',
    tuitionURL: 'https://www.depaul.edu/tuition-and-aid/undergraduate-tuition-and-fees',
  },
  'michigan-state-games': {
    schoolNameZh: '密歇根州立大学',
    tuitionEn: 'International freshman: US$22,520 / semester (2026/27)',
    tuitionZh: '国际大一：US$22,520 / 学期（2026/27）',
    tuitionURL: 'https://controller.msu.edu/student-accounts/tuition-rates-by-semester/international-undergrad-fall-spring',
  },
  'northeastern-games': {
    schoolNameZh: '东北大学（美国）',
    tuitionEn: 'Boston CAMD graduate: US$2,059 / credit (latest published rate)',
    tuitionZh: '波士顿 CAMD 研究生：US$2,059 / 学分（官网最近公布）',
    tuitionURL: 'https://camd.northeastern.edu/graduate-admissions/admitted-students/',
  },
  'polyu-ime': {
    schoolNameZh: '香港理工大学',
    tuitionEn: 'IME master: HK$264,000 total programme fee (2026/27)',
    tuitionZh: 'IME 硕士：课程总学费 HK$264,000（2026/27）',
    tuitionURL: 'https://www.polyu.edu.hk/sd/Study/TPg/Innovative-Multimedia-Entertainment',
  },
  'hkbu-game-design': {
    schoolNameZh: '香港浸会大学',
    tuitionEn: 'Non-local undergraduate: HK$190,000 / year (2026/27)',
    tuitionZh: '非本地本科：HK$190,000 / 年（2026/27）',
    tuitionURL: 'https://admissions.hkbu.edu.hk/fees-and-scholarships.html',
  },
  'mpu-media-arts': {
    schoolNameZh: '澳门理工大学',
    tuitionEn: 'Mainland/HK/TW: MOP27,300 / year · latest official international handbook',
    tuitionZh: '中国内地/港澳台：MOP27,300 / 年 · 官网最近公布的国际生手册口径',
    tuitionURL: 'https://www.mpu.edu.mo/cntfiles/upload/docs/student_corner/common/exchangestudent_handbook.pdf',
  },
  'must-digital-media': {
    schoolNameZh: '澳门科技大学',
    tuitionEn: 'Non-Macao BFA Digital Media: HK$206,000 first year (2026/27)',
    tuitionZh: '非澳门居民数字媒体艺术本科：首年 HK$206,000（2026/27）',
    tuitionURL: 'https://www.must.edu.mo/images/Admission/files/PreUBachelorFT_Non_Macao_residents_EN.pdf',
  },
  'gsa-serious-games-vr': {
    schoolNameZh: '格拉斯哥艺术学院',
    tuitionEn: 'International one-year taught master: £26,420 total (2026/27)',
    tuitionZh: '国际学生一年制授课型硕士：总学费 £26,420（2026/27）',
    tuitionURL: 'https://www.gsa.ac.uk/study-at-the-gsa/fees-finance',
  },
  'uca-games-arts': {
    schoolNameZh: '创意艺术大学',
    tuitionEn: 'International BA: £18,000 / year (2026/27)',
    tuitionZh: '国际本科：£18,000 / 年（2026/27）',
    tuitionURL: 'https://www.uca.ac.uk/study/courses/ba-games-arts/',
  },
  'portsmouth-games-design': {
    schoolNameZh: '朴茨茅斯大学',
    tuitionEn: 'International BA: £17,900 / year (2026/27)',
    tuitionZh: '国际本科：£17,900 / 年（2026/27）',
    tuitionURL: 'https://www.port.ac.uk/study/courses/undergraduate/ba-hons-computer-games-design',
  },
  'bournemouth-games-design': {
    schoolNameZh: '伯恩茅斯大学',
    tuitionEn: 'International BSc: £20,685 / year (2026/27)',
    tuitionZh: '国际本科：£20,685 / 年（2026/27）',
    tuitionURL: 'https://www.bournemouth.ac.uk/study/courses/bsc-hons-games-design',
  },
  'bcu-game-design': {
    schoolNameZh: '伯明翰城市大学',
    tuitionEn: 'International BA: £18,570 / year (2026/27)',
    tuitionZh: '国际本科：£18,570 / 年（2026/27）',
    tuitionURL: 'https://www.bcu.ac.uk/courses/game-design-ba-hons-2026-27',
  },
  'south-wales-game-art': {
    schoolNameZh: '南威尔士大学',
    tuitionEn: 'International BA: £16,800 / year (2026/27)',
    tuitionZh: '国际本科：£16,800 / 年（2026/27）',
    tuitionURL: 'https://www.southwales.ac.uk/courses/ba-hons-game-art/',
  },
}
