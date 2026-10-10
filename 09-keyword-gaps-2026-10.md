# 09 · 大站关键词缺口与长尾方向（2026-10-10）

> 问题：在不和 ADP / SmartAsset / PaycheckCity 正面硬碰的前提下，哪些长尾有真实搜索量、大站做得弱，而我们（只核实了联邦 + 9 个无所得税州）能做准？
> 站点：netpaywise → 新域名 takehomepal.com（代码未改名）。前置文档：08（可行性复核）、01、02。

---

## 0. 先说结论

**最重要的发现**：大站留下的长尾空位，基本都**已经被 2025–2026 年新注册的 AI 批量小站填上了**。本次在 DDG（Bing 索引）上查了 9 个长尾词，每个词前 8 名里都有 5–8 个这类新站（RDAP 显示 17 个抽查域名的注册时间全在 2025-08 到 2026-07 之间，见 §6）。所以本报告的排序依据不是「哪里没人」，而是三条：

1. 需求有多大；
2. 我们的维护成本有多低：只依赖联邦参数，或者参数由法律写死到 2028 年；
3. 时间窗口：新法规类词在 2027 年 1–4 月报税季会是平时的 2–3 倍，现在上线还来得及被收录。

**⚠️ 本轮缺 Google SERP 数据**：Serper 余额 −9（账户接口返回 `{"balance":-9}`，查询报 `Not enough credits`），SerpApi 本月 250/250 已用完，SearchApi 按要求没动，DataForSEO 未验证。所以 SERP 只有两类数据：DDG（免费，Bing 索引，**不等于 Google 排名**），以及 08 文档昨天用 Serper 拉的 Google 前 10（复用 `/tmp/npw/data/serp.json`）。**AI 概览本轮完全没有核实。** 正式开工前建议给 Serper 充最低一档，用约 25 次查询复核下表 P1/P2 的词。

### 推荐的下一批页面

日搜索量 = Google Trends 换算的**广义词族**（含各种变体），精确词约 ×0.7，误差 ±40%（方法见 §1）。

| 优先级 | URL | 目标词族 | 估算日搜索量（当前 / 报税季） | SERP 弱点证据 | 开发量 | 维护量 | YMYL 风险 |
|---|---|---|---|---|---|---|---|
| **P1** | `/overtime-calculator/`（把 `_parked/overtime-calculator` 复活，内置 no tax on overtime 扣除） | overtime calculator (with taxes / after tax / texas)、no tax on overtime calculator、overtime tax deduction calculator | overtime calculator ~1,040 / ~2,900；no tax on overtime calculator ~5 / ~620；"no tax on overtime" 大词族 ~1,440 / **~9,700** | Omni 有 overtime 计算器，但不算扣除；calculator.net 没有 overtime 页；PaycheckCity 没有加班扣除计算器；DDG 前 8 里 6 个是 2026 年新站加 TurboTax 博客，**没有大站专门做「加班到手 + 年底扣除 + W-4 第 4(b) 步」三合一** | 中（组件已有，加 Schedule 1-A 引擎，约 1–1.5 人日） | 低：$12,500/$25,000 和 $150K/$300K 是法条写死的固定值（2025–2028），每年只跟着联邦税级更新 | 中：要讲清 FLSA 资格；州法规定的加班（如 CA 日加班）不算 |
| **P1** | `/take-home-pay/texas/70000/` 这类「无所得税州 × 年薪档」程序化页，**先只做 TX、FL**：年薪 20 档 + 时薪 12 档，共约 64 页 | "70k after taxes texas"、"$X salary after taxes florida"、"20 an hour after taxes texas"、"… monthly / biweekly" | "after taxes texas" ~1,680 / ~2,140；"after taxes florida" ~1,330 / ~1,630（**同比 +19% / +25%**，是本轮唯一在涨的工资类词）；9 个无税州合计外推 ~4,200（未核实） | Suggest 里每个金额都有 10 条补全，说明需求在每个金额上都摊开了。但 DDG 前 8 已有 talent.com（每州 159 档）、realtakehomepay（每州 14 档）、icalculator、takehometax（2026-03 注册）、truesalarycalculator（2026-06）、salary-calculate（2026-03）。**大站（ADP/SmartAsset）不做金额页，空位已被新站占满** | 中（复用 engine，加模板和内链，约 1.5 人日） | **极低**：无州税，只依赖联邦一个文件，每年 1 月重新生成 | 低：纯算术，参数已核实 |
| **P2** | `/schedule-1-a-calculator/` 总页 + `/no-tax-on-tips-calculator/` + `/senior-deduction-calculator/` + `/car-loan-interest-deduction-calculator/` | no tax on tips (calculator / refund)、senior bonus deduction (phase out) calculator、car loan interest deduction calculator | "no tax on tips" 词族 ~1,260 / ~5,700；car loan interest deduction ~350 / ~2,550；senior deduction calculator ~5 / ~115；tips calculator ~0 / ~77 | 大站：SmartAsset 只有文章，Omni、calculator.net、PaycheckCity 都没有（PaycheckCity 的 taxtip 是小费预扣，不是扣除）。DDG 前 8 **全部是 2026 年新站**（ustax.tools、taxlawtools、newdeductioncalc、statecalc、newtaxtools…），没有权威大站 | 低（和 P1 共用引擎，每页约 0.3 人日） | 低：金额法定不调，**2028 年后作废**，只有 3 个报税季可吃 | 中高：小费限 IRS 名单职业、SSTB 排除；车贷限新车、美国总装、2024 年后的贷款 |
| **P2** | 在 `/1099-tax-calculator/` 上加两样：「安全港预缴」模式（100% / 110% 上年税额）和「每期该存多少」 | quarterly estimated tax calculator、safe harbor estimated tax、how much to set aside for taxes 1099 | quarterly tax calculator ~70 / ~265；1099 tax calculator ~400 / ~1,180 | free1099calc（2025-10 注册）在 Google #5，说明新站进得去；Suggest 有 "how much to set aside for taxes 1099 in texas / florida / washington state" | 低（0.5 人日，不加新页） | 低 | 中 |
| **P3** | `/1099-tax-calculator/texas/`、`/florida/`（只做无税州） | 1099 tax calculator texas / florida、self employment tax calculator texas | 未单独测量。父词 1099 tax calculator ~400 / ~1,180，州变体估计占 10–20%（未核实） | DDG 前 8 全是新站和 Keeper（texastaxcalculator 2026-05、selfemployedcalc 2025-11…），已拥挤 | 低 | 极低 | 中 |
| **P3** | `/bonus-tax-calculator/texas/`、`/florida/` | bonus tax rate texas、bonus tax calculator texas / florida | bonus tax calculator 词族 ~300 / ~880，州变体只占一部分（未核实） | DDG：PaycheckCity 占 2 席，加 realtakehomepay、statecalc、texastaxcalculator、takehometax（全是 2026 年站） | 很低 | 极低 | 低 |

**建议顺序**：先上 P1 的 overtime 页和 TX/FL 程序化页（2–3 人日，2026-11 中旬前上线，赶 1 月报税季收录）→ 再上 P2 的 Schedule 1-A 系列（1 人日）→ 观察 GSC 6–8 周。如果程序化页有 ≥10 页进前 20，再扩到 WA、TN、NV 等其余 7 个无税州。P3 最后做，或者不做。

---

## 1. 数据口径（全部 2026-10-10 拉取）

| 数据 | 来源 | 文件 |
|---|---|---|
| 大站页面版图 | 直接 curl 各站 robots.txt 里的 sitemap，递归展开 | `/tmp/thp-kw/sitemaps/*.txt` |
| 联想词 | Google Suggest（`client=firefox&hl=en&gl=us`）：224 个种子，其中 26 个做了 a–z 扩展，共 900 次请求 | `/tmp/thp-kw/suggest/s1.json`、`s2.json` |
| 搜索量与走势 | Google Trends（美国，周数据，2024-10-01 至 2026-10-09），9 组全部成功（1 次 429 后重试成功） | `/tmp/thp-kw/trends/tr.json`、`tr2.json` |
| SERP | DDG（`scripts/serp-ddg.mjs`，Bing 索引）9 个词；Google 前 10 复用 08 的 Serper 数据（10-09） | `/tmp/thp-kw/serp/ddg.txt` |
| 竞品注册日期 | RDAP（Verisign） | `/tmp/thp-kw/serp/rdap.txt` |
| 法规参数 | IRS 官网和表单 PDF | `/tmp/thp-kw/irs/` |

