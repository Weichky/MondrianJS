function onTop(element) {
    element.style.zIndex = "2";
}

function shrink(element) {
    const currentTransform = window.getComputedStyle(element).transform;
    const scale = currentTransform === 'none' ? 1 : parseFloat(currentTransform.split(',')[3]);

    element.style.transform = `scale(${scale * 0.8})`;
    setTimeout(() => {
        restore(element);
    }, 500); // 延迟 500ms 后执行恢复函数
}
function expand(element) {
    const currentTransform = window.getComputedStyle(element).transform;
    const scale = currentTransform === 'none' ? 1 : parseFloat(currentTransform.split(',')[3]);

    element.style.transform = `scale(${scale * 1.2})`;
    setTimeout(() => {
        restore(element);
    }, 500); // 延迟 500ms 后执行恢复函数
}
function restore(element) {
    element.style.transform = `scale(1)`;
}

function getRandomColor() {
    const COLOR_RANGE = [10, 10, 10]; // 轻微偏差，让颜色有点变化
    const BASE_COLOR = [
        [227, 0, 15],     // 红色
        [255, 221, 51],   // 黄色
        [0, 48, 143],     // 蓝色
        [255, 255, 255]   // 白色
    ];

    // 随机选择一个基准色
    const baseIndex = Math.floor(Math.random() * BASE_COLOR.length);
    const baseColor = BASE_COLOR[baseIndex];

    // 在基准色范围内生成颜色
    const r = Math.min(255, baseColor[0] + Math.floor(Math.random() * COLOR_RANGE[0]));
    const g = Math.min(255, baseColor[1] + Math.floor(Math.random() * COLOR_RANGE[1]));
    const b = Math.min(255, baseColor[2] + Math.floor(Math.random() * COLOR_RANGE[2]));

    return `rgb(${r}, ${g}, ${b})`;
}

function getMaxZIndex(elements) {
    let maxZIndex = defaultZIndex;
    elements.forEach((elem) => {
      const zIndex = parseInt(elem.style.zIndex || defaultZIndex);
      if (zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });
    return maxZIndex;
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }