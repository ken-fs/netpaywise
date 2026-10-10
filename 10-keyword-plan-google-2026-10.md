# 10 · 用谷歌真实数据复核关键词方向（2026-10-10）

> 问题：09 报告的 SERP 来自 DDG/Bing，搜索量是用 Google Trends 换算的。这次全部换成谷歌口径的数据重新核一遍：大站和新站在吃哪些词、真实搜索量是多少、谷歌前 10 里都是谁，最后排出该做的页面。
> 站点：takehomepal.com（代码目录 `netpaywise/`，尚未上线）。上线范围不变：联邦 + 9 个无所得税州 + 1099 / 奖金 / 时薪换算工具。

---

## 0. 结论

### 0.1 一句话

- **最该先做的是已经写好的奖金页**：真实搜索量比 09 估的大 2.4 倍，而且谷歌前 10 里有 4 个 2025–26 年的新站，#1 就是新站。
- **其次是加班。** 「overtime calculator」每月稳定在 2.1 万次，「no tax on overtime calculator」报税季每月 3 万次以上。两个词的谷歌前 10 都很弱。
- **09 排第一的 TX/FL 金额页被推翻了。** 两州所有「$X after taxes texas/florida」词加起来每月只有约 6,300 次，09 估高了约 14 倍。前 10 里 talent.com 一家就占了 4–5 个位置。

### 0.2 页面清单（按「月搜索量 × 现实排名对应的点击率 ÷ 开发人日」排序）

搜索量来源：DataForSEO `google.keywords.volume`（Google Ads 口径，美国，英文），2026-10-10 拉取。月度数据只到 2026-08，9 月谷歌还没出。下表各列的意思：
- **月均** = 2025-10 至 2026-08 的平均；
- **8 月** = 2026-08 当月；
- **报税季** = 2026 年 1–4 月的月均。

词族合计时，**月度曲线完全相同的词只算一次**（谷歌把近似变体合并报同一个数），不同簇之间可能还有少量重复，所以合计按上限看。

SERP 来源：DataForSEO `serp-google-organic-live-advanced`（美国、英文、桌面，2026-10-10）。「新站」的标准是 RDAP 显示 2024 年以后注册。

