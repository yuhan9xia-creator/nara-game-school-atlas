import { Minus, Plus, RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import { MeshPhongMaterial } from 'three'
import { feature } from 'topojson-client'
import world from 'world-atlas/countries-110m.json'
import { countries, findCountry, getCountryFlagAsset } from '../data/countries'
import type { LocalePack } from '../locales'
import type { CountryProfile, GlobeTarget, Language, School } from '../types'

interface GlobeViewProps {
  schools: School[]
  selectedSchool: School | null
  selectedCountry: CountryProfile | null
  target: GlobeTarget
  language: Language
  copy: LocalePack
  onSchoolSelect: (school: School) => void
  onCountrySelect: (country: CountryProfile) => void
}

interface CountryFeature {
  type: 'Feature'
  properties: { name?: string }
  geometry: unknown
}

type GlobeHtmlDatum =
  | { kind: 'school'; id: string; latitude: number; longitude: number; school: School }
  | { kind: 'country'; id: string; latitude: number; longitude: number; country: CountryProfile }
  | { kind: 'focus'; id: string; latitude: number; longitude: number; focusType: 'country' | 'school' }

const countryFlagOffsets: Record<string, { x: number; y: number }> = {
  denmark: { x: -6, y: -48 },
  finland: { x: 44, y: -40 },
  sweden: { x: 24, y: -58 },
  germany: { x: 34, y: 9 },
  netherlands: { x: -18, y: 8 },
  'united-kingdom': { x: -38, y: -32 },
  usa: { x: -18, y: -34 },
  canada: { x: 24, y: -44 },
  japan: { x: 23, y: -30 },
  singapore: { x: 16, y: 8 },
  australia: { x: 4, y: -26 },
  'hong-kong': { x: 24, y: -30 },
  macao: { x: -22, y: 12 },
}

const featuredSchoolIds = new Set([
  'royal-danish-academy', 'aalto', 'breda', 'abertay', 'teesside-games', 'ual-lcc-games',
  'gsa-serious-games-vr', 'uca-games-arts',
  'usc-games', 'nyu-game-center', 'cmu-etc', 'smu-guildhall',
  'polyu-ime', 'hkbu-game-design', 'must-digital-media', 'digipen-singapore', 'rmit-games',
])

const getSchoolAccent = (school: School) => {
  if (school.region === 'Europe') return '#ff6b6b'
  if (school.region === 'Asia') return '#70dfc1'
  if (school.region === 'Oceania') return '#f1c658'
  return '#789fff'
}

export function GlobeView({ schools, selectedSchool, selectedCountry, target, language, copy, onSchoolSelect, onCountrySelect }: GlobeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<any>(null)
  const [size, setSize] = useState({ width: 900, height: 760 })
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [hoveredSchool, setHoveredSchool] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const globeMaterial = useMemo(() => new MeshPhongMaterial({
    color: '#173f57',
    emissive: '#061722',
    emissiveIntensity: 0.16,
    shininess: 34,
  }), [])

  const countryFeatures = useMemo(() => {
    const collection = feature(
      world as never,
      (world as { objects: { countries: never } }).objects.countries,
    ) as unknown as { features: CountryFeature[] }
    return collection.features.filter((item) => item.properties?.name !== 'Antarctica')
  }, [])
  const visibleCountries = useMemo(() => countries.filter((country) =>
    schools.some((school) => country.aliases.includes(school.country) || school.country === country.nameEn),
  ), [schools])
  const hoveredSchoolItem = schools.find((school) => school.id === hoveredSchool) ?? null
  const ringTarget = selectedSchool ?? selectedCountry ?? hoveredSchoolItem
  const htmlItems = useMemo<GlobeHtmlDatum[]>(() => {
    const countryItems: GlobeHtmlDatum[] = visibleCountries.map((country) => ({
      kind: 'country', id: `country-flag-${country.id}`, latitude: country.latitude, longitude: country.longitude, country,
    }))
    const schoolItems: GlobeHtmlDatum[] = schools.map((school) => ({
      kind: 'school', id: school.id, latitude: school.latitude, longitude: school.longitude, school,
    }))
    const focus = selectedCountry
      ? { kind: 'focus' as const, id: `focus-country-${selectedCountry.id}`, latitude: selectedCountry.latitude, longitude: selectedCountry.longitude, focusType: 'country' as const }
      : selectedSchool
        ? { kind: 'focus' as const, id: `focus-school-${selectedSchool.id}`, latitude: selectedSchool.latitude, longitude: selectedSchool.longitude, focusType: 'school' as const }
        : null
    return focus ? [...countryItems, ...schoolItems, focus] : [...countryItems, ...schoolItems]
  }, [schools, selectedCountry, selectedSchool, visibleCountries])

  const isCountryActive = (profile: CountryProfile | undefined) => Boolean(profile && schools.some((school) =>
    profile.aliases.includes(school.country) || school.country === profile.nameEn,
  ))

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: Math.max(1, entry.contentRect.width), height: Math.max(1, entry.contentRect.height) })
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!ready || !globeRef.current) return
    globeRef.current.pointOfView(
      { lat: target.latitude, lng: target.longitude, altitude: target.altitude },
      1450,
    )
    const controls = globeRef.current.controls()
    if (controls) controls.autoRotate = false
  }, [target, ready])

  const stopRotation = () => {
    const controls = globeRef.current?.controls?.()
    if (controls) controls.autoRotate = false
  }

  const adjustZoom = (delta: number) => {
    const current = globeRef.current?.pointOfView?.()
    if (!current) return
    stopRotation()
    globeRef.current.pointOfView({ ...current, altitude: Math.min(3.2, Math.max(0.35, current.altitude + delta)) }, 450)
  }

  const resetView = () => {
    stopRotation()
    globeRef.current?.pointOfView({ lat: 24, lng: 5, altitude: 2.15 }, 900)
  }

  return (
    <section className="globe-stage" ref={containerRef} onPointerDown={stopRotation} aria-label="Interactive 3D university globe">
      <div className="globe-vignette" aria-hidden="true" />
      <Globe
        key={language}
        ref={globeRef}
        width={size.width}
        height={size.height}
        backgroundColor="rgba(0,0,0,0)"
        showGlobe
        globeMaterial={globeMaterial}
        showAtmosphere
        atmosphereColor="#72cfc4"
        atmosphereAltitude={0.13}
        showGraticules
        polygonsData={countryFeatures}
        polygonAltitude={(polygon) => {
          const name = (polygon as CountryFeature).properties?.name ?? ''
          return selectedCountry?.aliases.includes(name) ? 0.064 : hoveredCountry === name ? 0.018 : 0.008
        }}
        polygonCapColor={(polygon) => {
          const name = (polygon as CountryFeature).properties?.name ?? ''
          const active = isCountryActive(findCountry(name))
          if (selectedCountry?.aliases.includes(name)) return 'rgba(241, 198, 82, 0.99)'
          if (hoveredCountry === name) return 'rgba(111, 222, 194, 0.98)'
          return active ? 'rgba(46, 91, 112, 0.98)' : 'rgba(27, 61, 78, 0.97)'
        }}
        polygonSideColor={(polygon) => {
          const name = (polygon as CountryFeature).properties?.name ?? ''
          return selectedCountry?.aliases.includes(name) ? 'rgba(141, 105, 38, 0.92)' : 'rgba(11, 39, 53, 0.96)'
        }}
        polygonStrokeColor={(polygon) => {
          const name = (polygon as CountryFeature).properties?.name ?? ''
          if (selectedCountry?.aliases.includes(name)) return 'rgba(255, 239, 173, 1)'
          if (hoveredCountry === name) return 'rgba(220, 255, 246, 0.99)'
          return isCountryActive(findCountry(name)) ? 'rgba(112, 184, 181, 0.6)' : 'rgba(72, 119, 128, 0.32)'
        }}
        polygonLabel={(polygon) => {
          const name = (polygon as CountryFeature).properties?.name ?? ''
          const profile = findCountry(name)
          if (!isCountryActive(profile)) return ''
          const displayName = language === 'zh' ? profile!.nameZh : profile!.nameEn
          const count = schools.filter((school) => profile?.aliases.includes(school.country) || school.country === name).length
          return `<div class="map-tooltip"><strong><img class="country-flag-inline" src="/flags/${profile!.id}.svg" alt="">${displayName}</strong><span>${count} ${count === 1 ? 'school' : 'schools'}</span></div>`
        }}
        onPolygonHover={(polygon) => {
          const name = polygon ? (polygon as CountryFeature).properties?.name ?? '' : ''
          setHoveredCountry(name && isCountryActive(findCountry(name)) ? name : null)
        }}
        onPolygonClick={(polygon) => {
          const profile = findCountry((polygon as CountryFeature).properties?.name ?? '')
          if (profile && isCountryActive(profile)) onCountrySelect(profile)
        }}
        labelsData={visibleCountries}
        labelLat={(item) => (item as CountryProfile).latitude}
        labelLng={(item) => (item as CountryProfile).longitude}
        labelText={(item) => language === 'zh' ? (item as CountryProfile).nameZh : (item as CountryProfile).nameEn}
        labelColor={(item) => selectedCountry?.id === (item as CountryProfile).id ? '#ffffff' : 'rgba(240, 248, 247, 0.96)'}
        labelSize={(item) => selectedCountry?.id === (item as CountryProfile).id ? 0.96 : 0.72}
        labelDotRadius={0.12}
        labelAltitude={0.026}
        labelResolution={2}
        onLabelClick={(item) => onCountrySelect(item as CountryProfile)}
        pointsData={schools}
        pointLat={(point) => (point as School).latitude}
        pointLng={(point) => (point as School).longitude}
        pointAltitude={(point) => (point as School).id === selectedSchool?.id ? 0.12 : 0.055}
        pointRadius={(point) => (point as School).id === selectedSchool?.id ? 0.76 : hoveredSchool === (point as School).id ? 0.58 : 0.39}
        pointColor={(point) => (point as School).id === selectedSchool?.id ? '#ffffff' : getSchoolAccent(point as School)}
        pointLabel={(point) => {
          const school = point as School
          const primaryName = language === 'zh' ? school.schoolNameZh : school.schoolName
          const secondaryName = language === 'zh' ? school.schoolName : school.schoolNameZh
          return `<div class="map-tooltip school-tooltip"><strong><img class="country-flag-inline" src="${getCountryFlagAsset(school.country)}" alt="">${primaryName}</strong><span>${secondaryName}</span><span>${language === 'zh' ? school.cityZh : school.city} · ${school.programName}</span></div>`
        }}
        onPointHover={(point) => setHoveredSchool(point ? (point as School).id : null)}
        onPointClick={(point) => onSchoolSelect(point as School)}
        htmlElementsData={htmlItems}
        htmlLat={(item) => (item as GlobeHtmlDatum).latitude}
        htmlLng={(item) => (item as GlobeHtmlDatum).longitude}
        htmlAltitude={(item) => {
          const datum = item as GlobeHtmlDatum
          if (datum.kind === 'focus') return datum.focusType === 'country' ? 0.15 : 0.2
          if (datum.kind === 'country') return selectedCountry?.id === datum.country.id ? 0.18 : 0.115
          return datum.school.id === selectedSchool?.id ? 0.17 : 0.1
        }}
        htmlTransitionDuration={650}
        htmlElement={(item) => {
          const datum = item as GlobeHtmlDatum
          if (datum.kind === 'country') {
            const { country } = datum
            const offset = countryFlagOffsets[country.id] ?? { x: 0, y: -28 }
            const countryName = language === 'zh' ? country.nameZh : country.nameEn
            const root = document.createElement('div')
            root.className = `country-flag-marker${selectedCountry?.id === country.id ? ' is-selected' : ''}`
            root.style.setProperty('--flag-shift-x', `${offset.x}px`)
            root.style.setProperty('--flag-shift-y', `${offset.y}px`)

            const button = document.createElement('button')
            button.type = 'button'
            button.className = 'country-flag-button'
            button.setAttribute('aria-label', countryName)
            button.title = countryName

            const flag = document.createElement('img')
            flag.className = 'country-flag-symbol'
            flag.src = `/flags/${country.id}.svg`
            flag.alt = ''
            const name = document.createElement('span')
            name.className = 'country-flag-name'
            name.textContent = countryName
            button.append(flag, name)
            root.append(button)

            button.addEventListener('pointerdown', (event) => event.stopPropagation())
            button.addEventListener('click', (event) => {
              event.stopPropagation()
              onCountrySelect(country)
            })
            return root
          }

          if (datum.kind === 'focus') {
            const root = document.createElement('div')
            root.className = `selection-particles is-${datum.focusType}`
            root.setAttribute('aria-hidden', 'true')
            const halo = document.createElement('span')
            halo.className = 'selection-halo'
            root.append(halo)
            for (let index = 0; index < 14; index += 1) {
              const particle = document.createElement('i')
              particle.style.setProperty('--particle-angle', `${index * (360 / 14)}deg`)
              particle.style.setProperty('--particle-delay', `${-(index % 7) * 0.19}s`)
              particle.style.setProperty('--particle-distance', `${34 + (index % 4) * 8}px`)
              root.append(particle)
            }
            return root
          }

          const school = datum.school
          const isSelected = school.id === selectedSchool?.id
          const root = document.createElement('div')
          root.className = `school-html-marker${isSelected ? ' is-selected' : ''}${featuredSchoolIds.has(school.id) ? ' is-featured' : ''}`
          root.style.setProperty('--marker-accent', getSchoolAccent(school))

          const button = document.createElement('button')
          button.type = 'button'
          button.className = 'school-map-target'
          button.setAttribute('aria-label', `${school.schoolName} — ${school.programName}`)

          const marker = document.createElement('span')
          marker.className = 'school-marker-core'
          marker.append(document.createElement('i'))

          const label = document.createElement('span')
          label.className = 'school-map-label'
          const name = document.createElement('strong')
          const schoolFlag = document.createElement('img')
          schoolFlag.className = 'school-map-name-flag'
          schoolFlag.src = getCountryFlagAsset(school.country)
          schoolFlag.alt = ''
          name.append(schoolFlag, document.createTextNode(language === 'zh' ? school.schoolNameZh : school.schoolName))
          const alternateName = document.createElement('em')
          alternateName.textContent = language === 'zh' ? school.schoolName : school.schoolNameZh
          const meta = document.createElement('small')
          const city = language === 'zh' ? school.cityZh : school.city
          meta.textContent = `${city} · ${copy.degreeLabels[school.degreeLevel[0]]}`
          label.append(name, alternateName, meta)
          button.append(marker, label)
          root.append(button)

          button.addEventListener('pointerdown', (event) => event.stopPropagation())
          button.addEventListener('click', (event) => {
            event.stopPropagation()
            onSchoolSelect(school)
          })
          button.addEventListener('mouseenter', () => setHoveredSchool(school.id))
          button.addEventListener('mouseleave', () => setHoveredSchool(null))
          return root
        }}
        ringsData={ringTarget ? [ringTarget] : []}
        ringLat={(point) => (point as School | CountryProfile).latitude}
        ringLng={(point) => (point as School | CountryProfile).longitude}
        ringColor={() => selectedCountry
          ? ['rgba(242, 200, 83, 0.98)', 'rgba(112, 203, 178, 0.05)']
          : selectedSchool
            ? ['rgba(242, 200, 83, 0.98)', 'rgba(112, 203, 178, 0.06)']
            : ['rgba(112, 223, 193, 0.68)', 'rgba(112, 223, 193, 0.01)']}
        ringMaxRadius={selectedCountry ? 7.4 : selectedSchool ? 5.4 : 3.4}
        ringPropagationSpeed={selectedCountry ? 2.55 : selectedSchool ? 3.35 : 2.1}
        ringRepeatPeriod={selectedCountry ? 620 : selectedSchool ? 470 : 820}
        onGlobeReady={() => {
          const controls = globeRef.current?.controls?.()
          if (controls) {
            controls.autoRotate = true
            controls.autoRotateSpeed = 0.42
            controls.enableDamping = true
            controls.dampingFactor = 0.07
            controls.minDistance = 110
            controls.maxDistance = 540
          }
          globeRef.current?.pointOfView({ lat: 22, lng: 0, altitude: 2.15 }, 0)
          setReady(true)
        }}
      />

      <div className="globe-data-strip" aria-hidden="true">
        <span>{copy.mapLayer}</span>
        <strong>{copy.programmeSignals}</strong>
        <small>{copy.visibleLabels}</small>
      </div>
      <div className="signal-legend" aria-hidden="true">
        <span><i className="signal-eu" />{copy.regionLabels.Europe}</span>
        <span><i className="signal-na" />{copy.regionLabels['North America']}</span>
        <span><i className="signal-as" />{copy.regionLabels.Asia}</span>
        <span><i className="signal-oc" />{copy.regionLabels.Oceania}</span>
      </div>

      <div className="globe-status" aria-live="polite">
        <span className="status-dot" />
        <span>{copy.globeHelp}</span>
      </div>
      <div className="globe-controls" aria-label="Globe controls">
        <button type="button" aria-label={copy.zoomIn} title={copy.zoomIn} onClick={() => adjustZoom(-0.28)}><Plus size={17} /></button>
        <button type="button" aria-label={copy.zoomOut} title={copy.zoomOut} onClick={() => adjustZoom(0.28)}><Minus size={17} /></button>
        <button type="button" aria-label={copy.resetView} title={copy.resetView} onClick={resetView}><RotateCcw size={16} /></button>
      </div>
    </section>
  )
}
