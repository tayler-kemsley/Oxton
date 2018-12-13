var chokidar = require('chokidar')
var os = require('os')
var fs = require('fs')

console.log(`
    ########################
    #        OXTON         #
    ########################                       
    `
)

const sourceDir = 'source'
const destinationDir = 'destination'

var watcher = chokidar.watch(sourceDir, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true
});

function log(message) {
    var date = new Date()
    console.log(`[${date.toISOString()}]: ${message}`)
}

function updateFile(changePath, savePath=null) {
    if (!savePath) {
        var savePath = changePath.replace(sourceDir, destinationDir)
    }

    log(`Updating: ${savePath}`)
    
    fs.copyFile(changePath, savePath, (err) => {
        if (err) throw err
        log(`Synced file ${changePath} to ${savePath}`)    
    })
}

function addFile(addPath) {
    var savePath = addPath.replace(sourceDir, destinationDir)
    log(`Adding: ${savePath}`)

    fs.writeFile(savePath, '', (err) => {
        if (err) throw err;
        log(`File created: ${savePath}`)
        updateFile(addPath, savePath)
    })
}

function removeFile(removedPath) {
    var removePath = removedPath.replace(sourceDir, destinationDir)
    log(`Removing: ${removePath}`)

    fs.unlink(removePath, (err) => {
        if (err) throw err;
        log(`Removed file ${removePath}`)
    })
}

function addDir(addPath) {
    var savePath = addPath.replace(sourceDir, destinationDir)
    log(`Adding dir: ${savePath}`)

    fs.mkdir(savePath, {recursive: true}, (err) => {
        if (err) throw err;
        log(`Added dir: ${savePath}`)
    })
}

function removeDir(removedPath) {
    var removeDir = removedPath.replace(sourceDir, destinationDir)
    log(`Removing dir: ${removeDir}`)

    fs.rmdir(removeDir, (err) => {
        if (err) throw err;
        log(`Removed dir: ${removeDir}`)
    })
}

watcher.on('change', path => updateFile(path))
watcher.on('add', path => addFile(path))
watcher.on('unlink', path => removeFile(path))

// Directory management
watcher.on('addDir', path => addDir(path))
watcher.on('unlinkDir', path => removeDir(path))

log('Watching...')
