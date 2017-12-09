module.exports = {
  shortcuts: [
    {
      name: 'pkg',
      expand (file, ...args) {
        return `../package.json|parse:${args.join()}`
      }
    }
  ]
}
