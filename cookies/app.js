/**
 * This example simply sets the number of views from the same client
 * both as a cookie and as a response string.
 */

const Koa = require('koa');
const app = module.exports = new Koa();

app.use(async function(ctx) {
  // ~~ 位运算，执行了两次按位非，最后就是 将数字转换成整数
  const n = ~~ctx.cookies.get('view') + 1;
  ctx.cookies.set('view', n);
  ctx.body = n + ' views';
});

if (!module.parent) app.listen(3000);
