document.addEventListener('DOMContentLoaded', () => {
  // 查找页面上所有的 <pre> 元素
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach(codeBlock => {
    // 创建复制按钮
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-button';
    copyButton.textContent = 'Copy';

    // 将按钮添加到代码块中
    codeBlock.appendChild(copyButton);

    // 添加点击事件监听器
    copyButton.addEventListener('click', () => {
      // 获取代码块内的 <code> 元素
      const codeElement = codeBlock.querySelector('code');
      if (!codeElement) return;

      const codeToCopy = codeElement.innerText;

      // 使用 Clipboard API 复制文本
      navigator.clipboard.writeText(codeToCopy).then(() => {
        // 复制成功后的反馈
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');

        // 2秒后恢复按钮状态
        setTimeout(() => {
          copyButton.textContent = 'Copy';
          copyButton.classList.remove('copied');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy code: ', err);
        copyButton.textContent = 'Error';
        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 2000);
      });
    });
  });
});
