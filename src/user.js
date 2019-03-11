/* $inline.line('meta.js|trim') */

function GM_addStyle (css) {
  const style = document.createElement('style')
  style.type = 'text/css'
  style.textContent = css
  document.head.appendChild(style)
  return style
}

GM_addStyle('.gm-favicon { margin-right: 0.5em; vertical-align: middle; }')

// Add forEach method to NodeList for legacy browsers.
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach
}

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    const target = mutation.target
    if (target.classList.contains('entry') && target.querySelector('.gm-favicon') === null) {
      const source = target.querySelector('a.source')
      if (source !== null) {
        const domain = source.href.replace(/^https?:\/\/([^/:]+).*/i, '$1')
        const favicon = document.createElement('img')
        favicon.src = `https://www.google.com/s2/favicons?domain=${domain}&alt=feed`
        favicon.classList.add('gm-favicon')
        source.insertAdjacentElement('afterbegin', favicon)
      }
    }
  })
})
observer.observe(document.getElementById('box'), { childList: true, subtree: true })
