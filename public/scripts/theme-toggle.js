/**
 * 主题切换脚本
 * 支持暗色/浅色主题切换，带系统偏好检测和本地存储持久化
 */

;(function () {
  const STORAGE_KEY = 'theme-preference'
  const DARK = 'dark'
  const LIGHT = 'light'

  /**
   * 获取用户主题偏好
   * 优先级：本地存储 > 系统偏好 > 默认暗色
   */
  function getThemePreference() {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === DARK || stored === LIGHT) {
      return stored
    }
    // 检测系统偏好
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return LIGHT
    }
    return DARK
  }

  /**
   * 设置主题
   * @param {string} theme - 'dark' 或 'light'
   * @param {boolean} save - 是否保存到本地存储
   */
  function setTheme(theme, save = true) {
    const root = document.documentElement

    // 添加过渡类以实现平滑切换
    root.classList.add('theme-transition')

    // 设置主题
    if (theme === LIGHT) {
      root.setAttribute('data-theme', LIGHT)
    } else {
      root.removeAttribute('data-theme')
    }

    // 更新切换按钮状态
    updateToggleButton(theme)

    // 移除过渡类
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove('theme-transition')
      })
    })

    // 保存偏好
    if (save) {
      localStorage.setItem(STORAGE_KEY, theme)
    }

    // 触发自定义事件，供其他组件监听
    document.dispatchEvent(
      new CustomEvent('theme-change', { detail: { theme } })
    )
  }

  /**
   * 切换主题
   */
  function toggleTheme() {
    const current = document.documentElement.hasAttribute('data-theme')
      ? LIGHT
      : DARK
    const next = current === DARK ? LIGHT : DARK
    setTheme(next)
  }

  /**
   * 更新切换按钮的图标和 aria-label
   * @param {string} theme - 当前主题
   */
  function updateToggleButton(theme) {
    const button = document.getElementById('theme-toggle')
    if (!button) return

    const sunIcon = button.querySelector('.icon-sun')
    const moonIcon = button.querySelector('.icon-moon')

    if (theme === LIGHT) {
      // 浅色主题：显示月亮图标（点击切换到暗色）
      sunIcon?.classList.add('hidden')
      moonIcon?.classList.remove('hidden')
      button.setAttribute('aria-label', '切换到暗色模式')
      button.setAttribute('title', '切换到暗色模式')
    } else {
      // 暗色主题：显示太阳图标（点击切换到浅色）
      sunIcon?.classList.remove('hidden')
      moonIcon?.classList.add('hidden')
      button.setAttribute('aria-label', '切换到浅色模式')
      button.setAttribute('title', '切换到浅色模式')
    }
  }

  /**
   * 初始化主题系统
   */
  function init() {
    // 绑定切换按钮事件
    const button = document.getElementById('theme-toggle')
    if (button) {
      button.addEventListener('click', toggleTheme)
    }

    // 更新按钮状态（主题已在内联脚本中设置）
    const currentTheme = document.documentElement.hasAttribute('data-theme')
      ? LIGHT
      : DARK
    updateToggleButton(currentTheme)

    // 监听系统主题偏好变化
    window
      .matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', (e) => {
        // 仅当用户未手动设置主题时响应系统变化
        const stored = localStorage.getItem(STORAGE_KEY)
        if (!stored) {
          setTheme(e.matches ? LIGHT : DARK, false)
        }
      })
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }

  // 导出到全局，供外部调用
  window.themeToggle = {
    toggle: toggleTheme,
    set: setTheme,
    get: getThemePreference,
  }
})()
