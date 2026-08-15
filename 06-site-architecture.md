# 06 · 站点架构(Hub-and-Spoke)

方法:seo-cluster(SERP 重叠聚类 + 枢纽-辐条 + 内链矩阵)。因实时 SERP 被反爬挡,基于已验证数据(见 01/02)+ 意图聚类设计。**这是工具站**:pillar=枢纽/分类页,spoke=单个计算器工具页。

## 三大集群(cluster)

### 🎯 Cluster A — Paycheck & Take-Home Pay(核心,最高 CPC)
**Pillar A**:`/paycheck-calculator` — 全美到手工资计算器 + 指南(可切换州)
Spokes:
- `/paycheck-calculator/[state]` × 50 — **程序化**,paycheck calculator [state](CPC $13–20,核心money页)
- `/hourly-paycheck-calculator` — 时薪到手工资
- `/salary-paycheck-calculator` — 年薪到手工资
- `/salary-to-hourly` — 年薪↔时薪换算
- `/overtime-calculator` — 加班费
- `/bonus-tax-calculator` — 奖金税后
- `/w4-calculator` — W-4 预扣税

### 🎯 Cluster B — Income Tax(核心,与 A 强耦合)
**Pillar B**:`/income-tax-calculator` — 全美所得税计算器 + 指南
Spokes:
- `/federal-income-tax-calculator` — 联邦所得税
- `/state-income-tax-calculator` — 州所得税(可切州;深词并入 A 的州页)
- `/self-employment-tax-calculator` — 1099 自雇税
- `/sales-tax-calculator` — 销售税
- `/reverse-sales-tax-calculator` — 反算销售税

### 🔗 Cluster C — Loans & Mortgage(邻接,v1 一起做,仅工具意图)
**Pillar C**:`/loan-calculator` — 贷款&房贷计算器总览 + 指南
Spokes:
- `/mortgage-payoff-calculator` — 房贷提前还清(60.5K/mo,**流量磁石**)
- `/simple-loan-calculator` — 简易贷款(SERP 已有独立站)
- `/amortization-calculator` — 分期还款表
- `/mortgage-affordability-calculator` — 我能买多贵的房
- `/auto-loan-calculator` — 汽车贷款月供
- `/debt-payoff-calculator` — 债务还清
- `/savings-calculator` — 储蓄/复利

> ❌ 排除:cash-out refinance、current mortgage rates、refinance rates(SERP 被银行锁死)

## 内链矩阵(要点,完整见 cluster-plan.json)

规则(改编自 seo-cluster,适配工具站):
- **每个 spoke → 所属 pillar**(强制,双向)。
- **Pillar A ↔ Pillar B**(paycheck 与 income tax 意图高度重叠,强互链)。
- **跨集群漏斗(把权重导向高 CPC 页)**:
  - Pillar C / `mortgage-affordability` → `salary-paycheck`/Pillar A("先算清到手工资再看购房力")
  - `mortgage-payoff`(60K 流量磁石)→ `affordability` → Pillar A,把大流量导向收入集群
- **50 个州页不互相全连**(防链接爆炸):每州页 → Pillar A(上)+ 对应州所得税(若有)+ 4 个热门州(CA/TX/NY/FL)+ `hourly`/`salary` 工具。
- **底线**:每页 ≥3 条入链;无孤儿页(距 pillar ≤2 跳);锚文本用目标关键词。

## 页面内容规格(工具站)
| 页型 | 交互 | 文字 | Schema |
|---|---|---|---|
| Pillar 枢纽 | 主计算器(可切州/参数) | 1500–2500 字指南 + 全 spoke 链接 | ItemList + BreadcrumbList + FAQPage |
| 工具 spoke | 单一计算器 | 400–800 字(用法/公式/示例/FAQ) | WebApplication + FAQPage + BreadcrumbList |
| 州页(程序化) | 预置该州参数 | 500–900 字州专属(税率/税级/说明) | WebApplication + FAQPage + BreadcrumbList |

## 首批页面清单(30 页,按优先级)
先建核心(A+B)立话题权威,再上邻接(C);50 州分两批。

**Tier 1 — 地基与最高价值(A 集群 + 头部州)**
1. Pillar A `/paycheck-calculator`
2. `/hourly-paycheck-calculator`
3. `/salary-paycheck-calculator`
4. `/salary-to-hourly`
5–16. 12 个头部州:CA, TX, FL, NY, **VA**($20 CPC), **WI**($13.55), **CT**, GA, PA, IL, OH, NC

**Tier 2 — 税务集群(B)**
17. Pillar B `/income-tax-calculator`
18. `/federal-income-tax-calculator`
19. `/self-employment-tax-calculator`
20. `/sales-tax-calculator`
21. `/reverse-sales-tax-calculator`
22. `/w4-calculator`
23. `/overtime-calculator`
24. `/bonus-tax-calculator`

**Tier 3 — 贷款/房贷集群(C,含流量磁石)**
25. Pillar C `/loan-calculator`
26. `/mortgage-payoff-calculator`(60K 流量磁石)
27. `/simple-loan-calculator`
28. `/amortization-calculator`
29. `/mortgage-affordability-calculator`
30. `/auto-loan-calculator`

**批次2(程序化滚动)**:剩余 38 个州 paycheck 页 + `debt-payoff` + `savings` + `state-income-tax` 深词页。

## 防关键词自噬
- 无两页共享同一主词;`paycheck calculator [state]` 各州唯一,与 Pillar A(全美)不冲突。
- `state income tax` 深词(如 california income tax)并入对应州页/州所得税页,不单开重复页。
