var shell = require('shelljs');


if (shell.exec('npm run wbuild').code !== 0) {
    shell.echo('Build failed');
    shell.exit(1);
}

shell.cp('-Rf', './dist/*', '../../ProcessMining/node_modules/@procetra/modules/statistic');
/*
shell.echo('App file creating...');
shell.cd('../../../RPA/src');

if (shell.exec('node FilePackager.js ../../Applications/BPMGenesis/ProcessMining/dist/index.js ../../DemoApp/apps/applications/ProcessMining.app').code !== 0) {
    shell.echo('Build failed');
    shell.exit(1);
}


shell.cp('-Rf', '../../DemoApp/apps/applications/ProcessMining.app', '../../pythonProjects/bpmgenesis/src/portal/static/applications/ProcessMining.app');
shell.echo('App file done.');


shell.echo('App store info updating...');
const path = require('path');
const fs = require('fs');
const a = fs.readFileSync('../../DemoApp/apps/appstore.json', 'utf8');

const appStoreInfo = JSON.parse(a);

const appInfo = require('./src/AppStoreInfo');
const result = appStoreInfo.apps.find(item => item.id === appInfo.id);

if (result) {
    const index = appStoreInfo.apps.indexOf(result);
    appStoreInfo.apps[index] = appInfo;
} else {
    appStoreInfo.apps.push(appInfo);
}
const aa = JSON.stringify(appStoreInfo);

fs.writeFileSync('../../DemoApp/apps/appstore.json', aa, 'utf8');
shell.echo('App info done.');

 */