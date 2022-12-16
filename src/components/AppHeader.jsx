import { NavLink } from 'react-router-dom'
import logoAirbnb from '../assets/img/airbna-logo.png'
export const AppHeader = () => {
  return (
    <section className="app-header main-layout full">
      <div className="layout-container">
        <img className='logo-img' src={logoAirbnb} alt="" />
        <nav className="navbar">
          <NavLink end to="/" >Home</NavLink>
          {/* <NavLink to="/about">About</NavLink> */}
        </nav>
      </div>
    </section>
  )
}
