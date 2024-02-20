//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Este módulo tiene la responsabilidad de iniciar la App
require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { DB_PORT } = process.env;

// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {
  server.listen(DB_PORT, () => {
    console.log(`%s listening at port ${DB_PORT}`); // eslint-disable-line no-console
  });
});

//NOTA: La sincronización entre el server(App de express) y la DB, debe hacerse cuando levanto el servidor
