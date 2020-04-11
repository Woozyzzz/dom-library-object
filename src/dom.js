window.dom = {
  // create: function (tagName) {
  //   return document.createElement(tagName);
  // },
  create(string) {
    // 创建节点
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  after(node, node2) {
    // 新增弟弟
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  before(node, node2) {
    // 新增哥哥
    node.parentNode.insertBefore(node2, node);
  },
  append(parent, node) {
    // 新增儿子
    parent.appendChild(node);
  },
  wrap(node, parent) {
    // 新增爸爸（先创建哥哥，再作为为哥哥的儿子）
    dom.before(node, parent);
    dom.after(parent, node);
  },
  remove(node) {
    // 删除节点
    node.parentNode.removeChild(node);
    return node;
  },
  empty(parent) {
    // 删除孩子们
    const childNodes = node.childNodes;
    // const {childNodes} = node
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  attr(node, name, value) {
    // 读写属性(重载)
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    // 读写文本内容（适配ie）
    if (`innerText` in node) {
      node.innerText = string; // IE
    } else {
      node.textContent = string; // Firefox
    }
  },
  html(node, string) {
    // 读写HTML内容（重载）
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    // 修改style
    if (arguments.length === 3) {
      node.style[name] = value;
    } else if (arguments.length == 2) {
      if (typeof name === `string`) {
        return node.style[name];
      } else if (name instanceof Object) {
        for (let key in name) {
          node.style[key] = name[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      // 添加class
      node.classList.add(className);
    },
    remove(node, className) {
      // 删除class
      node.classList.remove(className);
    },
    has(node, className) {
      // 查看class是否存在
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    // 添加事件监听
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    // 删除事件监听
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    // 获取标签们
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    // 获取父元素
    return node.parentNode;
  },
  children(node) {
    // 获取子元素
    return node.children;
  },
  sibling(node) {
    // 获取兄弟姐妹
    return Array.from(node.parentNode.children).filter(n !== node);
  },
  next(node) {
    // 获取弟弟
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    // 获取哥哥
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    // 获取所有结点
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    // 获取排行老几
    const list = dom.children(node.parentNode);
    for (let i = 0; i < list.length; i++) {
      if (list[i] === node) {
        return i;
      }
    }
  },
};
