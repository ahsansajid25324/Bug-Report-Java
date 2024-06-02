import React, { Component } from 'react';

export default class HeaderComponent extends Component {
  constructor(props){
    super(props)

    this.state={
      isMenuOpen: false // State to control mobile menu visibility
    }
  }

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  render() {
    const { isMenuOpen } = this.state;
    return (
      <div>
        <header>
          <nav style={{ backgroundColor: '#333', color: 'white', padding: '10px 20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} className='navbar navbar-expand-md navbar-dark bg-dark'>
            <div className="container">
              <a href='https://javaguides.net' className='navbar-brand'>Bugs Reporting System</a>
              {/* Responsive Hamburger Menu Icon */}
              <button className="navbar-toggler" type="button" onClick={this.toggleMenu}>
                <span className="navbar-toggler-icon"></span>
              </button>
              {/* Menu Items */}
              <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/addBug">Add Bug</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/recordBug">Bugs Record</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    )
  }
}
