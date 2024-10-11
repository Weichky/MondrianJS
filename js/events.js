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
    const COLOR_RANGE = [50, 50 ,50];
    const BASE_COLOR = [
        [205, 92, 92],    // 印度红
        [250, 250, 250],  // 雪色
        [245, 222, 179],  // 小麦色
        [128, 128, 0],    // 橄榄色
        [32, 178, 170]    // 浅海绿
    ];

    // 随机选择一个基准色
    const baseIndex = Math.floor(Math.random() * BASE_COLOR.length);
    const baseColor = BASE_COLOR[baseIndex];

    // 随机在基准色的范围内生成颜色
    const r = baseColor[0] + Math.floor(Math.random() * COLOR_RANGE[0]);
    const g = baseColor[1] + Math.floor(Math.random() * COLOR_RANGE[1]);
    const b = baseColor[2] + Math.floor(Math.random() * COLOR_RANGE[2]);

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