| 优先级 | 页面 URL | 目标词族（代表词） | 谷歌月搜索量：月均 / 8 月 / 报税季 / 峰值月 | CPC（DataForSEO） | 主词前 10 构成 | AI 概览 | 开发量 | 估算点击/月（月均 → 报税季） | 得分 |
|---|---|---|---|---|---|---|---|---|---|
| **P0** | `/bonus-tax-calculator/`（**已有，改标题、补内容**） | bonus tax calculator（24 个变体合成 1 簇）、bonus calculator、bonus after tax calculator | **36,745** / 16,540 / **60,234** / 2026-03：79,850 | 主簇无 CPC；首页竞价 $5.42–20 | 品牌 4、新站 4（**realtakehomepay #1**、financetoolz、payrollanalysistools、paycheckpeek）、其他 1 | 有 | 0.5 人日 | 551 → 900 | **1,102** |
| **P1** | `/no-tax-on-overtime-calculator/`（新开） | no tax on overtime calculator、overtime tax refund calculator、how to calculate overtime for taxes、overtime (tax) deduction calculator | **31,780** / 4,030 / **64,606** / 2026-01：**123,830** | $2.15–6.66 | **品牌 0、政府 0**、用户内容 4（TurboTax 社区、peerlist×2、Instagram）、新站 3、Omni 1、老站 1 | 有 | 1 人日（Schedule 1-A 加班引擎 + W-4 第 4(b) 步） | 477 → 969 | 477 |
| **P1** | `/overtime-calculator/`（复活 `_parked`） | overtime calculator / ot calculator（6 个变体）、time and a half calculator、overtime pay calculator | 主词 3 簇 **41,537**；广义加班计算类 55,156 / 51,050 / 56,565（**没有报税季**） | $3.98–4.34 | overtime calculator：新站 4（smartovertime #2、notaxovertimecalculator #4、overtimecalculatorusa #5、timeandhalfcalculator #7）、品牌 2、大计算器站 1 | 有 | 1 人日 | ~400（全年平稳） | 399 |
| **P1 实验** | `/salary-to-hourly/` 下挂 10 个金额页（如 `/salary-to-hourly/25-an-hour/`、`/60000-a-year/`），每页带 TX/FL 税后数 | 25 / 30 / 35 / 40 an hour is how much a year；60000 / 60k a year is how much an hour… | 前 20 簇合计 **328,053**（单簇 1–3 万）；全族 624,652；**全年平稳** | 基本没有 CPC | 「25 an hour…」：品牌 5、新站 2、用户内容 1、大计算器站 1；「60000 a year…」：品牌 5、新站 2 | **有，概览直接给答案** | 1.5 人日 | 按 0.2% 点击率估约 650（**最不确定**） | ~437 |
| **P1** | `/paycheck-calculator/washington/`（**已有，补 WA Cares + 带薪家庭医疗假保费**） | washington paycheck calculator / wa wage calculator（9 个变体） | 7,282 / 6,600 / 7,725 | $20.51 | 新站 3（allitools、salaryhourlyrate、paycalc.online）、fiscaldata.us、好几个疑似被黑的垃圾页、品牌 2 | 有 | 0.3 人日（**2026 年带薪家庭医疗假费率未核实**） | ~109 | 364 |
| P2 | `/self-employment-tax-calculator/`（新 URL，复用 1099 引擎） | self employment tax calculator（14 个变体） | 10,809 / 9,900 / 15,625 | $4.09 | hellobonsai 占 5 席，新站 3（**free1099calc #4**、financetoolz、selfemployedcalc），honeybook | 有 | 0.5 人日 | ~162 | 324 |
| P2 | `/overtime-tax-calculator/`（加班到手；也可以先做成加班页里第二个可收录的 URL） | overtime calculator with taxes（12 个变体合成 1 簇） | 4,641 / 1,110 / 8,400 / 2025-01：49,740 | $3.68 | **前 9 里有 7 个新站**，外加 getharvest、一个 netlify 子站 | 有 | 0.3 人日 | ~70 → 126 | 232 |
| P2 | `/car-loan-interest-deduction-calculator/`（按「资格说明 + 计算器」做） | 计算器词只有 169/月；信息词 car loan / auto loan interest deduction 26,068 | 计算器 169 / 40 / 362；信息词 26,068 / 5,040 / **51,966** | $0.05–4.63 | 信息词前 10：**4 家汽车经销商**、信用社、Bankrate、Car and Driver、YouTube，新站 0；计算器词：IRS #1、新站 1 | 有 | 0.6 人日（含 VIN 解码） | ~105（大多来自信息词，**不确定**） | 175 |
| P3 | `/no-tax-on-tips-calculator/` | no tax on tips calculator、refund calculator | 1,603 / 320 / 2,894 / 2026-01：5,720 | 无 | 新站 3（remotelaws、taxbreaktools、othercalculators）、老站 2、品牌 2 | 有 | 0.3 人日（共用 Schedule 1-A 引擎） | 24 → 43 | 80 |
| P3 | `/senior-deduction-calculator/` | senior bonus deduction 2025 calculator、phase out calculator | 1,590 / 380 / 3,231 | ≤$1.11 | 「…2025 calculator」：yourincomecalculator（新站）#1；「phase out calculator」：新站 4 | 有 | 0.3 人日 | 24 → 48 | 80 |
| P3 | `/doordash-tax-calculator/`（**2026 标准里程费率未核实**，核实后才能做） | doordash tax calculator、uber tax calculator… | 4,424 / 2,810 / 7,104 | $1.61 | Reddit、Facebook、新站 3、老站 4，**品牌 0** | 有 | 0.5 人日 | ~66 | 132 |
| 延后 | `/take-home-pay/{金额}/`（全国金额页，不分州） | 100k after taxes、60k after tax… | 247 簇合计 25,651；单词 200–500 | 无 | 「100k after taxes」：Quora、ZipRecruiter、新站 1、talent、AOL、Instagram | 有 | 1.5 人日（25 页） | ~103 | 68 |
| 不做 | `/take-home-pay/texas/70000/` 等 TX/FL 金额页（09 的 P1） | 70k after taxes texas… | 149 簇合计 **6,284**；单词 50–240 | 无 | talent.com 每个词占 4–5 席；新站 0–2 | 有 | 1.5 人日（64 页） | ~25 | 17 |
| 不做 | 1099 / 奖金的 TX、FL 独立页（09 的 P3） | 1099 tax calculator texas、bonus calculator texas | 1099 州版合计 651；奖金州版合计 2,343 | — | 1099 texas：品牌 9；bonus calculator texas：品牌 7、realtakehomepay #2 | 有 | 0.3 人日 | ≤10 | ≤31 |

**怎么估点击率**：本次 56 个 SERP 里 55 个有 AI 概览，所以统一打折。
- 前 10 里有 ≥3 个 2024 年后注册的新站（或用户内容 ≥3 条）→ 认为半年内现实能排到 #5–10，点击率按 **1.5%**；
- 只有 1–2 个新站 → 现实排名 #11–20，按 **0.4%**；
- 新站为 0、全是品牌或政府 → 按 **0.05%**。

参照：08 里自家 36 站 GSC 实测，#5–8 是 2.0%，#8–10 是 0.34%。这三档是**假设，不是实测**，只用来排序。时薪换算页因为概览直接给答案，单独再打折到 0.2%。

**建议顺序**：
1. 本周先改奖金页（0.5 天）；
2. 11 月中旬前上线加班两页，外加 Washington 补税项（2.3 天）。这样在 2027 年 1 月报税季前能被收录：no tax on overtime calculator 在 2026 年 1 月是 7.4 万次/月；
3. 同时做 10 个时薪换算页当实验；
4. 12 月再上自雇税页和 Schedule 1-A 的三个小页；
5. 金额页全部延后，看 2027-04 的 GSC 再说。

---

## 1. 第一步：大站和新站在吃哪些词

### 1.1 数据