**Trends 换算方法**：
- 锚点用 08 已校准的三个词：mortgage payoff calculator（Ads 60,500/月）、salary to hourly（08 文档 ~368K/月）、take home pay calculator（~100K/月）。每组按「词 ÷ 锚点」× 锚点日均来换算。
- **交叉验证**：同一个词放在两个不同锚点的组里，结果很接近：no tax on overtime 12 个月日均 5,724 vs 5,590，no tax on tips 3,374 vs 3,236，SALT 3,412 vs 3,332。paycheck calculator texas 换算出 1,299/天，08 文档是 ~1,290。
- 低分辨率的组（锚点平均值只有 2–3）都用更大的锚点重跑过。
- 和 08 一样，Trends 是广义匹配，比 Ads 精确词高 1.3–1.5 倍。

---

## 2. 方向 1：大站的关键词版图（sitemap 实测）

| 站 | sitemap URL 数 | 工资/税相关页面结构 | 反推在吃的词族 | 没做的 |
|---|---|---|---|---|
| **PaycheckCity** | 1,581 | `/calculator/{类型}/{州}`，12 种类型 × 57 个辖区：salary、hourly、grossup、dualsalary、dualhourly、divorce、marriage、children、agbonus、flatbonus（44 州）、taxtip、401k，外加 w4 | 「<州> paycheck / bonus / gross up calculator」 | **没有金额页**，没有 OBBB 扣除计算器，没有 1099 |
| **SmartAsset** | 10,269（1 个子 sitemap SSL 失败） | `/taxes/{州}-tax-calculator` × 51；工资页不在抓到的 sitemap 里；其余是 778 篇 /taxes/ 文章 | 「<州> income tax / paycheck calculator」 | OBBB 只有文章（trump-overtime-tax-plan、do-you-have-to-pay-taxes-on-tips），**没有计算器**；没有金额页 |
| **Omni Calculator** | 9,001（含多语言） | 美国相关：salary-to-hourly、hourly-to-salary、overtime、6 个州 overtime（CA/FL/GA/IL/NY/TX）、texas-tax、california-tax、fica-tax、child-tax-credit、tax-bracket、trump-tax | 换算类、加班类 | **没有** bonus tax、1099 / 自雇、no tax on overtime / tips、senior |
| **calculator.net** | 222 | take-home-pay、salary、tax、commission、hours | 头部通用词 | 没有 bonus、1099、overtime、OBBB |
| **realtakehomepay**（2025-12 注册） | 1,189 | 每州 hub + hourly + overtime + bonus + **14 个年薪档**（40k–200k）× 51；9 个城市页；`/hourly/12-an-hour`…`60-an-hour`（24 页，只做全国）；`/bonus/500`…（14 页）；175 篇 resources | 「$X after taxes <州>」「$X an hour after taxes」「bonus after tax」 | 时薪不分州；没有 OBBB 扣除计算器（只有 overtime-paycheck-calculator） |
| **talent.com** | 8,109 | `/tax-calculator/{State}-{金额}`，每州 **159 档**（18,000 起，步长 2,000）× 51 | 「$X salary after tax <州>」 | 只做年薪档 |
| **yourincomecalculator**（2026-02 注册） | 1,825（多国） | 美国 172 页，包括 `/us/calculators/no-tax-on-tips`、`no-tax-on-overtime`、`senior-deduction`、`quarterly-tax`、`side-hustle-tax`、`tip-tax` | 每个工具词一页 | 不做州、不做金额 |
| **free1099calc**（2025-10 注册） | 28 | 1 个计算器 + quarterly-tax-deadlines、mileage-log、state-tax-comparison 和 10 篇博客 | 1099 tax calculator | 页数很少，但 Google #5 |
| NerdWallet / calculatorsoup | — | sitemap 返回 403 / SSL 错误 | **未核实** | — |

**realtakehomepay 的单页内容**（实抓 `/states/texas/take-home-pay/salary/70000`）：
- 标题 "$70,000 After Taxes in Texas (2026)"，正文约 900 词，带 FAQPage schema。
- 区块：钱去哪了 → 按发薪频率拆分 → 7 条 FAQ（biweekly、和邻州比、远程给纽约公司打工）→ 全国排名 → 跨州对比 → 链到同州 7 个其他年薪档。
- 换句话说，**每页都有「这个金额才有的」数字和对比**，不是只换了数字的薄页。我们做程序化页至少要达到这个水平，才不会被当成 scaled content。

