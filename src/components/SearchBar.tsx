import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { countries, findCountry } from '../data/countries'
import type { LocalePack } from '../locales'
import type { CountryProfile, Language, School } from '../types'

type SearchResult =
  | { kind: 'school'; item: School }
  | { kind: 'country'; item: CountryProfile }

interface SearchBarProps {
  schools: School[]
  language: Language
  copy: LocalePack
  onSchoolSelect: (school: School) => void
  onCountrySelect: (country: CountryProfile) => void
}

export function SearchBar({ schools, language, copy, onSchoolSelect, onCountrySelect }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const results = useMemo<SearchResult[]>(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return schools.slice(0, 4).map((item) => ({ kind: 'school', item }))

    const schoolResults: SearchResult[] = schools
      .filter((school) =>
        [
          school.schoolName,
          school.schoolNameZh,
          school.programName,
          school.country,
          school.countryZh,
          school.city,
          school.cityZh,
          school.region,
          ...(school.searchAliases ?? []),
        ].some((value) => value.toLowerCase().includes(normalized)),
      )
      .slice(0, 6)
      .map((item) => ({ kind: 'school', item }))

    const countryResults: SearchResult[] = countries
      .filter((country) =>
        [country.nameEn, country.nameZh, country.regionEn, country.regionZh, ...country.aliases]
          .some((value) => value.toLowerCase().includes(normalized)),
      )
      .slice(0, 3)
      .map((item) => ({ kind: 'country', item }))

    return [...countryResults, ...schoolResults].slice(0, 7)
  }, [query, schools])

  const chooseResult = (result: SearchResult) => {
    if (result.kind === 'school') {
      onSchoolSelect(result.item)
      setQuery(language === 'zh' ? result.item.schoolNameZh : result.item.schoolName)
    } else {
      onCountrySelect(result.item)
      setQuery(language === 'zh' ? result.item.nameZh : result.item.nameEn)
    }
    setIsOpen(false)
  }

  return (
    <div className="search-wrap" role="search">
      <div className={`search-field ${isOpen ? 'is-open' : ''}`}>
        <Search size={18} strokeWidth={1.7} aria-hidden="true" />
        <input
          aria-label={copy.searchPlaceholder}
          value={query}
          placeholder={copy.searchPlaceholder}
          onChange={(event) => { setQuery(event.target.value); setIsOpen(true) }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => window.setTimeout(() => setIsOpen(false), 160)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && results[0]) chooseResult(results[0])
            if (event.key === 'Escape') setIsOpen(false)
          }}
        />
        {query ? (
          <button
            className="search-clear"
            type="button"
            aria-label={copy.clearFilters}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => { setQuery(''); setIsOpen(true) }}
          >
            <X size={16} />
          </button>
        ) : <kbd>⌘ K</kbd>}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="search-results"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
          >
            <div className="search-results-heading">{query ? copy.schoolsFound(results.length) : copy.featuredSchools}</div>
            {results.length > 0 ? results.map((result) => {
              const isSchool = result.kind === 'school'
              const title = isSchool
                ? language === 'zh' ? result.item.schoolNameZh : result.item.schoolName
                : language === 'zh' ? result.item.nameZh : result.item.nameEn
              const meta = isSchool
                ? `${language === 'zh' ? result.item.schoolName : result.item.schoolNameZh} · ${language === 'zh' ? result.item.cityZh : result.item.city}, ${language === 'zh' ? result.item.countryZh : result.item.country}`
                : language === 'zh' ? result.item.regionZh : result.item.regionEn
              const flagId = isSchool ? findCountry(result.item.country)?.id : result.item.id
              return (
                <button
                  type="button"
                  key={`${result.kind}-${result.item.id}`}
                  className="search-result"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => chooseResult(result)}
                >
                  <span className="result-icon flag-result" aria-hidden="true">{flagId && <img src={`/flags/${flagId}.svg`} alt="" />}</span>
                  <span><strong>{title}</strong><small>{meta}</small></span>
                  <ArrowUpRight size={15} className="result-arrow" />
                </button>
              )
            }) : (
              <div className="no-results">{copy.noSearchResults}</div>
            )}
            {!query && <div className="search-tip">{copy.searchHint}</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