| 站 | 端点 | 拉了什么 | 行数 |
|---|---|---|---|
| paycheckcity.com | SE Ranking `domain/keywords`（美国库，按流量降序） | 前 3 页 × 1,000 | 去重后 1,788 词 |
| realtakehomepay.com（2025-12 注册） | 同上 | 前 3 页 | 2,320 |
| smartasset.com | DataForSEO Labs `ranked_keywords`，URL 过滤 `%paycheck%` 或 `%tax-calculator%`，搜索量 ≥50 | 前 1,000（匹配总数 36,523） | 1,000 |
| talent.com | 同上，URL 过滤 `%tax-calculator%`，搜索量 ≥20 | 前 1,000（匹配总数 23,561） | 1,000 |
| omnicalculator.com | 同上，`/finance/%` 且词含 tax、overtime、paycheck、salary、hour | 前 1,000（匹配总数 16,371） | 1,000 |
| 新站 25 个 | SE Ranking | 每站前 1,000 | 见 1.3 |

原始文件：`/tmp/thp-kw2/raw/rk_*.json`、`dfs_rk_*.json`、`nk_*.json`；合并后 `/tmp/thp-kw2/rk_all_cls.json`。

### 1.2 大站排在 4–20 名、月搜索量 ≥100、我们能做准的词（摘录）

| 搜索量（SE Ranking / DataForSEO） | 站 | 排名 | 词 | URL | 我们怎么吃 |
|---|---|---|---|---|---|
| 49,500 / 47,227 | SmartAsset | #7 | hourly to salary calculator | /taxes/paycheck-calculator | 现有 `/salary-to-hourly/` 加金额页 |
| 27,100 / 28,736 | Omni | #8 | hourly to salary | /finance/hourly-to-annual-salary | 同上 |
| 22,200 / 22,318 | talent / SmartAsset | #13 / #14 | tax and bonus calculator（谷歌把它和 bonus tax calculator 当成同一个词） | /tax-calculator | **奖金页** |
| 14,800 / 21,155 | notaxovertimecalculator（2026-01 注册） | #8 | overtime calculator | / | **加班页** |
| 9,900 / 22,318 | yourincomecalculator（2026-02） | #16 | bonus tax calculator | /us/calculators/bonus-tax | 奖金页 |
| 14,800 | omni | #18 | 28 an hour is how much a year | /finance/hourly-to-annual-salary | 金额换算页 |
| 8,000 / 12,718 | nationaltaxtools（2026-02） | #20 | 1099 tax calculator | /calculators/1099-tax-calculator/ | 现有 1099 页（谷歌前 10 难进，见 §3） |
| 4,400 / 6,927 | paycheckcity | #4 | bonus tax rate | /calculator/flatbonus/new-york/result | 奖金页 FAQ |
| 4,400 / 21,155 | omni | #4 | how is overtime calculated | /finance/overtime | 加班页 |
| 3,600 / 4,022 | omni | #10–16 | overtime and taxes calculator、overtime tax calculator | /finance/overtime-paycheck 等 | `/overtime-tax-calculator/` |
| 390–420 | realtakehomepay | #5 | bonus tax calculator texas | /states/texas/take-home-pay/bonus | 奖金页加州切换（不单独开页） |
| 390 | statecalc（2026-02） | #6 | 80k after taxes | /salary/new-york-80k-salary-tax-calculator/ | 全国金额页（延后） |

**各站的版图**：
- **PaycheckCity**：本页抓到的 3,000 词，SE Ranking 估月流量约 36 万。在范围内的位次集中在奖金（flatbonus 系列 #4–5）和时薪/年薪换算（#4–15）。
- **SmartAsset**：TX/FL 工资计算器稳定在 #2。时薪类工资计算器 #4–15。
- **talent.com**：各州页对「texas/florida + salary/paycheck calculator」排 #12–21；**金额页在谷歌上对「$X after taxes <州>」排 #1–5，每个词占 4–5 席**（实测 SERP，见 §3）。
- **Omni**：加班 #4–20，换算 #5–20。
- **realtakehomepay**：前 1,000 词估月流量约 9,600。主要靠 TX paycheck（#16–18）、VA/WA paycheck（#11–13）、奖金（实测 SERP #1）。

### 1.3 2025–26 年新站在谷歌上的实际成绩（SE Ranking 估算流量，**是模型估算，不是真实点击**）

