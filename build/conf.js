/**
 * Created by zhj on 17/8/25.
 */

const exec = require('child_process').exec;

module.exports = {
  installDependencies(dep, fs) {
    if (!fs.existsSync('npminstall.text')) {
      console.log(111);
      exec(`npm install -g ${dep}`,
        (error, stdout) => {
          if (error) throw error;
          console.log(`全局安装 ${dep} 成功! ${ stdout }`);
          fs.writeFile(
            "npminstall.text", `全局安装 ${dep} 成功! ${ stdout }`,
            (err) => {
              if(err)  throw err;
              console.log("npminstall.text已保存!");
          });
      });
    }
  },
  execLessHandler(filepath, resolve) {
    let lessFilePath = filepath
      .replace(new RegExp('^\\../'), '');

    const lessFileDir = lessFilePath
      .replace(new RegExp('^src/(.*)/'), '')
      .replace(new RegExp('\\.less$'), '.css');

    const entry = resolve(lessFilePath),
      dest = resolve(`dist/${lessFileDir}`);

    console.log(dest);
    exec(`lessc ${entry} > ${dest}`,
      () => {
        console.log(`${dest} 生成成功`);
      });

  }
};