**结论**：
- 大站（ADP/SmartAsset/PaycheckCity）的版图是「州 × 工具类型」，**不做金额页，也不做 OBBB 计算器**。
- 这两块正是新站集中涌入的地方。
- talent.com 用 159 档 × 51 州的规模压着金额词，realtakehomepay 用 14 档但内容更厚。

---

## 3. 方向 2：新法规（OBBB / Working Families Tax Cuts，P.L. 119-21）

### 3.1 需求（Trends，美国，日均，广义词族）

| 词 | 12 个月均（2025-10 至 2026-09） | 近 8 周 | 2026 报税季（1 月至 4 月中） | 2025-07 立法月 | 去年同期（8–10 月） | 峰值周 |
|---|---|---|---|---|---|---|
| no tax on overtime | 5,590–5,724 | 1,444 | **9,685** | 26,950 | 5,895 | 2025-06-29 |
| no tax on tips | 3,236–3,374 | 1,258 | 5,695 | 9,922 | 3,074 | 2025-05-18 |
| salt deduction | 3,332–3,412 | 1,258 | 5,590 | 7,127 | 2,236 | 2025-06-29 |
| car loan interest deduction | 1,290–1,308 | 123–349 | 2,550–2,710 | 1,397 | 123–489 | 2026-01-25 |
| tax refund calculator（参照） | 3,881 | 908 | 8,140 | 1,118 | 1,258 | 2026-01-18 |
| no tax on overtime calculator | 316 | 5 | 618 | 607 | 222 | 2025-06-29 |
| big beautiful bill tax calculator | 75 | 0 | 109 | 797 | 109 | 2025-06-29 |
| senior deduction calculator | 54 | 5 | 115 | 45 | 23 | 2026-02-01 |
| no tax on tips calculator | 27 | 0 | 77 | 54 | 0 | 2025-07-06 |

**怎么读**：
- 「新闻词」（立法前后的 no tax on overtime / tips）已经退潮，但**报税季又起来了**：2026 年 1–4 月是现在的 6–7 倍。
- 2027 年 1–4 月（报 TY2026）和 2028 年（报 TY2027）还会再来两次；TY2028 报税季（2029 年）以后作废。
- 名字里带 "calculator" 的精确词量很小（几十到几百/天）。真正的流量在「词族 + 意图修饰」：Suggest 里有 refund calculator、how much will I get back、married filing jointly、double time、phase out calculator、2026 calculator。
- **对 2027 报税季的预期**：参照 2026 季的形状，1 月第 3–4 周起量、2 月峰值、4 月中回落。页面要在 **2026 年 11 月底前被收录**。

### 3.2 Suggest 证据（摘录）

- no tax on overtime calculator：a–z 扩展得到 **76 条**补全，包括 irs、turbotax、married filing jointly、double time、texas、2026、white house，以及一长串 "near <州>"（说明有人在找本地报税服务）。
- senior deduction：24 条，包括 $6000 senior deduction phase out calculator、senior bonus deduction 2026 calculator、excel free download、married filing jointly。
- car loan interest deduction：phase out calculator、vin lookup、eligibility、2026。
- W-4 相关：qualified overtime compensation on w4、qualified tips w4。原因是 **2026 版 W-4 的 Step 4(b) 工作表新增了小费、加班、车贷利息、老人 $6,000 这几行**（见 §3.4），这是一个「每期到手能多多少」的新意图。

### 3.3 SERP（DDG，Bing 索引，2026-10-10；Google 和 AI 概览**未核实**）

| 查询 | 前 8 |
|---|---|
| no tax on overtime calculator | nationaltaxtools（2026-02）、ustax.tools、TurboTax 博客、taxbreakcalc（2026-06）、notaxovertimecalculator.com（2026-01）、taxlawtools（2026-07）、thecalcs（2025-08），外加 1 条无关结果 |
| senior deduction calculator | ustax.tools、newdeductioncalc（2026-07）、taxlawtools、returnmytax（2026-03）、govfacts、fitaxguy（博客）、statecalc（2026-02）、newtaxtools（2026-07） |
| car loan interest deduction calculator | ustax.tools、newdeductioncalc、taxlawtools、multicalculators、autoloandeductiblecalculator、newtaxtools、statecalc、taxbreakcalculators |
| salt deduction calculator 2026 | nationaltaxtools、statecalc、ustax.tools、taxescalculations、taxbracketcalc、taxpayers.net、truevaluecalc、returnmytax |

