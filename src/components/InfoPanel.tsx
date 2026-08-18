import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, BookOpen, Clock3, ExternalLink, FileStack, GraduationCap, Home, Languages, MapPin, WalletCards, X } from 'lucide-react'
import { findCountry } from '../data/countries'
import type { LocalePack } from '../locales'
import type { CountryProfile, Language, School } from '../types'

interface InfoPanelProps {
  school: School | null
  country: CountryProfile | null
  allSchools: School[]
  language: Language
  copy: LocalePack
  onClose: () => void
  onSchoolSelect: (school: School) => void
}

export function InfoPanel({ school, country, allSchools, language, copy, onClose, onSchoolSelect }: InfoPanelProps) {
  const panelKey = school?.id ?? country?.id ?? 'empty'
  return (
    <aside className={`info-panel ${school || country ? 'has-selection' : ''}`} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={panelKey}
          className="panel-motion-wrap"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          {school ? (
            <SchoolDetail school={school} language={language} copy={copy} onClose={onClose} />
          ) : country ? (
            <CountryDetail country={country} schools={allSchools.filter((item) => item.country === country.nameEn || country.aliases.includes(item.country))} language={language} copy={copy} onClose={onClose} onSchoolSelect={onSchoolSelect} />
          ) : (
            <EmptyPanel copy={copy} language={language} schools={allSchools.slice(0, 4)} onSchoolSelect={onSchoolSelect} />
          )}
        </motion.div>
      </AnimatePresence>
    </aside>
  )
}

function PanelTop({ eyebrow, onClose, closeLabel }: { eyebrow: string; onClose: () => void; closeLabel: string }) {
  return (
    <div className="panel-topline">
      <span>{eyebrow}</span>
      <button type="button" aria-label={closeLabel} title={closeLabel} onClick={onClose}><X size={17} /></button>
    </div>
  )
}

function SchoolDetail({ school, language, copy, onClose }: { school: School; language: Language; copy: LocalePack; onClose: () => void }) {
  const city = language === 'zh' ? school.cityZh : school.city
  const country = language === 'zh' ? school.countryZh : school.country
  const tuition = language === 'zh' ? school.tuitionEstimateZh : school.tuitionEstimateEn
  const living = language === 'zh' ? school.livingCostEstimateZh : school.livingCostEstimateEn
  const description = language === 'zh' ? school.descriptionZh : school.descriptionEn
  const portfolio = language === 'zh' ? school.portfolioSummaryZh : school.portfolioSummaryEn
  const portfolioLabel = school.portfolioRequired === 'check' ? copy.checkOfficial : school.portfolioRequired ? copy.yes : copy.no
  const primaryName = language === 'zh' ? school.schoolNameZh : school.schoolName
  const secondaryName = language === 'zh' ? school.schoolName : school.schoolNameZh
  const teachingLanguage = language === 'zh'
    ? school.teachingLanguage
      .replace('Japanese / selected English support', '日语 / 部分英语支持')
      .replace('Chinese / English', '中文 / 英语')
      .replace('Chinese', '中文')
      .replace('English', '英语')
    : school.teachingLanguage
  const duration = language === 'zh'
    ? school.duration
      .replace('Varies by degree', '依学位而定')
      .replace(/(\d+(?:–\d+)?) Years?/g, '$1 年')
      .replace('by degree', '依学位')
    : school.duration

  return (
    <div className="panel-content school-detail">
      <PanelTop eyebrow={copy.schoolProfile} onClose={onClose} closeLabel={copy.close} />
      <div className="school-heading">
        <div className="school-index flag-badge" aria-label={country}><img src={`/flags/${findCountry(school.country)?.id}.svg`} alt="" /></div>
        <h2>{primaryName}</h2>
        <p className="school-alt-name">{secondaryName}</p>
        <p className="school-location"><MapPin size={15} /> {city}, {country}</p>
      </div>
      <p className="school-description">{description}</p>

      <div className="programme-block">
        <span>{copy.relevantProgramme}</span>
        <strong>{school.programName}</strong>
        <div className="tag-row">
          {school.degreeLevel.map((degree) => <span key={degree}>{copy.degreeLabels[degree]}</span>)}
          {school.field.slice(0, 3).map((field) => <span key={field}>{copy.fieldLabels[field]}</span>)}
        </div>
      </div>

      <dl className="fact-grid">
        <div className="fact-card"><dt><GraduationCap size={15} />{copy.degree}</dt><dd>{school.degreeLevel.map((degree) => copy.degreeLabels[degree]).join(' / ')}</dd></div>
        <div className="fact-card"><dt><Languages size={15} />{copy.teachingLanguage}</dt><dd>{teachingLanguage}</dd></div>
        <div className="fact-card"><dt><Clock3 size={15} />{copy.duration}</dt><dd>{duration}</dd></div>
        <div className="fact-card"><dt><FileStack size={15} />{copy.portfolioRequired}</dt><dd>{portfolioLabel}</dd></div>
        <div className="wide tuition-card">
          <dt><WalletCards size={16} />{copy.tuition}</dt>
          <dd>{tuition}</dd>
          <a href={school.tuitionURL} target="_blank" rel="noreferrer">{copy.officialFeeSource}<ArrowUpRight size={13} /></a>
        </div>
        <div className="wide living-card"><dt><Home size={15} />{copy.livingCost}</dt><dd>{living}</dd></div>
      </dl>

      <div className="portfolio-block">
        <span><FileStack size={14} /> {copy.portfolioOverview}</span>
        <p>{portfolio}</p>
      </div>

      <div className="official-links">
        <OfficialLink href={school.officialProgrammeURL} icon={<BookOpen size={15} />} label={copy.viewProgramme} />
        <OfficialLink href={school.portfolioURL} icon={<FileStack size={15} />} label={copy.portfolioRequirements} />
        <OfficialLink href={school.applicationURL} icon={<ExternalLink size={15} />} label={copy.admissionsWebsite} />
      </div>
      <p className="official-note">{copy.openOfficial}</p>
    </div>
  )
}

function OfficialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <span>{icon}{label}</span><ArrowUpRight size={15} />
    </a>
  )
}

function CountryDetail({ country, schools, language, copy, onClose, onSchoolSelect }: { country: CountryProfile; schools: School[]; language: Language; copy: LocalePack; onClose: () => void; onSchoolSelect: (school: School) => void }) {
  const name = language === 'zh' ? country.nameZh : country.nameEn
  const altName = language === 'zh' ? country.nameEn : country.nameZh
  return (
    <div className="panel-content country-detail">
      <PanelTop eyebrow={copy.countryOverview} onClose={onClose} closeLabel={copy.close} />
      <div className="country-code flag-badge" aria-label={name}><img src={`/flags/${country.id}.svg`} alt="" /></div>
      <h2>{name}</h2>
      <p className="country-alt-name">{altName}</p>
      <div className="country-rule" />
      <dl className="country-facts">
        <div><dt>{copy.region}</dt><dd>{language === 'zh' ? country.regionZh : country.regionEn}</dd></div>
        <div><dt>{copy.schools}</dt><dd>{schools.length}</dd></div>
        <div><dt>{copy.typicalTuition}</dt><dd>{language === 'zh' ? country.tuitionZh : country.tuitionEn}</dd></div>
        <div><dt>{copy.livingCost}<small>{copy.monthlyEstimate}</small></dt><dd>{language === 'zh' ? country.livingCostZh : country.livingCostEn}</dd></div>
      </dl>
      <div className="country-schools">
        <div className="section-caption">{copy.featuredSchools}</div>
        {schools.map((school, index) => (
          <button type="button" key={school.id} onClick={() => onSchoolSelect(school)}>
            <span className="list-index">{String(index + 1).padStart(2, '0')}</span>
            <span><strong>{language === 'zh' ? school.schoolNameZh : school.schoolName}</strong><small>{language === 'zh' ? school.schoolName : school.schoolNameZh} · {school.programName}</small></span>
            <ArrowUpRight size={15} />
          </button>
        ))}
      </div>
      <p className="dataset-note">{copy.datasetNote}</p>
    </div>
  )
}

function EmptyPanel({ copy, language, schools, onSchoolSelect }: { copy: LocalePack; language: Language; schools: School[]; onSchoolSelect: (school: School) => void }) {
  return (
    <div className="panel-content empty-panel">
      <div className="panel-topline"><span>{copy.exploreLabel}</span><span>00° / 000°</span></div>
      <div className="empty-orbit" aria-hidden="true"><span /><i /></div>
      <h2>{copy.explorePrompt}</h2>
      <p>{copy.datasetNote}</p>
      <div className="country-schools empty-list">
        <div className="section-caption">{copy.featuredSchools}</div>
        {schools.map((school, index) => (
          <button type="button" key={school.id} onClick={() => onSchoolSelect(school)}>
            <span className="list-index">{String(index + 1).padStart(2, '0')}</span>
            <span><strong>{language === 'zh' ? school.schoolNameZh : school.schoolName}</strong><small>{language === 'zh' ? school.schoolName : school.schoolNameZh} · {language === 'zh' ? school.cityZh : school.city}</small></span>
            <ArrowUpRight size={15} />
          </button>
        ))}
      </div>
    </div>
  )
}
