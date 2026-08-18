import { useEffect, useMemo, useState } from 'react'
import { Filters, MobileFilters } from './components/Filters'
import { GlobeView } from './components/GlobeView'
import { InfoPanel } from './components/InfoPanel'
import { LanguageSwitch } from './components/LanguageSwitch'
import { SearchBar } from './components/SearchBar'
import { countries } from './data/countries'
import { schools } from './data/schools'
import { locales } from './locales'
import type { CountryProfile, DegreeLevel, Field, FilterState, GlobeTarget, Language, Region, School } from './types'

const emptyFilters: FilterState = { degree: [], region: [], field: [] }

function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [filters, setFilters] = useState<FilterState>(emptyFilters)
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<CountryProfile | null>(null)
  const [target, setTarget] = useState<GlobeTarget>({ latitude: 22, longitude: 0, altitude: 2.15, token: 0 })
  const copy = locales[language]

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
  }, [language])

  const filteredSchools = useMemo(() => schools.filter((school) => {
    const degreeMatch = filters.degree.length === 0 || filters.degree.some((degree) => school.degreeLevel.includes(degree))
    const regionMatch = filters.region.length === 0 || filters.region.includes(school.region)
    const fieldMatch = filters.field.length === 0 || filters.field.some((field) => school.field.includes(field))
    return degreeMatch && regionMatch && fieldMatch
  }), [filters])

  useEffect(() => {
    if (selectedSchool && !filteredSchools.some((school) => school.id === selectedSchool.id)) {
      setSelectedSchool(null)
    }
    if (selectedCountry && !filteredSchools.some((school) =>
      selectedCountry.aliases.includes(school.country) || school.country === selectedCountry.nameEn,
    )) {
      setSelectedCountry(null)
    }
  }, [filteredSchools, selectedCountry, selectedSchool])

  const focusSchool = (school: School) => {
    setSelectedSchool(school)
    setSelectedCountry(null)
    setTarget({ latitude: school.latitude, longitude: school.longitude, altitude: 0.62, token: Date.now() })
  }

  const focusCountry = (country: CountryProfile) => {
    setSelectedSchool(null)
    setSelectedCountry(country)
    const altitude = country.id === 'usa' || country.id === 'canada' || country.id === 'australia' ? 1.1 : 0.82
    setTarget({ latitude: country.latitude, longitude: country.longitude, altitude, token: Date.now() })
  }

  const toggleFilter = (group: keyof FilterState, value: DegreeLevel | Region | Field) => {
    setFilters((current) => {
      const groupValues = current[group] as string[]
      const nextValues = groupValues.includes(value) ? groupValues.filter((item) => item !== value) : [...groupValues, value]
      return { ...current, [group]: nextValues }
    })
  }

  const clearSelection = () => {
    setSelectedSchool(null)
    setSelectedCountry(null)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true"><span /><i /></div>
          <div>
            <span className="brand-eyebrow">{copy.navEyebrow}</span>
            <h1 className="brand-long"><span>{copy.titleLineOne}</span>{copy.titleLineTwo}</h1>
            <h1 className="brand-short">{copy.titleShort}</h1>
          </div>
        </div>
        <SearchBar schools={schools} language={language} copy={copy} onSchoolSelect={focusSchool} onCountrySelect={focusCountry} />
        <LanguageSwitch language={language} onChange={setLanguage} />
      </header>

      <Filters filters={filters} copy={copy} count={filteredSchools.length} onToggle={toggleFilter} onClear={() => setFilters(emptyFilters)} />
      <MobileFilters filters={filters} copy={copy} count={filteredSchools.length} onToggle={toggleFilter} onClear={() => setFilters(emptyFilters)} />

      <GlobeView
        schools={filteredSchools}
        selectedSchool={selectedSchool}
        selectedCountry={selectedCountry}
        target={target}
        language={language}
        copy={copy}
        onSchoolSelect={focusSchool}
        onCountrySelect={focusCountry}
      />

      <div className="atlas-caption">
        <span>LAT 22.0000°</span><span>LNG 0.0000°</span>
        <strong>{String(filteredSchools.length).padStart(2, '0')} / {schools.length}</strong>
      </div>

      <InfoPanel
        school={selectedSchool}
        country={selectedCountry}
        allSchools={schools}
        language={language}
        copy={copy}
        onClose={clearSelection}
        onSchoolSelect={focusSchool}
      />

      <div className="mobile-panel-wrap">
        {(selectedSchool || selectedCountry) && (
          <InfoPanel
            school={selectedSchool}
            country={selectedCountry}
            allSchools={schools}
            language={language}
            copy={copy}
            onClose={clearSelection}
            onSchoolSelect={focusSchool}
          />
        )}
      </div>

      <footer className="footer-line">
        <span>GAME DESIGN / ART / DEVELOPMENT / INTERACTIVE MEDIA</span>
        <span>{countries.length} COUNTRIES · {schools.length} SCHOOLS</span>
      </footer>
    </main>
  )
}

export default App
