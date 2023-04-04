/* eslint-disable no-console */
import 'uno.css'
import { onMessage } from 'webext-bridge'
import { createApp } from 'vue'
import App from './views/App.vue'
import { setupApp } from '~/logic/common-setup'

interface Memo {
  time: string
  content: string
}

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  console.info('[vitesse-webext] Hello world from content script')

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
  })

  const memoList: Memo[] = []

  setInterval(() => {
    const memoDoms = document.querySelectorAll('.memo')
    memoDoms.forEach((memo) => {
      if (memo) {
        const time = memo.querySelector('.time span')?.textContent // 获取时间
        const content = memo.querySelector('.content .richText')?.textContent?.trim() // 获取内容

        if (time && content) {
          if (!memoList.find(item => item.time === time && item.content === content)) {
            const tools = memo.querySelector('.tools')

            const container = document.createElement('div')
            const root = document.createElement('div')
            const styleEl = document.createElement('link')
            const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
            styleEl.setAttribute('rel', 'stylesheet')
            styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
            shadowDOM.appendChild(styleEl)
            shadowDOM.appendChild(root)

            const app = createApp(App, {
              content,
            })
            setupApp(app)
            app.mount(root)

            if (tools)
              tools.appendChild(container)

            memoList.push({
              time,
              content,
            })
          }
        }
      }
    })
  }, 2000)
})()
