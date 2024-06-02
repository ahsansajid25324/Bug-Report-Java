import React, { Component } from 'react';

export default class FooterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const footerStyle = {
      
      bottom: '0',
      position: 'fixed',
      width: '100%',
      height: '50px',
      backgroundColor: '#f8f9fa', // Very light grey background color
      textAlign: 'center',
      color: 'white', // Text color set to white
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    return (
      <div>
        <footer className='footer' style={footerStyle}>
          <span className='text-muted'> Developed by RASM </span>
        </footer>
      </div>
    );
  }
}
