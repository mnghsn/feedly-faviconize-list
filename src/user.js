/* $inline.line('meta.js|trim') */

function GM_addStyle (css) {
  const style = document.createElement('style')
  style.type = 'text/css'
  style.textContent = css
  document.head.appendChild(style)
  return style
}

GM_addStyle('.gm-favicon { width: 16px; height: 16px; margin-right: 0.5em; vertical-align: middle; }')

// Add forEach method to NodeList for legacy browsers.
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach
}

function getFeedlyPage () {
  return new Promise(resolve => {
    const observer = new MutationObserver(mutations => {
      mutations.map(mutation => mutation.target).forEach(target => {
        if (target.id === 'feedlyPageFX') {
          resolve(target)
          observer.disconnect()
        }
      })
    })
    observer.observe(document.getElementById('box'), { childList: true, subtree: true })
  })
}

getFeedlyPage().then(page => {
  const observer = new MutationObserver(mutations => {
    const sources = new Set()
    mutations.map(mutation => mutation.target).forEach(target => {
      target.querySelectorAll('a.source[data-uri]').forEach(source => {
        sources.add(source)
      })
    })
    sources.forEach(source => {
      if (source.querySelector('img.gm-favicon') === null) {
        const domain = source.href.replace(/^https?:\/\/([^/:]+).*/i, '$1')
        const favicon = document.createElement('img')
        favicon.src = `https://www.google.com/s2/favicons?domain=${domain}&alt=feed`
        favicon.classList.add('gm-favicon')
        source.insertAdjacentElement('afterbegin', favicon)
      }
    })
  })
  observer.observe(page, { childList: true, subtree: true })
})
