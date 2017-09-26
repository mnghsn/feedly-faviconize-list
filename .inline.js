module.exports = {
  shortcuts: [
    {
      name: 'pkg',
      expand: function (file, ...args) {
        return `../package.json|parse:${args.join()}`
      }
    }
  ]
}
