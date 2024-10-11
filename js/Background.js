// 首先定义 debounce 函数
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

const container = document.querySelector('.block-container');
const blockElements = document.querySelectorAll('.block');

const defaultZIndex = 1;

// 设置每个 block 元素的默认样式
blockElements.forEach((elem) => {
  elem.style.zIndex = defaultZIndex;
  elem.style.transition = 'transform 1s';
});

// 动态创建并添加 block 元素到容器中
blockInfo.sort((a, b) => b[3] - a[3]);
blockInfo.forEach((block, index) => {
  const [position, width, height, id] = block;
  const [x, y] = position;
  const blockElem = document.createElement('div');
  blockElem.classList.add('block');
  blockElem.style.width = `${width - 4}px`;
  blockElem.style.height = `${height - 4}px`;
  blockElem.style.left = `${x}px`;
  blockElem.style.top = `${y}px`;
  blockElem.style.backgroundColor = getRandomColor();
  container.appendChild(blockElem);

  // 添加点击事件监听器
  blockElem.addEventListener('click', () => {
    shrink(blockElem);
  });

// 添加 mouseover 事件监听器
blockElem.addEventListener('mouseover', debounce(() => {
  blockElem.style.transform = 'scale(1.1)';
  blockElem.style.zIndex = getMaxZIndex(blockElements) + 1;
}, 100));

// 添加 mouseout 事件监听器
blockElem.addEventListener('mouseout', debounce(() => {
  blockElem.style.transform = 'scale(1)';
  blockElem.style.zIndex = defaultZIndex;
}, 100));

});

document.querySelector('.title_container.centered-text').addEventListener('mouseover', function() {
  let cover = document.querySelector('.cover');
  cover.style.transform = 'translateY(-100%)';
  
  cover.addEventListener('transitionend', function() {
    cover.remove(); // 动画完成后删除 cover
  });
});

document.querySelector('.title_container').addEventListener('click', function() {
  let title_container = document.querySelector('.title_container');
  title_container.style.transform = 'translateX(100%)';
  
  title_container.addEventListener('transitionend', function() {
    title_container.remove(); // 动画完成后删除 cover
  });
  let backword = document.querySelector('.backword_container');
  backword.style.display = 'block';
});