import React from 'react';

/**
* Determines whether or not to render its content. Intended to clean up readability.
* Note: this uses a babel stage 1 proposal, and should not be used for production code.
* It is fun though. 
* @name {Function} ConditionalRenderer
* @arg {boolean} isVisible whether or not to render its children
* @arg {JSX} children components to be conditionally rendered
* @arg {Component} Component optional. A component to render as the parent.
* @arg {boolean} fragment optional. if True, renders children as fragments.
* @arg {...props} Props additional HTML props to be passed to the container div, e.g className etc.
 **/

const ConditionalRenderer = ({ isVisible, children, Component, fragment, ...props }) => do {
  if (!isVisible) null;
  else if (Component) <Component {...props}>{children}</Component>
  else if (fragment) <React.Fragment>{children}</React.Fragment>
  else <div {...props}>{children}</div>
}

export default ConditionalRenderer;
