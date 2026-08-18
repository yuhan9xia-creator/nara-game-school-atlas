import type { Language } from '../types'

interface LanguageSwitchProps {
  language: Language
  onChange: (language: Language) => void
}

export function LanguageSwitch({ language, onChange }: LanguageSwitchProps) {
  return (
    <div className="language-switch" aria-label="Language / 语言">
      <button className={language === 'zh' ? 'active' : ''} onClick={() => onChange('zh')} type="button">
        中文
      </button>
      <span aria-hidden="true" />
      <button className={language === 'en' ? 'active' : ''} onClick={() => onChange('en')} type="button">
        EN
      </button>
    </div>
  )
}
