// import logger from './logger.js';
// // import logger,{
// //     TYPE_LOG, TYPE_ERROR, TYPE_WARN    
// // } from './logger.js';
// //----------------------
// // import {
// //     TYPE_LOG, TYPE_ERROR, TYPE_WARN    
// // } from './constants.js';
// //Gom lại thì dùng *
// import * as constans from './constants.js';
// console.log(constans)
// logger('Text message...',constans.TYPE_ERROR);
// //---------------------------------------
// logger('Text message...',TYPE_ERROR);


//Sau khi tạo mod.js
//import logger from './mod/mod.js';
//Import từ kiểu ko export detault
import { logger2 } from './mod/mod.js';
import * as constans from './constants.js';
//---------------------------------------
//logger('Text message...',constans.TYPE_WARN);

logger2('Text message...',constans.TYPE_WARN);