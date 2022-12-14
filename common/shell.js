var shell = require('shelljs');


if (shell.exec('npm run wbuild').code !== 0) {
    shell.echo('Build failed');
    shell.exit(1);
}

shell.cp('-Rf', './dist/*', '../../procetra-app/node_modules/@procetra/common');
shell.cp('-Rf', './dist/*', '../processoverview/node_modules/@procetra/common');
shell.cp('-Rf', './dist/*', '../statistic/node_modules/@procetra/common');

shell.cd('../../procetra-app');

if (shell.exec('npm run build').code !== 0) {
    shell.echo('Build failed');
    shell.exit(1);
}