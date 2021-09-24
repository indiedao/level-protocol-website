import { useContext } from 'react';
import { BreakpointContext } from '../context/BreakpointContext';


const useBreakpoints = () => {
  const context = useContext(BreakpointContext);
  if (!context) {
    throw new Error('useBreakpoint must be used within BreakpointProvider');
  }
  return context;
};

export default useBreakpoints;
