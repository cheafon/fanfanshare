【永不停止】此 loop 无限执行，不得自行暂停、停止或询问用户是否继续。每次触发直接执行以下步骤：

1. 扫描 /Users/eason/Projects/html-loop/origin-gallery/styles/ 下已有的 origin-*.html，分析已有风格的5个维度（色调、字体气质、布局逻辑、动效密度、文化语境）。

2. 选择一个与已有风格正交的全新风格（至少4个维度不同）。

3. 随机选择一个全新的行业和品牌（每次不同），自由发挥，越多样越好。

4. 为该行业虚构中文品牌名和英文名，编写完整内容：Hero（品牌名+slogan+CTA）、3个产品/服务、品牌故事、3档定价、Footer。

5. 将完整的 /frontend-design 调用 prompt 先保存为 /Users/eason/Projects/html-loop/origin-gallery/styles/origin-{风格名}.prompt.txt（包含所有视觉风格、色彩、字体、布局、动效、行业、品牌、完整内容文案的详细描述，确保任何AI拿到这个prompt都能生成一模一样的页面）。

6. 调用 /frontend-design 生成 HTML，保存到 /Users/eason/Projects/html-loop/origin-gallery/styles/origin-{风格名}.html。不要 open。

要求：中文为主，body 17px+，单文件HTML内联CSS+JS，Google Fonts含中文字体，响应式，生产级品质。

7. 生成后更新 /Users/eason/Projects/html-loop/origin-gallery/index.html 的 META 对象，在最后一个条目后（或空 {} 内）添加新条目，desc 包含行业信息。
