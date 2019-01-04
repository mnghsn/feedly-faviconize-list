// ==UserScript==
// @name            Feedly Faviconize List
// @namespace       jmln.tw
// @version         0.2.2
// @description     A user script to show feed favicons in Feedly Title-Only View.
// @author          Jimmy Lin
// @license         MIT
// @homepage        https://github.com/jmlntw/feedly-faviconize-list
// @supportURL      https://github.com/jmlntw/feedly-faviconize-list/issues
// @match           https://*.feedly.com/*
// @compatible      firefox
// @compatible      chrome
// @compatible      opera
// @run-at          document-end
// @grant           none
// ==/UserScript==

function GM_addStyle (css) {
  const style = document.createElement('style')
  style.type = 'text/css'
  style.textContent = css
  document.head.appendChild(style)
  return style
}

GM_addStyle('.gm-favicon { margin-right: 0.5em; vertical-align: middle; }')

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
