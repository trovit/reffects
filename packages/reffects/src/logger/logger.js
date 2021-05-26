import ReduxDevToolsLogger from './ReduxDevToolsLogger';
import ConsoleLogger from './ConsoleLogger';
import NullLogger from './NullLogger';

export const logger = (devToolsOn, verbosityOn) => {
    if (!verbosityOn ||!devToolsOn) {
        return NullLogger();
    }
    
    if(window.__REDUX_DEVTOOLS_EXTENSION__) {
        return ReduxDevToolsLogger();
    }

    return ConsoleLogger();
}