**判断**：
- **没有任何大站或权威站有专门的计算器**（TurboTax 只有博客页）。
- 但空位已经被至少 10 个 2026 年注册的 AI 工具站平分了。我们是第 N+1 个，差异化只能靠三点：
  1. 准确，严格按 Schedule 1-A 的取整规则：小费和加班向下取整，车贷向上取整，大多数小站没写；
  2. 把「加班到手（每期）+ 年底扣除 + W-4 第 4(b) 步填多少」做在同一页；
  3. 和我们现有的工资计算器互链。
- Google 上的格局可能不同。Google 对 2026 年批量 AI 站的过滤比 Bing 狠，这一条只能靠充值 Serper 后复核。

### 3.4 IRS 官方参数（做计算器必须照抄这些）

| 项目 | 参数（TY2025 起至 TY2028，金额不随通胀调整） | 出处 |
|---|---|---|
| **No tax on tips** | 每年最高扣 **$25,000**（每个申报表，夫妻合报也是 $25,000）。MAGI 超过 **$150,000 / $300,000（合报）**时，超出额 ÷ $1,000，**向下取整**，每份减 **$100**。职业必须在 IRS 的「2024-12-31 前惯常收小费」名单上。自雇者从事 SSTB 的不适用（雇主是 SSTB 的雇员也不适用）。自雇者的扣除不能超过该业务的净利。必须有 SSN；已婚必须合报。逐项扣除和标准扣除都能用 | [IRS FS-2025-03](https://www.irs.gov/newsroom/one-big-beautiful-bill-act-tax-deductions-for-working-americans-and-seniors)；[Schedule 1-A (2025) 第 7–13 行](https://www.irs.gov/pub/irs-pdf/f1040s1a.pdf) |
| **No tax on overtime** | 只算 **FLSA 第 7 条要求的**加班里「超过正常时薪的部分」（如 1.5 倍里的 0.5）。上限 **$12,500 / $25,000（合报）**。MAGI 超过 $150,000 / $300,000 后，每 $1,000（**向下取整**）减 $100。FLSA 豁免员工、只因州法或工会合同才有的加班不算；雇主多付超过 FLSA 要求的部分也不算 | 同上；[IRS 加班扣除 Q&A](https://www.irs.gov/newsroom/questions-and-answers-about-the-new-deduction-for-qualified-overtime-compensation)；Schedule 1-A 第 14–21 行 |
| **车贷利息** | 上限 **$10,000**。MAGI 超过 **$100,000 / $200,000（合报）**后，超出额 ÷ $1,000，**向上取整**，每份减 **$200**。条件：贷款发放于 2024-12-31 之后；新车（原始使用人是本人）；个人用途；以车辆作抵押；车辆毛重小于 14,000 磅；在美国完成总装（看车窗标签或 VIN，可用 NHTSA 解码）；申报表上要填 VIN。租赁不算；再融资一般可以 | FS-2025-03；Schedule 1-A 第 22–30 行 |
| **老人加计扣除** | 年满 65 岁（TY2025 是 1961-01-02 前出生），每人 **$6,000**，夫妻都符合就是 $12,000。MAGI 超过 **$75,000 / $150,000（合报）**后，超出额 × **6%** 从 $6,000 里扣减。可以和原有的老人附加标准扣除叠加（**TY2026：$1,650；单身或户主 $2,050**） | FS-2025-03；Schedule 1-A 第 31–37 行；[Rev. Proc. 2025-32](https://www.irs.gov/pub/irs-drop/rp-25-32.pdf) §63(f) |
| **儿童税收抵免（TY2026）** | 每个孩子 **$2,200**，可退还部分 **$1,700**；AGI 超过 $200,000 / $400,000 开始递减；ACTC 要求劳动收入 ≥ $2,500 | Rev. Proc. 2025-32 §.05；[IRS CTC 页](https://www.irs.gov/credits-deductions/individuals/child-tax-credit) |
| **SALT 上限** | TY2025：$40,000（分开报 $20,000），MAGI 超过 $500,000 开始递减（见 [Schedule A 2025 第 5e 行](https://www.irs.gov/pub/irs-pdf/f1040sa.pdf)）。TY2026：法条值 $40,400 / $505,000，按超出额 30% 递减，最低降到 $10,000——**IRS 2026 版表单还没出，本次没在 IRS 官网核到 2026 数值，未核实** | — |
| **TY2026 联邦基础**（复核） | 标准扣除：$16,100 单身 / $32,200 合报 / $24,150 户主。税级：10% 到 $12,400；12% 到 $50,400；22% 到 $105,700；24% 到 $201,775；32% 到 $256,225；35% 到 $640,600；以上 37%（合报对应 $24,800 / $100,800 / $211,400 / $403,550 / $512,450 / $768,700） | [IR-2025-103](https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill) |
| **2026 版 W-4** | Step 4(b) 的 Deductions Worksheet 第 1a–1c 行：收入低于阈值时，可以填预计的小费（≤ $25,000）、加班（≤ $12,500 / $25,000）、车贷利息（≤ $10,000）；第 3a/3b 行：65 岁以上每人填 $6,000 | [Form W-4 (2026)](https://www.irs.gov/pub/irs-pdf/fw4.pdf) |

**实现上的三个坑**：
1. 小费和加班的扣减按每 $1,000 **向下取整**，车贷**向上取整**，老人用 6% 不取整。
2. 这四项都是**扣除**（减少应税收入），不是抵免。省下的税 ≈ 扣除额 × 边际税率，并且**不减 FICA**（社保和医保照交）。
3. MAGI 用的是 1040 第 11b 行，境外收入要加回。我们的用户群里基本不涉及，但页面上要注明。

---

## 4. 方向 3：程序化长尾（金额 × 州 / 金额 × 换算）

### 4.1 需求

| 词族（Trends 广义） | 12 个月日均 | 近 8 周 | 同比（近 8 周 ÷ 去年 8–10 月） | 说明 |
|---|---|---|---|---|
| "after taxes"（全部「X after taxes」） | ~46,000 | ~44,000 | ×1.24 | 包含所有州和各国 |
| "a year is how much an hour" 和 "an hour is how much a year" | ~33,600 | ~37,500 | ×1.06 | Trends 把这两个词当成同一组词（词序无关），数值完全一样 |
| "a year after taxes" | ~6,800 | ~7,500 | ×1.24 | 全国 |
| "an hour after taxes" | ~4,900 | ~6,250 | ×1.47 | **峰值在 2026-09-27，还在涨** |
| "after taxes texas" | ~1,875 | ~1,680 | ×1.19 | — |
| "after taxes florida" | ~1,420 | ~1,330 | ×1.25 | — |

- 和 08 文档里「工资类词同比全线下跌」相反，**「金额 + after taxes」这一族在涨**。一种解释是：用户从「打开计算器自己填」转向「直接搜一个具体数字」。
- 其余 7 个无税州：按 TX/FL 的人均搜索率（每百万人口约 55 次/天）外推，WA 约 450、TN 约 400、NV 约 180，SD/WY/AK/NH 合计约 200，**9 州合计约 4,200/天**（广义，**未核实**）。

### 4.2 Suggest 构成

- 12 个年薪档（40k–200k）× TX/FL：每个都有 7–10 条补全。
- 高频修饰词依次是：**monthly、biweekly、salary、married filing jointly、"how much is $X a year after taxes in <州>"**。
- 时薪档（15–50）× texas：每个 5–10 条，修饰词是 a year / a month / a week / biweekly after taxes in texas。
- 规律：用户要的是**一个直接的数字 + 按发薪频率拆分**。这正是 realtakehomepay 单页的结构。
- 无税州里 **washington state 单独成词**（"70k after taxes washington state"、"60000 a year after taxes washington state"），要和 DC 区分开。

### 4.3 SERP（DDG）

| 查询 | 前 8 |
|---|---|
| 70k after taxes texas | truesalarycalculator（2026-06）、talent.com、salary-calculate（2026-03）、icalculator、realtakehomepay、takehometax ×2（2026-03）、ADP |
| 25 an hour is how much a year | salarytohourly.com、thecalculatorsite、inchcalculator、calculatorbank、salarytohour（2026-02）、truesalarycalculator、salarycalculator.info、calculator-convert |

- **金额 × 州**：大站只有 ADP 混在里面，其余都是程序化站。进得去，但要拼内容厚度和规模。
- **纯换算**（"$25 an hour is how much a year"）：答案是一个乘法，Google 很可能直接在顶部给答案或 AI 概览（本轮**未核实**，08 文档实测 "salary to hourly" 的 AI 概览已经直接给出公式）。小站已经有 8 个以上。**不建议做纯换算的金额页**，见 §8。

### 4.4 怎么做（P1 页面规格）

- URL：`/take-home-pay/{state}/{amount}/` 年薪档；`/take-home-pay/{state}/{rate}-an-hour/` 时薪档。
- 先做 TX、FL：年薪 30k–200k 共 20 档（30/35/40/45/50/55/60/65/70/75/80/85/90/95/100/110/120/130/150/200k）；时薪 15–50 共 12 档。共 64 页。
- 每页内容：
  - 第一屏直接给答案（年 / 月 / 两周 / 周到手，单身和合报两列）；
  - 联邦税和 FICA 的拆分；
  - **2026 新扣除提示**：这个金额的人有加班或小费时能省多少，链到 P1/P2 页（**大站和 realtakehomepay 的金额页都没有这一块**，是我们唯一的内容差异点）；
  - 和一个有所得税的邻州对比：只能写「对比结果来自 X 州税率」，**而那 41 州的数据还没核实**，所以首版不放邻州对比，改成「同州相邻金额档」；
  - FAQ schema；
  - 内链到同州上下 4 档。
- 维护：每年 1 月换联邦文件后重新构建，零手工。

---

## 5. 方向 4：1099 / 自由职业

| 词 | 12 个月日均 | 近 8 周 | 报税季 | 证据 |
|---|---|---|---|---|
| 1099 tax calculator | 692 | 396 | 1,182 | Google（10-09）前 10：Everlance、Keeper、Pilot、Jackson Hewitt、**free1099calc #5（2025-10 注册）**、Nationwide、MileIQ、Bonsai、reedcorp |
| self employment tax calculator | 332 | 207 | 487 | Google 前 10 全是 TaxAct、Jackson Hewitt、IRS、银行，**没有新站** |
| quarterly tax calculator | 151 | 69 | 265 | — |
| doordash tax calculator | 55 | 28 | 147 | DDG 前 8：Everlance 加 7 个新站（sidehustlecalculators 2026-05、gigwisetax 2026-03…） |
| uber / instacart / lyft / grubhub / spark / amazon flex tax calculator | 未测（Suggest 补全只有 1–5 条，量级明显小于 doordash） | — | — | — |

- Suggest 里 1099 tax calculator 的 a–z 扩展有 54 条：
  - 州变体很多（texas、florida、nevada、ga、mi…）；
  - 意图修饰：with deductions、quarterly、per paycheck、how much will i owe、hourly、monthly。
- "how much to set aside for taxes 1099" 在 texas、florida、washington state 都有补全。
- **判断**：
  - 主页面已经上线，增量来自「安全港 + 每期存多少」两个功能（P2），不用新开页。
  - 州变体只做 TX/FL（P3）。
  - 平台页（doordash 等）单页量太小，已有 7 个以上新站，而且要处理里程扣除（2026 年标准里程费率本轮**未核实**），**不做**。

---

## 6. 方向 5：奖金 / 补充工资

| 词 | 12 个月日均 | 近 8 周 | 报税季 | 证据 |
|---|---|---|---|---|
| bonus tax calculator | 622 | 295 | 883 | Google 前 10：PaycheckCity ×2、SurePayroll、coad、calcxml、viventium、OnPay、**realtakehomepay #8**、TurboTax 博客、**yourincomecalculator #10** |
| commission tax calculator | 122 | 26 | 198 | Suggest 混着大量加拿大、英国、南非结果 |
| severance tax calculator | 7 | 0 | 13 | Suggest 一半是加拿大和德国 |
| rsu tax calculator | ≈0（低于 Trends 下限） | — | — | Suggest 有，但量太小 |

- "bonus tax rate" 的 a–z 扩展有 150 条，**按州**（texas、california、nyc、colorado、virginia、nc…）和 "2026 vs 2025"、"big beautiful bill" 是主要修饰。
- 「bonus tax rate texas」在 DDG 前 8 里有 PaycheckCity ×2 加 6 个程序化站。
- **判断**：只给现有奖金页加 TX/FL 两个州变体（P3）。佣金、遣散、RSU 量太小，或者要处理复杂的 AMT 和股权规则，**不做**。

---

## 7. 方向 6：其他发现

- **overtime calculator** 12 个月日均 ~1,935，报税季 ~2,900（峰值 2026-01-25，和 no tax on overtime 同步）。
  - Suggest 的 a–z 扩展有 219 条，美国意图有 with taxes、after tax、texas、florida、bi weekly、double time、各州名。
  - 我们 `_parked/overtime-calculator` 已经有组件，**这是 P1 页的流量主力**，no tax on overtime 是它的差异点。
- **tax refund calculator**：12 个月日均 ~3,900，报税季 ~8,100，Suggest 有 "2026 with overtime"。
  - 要完整的 1040 引擎（各种抵免和扣除），SERP 是 TurboTax、H&R Block、IRS。**不正面做**。
  - 但在 P1/P2 页的标题和 FAQ 里覆盖 "no tax on overtime refund calculator" 这类长尾。
- **gross up calculator**（for bonus / for taxes）：PaycheckCity 每州都有，Suggest 补全强。我们只用联邦 + 无税州也能做准。本轮没测 Trends，**未核实**，列为候选。

---

## 8. 不建议做的方向

| 方向 | 原因 |
|---|---|
| 纯换算金额页（"$X a year is how much an hour"、"$25 an hour annually"） | 词族约 3.4 万/天，量最大，但答案就是一个乘法，Google 计算器或 AI 概览直接答（08 已证实 salary to hourly 的概览给了公式）；DDG 前 8 已有 8 个同类站。在现有 `/salary-to-hourly/` 上补一张常见金额对照表就够了 |
| SALT 计算器 | 词族约 3,300/天，但用户是逐项扣除的中高收入者，集中在 CA/NY/NJ 这些**我们没核实的州**；无税州用户只涉及房产税和销售税，受益很小；DDG 前 8 已有 8 个新站；2026 参数本轮在 IRS 官网没核到 |
| tax refund calculator（正面） | 要完整的 1040 引擎；被报税软件占满 |
| child tax credit calculator | IRS 和报税软件主导，计算简单，差异化空间小 |
| 平台别 1099 页（doordash / uber / instacart…） | 单页日均 < 150，DDG 前 8 已有 7 个以上新站，还牵涉里程费率 |
| 佣金 / 遣散 / RSU | 量太小（severance 7/天，RSU 低于下限），或者规则复杂（RSU、AMT） |
| Trump account calculator | 投资增长类，不是工资税主题 |
| W-4 calculator | 08 已判：IRS 占前 10 里 5 席 |
| 有所得税的 41 州任何金额页 / 州页 | 数据没核实，YMYL |

---

## 9. 风险和待办

1. **最大风险是同质化**：每个推荐方向在 Bing 上都已经有 5–10 个 2026 年 AI 站。我们的差异点只有：准确（Schedule 1-A 取整规则、FLSA 边界）、「到手 + 扣除 + W-4」一页讲清、页面之间互链。
2. **开工前**给 Serper 充最低一档，用约 25 次查询复核 Google 前 10 和 AI 概览。优先这几个词：no tax on overtime calculator、overtime calculator with taxes、70k after taxes texas、100k after taxes florida、20 an hour after taxes texas、senior deduction calculator、car loan interest deduction calculator、1099 tax calculator texas。如果 Google 前 10 全是大站和老站、没有 2026 年新站，就把 P2 降级。
3. 程序化页要避免被判 scaled content abuse：每页必须有这个金额才有的数字和段落，先做 64 页而不是 1,000 页，看收录率。
4. 以下本轮**未核实**：2026 年 SALT 数值的 IRS 官方出处、IRS 小费职业名单的最终版、2026 标准里程费率、所有 AI 概览情况、Google 实际排名。