| 站（注册） | 估算月流量 | 前 10 的词数 | 靠什么 |
|---|---|---|---|
| nationaltaxtools（2026-02） | 11,516（第 1 页） | 275 | 退税追踪页（ny refund 等），时薪换算 #29 |
| pinebill.app（2025-08） | 6,868 | — | **时薪换算金额页**：293 个换算词、169 个进前 10，换算部分约 4,269/月。例：「27 an hour is how much a year」#3、「55k a year is how much an hour」#1 |
| statecalc（2026-02） | 6,256 | 607 | 失业金计算器（texas unemployment #1）、2026 税级博客 |
| timeandhalfcalculator（2025-10） | 5,412 | 161 | 工时、加班（overtime calculator #19） |
| remotelaws（2025-12） | 4,476 | 605 | 最低工资、各州加班法 |
| yourincomecalculator（2026-02） | 2,108 | 57 | overtime #1（「overtime time」）、奖金 #16 |
| smartovertime（2026-02） | 651 | 24 | overtime calculator（库里 #10，实测 SERP #2） |
| notaxovertimecalculator（2026-01） | 413 | 10 | overtime calculator #8 |
| floridataxcalculator（2026-05） | 243 | 0 | FL 税计算器 #21–29 |
| salarycalculatoraftertaxes（2026-03） | 49 | 23 | 金额页 |
| paycheckpeek（2026-04） | **0** | 0 | 金额页，1,000 个词全在 50 名外 |
| free1099calc（2025-10） | 2 | 0 | 「free 1099 tax calculator」#24，**08 里 Serper 测到的 #5 没有复现**；但实测 SERP 中「self employment tax calculator」#4 |
| takehometax、ustax.tools、texastaxcalculator、newdeductioncalc、hourlytaxcalculator、autoloandeductiblecalculator、payrollanalysistools、notaxonovertime.pro | 0–2 | 0–3 | 几乎没流量 |
| truesalarycalculator、taxlawtools | 库里 0 行 | — | — |

**两点结论**：
1. 新站能拿流量的都是**工具词，或者「有法规/有数据」的页**：加班、换算、最低工资、失业金、退税追踪。**做「州 × 金额」程序化页的新站**（paycheckpeek、salarycalculatoraftertaxes、hourlytaxcalculator、takehometax）**几乎没有流量**。
2. 「no tax on overtime calculator」「time and a half calculator」「car loan interest deduction」「no tax on tips calculator」这几个词，上面列的大站和新站在 SE Ranking 库里**都没有排进前 20**。这就是「大站根本没覆盖」的空位。不过 SE Ranking 的库有滞后：实测 SERP 里 notaxonovertime.pro（2026-10-03 注册）已经排到 #2。

---

## 2. 第二步：真实搜索量（DataForSEO，Google Ads 口径）

一共查了 4,435 个词，分 5 批，每批 $0.09。2,899 个有量，合并成 2,287 个簇。原始数据：`/tmp/thp-kw2/raw/vol_*.json`；整理后 `vol_all.json`（每个词）、`clusters.json`（簇）、`families.json`（页面级词族）。

### 2.1 和 09（Trends 换算）对比

| 词族 | 09 估算（日均：当前 / 报税季，广义） | 谷歌月均 ÷ 30 | 谷歌报税季月均 ÷ 30 | 判断 |
|---|---|---|---|---|
| no tax on overtime calculator（单词） | ~5 / ~620 | 583（8 月只有 97） | **1,026** | 09 报税季估低约 1.7 倍 |
| no tax on overtime 词族（计算器 + 信息） | ~1,440 / ~9,700 | 4,652 | 7,592 | 报税季量级接近 |
| overtime calculator（单簇） | ~1,040 / ~2,900 | 705 | 740 | **没有季节性**。09 说的「报税季 ×2.8」被推翻 |
| bonus tax calculator（单簇） | ~300 / ~880（词族） | 744 | 1,277 | 09 估低约 1.5–2.4 倍 |
| 1099 tax calculator（单簇） | ~400 / ~1,180 | 424 | 658 | 吻合 |
| "after taxes texas" + "florida" | ~1,680 + ~1,330 = ~3,000 | **209**（149 簇合计 6,284/月） | 223 | **09 估高约 14 倍**。Trends 的广义匹配把各种无关组合都算进去了 |
| car loan interest deduction（信息词族） | ~350 / ~2,550 | 869 | 1,732 | 量级吻合。**但计算器意图只有 169/月** |
| no tax on tips（词族） | ~1,260 / ~5,700 | 1,525 | 2,587 | 吻合；计算器意图只有 1,603/月 |
| senior deduction calculator | ~5 / ~115 | 计算器族 53 | 108 | 吻合（量都小） |
| 时薪换算（"X an hour is how much a year"） | ~33,600（全族） | 20,822（136 簇） | 21,183 | 吻合，量非常大 |

### 2.2 各页面级词族（簇去重后求和）

