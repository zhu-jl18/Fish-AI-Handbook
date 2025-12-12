/**
 * Tab switching logic for ContentTabSwitcher
 * Handles click and keyboard navigation, updates panels, and dispatches events.
 */

import { copyMarkdownSource } from './copy-markdown'

type TabElement = HTMLButtonElement & {
  dataset: { tabId?: string; entryId?: string }
}

function activateTab(
  activeTab: TabElement,
  allTabs: NodeListOf<TabElement>,
  panelContainer: ParentNode,
) {
  const tabId = activeTab.dataset.tabId
  if (!tabId) return

  allTabs.forEach((tab) => {
    const isActive = tab === activeTab
    tab.classList.toggle('active', isActive)
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false')
    tab.setAttribute('tabindex', isActive ? '0' : '-1')
  })

  const panels =
    panelContainer.querySelectorAll<HTMLDivElement>('.content-tab-panel')
  panels.forEach((panel) => {
    const panelTabId = panel.dataset.tabId
    const isVisible = panelTabId === tabId
    panel.hidden = !isVisible
    panel.setAttribute('aria-hidden', isVisible ? 'false' : 'true')
  })

  document.dispatchEvent(
    new CustomEvent('tab-changed', {
      detail: { tabId, activeTab },
    }),
  )
}

export function initTabSwitcher() {
  const tabLists = document.querySelectorAll<HTMLDivElement>('.content-tabs')

  tabLists.forEach((tabList) => {
    if (tabList.dataset.tabsInitialized === 'true') return
    tabList.dataset.tabsInitialized = 'true'

    const tabs = tabList.querySelectorAll<TabElement>('.content-tab')
    const panelContainer =
      tabList.closest('.content-tabs-wrapper')?.parentElement ||
      tabList.parentElement ||
      document

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        activateTab(tab, tabs, panelContainer)
      })

      tab.addEventListener('keydown', (e: KeyboardEvent) => {
        const tabArray = Array.from(tabs)
        const currentIndex = tabArray.indexOf(tab)
        let newIndex: number | null = null

        switch (e.key) {
          case 'ArrowLeft':
            newIndex = currentIndex > 0 ? currentIndex - 1 : tabArray.length - 1
            break
          case 'ArrowRight':
            newIndex = currentIndex < tabArray.length - 1 ? currentIndex + 1 : 0
            break
          case 'Home':
            newIndex = 0
            break
          case 'End':
            newIndex = tabArray.length - 1
            break
        }

        if (newIndex !== null) {
          e.preventDefault()
          const newTab = tabArray[newIndex]
          newTab.focus()
          activateTab(newTab, tabs, panelContainer)
        }
      })
    })

    const copyBtn = tabList.querySelector<HTMLButtonElement>(
      '.content-tab-copy-btn',
    )
    if (copyBtn && copyBtn.dataset.copyInitialized !== 'true') {
      copyBtn.dataset.copyInitialized = 'true'
      copyBtn.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        const activeTab = tabList.querySelector<TabElement>(
          '.content-tab.active',
        )
        const entryId = activeTab?.dataset.entryId
        const label =
          activeTab?.querySelector('.content-tab-label')?.textContent?.trim() ||
          undefined
        copyMarkdownSource(entryId, label)
      })
    }
  })
}

// Auto-bootstrap when loaded in browser (Astro dev/build will bundle this module)
if (typeof document !== 'undefined') {
  const bootstrap = () => initTabSwitcher()
  document.addEventListener('DOMContentLoaded', bootstrap)
  document.addEventListener('astro:page-load', bootstrap)
}
