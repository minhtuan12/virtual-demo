import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function SiteNavigation() {
  const { t } = useTranslation()
  return <nav className="site-navigation gl" aria-label={t('discover.nav.label')}><NavLink to="/">{t('discover.nav.explore')}</NavLink><NavLink to="/discover">{t('discover.nav.discover')}</NavLink></nav>
}
