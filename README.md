# netpaywise — 项目工作区

> 状态:**讨论/立项阶段**。以下为已验证的决策依据。待方向最终确认后,再写正式需求文档(PRD)。

## 一句话定位
围绕美国人「收入 / 到手工资(take-home pay)」的个人理财计算器工具站,靠自然搜索流量 + AdSense/联盟变现。

## 已确定(2026-08-15)
- **域名**:`netpaywise.com`(Verisign 权威 RDAP 已确认可注册;结账时确认非 premium 溢价价)
  - 含义:net pay(净工资/到手工资)+ -wise(专业、懂行),契合金融工具站的信任调性,好念好拼。
- **主题边界**:聚焦「收入 + 贷款」这一高 CPC 圈子,**不做**杂货式全品类计算器(BMI/科学计算器等)。
- **范围**:核心层(工资单/税)+ 邻接层(贷款工具)**v1 一起做**;仅工具意图软词,不碰导流词。
- **技术栈**:Next.js(复用 nextjs-seo / seo-programmatic skill)。
- **地域**:**v1 仅美国**;架构做成 i18n-ready,v2 扩 UK/CA/AU,v3 远期 DE/FR/JP(详见 `05`)。

## 开发进度
- [x] 全部立项决策(见下)+ PRD `07`
- [x] **M1 基建完成**(2026-08-15):
  - 脚手架 Next 16 + React 19 + `output:export` + pnpm(对齐 house 约定,不用 Tailwind)
  - 设计系统:见 `DESIGN.md`(Split Bar 分账条 + 台账网格 + Fraunces/Public Sans/IBM Plex Mono)
  - 计算引擎:`src/lib/engine/`(loan.ts + tax.ts,数据驱动 i18n-ready)
  - 测试:`tests/engine.test.ts` **14 项全过**;`pnpm build` 静态导出成功,首页 Split Bar 用真实引擎数烘焙
- [x] **M2 进行中(2026-08-15)**:
  - 交互式 `PaycheckCalculator`(客户端 hydrate:薪资/时薪切换、频率、申报状态、州选择、税前扣除、实时 Split Bar)
  - Pillar A `/paycheck-calculator`(hub + FAQ + WebApplication/FAQPage schema)
  - 程序化 `/paycheck-calculator/[state]`:CA/TX/VA 已生成(英文州文案 + Breadcrumb/FAQ schema);infra 就绪,补数据即扩到 50 州
  - 交互式 `LoanCalculator` + Pillar C `/loan-calculator`(纯数学,已完全可用,含提前还款省息对比)
  - `data/meta/states.json`(50 州清单 + hasData 标记)+ `src/lib/data.ts` 构建期加载器
  - build 8 页全过,全英文,0 CJK
- [x] **M2 扩充(2026-08-15)**:
  - impeccable 改造:hero=pay stub(齿孔撕边 + 载入撕开动效)、工具区=台账列表(弃卡片网格)、全站删 eyebrow、配色改"到手绿"
  - 税务集群:`/income-tax-calculator`(Pillar B)+ `/federal-income-tax-calculator` + `/self-employment-tax-calculator`(1099)+ `/sales-tax-calculator` + `/reverse-sales-tax-calculator`
  - `/salary-to-hourly`;贷款族:`/mortgage-payoff-calculator` `/amortization-calculator` `/auto-loan-calculator`(复用 LoanCalculator)
  - 引擎新增 computeIncomeTax / selfEmploymentTax / salesTax / reverseSalesTax(**测试 17 项全过**)
  - `sitemap.xml` + `robots.txt` 自动生成(15 URL);共 20 路由,全英文 0 CJK,build 通过
- [x] **M2 收尾完成(2026-08-15)**:`/overtime-calculator` `/bonus-tax-calculator` `/w4-calculator` `/mortgage-affordability-calculator`;引擎加 overtimePay/bonusAfterTax/withholdingCheck/maxLoanFromPayment/affordability(测试 **22 项全过**);sitemap 19 URL;共 24 路由全英文 build 通过
- [x] **州数据全覆盖(2026-08-15)**:**50 州 + DC = 51 个配置**,75 静态页 build 通过,$80k 抽查全部数值合理。生成器 `scripts/gen-states.mjs`。
  - ⚠️ **除 9 无税州外全部 `verified:false`**:税级/税率是 2024/2025 best-effort(新补的 32 州置信度更低),MFJ 用 single 近似,部分州标准扣除/local 税未建模。
- [ ] **上线硬门槛 · 税数据核验**:逐州对官方来源(各州 DoR / IRS / Tax Foundation)核所有 `verified:false`;补 MFJ 独立税级;建模 local/county 税(IN/MI/MD/AL/OR/DE 等)、阈值型(MS)、扣除相关(WI/CT/UT credit)
- [x] **M4 信任页(2026-08-15)**:`/privacy` `/terms` `/contact` `/about`(实质内容,非薄页)+ 页脚导航 + sitemap(39 URL)。E-E-A-T 走**组织优先**(Organization + WebSite schema,无真人作者;方法论+官方来源+准确性承诺撑信任)。
- [ ] **申 AdSense 前必办**:①确认 `hello@netpaywise.com` 收件箱可用 ②核验税数据(见上)③部署上线。(不再需要个人姓名/头像)

## ⚠️ 上线前必办
- **税表数据核验**:`data/tax/us/2026/*.json` 现为 **2025 IRS 基线占位值**(`"verified": false`)。上线前必须替换为官方 2026 税年最终数字(联邦 + 各州)。YMYL 算错=信任惩罚。
- 域名已注册 ✅;需站长提供 About 页个人品牌素材(姓名/简介/头像)。

## 文档索引
- `01-keyword-research.md` — OpenSEO 关键词挖掘结果(计算器品类、可赢词、CPC)
- `02-serp-validation.md` — 三方交叉验证(真实 SERP + seo-sxo + DataForSEO)
- `03-domain-research.md` — 域名可用性核验过程与结论
- `04-scope-strategy.md` — 工具范围三层模型(核心 / 邻接 / 不做)
- `05-geo-market-strategy.md` — 地域/多国策略(v1 美国,i18n-ready,分阶段扩展)
- `06-site-architecture.md` — 站点架构(hub-and-spoke + 内链矩阵 + 首批30页)
- `cluster-plan.json` — 架构机器可读版(集群/spoke/内链/schema)
- `07-PRD.md` — 正式需求文档(功能/引擎/数据模型/前端/SEO/性能/合规/里程碑)

## 数据来源与约束
- OpenSEO(DataForSEO 后端),美国市场 locationCode 2840 / en。
- 本轮关键词挖掘 + SERP 验证共消耗 ~233 credits,账户余额约 46 credits(2026-08-15)。后续深挖新品类需充值或用免费 skill。
