var fs = require('fs')
var utils = require('./utils')

exports.updateFile = function(changePath, sourceDir, destinationDir, savePath=null) {
    if (!savePath) {
        var savePath = changePath.replace(sourceDir, destinationDir)
    }

    utils.log(`Updating: ${savePath}`)
    
    fs.copyFile(changePath, savePath, (err) => {
        if (err) throw err
        utils.log(`Synced file ${changePath} to ${savePath}`)    
    })
}

exports.addFile = function(addPath, sourceDir, destinationDir) {
    var savePath = addPath.replace(sourceDir, destinationDir)
    utils.log(`Adding: ${savePath}`)

    fs.writeFile(savePath, '', (err) => {
        if (err) throw err;
        utils.log(`File created: ${savePath}`)
        updateFile(addPath, savePath)
    })
}

exports.removeFile = function(removedPath, sourceDir, destinationDir) {
    var removePath = removedPath.replace(sourceDir, destinationDir)
    utils.log(`Removing: ${removePath}`)

    fs.unlink(removePath, (err) => {
        if (err) throw err;
        utils.log(`Removed file ${removePath}`)
    })
}

exports.addDir = function(addPath, sourceDir, destinationDir) {
    var savePath = addPath.replace(sourceDir, destinationDir)
    utils.log(`Adding dir: ${savePath}`)

    fs.mkdir(savePath, {recursive: true}, (err) => {
        if (err) throw err;
        utils.log(`Added dir: ${savePath}`)
    })
}

exports.removeDir = function(removedPath, sourceDir, destinationDir) {
    var removeDir = removedPath.replace(sourceDir, destinationDir)
    utils.log(`Removing dir: ${removeDir}`)

    fs.rmdir(removeDir, (err) => {
        if (err) throw err;
        utils.log(`Removed dir: ${removeDir}`)
    })
}