| 词族 | 簇数 | 月均 | 2026-08 | 2026 年 1–4 月均 | 2025 年 1–4 月均 | 峰值月 | 最高 CPC |
|---|---|---|---|---|---|---|---|
| A 加班计算器（通用） | 75 | 55,156 | 51,050 | 56,565 | 53,127 | 2024-11：99,600 | $5.41 |
| A2 加班到手（含税） | 15 | 4,641 | 1,110 | 8,400 | 14,283 | 2025-01：49,740 | $3.68 |
| B 加班扣除/退税计算器 | 34 | 31,780 | 4,030 | 64,606 | 508 | 2026-01：123,830 | $6.66 |
| B0 no tax on overtime 信息词 | 156 | 107,825 | 22,660 | 163,153 | 389,078 | 2025-07：841,360 | $24.44 |
| C 小费扣除计算器 | 10 | 1,603 | 320 | 2,894 | 0 | 2026-01：5,720 | — |
| C0 no tax on tips 信息词 | 155 | 44,156 | 16,310 | 74,702 | 135,405 | 2025-05：527,810 | $0.68 |
| D 老人 $6,000 扣除计算器 | 15 | 1,590 | 380 | 3,231 | 0 | 2026-02：4,610 | $1.11 |
| D0 老人扣除信息词 | 17 | 8,140 | 4,190 | 14,394 | 30 | 2026-01：17,080 | $3.85 |
| E 车贷利息扣除计算器 | 1 | 169 | 40 | 362 | 5 | 2026-01：590 | $4.63 |
| E0 车贷利息扣除信息词 | 66 | 26,068 | 5,040 | 51,966 | 5,047 | 2026-01：72,370 | $6.64 |
| F 奖金税计算器（全国） | — | 36,745 | 16,540 | 60,234 | — | 2026-03：79,850 | 主簇无 CPC |
| F0 奖金税信息词（税率、怎么扣） | 112 | 31,456 | 16,390 | 43,178 | 60,584 | 2025-03：79,940 | — |
| F1 奖金 TX/FL | 12 | 2,343 | 1,400 | 3,143 | 4,196 | 2025-03：5,310 | — |
| H 1099 / 自雇税计算器 | 120 | 38,405 | 29,680 | 60,322 | 96,431 | 2025-01：122,110 | $28.03 |
| H1 1099 无税州版 | 9 | 651 | 430 | 957 | 1,521 | — | $6.46 |
| I 季度预缴 / 安全港 | 53 | 31,284 | 26,590 | 39,805 | 50,661 | 2025-04：68,730 | $20.11 |
| J TX/FL 州工资计算器 | 70 | 144,322 | 142,960 | 140,188 | 172,566 | — | $31.89 |
| J2 其余 7 个无税州州页 | 43 | 39,189 | 39,990 | 38,752 | 46,144 | — | $33.94 |
| K TX/FL 金额页 | 149 | **6,284** | 5,480 | 6,693 | 10,885 | — | — |
| L 全国金额页（不分州） | 247 | 25,651 | 27,710 | 25,742 | 41,939 | — | — |
| M 时薪↔年薪纯换算 | 136 | **624,652** | 692,100 | 635,478 | 696,609 | — | $0.09 |
| N 平台 1099（doordash 等） | 36 | 4,424 | 2,810 | 7,104 | 7,183 | 2026-01：10,240 | $7.11 |
| O gross up / net to gross | 4 | 4,434 | 3,290 | 4,852 | 5,060 | — | $13.81 |
| P 「无税州有没有州所得税」 | 6 | 64,346 | 53,600 | 85,400 | 80,100 | 2026-03：96,000 | $8.11 |

**几个关键读法**：
- **OBBB 类词在逐年退潮**。no tax on overtime 信息词族的 2026 报税季（16.3 万/月）只有 2025 年同期（38.9 万/月，那时还是立法新闻）的 42%。计算器意图（B 族）2026 年 1 月峰值 12.4 万，2026-08 跌到 4,030。**2027 年报税季的量大概率低于 2026 年**，具体多少本次无法核实。按 2026 年的形状，1 月是峰值，2 月以后快速回落。所以**页面必须在 2026 年 12 月前被收录**。
- **加班、时薪换算、州工资计算器全年平稳**，不靠报税季。
- **奖金是 3 月峰值**（年终奖发放季）。1099 的峰值是 1 月和 4 月。
- 谷歌没有给「bonus tax calculator」主簇 CPC，只给了首页竞价 $5.42–20。车贷和小费信息词的 CPC 都在 $0.05–0.68，**广告价值低**。

---

## 3. 第三步：谷歌 SERP 复核（56 个词）

- 全部用 DataForSEO advanced 端点（带 `load_async_ai_overview`），美国、英文、桌面。
- 新站判定：对 229 个出现的根域名跑了 RDAP（Verisign / rdap.org），2024 年以后注册的算新站。
- 原始文件：`/tmp/thp-kw2/serp/adv_*.json`；汇总：`serp_analysis.json`、`serp_summary.txt`。

### 3.1 SERP 特征

| 特征 | 次数（共 56 个 SERP） |
|---|---|
| AI 概览 | **55**（只有「paycheck calculator wyoming」没有） |
| People also ask | 46 |
| 精选摘要 | 0 |
| 谷歌自带计算器小部件 | 0（返回的 item 类型里没有。接口有可能不解析这类小部件，**未核实**） |
| 付费广告 | 0（organic 接口可能不返回广告，**未核实**） |

### 3.2 前 10 构成（摘录 32 个，按方向分组）

列说明：品牌 = 报税软件 / 薪资 SaaS / 金融媒体（talent、ADP、SmartAsset、PaycheckCity、TurboTax 等）；政府含非营利和百科；用户内容 = Reddit / YouTube / Instagram / 社区帖；大计算器站 = Omni / calculator.net 等。

