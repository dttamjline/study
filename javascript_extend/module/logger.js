// export const TYPE_LOG = 'log';
// export const TYPE_WARN = 'warn';
// export const TYPE_ERROR = 'error';

// function logger(log, type = 'log'){
//     console[type](log);
// }
import {TYPE_LOG} from './constants.js';
function logger(log, type =TYPE_LOG){
    console[type](log);
}
export default logger;