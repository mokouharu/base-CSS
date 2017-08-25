/**
 * Created by zhj on 17/8/24.
 */
const path = require('path'),
      fs = require('fs'),
      glob = require('glob'),
      conf = require('./conf');

const resolve = dir => path.join(__dirname, '..', dir);
let argv;
try {
  argv = JSON.parse(process.env.npm_config_argv).original;
} catch(e) {
  argv = process.argv;
}

// 先全局安装less 和 创建 dist 文件夹

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

conf.installDependencies('less', fs);


 // 若执行命令时后面有参数, 则只编译指定的文件 ; 若没有,则全部编译
if (argv && argv.length >= 3 ) {
  argv.slice(2)
    .forEach(path => {
      conf.execLessHandler(path, resolve);
    })
} else {
  glob
    .sync(
      `..${path.sep}**${path.sep}*.less`,
      { cwd: __dirname }
    )
    .forEach(path => {
      conf.execLessHandler(path, resolve);
  })
}


