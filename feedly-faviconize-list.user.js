// ==UserScript==
// @name            Feedly Faviconize List
// @namespace       jmln.tw
// @version         0.1.1
// @description     A user script to show feed favicons in Feedly Title-Only View.
// @author          Jimmy Lin
// @license         MIT
// @homepage        https://github.com/jmlntw/feedly-faviconize-list
// @supportURL      https://github.com/jmlntw/feedly-faviconize-list/issues
// @match           *://*.feedly.com/*
// @compatible      firefox
// @compatible      chrome
// @compatible      opera
// @run-at          document-end
// @grant           GM_addStyle
// ==/UserScript==

/* global GM_addStyle */

GM_addStyle('.GM_favicon { margin-right: 0.5em; vertical-align: middle; }')

const observer = new window.MutationObserver(mutations => {
  mutations.forEach(mutation => {
    const target = mutation.target
    if (target.classList.contains('entry')) {
      if (!target.classList.contains('GM_faviconize')) {
        const source = target.querySelector('a.source')
        if (source) {
          const domain = source.href.replace(/^https?:\/\/(?:www.)?([^/:]+).*/i, '$1')
          const favicon = document.createElement('img')
          favicon.src = `https://www.google.com/s2/favicons?domain=${domain}&alt=feed`
          favicon.classList.add('GM_favicon')
          source.insertAdjacentElement('afterbegin', favicon)
        }
      }
      target.classList.add('GM_faviconize')
    }
  })
})
observer.observe(document.getElementById('box'), { childList: true, subtree: true })