| 查询 | 月均 | 品牌 | 政府 | 用户内容 | 大计算器站 | **新站** | 其他老站 | 新站是谁（排名） |
|---|---|---|---|---|---|---|---|---|
| no tax on overtime calculator | 17,491 | 0 | 0 | 4 | 1 | **3** | 1 | notaxonovertime.pro #2（2026-10）、remotelaws #6、hourlytaxcalculator #8 |
| overtime tax refund calculator | 3,882 | 1 | 0 | 2 | 1 | **4** | 1 | notaxonovertime.pro #2、everydaybudd #4、overtimetaxcalc #6–7 |
| overtime tax deduction calculator | 1,115 | 4 | 1 | 1 | 0 | 1 | 2 | notaxovertimecalculator #2 |
| how to calculate overtime for taxes | 3,899 | 5 | 1 | 1 | 0 | 0 | 1 | — |
| no tax on overtime | 62,082 | 1 | 3 | 2 | 0 | 0 | 1 | — |
| qualified overtime compensation | 3,467 | 3 | 4 | 1 | 0 | 0 | 1 | — |
| overtime calculator | 21,155 | 2 | 0 | 0 | 1 | **4** | 2 | smartovertime #2、notaxovertimecalculator #4、overtimecalculatorusa #5、timeandhalfcalculator #7 |
| overtime calculator with taxes | 4,022 | 1 | 0 | 0 | 0 | **7** | 1 | paycheckwise #2、annualpaycalculator、stubeasy、paystubledger、notaxovertimecalc、calk-usa、ziannah |
| time and a half calculator | 15,682 | 4 | 0 | 0 | 1 | 1 | 3 | mypassion.ai #8 |
| overtime pay calculator | 4,700 | 2 | 1 | 0 | 2 | 0 | 4 | — |
| bonus tax calculator | 22,318 | 4 | 0 | 0 | 0 | **4** | 1 | **realtakehomepay #1**、financetoolz #4、payrollanalysistools #5、paycheckpeek #9 |
| bonus calculator | 5,845 | 5 | 0 | 0 | 1 | 1 | 2 | realtakehomepay #7 |
| bonus after tax calculator | 1,320 | 7 | 0 | 0 | 1 | 1 | 0 | realtakehomepay #8 |
| bonus tax rate | 6,927 | 6 | 0 | 0 | 0 | 1 | 2 | healthyfp #4 |
| how much is a bonus taxed | 5,055 | 5 | 0 | 1 | 0 | 1 | 2 | countrytaxcalc #6 |
| bonus calculator texas | 667 | 7 | 0 | 0 | 0 | 1 | 1 | realtakehomepay #2 |
| 1099 tax calculator | 12,718 | 8 | 1 | 0 | 0 | **0** | 0 | — |
| 1099 tax calculator texas | 213 | 9 | 0 | 0 | 0 | 0 | 0 | — |
| self employment tax calculator | 10,809 | 6 | 0 | 0 | 0 | **3** | 0 | free1099calc #4、financetoolz #6、selfemployedcalc #9 |
| quarterly tax calculator | 2,280 | 6 | 3 | 0 | 0 | 0 | 0 | — |
| safe harbor estimated tax | 1,191 | 2 | 3 | 1 | 0 | 0 | 3 | — |
| doordash tax calculator | 1,223 | 0 | 0 | 2 | 0 | **3** | 4 | expensebot、freeuscalculator.in ×2 |
| no tax on tips calculator | 1,257 | 2 | 0 | 1 | 0 | **3** | 2 | remotelaws #2、taxbreaktools #3、othercalculators #4 |
| senior bonus deduction 2025 calculator | 1,103 | 4 | 1 | 2 | 0 | 1 | 1 | **yourincomecalculator #1** |
| senior bonus deduction phase out calculator | 115 | 2 | 0 | 1 | 0 | **4** | 1 | whatsmytaxsavings、nationaltaxtools、hourlytaxcalculator、taxcutscalculator |
| car loan interest deduction | 13,327 | 3 | 0 | 1 | 0 | 0 | **5（4 家汽车经销商 + 1 家信用社）** | — |
| car loan interest deduction calculator | 169 | 4 | 1 | 0 | 0 | 1 | 3 | autoloandeductiblecalculator #3 |
| take home pay calculator texas | 4,945 | 7 | 0 | 0 | 0 | 0 | 2 | — |
| tennessee / nevada / wyoming paycheck calculator | 725 / 6,409 / 1,033 | 9 / 7 / 10 | 0 / 1 / 0 | 0 | 0 | **0** | — | — |
| washington paycheck calculator | 7,282 | 2 | 0 | 0 | 1 | **3** | 4（含疑似被黑的子域） | allitools、salaryhourlyrate、paycalc.online |
| 100k / 70k after taxes texas | 238 / 143 | 6 / 7 | 0 | 1 / 0 | 0 | 1 / 2 | 1 / 0 | talent.com 各占 4–5 席 |
| 100k after taxes（全国） | 522 | 4 | 0 | 2 | 0 | 1 | 0 | floridataxcalculator #3 |
| 25 an hour is how much a year | 30,918 | 5 | 0 | 1 | 1 | **2** | 0 | pinebill #7、lockedinai #8 |
| 60000 a year is how much an hour | 23,091 | 5 | 0 | 1 | 1 | **2** | 0 | joedisanto #6、mbason-ai #8 |

