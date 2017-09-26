$inline('meta.js|trim')

GM_addStyle('.GM_favicon { margin-right: 0.5em; vertical-align: middle; }')

const observer = new window.MutationObserver(mutations => {
  mutations.forEach(mutation => {
    const target = mutation.target
    if (target.classList.contains('entry')) {
      if (target.querySelector('.GM_favicon') === null) {
        const source = target.querySelector('a.source')
        if (source !== null) {
          const domain = source.href.replace(/^https?:\/\/(?:www.)?([^/:]+).*/i, '$1')
          const favicon = document.createElement('img')
          favicon.src = `https://www.google.com/s2/favicons?domain=${domain}&alt=feed`
          favicon.classList.add('GM_favicon')
          source.insertAdjacentElement('afterbegin', favicon)
        }
      }
    }
  })
})
observer.observe(document.getElementById('box'), { childList: true, subtree: true })