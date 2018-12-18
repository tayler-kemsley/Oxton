var program = require('commander');
var chokidar = require('chokidar');
var funcs = require('./commands');

var watcher;

program
    .command('run <source> <destination>')
    .action(function (sourceDir, destinationDir) {
        console.log(`
            ########################
            #        OXTON         #
            ########################                       
            `
        )
        watcher = chokidar.watch(sourceDir, {
            ignored: /(^|[\/\\])\../,
            persistent: true,
            ignoreInitial: true
        });

        watcher
            .on('change', path => funcs.updateFile(path, sourceDir, destinationDir))
            .on('add', path => funcs.addFile(path, sourceDir, destinationDir))
            .on('unlink', path => funcs.removeFile(path, sourceDir, destinationDir))
            .on('addDir', path => funcs.addDir(path, sourceDir, destinationDir))
            .on('unlinkDir', path => funcs.removeDir(path, sourceDir, destinationDir))
    }
)

program.parse(process.argv)