另外 4 个大意图词前 10 全是品牌或政府：
- does texas have state income tax：AARP、Tax Foundation、TurboTax、UT、德州审计署；
- gross up calculator：ADP ×2、PaycheckCity ×2、Paycor；
- net to gross calculator：ADP、Omni、PaycheckCity，外加新站 1 个；
- estimated tax calculator：银行、保险公司、IRS、Forbes。

### 3.3 意图是否要分页（前 10 URL 重合数）

| 词对 | URL 重合 | 域名重合 | 结论 |
|---|---|---|---|
| overtime calculator vs no tax on overtime calculator | 0 | 0 | **必须分两页**（推翻 09「做在一页」的建议） |
| overtime calculator vs overtime calculator with taxes | 0 | 0 | 「含税」值得单独开一个 URL |
| overtime calculator vs time and a half calculator | 0 | 1 | 同一页用 H2 和 FAQ 覆盖，先不拆 |
| no tax on overtime calculator vs overtime tax refund calculator | 2 | 3 | 同一页 |
| bonus tax calculator vs bonus calculator / bonus after tax | 1 / 1 | 2 / 1 | 同一页，标题同时带 "bonus tax" 和 "after tax" |
| bonus tax calculator vs how much is a bonus taxed | 0 | 0 | 信息词靠 FAQ 覆盖，不另开页 |
| 1099 tax calculator vs self employment tax calculator | 0 | 0 | **分两页**：自雇税那边新站进得去，1099 那边进不去 |
| 100k after taxes vs 100k after taxes texas | 0 | 2 | 全国页和州页是两种意图 |

注意：这只是一次快照。这类 SERP 新站多、波动大，重合低也有一部分是波动造成的。

---

## 4. 09 结论：哪些被推翻，哪些被确认

| 09 的结论 | 谷歌数据 | 判定 |
|---|---|---|
| P1 TX/FL「$X after taxes」64 页 | 两州全部金额词 6,284/月（09 隐含约 9 万/月）；前 10 被 talent.com 占 4–5 席；同类程序化新站（paycheckpeek、salarycalculatoraftertaxes）估算流量 0–49/月 | **推翻**，改为不做 |
| 「金额 + after taxes」同比在涨 | TX/FL 金额族 2026 报税季 6,693 vs 2025 同期 10,885；全国金额族 25,742 vs 41,939 | **推翻**：同比在跌 |
| P1 overtime 页，内置 no tax on overtime，做成一页 | 需求确认：通用加班 5.5 万/月且全年平稳，扣除计算器报税季 6.5 万/月。但两个词前 10 **零重合** | **需求确认，做法推翻**：拆成两页（可以加第三页「含税」） |
| no tax on overtime 的 SERP「没有大站专门做」 | 谷歌前 10 品牌 0、政府 0、用户内容 4、新站 3 | **确认**，而且谷歌上的格局比 Bing 还弱 |
| P2 Schedule 1-A 系列（小费 / 老人 / 车贷） | 小费计算器 1,603/月，老人计算器 1,590/月，车贷计算器只有 169/月（信息词 2.6 万/月，前 10 被经销商占） | **部分推翻**：降到 P3；车贷要按信息页来做 |
| P2 1099 页加安全港 | 「1099 tax calculator」前 10 新站 0（**08 里 free1099calc #5 没复现**）；安全港和季度税的前 10 是 IRS 加品牌 | **降级**：安全港只当功能做，不指望带量；主攻方向改为 self employment tax calculator |
| P3 1099 / 奖金的 TX、FL 版 | 1099 州版 651/月，前 10 全是品牌；奖金州版 2,343/月 | **确认不值得单独开页** |
| 奖金页只排 P3（只做州变体） | 奖金计算器族 3.7 万/月，报税季 6 万；前 10 有 4 个新站，#1 是新站 | **推翻**：升为 P0 |
| 纯换算金额页不建议做 | 全族 62.5 万/月；前 10 每个词都有 2 个新站；pinebill.app（2025-08）169 个换算词进前 10。但 AI 概览 100% 都在 | **部分推翻**：先做 10 页实验 |
| doordash 等平台页不做 | doordash 族 4,424/月；前 10 品牌 0、新站 3 | **部分推翻**：可以做，但要先核实 2026 里程费率 |
| 新站已经挤满所有长尾 | 谷歌上**确认**：加班、奖金、自雇、扣除计算器前 10 都有 3–7 个新站。但州工资计算器（TX/FL/TN/NV/WY）新站 0 | **确认**。另外看到：新站能拿流量的是工具页，金额页基本拿不到 |
| 09 第一个风险提示：如果谷歌前 10 全是大站老站就降级 P2 | 小费和老人计算器前 10 都有新站，不用因为这个降级。降级是因为量小 | 不触发 |

---

## 5. 不建议做的方向（谷歌数据补证）

