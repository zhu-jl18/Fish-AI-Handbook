// Mermaid 初始化脚本
// 在页面加载完成后自动渲染所有 Mermaid 图表

async function initMermaid() {
  try {
    // 动态导入 Mermaid
    const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs');
    
    // 配置 Mermaid
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: '#fff',
        primaryBorderColor: '#2563eb',
        lineColor: '#6366f1',
        secondaryColor: '#8b5cf6',
        tertiaryColor: '#1e293b',
        background: '#0f172a',
        mainBkg: '#1e293b',
        secondBkg: '#334155',
        tertiaryBkg: '#0f172a',
        primaryBkg: '#1e293b',
        textColor: '#e2e8f0',
        labelTextColor: '#e2e8f0',
        labelBackground: '#1e293b',
        borderColor: '#475569',
        altBackground: '#334155',
        nodeTextColor: '#e2e8f0',
        fontSize: '14px'
      },
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      securityLevel: 'strict',
      logLevel: 'error'
    });

    // 查找所有 Mermaid 代码块
    const mermaidBlocks = document.querySelectorAll('pre code.language-mermaid');
    
    if (mermaidBlocks.length === 0) {
      return;
    }

    // 处理每个 Mermaid 代码块
    for (let i = 0; i < mermaidBlocks.length; i++) {
      const codeBlock = mermaidBlocks[i];
      const pre = codeBlock.parentElement;
      
      // 获取 Mermaid 代码
      const mermaidCode = codeBlock.textContent.trim();
      
      // 创建一个容器来放置渲染后的图表
      const container = document.createElement('div');
      container.className = 'mermaid-container';
      
      // 创建一个唯一的 ID
      const id = `mermaid-${Date.now()}-${i}`;
      container.innerHTML = `<div id="${id}" class="mermaid">${mermaidCode}</div>`;
      
      // 替换原始的 pre 元素
      pre.parentNode.replaceChild(container, pre);
      
      try {
        // 渲染 Mermaid 图表
        await mermaid.run({
          querySelector: `#${id}`
        });
      } catch (error) {
        console.error('Mermaid 渲染错误:', error);
        // 如果渲染失败，显示错误信息
        container.innerHTML = `
          <div class="mermaid-error">
            <p>Mermaid 图表渲染失败</p>
            <details>
              <summary>查看原始代码</summary>
              <pre><code>${mermaidCode}</code></pre>
            </details>
          </div>
        `;
      }
    }
  } catch (error) {
    console.error('Mermaid 初始化失败:', error);
  }
}

// 等待 DOM 加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMermaid);
} else {
  initMermaid();
}

// 为动态内容提供重新初始化的方法
window.reinitializeMermaid = initMermaid;
