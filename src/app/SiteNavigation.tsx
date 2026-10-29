import { NavLink } from 'react-router-dom'

export function SiteNavigation() {
  return <nav className="site-navigation gl" aria-label="Main navigation"><NavLink to="/">Explore 360°</NavLink><NavLink to="/discover">Discover</NavLink></nav>
}