| 方向 | 谷歌证据 |
|---|---|
| TX/FL 金额页（64 页） | 合计 6,284/月；talent.com 每个词占 4–5 席；同类新站 0 流量 |
| 其余 7 个无税州的州工资页抢头部 | TN、NV、WY 前 10 里品牌占 7–10 席，新站 0。页面已有，不追加投入（Washington 例外，见 P1） |
| 1099 州版、奖金州版独立页 | 量 ≤2,343/月，前 10 品牌占 7–9 席 |
| 「1099 tax calculator」主词硬攻 | 前 10 是 IRS 加 8 个品牌 |
| 季度预缴 / 安全港独立页 | 前 10 是 IRS 加品牌，新站 0 |
| SALT 计算器 | salt deduction 2026 只有 2,297/月；用户集中在我们没核实的高税州 |
| 「does texas have state income tax」这类信息词 | 6.4 万/月，但前 10 是政府加品牌，而且有 AI 概览。只在州页 FAQ 里回答 |
| gross up / net to gross | 4,434/月，前 10 是 ADP 和 PaycheckCity |
| big beautiful bill tax calculator | 556/月，还在下滑 |

---

## 6. 实施要点（只写和本次数据直接相关的）

1. **奖金页（P0）**：
   - title 和 H1 同时带上 "bonus tax calculator" 和 "after tax"；
   - 把联邦 22%/37% 补充预扣率和「aggregate 法」并排展示；
   - FAQ 覆盖 how much is a bonus taxed、bonus tax rate 2026、supplemental tax rate；
   - 加一个州切换，只开 TX/FL 等无税州，不新开页。
2. **两个加班页（P1）**：
   - `/overtime-calculator/` 主打总工资和时薪 1.5 倍、2 倍；
   - `/no-tax-on-overtime-calculator/` 主打「年底能扣多少、能退多少」，再加 W-4 第 4(b) 步填多少。扣除额按 09 §3.4 的 Schedule 1-A 规则算：每超 $1,000 向下取整减 $100，上限 $12,500 / $25,000，**不减 FICA**；
   - 两页互链，并在 **12 月前**提交收录；
   - 「含税」版本先做成加班页里的第二个 URL。
3. **时薪换算实验（P1 实验）**：
   - 只做量最大的 10 个：25、30、35、40、20 an hour；60k、65k、50k、70k、80k a year；
   - 每页除了换算结果，还要给 TX/FL 税后到手（年 / 月 / 两周），用来和 AI 概览的「一个乘法」拉开差距；
   - 4 周后看 GSC 收录和排名，决定要不要扩到 40 页。
4. **Washington 页**：先在官方渠道核实 2026 年 WA Cares（0.58%，已写在 `data/tax/us/2026/states/wa.json` 的说明里）和带薪家庭医疗假（PFML）员工分担费率，再算进到手工资。**PFML 2026 费率本次未核实**。

---

## 7. 本次 treg 花费明细（2026-10-10）

| 端点 | 调用次数 | 成功 | 花费 | 用途 |
|---|---|---|---|---|
| `seranking.google.domain.ranked_keywords` | 61 | 34 | **$0.6086**（$0.0179/次） | 25 个站的排名词。27 次失败：并发触发 429，或 zsh 参数拼错导致 400，**失败未扣费** |
| `dataforseo.google.keywords.volume` | 5 | 5 | **$0.4500**（$0.09/次） | 4,435 个词的搜索量、CPC、2024-10 至 2026-08 的月度数据 |
| `dataforseo.google.domain.ranked_keywords` | 4 | 3 | **$0.3960**（$0.132/次） | SmartAsset、talent、Omni 按 URL 过滤的排名词。1 次超过 8 MiB 被拒，未扣费 |
| `dataforseo.x.serp-google-organic-live-advanced` | 56 | 56 | **$0.1360**（$0.002–0.004/次） | 56 个谷歌 SERP，含 AI 概览 |
| **合计** | 126 | 98 | **$1.5906**（预算 $6） | — |

逐次明细见 `/tmp/thp-kw2/ledger.tsv`，每次都记了 call id 和 `X-Treg-Cost-Micro`。没碰到 402（余额不足）。

---

## 8. 数据文件和未核实项

**数据文件**（全部在 `/tmp/thp-kw2/`）：

| 内容 | 文件 |
|---|---|
| 排名词 | `raw/rk_*.json`、`raw/dfs_rk_*.json`、`raw/nk_*.json`，合并后 `rk_all_cls.json` |
| 搜索量 | `raw/vol_*.json`，整理后 `vol_all.json`、`clusters.json`、`families.json` |
| SERP | `serp/adv_*.json`、`serp_analysis.json`、`serp_summary.txt` |
| RDAP | `rdap/*.json`、`rdap_dates.json` |
| 处理脚本 | `/tmp/thp-kw2-scripts/` |

**未核实**：
- 2027 年报税季 OBBB 类词的实际量（只知道 2026 年比 2025 年低）；
- AI 概览下各排名的真实点击率（表里是假设）；
- 谷歌自带计算器小部件和付费广告是否出现（接口没返回）；
- 2026 年 WA PFML 费率；
- 2026 年 IRS 标准里程费率；
- pinebill.app 页面结构（抓取失败）；
- SE Ranking 的「估算流量」是模型值，不是真实点击；
- NerdWallet、calculatorsoup 的排名词（本次没拉）。
