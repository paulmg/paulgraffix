import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import styles from './ProjectWrapper.css';

import ProjectImage from '../ProjectImage';
import ProjectInfo from '../ProjectInfo';

@withStyles(styles) class ProjectWrapper extends React.Component {
  static propTypes = {
    project: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
    id: React.PropTypes.number.isRequired,
    active: React.PropTypes.string
  };

  componentDidMount() {
    this.wrapper = this.refs.projectWrapperContainer;
  }

  handleClick() {
    this.props.onClick(this);
  }

  handleClose() {
    this.props.closeClick(this);
  }

  handleNext() {
    this.props.nextClick(this);
  }

  handlePrev() {
    this.props.prevClick(this);
  }

  handleUp() {
    console.log(this.wrapper)
    this.scrollToTop(this.wrapper)
  }

  scrollToTop(el) {
    TweenLite.to(el, 0.8, {
      scrollTo: {
        y: 0
      },
      onComplete: () => {
        //itemContainer.style.overflow = 'hidden';
      },
      ease: Power2.easeOut
    });
  }

  render() {
    let src = this.props.project.thumb;
    let id = this.props.id;

    function svgMarkup() {
      return {
        __html: '<svg class="ProjectWrapper-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' +
        'viewBox="0 0 1920 500" preserveAspectRatio="xMidYMid slice"><defs><clipPath id="clipPath' + id +
        '"><circle id="clip" class="clip" cx="960" cy="250" r="992"></circle></clipPath></defs><image clip-path="url(#clipPath' + id +
        ')" width="1920" height="500" xlink:href="' + src + '"}></image></svg>'
      };
    }

    return (
      <li className={classNames(this.props.active, 'ProjectWrapper')}>
        <a className="close button-fixed button-top button-right" onClick={this.handleClose.bind(this)}><img src={require('./svg/close.svg')}/></a>
        <a className="prev button-fixed button-side button-left" onClick={this.handlePrev.bind(this)}><img src={require('./svg/left.svg')}/></a>
        <a className="next button-fixed button-side button-right" onClick={this.handleNext.bind(this)}><img src={require('./svg/right.svg')}/></a>
        <a className="up button-fixed button-bottom button-right" onClick={this.handleUp.bind(this)}><img src={require('./svg/up.svg')}/></a>

        <div className="ProjectWrapper-container ProjectWrapper-container--closed ProjectWrapper-container--hoverable" ref="projectWrapperContainer">
          <div className="ProjectWrapper-svgContainer" dangerouslySetInnerHTML={svgMarkup()}></div>

          <ProjectInfo project={this.props.project} isActive={this.props.active} isLoaded={this.props.isLoaded} />
        </div>

        <ProjectImage onClick={this.handleClick.bind(this)} src={src} alt={this.props.project.name} project={this.props.project} />
      </li>
    );
  }
}

export default ProjectWrapper;
