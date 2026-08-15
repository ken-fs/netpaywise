# 07 · netpaywise.com 需求文档(PRD · v1)

> 前置文档:01 关键词 / 02 SERP验证 / 03 域名 / 04 范围 / 05 地域 / 06 架构。本 PRD 是开发依据。

## 1. 目标
- 用美国「收入 + 贷款」高 CPC 计算器工具,吃自然搜索流量,靠 AdSense/联盟变现。
- v1 上线首批 30 页(见 06),3–6 个月建立「收入计算器」话题权威。
- 成功指标:上线后 90 天内 ≥15 页进入 Google 前 3 页;核心州页(VA/WI/CT)进前 2 页。

## 2. 范围(v1)
- **核心**:Paycheck/Take-Home(含 50 州程序化)+ Income Tax。
- **邻接**:Loan/Mortgage 工具意图页(含 mortgage-payoff 流量磁石)。
- **地域**:仅美国 / 英语。架构 i18n-ready(见 §7)。
- **排除**:导流类房贷词、杂货计算器(BMI/科学计算器)。

## 3. 目标用户
- 美国打工者查到手工资(换工作/换州/加薪场景)、自雇者算 1099 税、购房者算贷款月供与购房力。
- 移动端为主(工资类搜索移动占比高)→ **mobile-first 强制**。

## 4. 信息架构
见 `06-site-architecture.md` + `cluster-plan.json`。URL:`/paycheck-calculator`、`/paycheck-calculator/[state]`、`/income-tax-calculator`、`/loan-calculator` 等。

## 5. 功能需求

### 5.1 计算引擎(核心资产)
- **税引擎**:纯函数,输入(收入/频率/申报状态/州/免税额/pre-tax扣除)→ 输出(联邦税/州税/FICA/到手工资,含逐项明细)。
- **贷款引擎**:纯函数,标准分期/摊还公式(月供、总利息、amortization 表、提前还款影响)。
- 引擎与 UI **完全解耦**;税率/税级/州参数全部**外置为数据文件**(见 §6),禁止硬编码。
- 全部计算**客户端实时**(输入即算,无需提交/无邮箱门槛),SSR 输出默认示例结果供 SEO 抓取。
- 单元测试覆盖:每州税额对拍权威来源(IRS/州税局);贷款公式对拍已知案例。

### 5.2 各工具页规格(摘要,完整参数见开发子文档)
- 州工资单页:年薪/时薪切换、申报状态、受抚养人、pre-tax(401k/HSA)、逐项税明细 + 到手工资 + 可视化占比图。
- 联邦/州所得税:按税级明细、有效税率 vs 边际税率。
- 1099 自雇税:SE tax(15.3%)+ 所得税估算 + 季度预缴。
- 贷款/房贷:月供、总利息、amortization 表(可展开/图表)、提前还款对比。

### 5.3 通用功能
- 结果可**分享 URL**(参数进 query string,利于收藏与外链)。
- 结果可复制/导出(amortization 表下载 CSV)。
- 相关计算器交叉推荐模块(承载 §内链矩阵)。

## 6. 数据模型(i18n-ready)
```
/data
  /tax/us/2026/federal.json        # 联邦税级、标准扣除、FICA 上限
  /tax/us/2026/states/{XX}.json    # 各州税级/税率/特殊规则
  /meta/states.json                # 州名/缩写/人口/首批优先级
```
- 年度更新:新税年只加新 JSON,代码不动。
- 货币/数字通过统一 `formatMoney(locale)` 层,预留 locale(v1 仅 en-US)。
- 税规则结构预留 country 维度(未来 `/tax/uk/…`),但 v1 URL 不启用国家前缀(避免过度设计)。

## 7. 前端 / 设计(强制约束)
**必须遵循 `../DESIGN-RULES.md` + 调用 `frontend-design` skill。** 违反则页面不可接受。

### 7.1 调和原则:「外壳有个性,内核要可信」(YMYL)
- **可用 DESIGN-RULES 个性**的区域:首页/落地、工具说明、FAQ、空状态、页脚、404——口语化(每句≤15字)、有温度、非模板、非对称布局、噪点/渐变背景、非线性动画、Iconify 图标(禁 emoji 当功能图标)。
- **必须克制、精确、易读**的区域:计算器输入表单 + 结果数字区(税额/到手工资/还款)——高对比、大字号、清晰层级,不玩梗、不被装饰干扰。金融数字是信任来源,不能牺牲可读性。

