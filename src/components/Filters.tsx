import { RotateCcw, SlidersHorizontal } from 'lucide-react'
import { degreeOptions, fieldOptions, regionOptions } from '../data/schools'
import type { LocalePack } from '../locales'
import type { DegreeLevel, Field, FilterState, Region } from '../types'

interface FiltersProps {
  filters: FilterState
  copy: LocalePack
  count: number
  onToggle: (group: keyof FilterState, value: DegreeLevel | Region | Field) => void
  onClear: () => void
}

const hasFilters = (filters: FilterState) => Object.values(filters).some((values) => values.length > 0)

export function Filters({ filters, copy, count, onToggle, onClear }: FiltersProps) {
  return (
    <aside className="filters-panel">
      <div className="filters-heading">
        <span><SlidersHorizontal size={15} /> {copy.filters}</span>
        <span className="dataset-index">01—03</span>
      </div>
      <FilterGroup title={copy.degree} options={degreeOptions} selected={filters.degree} labels={copy.degreeLabels} group="degree" onToggle={onToggle} />
      <FilterGroup title={copy.region} options={regionOptions} selected={filters.region} labels={copy.regionLabels} group="region" onToggle={onToggle} />
      <FilterGroup title={copy.field} options={fieldOptions} selected={filters.field} labels={copy.fieldLabels} group="field" onToggle={onToggle} />
      <div className="filters-footer">
        <strong>{copy.schoolsFound(count)}</strong>
        <button type="button" onClick={onClear} disabled={!hasFilters(filters)}>
          <RotateCcw size={13} /> {copy.clearFilters}
        </button>
      </div>
    </aside>
  )
}

interface FilterGroupProps<T extends string> {
  title: string
  options: readonly T[]
  selected: T[]
  labels: Record<T, string>
  group: keyof FilterState
  onToggle: FiltersProps['onToggle']
}

function FilterGroup<T extends DegreeLevel | Region | Field>({ title, options, selected, labels, group, onToggle }: FilterGroupProps<T>) {
  return (
    <fieldset className="filter-group">
      <legend>{title}</legend>
      <div className="filter-options">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            className={selected.includes(option) ? 'selected' : ''}
            aria-pressed={selected.includes(option)}
            onClick={() => onToggle(group, option)}
          >
            <span className="filter-dot" />{labels[option]}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

export function MobileFilters({ filters, copy, count, onToggle, onClear }: FiltersProps) {
  const chips = [
    ...degreeOptions.map((value) => ({ group: 'degree' as const, value, label: copy.degreeLabels[value] })),
    ...regionOptions.map((value) => ({ group: 'region' as const, value, label: copy.regionLabels[value] })),
    ...fieldOptions.map((value) => ({ group: 'field' as const, value, label: copy.fieldLabels[value] })),
  ]
  return (
    <div className="mobile-filters-wrap">
      <div className="mobile-filter-meta">
        <span>{copy.schoolsFound(count)}</span>
        {hasFilters(filters) && <button type="button" onClick={onClear}>{copy.clearFilters}</button>}
      </div>
      <div className="mobile-filters" aria-label={copy.filters}>
        {chips.map((chip) => {
          const active = (filters[chip.group] as string[]).includes(chip.value)
          return (
            <button key={`${chip.group}-${chip.value}`} type="button" className={active ? 'selected' : ''} onClick={() => onToggle(chip.group, chip.value)}>
              {chip.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
