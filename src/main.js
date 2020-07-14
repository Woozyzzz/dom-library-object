const sectionList = dom.find("section");
for (let i = 0; i < sectionList.length; i++) {
  const section = sectionList[i];
  const div = dom.children(section)[1];
  const h2 = dom.previous(div);
  dom.text(h2, `section ${i}`);
  dom.html(
    div,
    `div ${i} <span>新建 span ${i} 点击变色并添加 class 属性</span>`
  );
  const span = dom.find("span", div)[0];
  dom.style(div, { background: `#F${9 * i}0` });
  dom.style(span, { color: `#0${9 * i}9` });
  dom.on(div, "click", (e) => {
    if (e.target.matches("span")) {
      dom.style(e.target, {
        border: `4px solid #2${9 * i}22${9 * i}2`,
        borderRadius: "50%",
      });
      dom.class.add(e.currentTarget, "selected");
    }
  });
}
const a = dom.create("<a>参考文档</a>");
dom.attribute(a, "href", "https://www.yuque.com/woozyzzz/ybz8i1/yo9rg6");
dom.append(a, dom.parent(sectionList[0]));
