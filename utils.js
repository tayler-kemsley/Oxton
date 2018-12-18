exports.log = function(message) {
    var date = new Date()
    console.log(`[${date.toISOString()}]: ${message}`)
}