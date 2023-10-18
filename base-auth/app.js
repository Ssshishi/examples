const Koa = require('koa');
// koa-basic-auth 基本的身份验证
const auth = require('koa-basic-auth');

const app = module.exports = new Koa();

// custom 401 handling
// 自定义401处理方式，中间件
app.use(async function(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.set('WWW-Authenticate', 'Basic');
      ctx.body = 'cant haz that';
    } else {
      throw err;
    }
  }
});

// require auth
// 配置验证的身份信息
app.use(auth({ name: 'tj', pass: 'tobi' }));

// secret response

app.use(async function(ctx) {
  ctx.body = 'secret';
});

if (!module.parent) app.listen(3000);
