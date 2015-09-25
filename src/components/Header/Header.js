import React from 'react';

import withStyles from '../../decorators/withStyles';
import Link from '../Link';

import Navigation from '../Navigation';
import styles from './Header.css';

var body, html;
var didScroll = false;
var lastScrollTop = 0, navbarHeight = 0, height = 0;
var headerInterval = null;
const DELTA = 80;

@withStyles(styles) class Header extends React.Component {
  // Hide Header on on scroll down
  componentDidMount() {
    body = document.body;
    html = document.documentElement;
    navbarHeight = document.getElementById('header').offsetHeight;

    window.onscroll = function() {
      didScroll = true;
    };

    headerInterval = setInterval(() => {
      if(didScroll) {
        this.hasScrolled();
        didScroll = false;
      }
    }, 250);
  }

  hasScrolled() {
    height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    let scrollTop = window.scrollY || window.pageYOffset;

    if(Math.abs(lastScrollTop - scrollTop) <= DELTA)
      return;

    if(scrollTop > lastScrollTop && scrollTop > navbarHeight) {
      // Scroll Down
      document.querySelector('.Header').classList.add('Header--up');
    } else {
      // Scroll Up
      if(scrollTop + window.innerHeight < height) {
        document.querySelector('.Header').classList.remove('Header--up');
      }
    }

    lastScrollTop = scrollTop;
    /*console.log('ls: ' + lastScrollTop)
     console.log('st: ' + (scrollTop + window.innerHeight))
     console.log('he: ' + height)*/
  }

  componentWillUnmount() {
    clearInterval(headerInterval);
  }

  render() {
    return (
      <header id="header" className="Header" data-scroll-header>
        <div className="Header-container row">
          <div className="columns">
            <div className="Header-brand small-6 columns">
              <a className="" href="/" onClick={Link.handleClick}>
                <img className="Header-brandImg" src={require('./title.png')} width="205" height="27"
                     alt="PaulGraffix" />
                {/*<span className="Header-brandTxt">PaulGraffix</span>*/}
              </a>
            </div>
            <Navigation className="Header-nav text-right small-6 columns" />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
