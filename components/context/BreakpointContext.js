/* eslint-disable no-undef */
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';

const BreakpointContext = createContext();

const getDeviceByBreakpoint = breakpoint => {
  switch (breakpoint) {
    case 'base':
    case 'sm':
      return 'mobile';
    case 'md':
      return 'tablet';
    case 'lg':
    case 'xl':
      return 'desktop';
    default:
      return 'mobile';
  }
};

const sortedBps = ['xl', 'lg', 'md', 'sm', 'base'];
const BreakpointProvider = ({ queries, ...restProps }) => {
  // mobile first, if not query detected use xs size
  const [breakpoint, setBreakpoint] = useState('xs');
  const [orientation, setOrientation] = useState('landscape');
  const [device, setDevice] = useState('mobile');
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mediaQueryLists = {};
    const breakpoints = Object.keys(queries);
    let isAttached = false;

    const handleQueryListener = () => {
      const allMatchingBreakpoints = breakpoints
        .map(bp => !!(mediaQueryLists[bp] && mediaQueryLists[bp].matches) && bp)
        .filter(bp => !!bp);
      const isPortrait = allMatchingBreakpoints.includes('portrait');
      setOrientation(isPortrait ? 'portrait' : 'landscape');
      const biggerMatchingBP = sortedBps.find(bp =>
        allMatchingBreakpoints.includes(bp),
      );
      setBreakpoint(biggerMatchingBP);
      const dev = getDeviceByBreakpoint(biggerMatchingBP);
      setDevice(dev);
      setIsDesktop(dev === 'desktop');
      setIsTablet(dev === 'tablet');
      setIsMobile(dev === 'mobile');
    };

    if (window && window.matchMedia) {
      breakpoints.forEach(bp => {
        if (typeof queries[bp] === 'string') {
          mediaQueryLists[bp] = window.matchMedia(queries[bp]);
        }
      });
      isAttached = true;
      breakpoints.forEach(bp => {
        if (typeof queries[bp] === 'string') {
          handleQueryListener(bp);
          mediaQueryLists[bp].addListener(() => handleQueryListener(bp));
        }
      });
    }

    // Clean up listeners on unmount
    return () => {
      if (isAttached) {
        breakpoints.forEach(bp => {
          if (typeof queries[bp] === 'string') {
            mediaQueryLists[bp].removeListener(handleQueryListener);
          }
        });
      }
    };
  }, [queries]);

  return (
    <BreakpointContext.Provider
      value={{ breakpoint, orientation, device, isDesktop, isTablet, isMobile }}
      {...restProps}
    />
  );
};

BreakpointProvider.propTypes = {
  queries: PropTypes.shape({
    xs: PropTypes.string,
    sm: PropTypes.string,
    md: PropTypes.string,
    lg: PropTypes.string,
    xl: PropTypes.string,
    portrait: PropTypes.string,
  }).isRequired,
};

export { BreakpointContext, BreakpointProvider };