### 7.2 硬性禁止(来自 DESIGN-RULES)
- 禁紫色/靛蓝/蓝紫渐变(#6366F1/#8B5CF6);禁纯平背景(需噪点/渐变);禁 Tailwind 默认色板。
- 禁 Hero+三卡片、完美居中、等宽多栏;禁 Shadcn/MUI 默认组件(须深度定制);禁 emoji 功能图标;禁线性动画。

### 7.3 资源
- 图标 Iconify;占位图 Picsum;真实图 Pexels;插画 unDraw(见 DESIGN-RULES §图片系统)。
- 设计执行时先跑 `frontend-design` skill 定美学方向(配色/字体/纹理/动效),再实现组件。

## 8. SEO / Schema(强制)
- 每页:唯一 title/description、canonical、语义化 H1/H2。
- Schema(JSON-LD):工具页 `WebApplication`+`FAQPage`+`BreadcrumbList`;枢纽页加 `ItemList`。
- 程序化州页防薄内容:每页 500–900 字**州专属**内容(该州税率/税级/最低工资/说明),非模板套壳。
- sitemap.xml 自动生成;internal linking 按 `cluster-plan.json` 的 linkMatrix 实现(每页≥3入链,无孤儿)。
- 复用 skill:`nextjs-seo-foundations` / `nextjs-seo-booster` / `seo-programmatic`(州页规模化防 index bloat)。

## 9. 性能(强制,差异化卖点)
- **LCP < 2s**(giants 普遍 4–6s);mobile-first;CLS≈0(计算器容器预留高度)。
- SSG/ISR 优先(州页、工具页静态生成);计算逻辑客户端 hydrate。
- 图表/可视化按需加载,不阻塞首屏。

## 10. 变现
- AdSense(json1 复审经验:先备齐 Privacy/Terms/Contact/About 信任页再申请)。
- 广告位不得挤压计算器首屏与结果区(YMYL 体验优先,也利于过 AdSense 审核)。
- 联盟(远期):贷款/报税产品,仅在不伤中立性处植入。

## 11. 合规 / 准确性(YMYL)
- 每个计算器页含免责声明("estimate only, not tax/financial advice")。
- 数据来源标注(IRS、各州税局)+ 更新日期(体现 E-E-A-T freshness)。
- About/方法论页说明计算依据(建立作者/组织可信度)。
- 建立年度税表更新流程(§6 数据驱动使其低成本)。

## 12. 技术栈 / 结构(对齐 house 约定,更正:不用 Tailwind)
- Next 16(App Router)+ React 19 + TypeScript;**`output: export` 静态导出**(全预渲染,计算器客户端 hydrate,天然 <2s)。
- **手写 CSS + CSS 自定义属性设计令牌**(不用 Tailwind,避免默认色板,更贴合 DESIGN-RULES);背景带噪点/渐变。
- 图标 `@iconify/react`;测试 `tsx`(对齐 visualrefiner)。pnpm。
- 结构:`src/app`(路由)`src/lib/engine`(税/贷款纯函数)`/data`(税配置 JSON)`src/components`(深度定制 UI)`src/content`(州文案)`tests/`。
- 部署:静态产物,Vercel/Cloudflare 均可;GitHub Actions 做年度税表更新 / auto-page-sync。

## 13. 里程碑
1. **M1 基建**:项目脚手架 + 设计系统(frontend-design 定调)+ 税/贷款引擎 + 测试。
2. **M2 核心 + 税务(赶报税季,并行)**:Pillar A/B + 4 通用工具 + 12 头部州页 + **税务集群全量(含新增 refund/W-4/1099)**。目标 2026-12 前上线收录。
3. **M3 邻接页**:Pillar C + 贷款集群 6 页(Tier3)+ 内链矩阵接线。
4. **M4 上线**:信任页(Privacy/Terms/Contact/**About 个人品牌页**)+ Person schema + sitemap + 性能达标 + 部署 → 申请 AdSense。
5. **M5 滚动**:剩余 38 州程序化 + batch2 工具 + 监控排名。

## 14. 决策(已确认 2026-08-15)
- [x] **设计调和**:采用 §7.1「外壳有个性 / 内核数字克制可信」。
- [x] **抢报税季**:v1 提前铺税务页,赶 2027 年 1–4 月报税季流量(见 §15)。
- [x] **E-E-A-T 走向(2026-08-15 修订)**:改为**组织/工具优先**(Organization + WebSite schema,**不用 Person / 不设真人作者**)。
  - 理由:netpaywise 是工具站非建议博客;工具类 SERP(calculator.net / realtakehomepay 等)靠准确性+方法论透明排名,不靠署名专家。装专家在 YMYL 有害。
  - E-E-A-T 锚点 = 方法论透明 + 官方来源(IRS/州税局)+ "estimates not advice" + 准确性承诺 + 逻辑有测试。
  - 远期可选:找持证 CPA/EA 审核税逻辑并署名 "reviewed by"(最强 YMYL 信号,需真花钱,别编)。

## 15. 报税季冲刺(因决策②新增)
现在是 2026-08,报税季 2027-01~04。v1 里程碑排期须保证税务集群在 **2026-12 前上线并被 Google 收录**(收录+爬取需 4–8 周预热)。
- 税务集群优先级升到与工资单核心并列(M2 一起做,不留到 M3)。
- **新增页**:`/tax-refund-calculator`(退税估算,报税季搜索峰值)、`/w4-calculator`(已在规划)提前。
- 内容加"2026 tax year / 2027 filing"时效标注,配合 auto-page-sync 保持新鲜度。
