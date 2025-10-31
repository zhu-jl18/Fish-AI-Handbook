/**
 * Spoiler 文本遮罩交互脚本
 * 处理点击事件以显示/隐藏 spoiler 内容
 */

// 初始化所有 spoiler 元素
function initSpoilers() {
  const spoilers = document.querySelectorAll('.spoiler')

  spoilers.forEach((spoiler) => {
    // 添加点击事件监听器
    spoiler.addEventListener('click', function () {
      // 切换显示状态
      this.classList.toggle('spoiler-revealed')

      // 如果是块级 spoiler，可以添加额外的交互效果
      if (
        this.classList.contains('spoiler-block') ||
        this.classList.contains('spoiler-leaf')
      ) {
        // 可选：添加音效或其他反馈
        // playRevealSound()
      }
    })

    // 添加键盘支持（Enter 或 Space 键）
    spoiler.setAttribute('tabindex', '0')
    spoiler.setAttribute('role', 'button')
    spoiler.setAttribute('aria-label', '点击查看隐藏内容')

    spoiler.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        this.click()
      }
    })

    // 更新 aria-label 当状态改变时
    spoiler.addEventListener('click', function () {
      if (this.classList.contains('spoiler-revealed')) {
        this.setAttribute('aria-label', '已显示内容')
      } else {
        this.setAttribute('aria-label', '点击查看隐藏内容')
      }
    })
  })
}

// 页面加载时初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSpoilers)
} else {
  initSpoilers()
}

// 支持动态加载的内容（如果使用了客户端路由）
if (typeof window !== 'undefined') {
  window.addEventListener('astro:page-load', initSpoilers)
}
