# 08 · netpaywise 还要不要做（2026-10-09 复核）

> 问题：netpaywise 有没有必要继续做？现在每天多少搜索、有多少竞品？
> 结论先说：**🟡 缩小范围，接近 ❌**。原计划是「50 州 × 每州排 5–15 名」当收入主力，这条路不成立。只建议零追加开发、上线一个维护量最小的子集，做 6 个月实验，到止损线就整站放下。理由见第 6 节。

---

## 0. 数据来源和口径（全部 2026-10-09 拉取）

| 数据 | 来源 | 说明 |
|---|---|---|
| 月搜索量基准 | 立项文档 01（2026-08-15，OpenSEO/DataForSEO，Google Ads 口径，12 个月平均） | 本次想用 DataForSEO 重拉，接口返回 `40104 Please verify your account`（账号未验证），**没拉到，也没扣费** |
| 季节性和当前走势 | Google Trends（美国，周数据，2024-08-01 至 2026-10-03，去掉最后一个不完整的周），6 组发了 5 组成功 | PA/NJ/IL/CT 那组连续 429 限流，**没拿到** |
| SERP 前 10/前 30 | Serper 直调（gl=us, hl=en），18 个查询 24 次（3 个词翻到第 2 页，1 个翻到第 3 页） | 原始 JSON：`/tmp/npw/data/serp.json` |
| AI 概览 | SearchApi.io（Google 引擎，美国），7 个查询 | `/tmp/npw/data/searchapi.json` |
| 域名注册年份 | RDAP（Verisign / rdap.org）+ Wayback CDX 首次抓取 | `/tmp/npw/data/rdap.json` |
| 点击率锚点 | 自有 36 个站的 GSC，2026-09-09 至 10-06，按查询聚合（展示 ≥20 的查询） | 以游戏站为主，见第 4 节 |

**怎么把 Trends 换算成次数**：用 Ads 量已知的 `mortgage payoff calculator`（60,500/月）当锚点，按「Trends 2025-08 至 2026-07 年均比值 × 60,500」算出每个词的年均月量，再乘「最近 8 周（2026-08-09 至 10-03）÷ 年均」得到当前月量，除以 30.4 得到日均。

**误差**：用两个 Ads 量已知的词做了校验。Trends 换算结果是 Ads 值的 1.28–1.47 倍：simple loan 换算 21.8K，Ads 14.8K；california income tax 换算 23.1K，Ads 18.1K。原因是 Trends 按广义匹配（包含 "…calculator 2026"、"…with extra payments" 这类长尾），Ads 只算精确词和近似词。所以下表的数字**按「广义词族」理解**；只算精确词的话乘 0.7 左右。整体误差估 ±40%。

---

## 1. 每日搜索量（现在）

### 1.1 核心词（美国）

| 词（广义） | 年均/月 | 当前日均（8–10 月） | 报税季日均（1–4 月） | 同比（今年 8–10 月 ÷ 去年同期） |
|---|---|---|---|---|
| paycheck calculator（含全部州和变体） | ~752K | **~23,300** | ~24,400 | 0.93 |
| salary to hourly | ~368K | ~9,200 | ~13,500 | 0.76 |
| amortization calculator | ~264K | ~6,300 | ~8,700 | 0.65 |
| income tax calculator（广义，包含 federal 和各州） | ~309K | ~5,400 | ~13,200 | 0.66 |
| take home pay calculator | ~100K | ~2,300 | ~3,700 | 0.76 |
| mortgage payoff calculator（锚点，Ads 60,500） | 60.5K | ~1,570 | ~2,000 | 0.77 |
| federal income tax calculator | ~56K | ~1,000 | ~2,500 | 0.64 |
| simple loan calculator（Ads 14,800） | ~22K | ~610 | ~760 | 0.90 |
| self employment + 1099 tax calculator | ~30K | ~590 | ~1,600 | 0.91 |
| california income tax calculator（Ads 18,100） | ~23K | ~380 | ~950 | 0.62 |
| bonus tax calculator | ~18K | ~310 | ~880 | 0.82 |
| w4 calculator | ~19K | ~310 | ~930 | 0.53 |

### 1.2 州工资单词

| 州 | 当前日均 | 来源 |
|---|---|---|
| TX（texas + tx） | ~1,290 | Trends 换算 |
| CA（california + ca） | ~1,180 | Trends 换算 |
| FL（florida + fl） | ~880 | Trends 换算 |
| NY（new york + ny） | ~510 | Trends 换算 |
| VA | ~430 | Ads 14,800 × 当前系数 0.89 ÷ 30.4。Trends 拆开看：缩写约 240/天，全称约 200/天，合计和 Ads 吻合 |
| WI | ~240 | Ads 8,100 × 约 0.9。Trends 上 "paycheck calculator wi" ≈ 0，说明大家都搜全称 wisconsin |
| CT | ~150 | Ads 5,400 × 约 0.85 |
| PA / NJ / IL | ~450 / ~320 / ~440 | **未核实**（Trends 限流），按人口比例外推 |

- **50 州合计**：CA+TX+NY+FL 当前合计约 3,850/天，占全美人口约 33%。外推 50 州的州名工资单词约 **11,000–13,000/天**（广义），只算精确词约 8,000–10,000/天。VA、WI、CT 三个 Ads 已知的州和人口外推基本吻合（误差在 1.5 倍以内）。
- **核心词族去重合计**：表 1.1 的十个词族加起来，当前约 **50,000/天**（广义），精确口径约 35,000/天；报税季约 70,000/天。
- **季节性**：工资单类（paycheck、州页）几乎不随季节变，报税季只比年均高 0–4%。税务类在 1–4 月是年均的 1.3–1.6 倍，8–10 月只有年均的 0.5–0.6 倍。贷款类不分季节。
- ⚠️ **同比全线下滑**：最近 8 周对比去年同期，每个词都在跌，跌幅 7%–47%。w4 跌 47%，CA 所得税跌 38%，amortization 跌 35%，paycheck 跌 7%。不能排除 Trends 采样口径变化的影响，但方向一致：**搜索需求在缩**，可能部分被 AI 助手分走了。

---

## 2. 竞品：有多少、多强

### 2.1 各词前 10 名的构成（Serper，2026-10-09）

| 查询 | 商业品牌¹ | 政府 | 银行/信用社 | 大型计算器站² | 独立小站（排名·注册年） |
|---|---|---|---|---|---|
| paycheck calculator | 7 | 1 | 0 | 0 | accountantsworld #5 (1998)、craneesfresh.us #10（疑似垃圾页） |
| paycheck calculator va | 7 | 1 | 0 | 0 | federalpensionadvisors #7 (2023)、**realtakehomepay #10 (2025-12)** |
| paycheck calculator wi | 9 | 1 | 0 | 0 | 无 |
| california paycheck calculator | 8 | 1 | 0 | 0 | paycheckmanager #8（2006，小型薪资服务商） |
| paycheck calculator texas | 9 | 0 | 0 | 0 | paycheckmanager #4 (2006) |
| paycheck calculator ct | 10 | 0 | 0 | 0 | 无 |
| take home pay calculator | 8 | 0 | 0 | 1 | esmartpaycheck #10 (2011) |
| salary to hourly | 5 | 0 | 0 | 1 | thecalculatorsite #1 (2010)、calcxml #3 (2006)、morebusiness #10 (1996) |
| california income tax calculator | 6 | 2 | 1 | 0 | 无 |
| federal income tax calculator | 6 | 2 | 2 | 0 | 无 |
| self employment tax calculator | 6 | 1 | 3 | 0 | 无 |
| 1099 tax calculator | 8 | 0 | 0 | 0 | **free1099calc #5 (2025-10)** |
| w4 calculator | 4 | **6（IRS 占 5 个）** | 0 | 0 | 无 |
| bonus tax calculator | 7 | 0 | 0 | 0 | calcxml #4 (2006)、**realtakehomepay #8**、**yourincomecalculator #10 (2026-02)** |
| mortgage payoff calculator | 3 | 1 | 5 | 1 | 无 |
| simple loan calculator | 4 | 2 | 3 | 1 | 无（calculatorsoup 在 #17） |
| amortization calculator | 2 | 1 | 3 | 1 | amortization-calc #2 (2005)、bretwhissel #9 (2005) |

¹ 商业品牌包括：ADP、SmartAsset、PaycheckCity、Gusto、SurePayroll、Fingercheck、OnPay、QuickBooks/TurboTax、Forbes、NerdWallet、Bankrate、Credit Karma、Ramsey、AARP、H&R Block、TaxAct、Jackson Hewitt，以及 Uku、Jupid、Keka、Indeed Flex、Talent.com 这类 HR/薪资 SaaS 的内容营销页。
² 大型计算器站：calculator.net、omnicalculator、calculatorsoup。

**格局**：
- **州工资单词**：每个州的前 6 名都是同一批人——ADP、SmartAsset、PaycheckCity、Gusto，再加 Fingercheck、SurePayroll。他们每家都有 50 州 × 时薪/年薪两套页面，和 netpaywise 的结构一模一样，而且域名权重高出几个数量级。
- **税务词**（federal、CA、自雇、W-4）：前 10 名**一个独立站都没有**，全是 IRS/州税局、报税软件和银行。
- **贷款词**：银行、信用社、Bankrate、calculator.net 占满。排进来的独立站只有 2005 年注册的老站。

### 2.2 新站还能不能进？（最硬的证据）

在前 30 名里找到 **16 个 2025–2026 年注册的独立站**，几乎全是「50 州 paycheck calculator」同款：

| 位置 | 新站（注册日期） |
|---|---|
| **前 10** | realtakehomepay（2025-12-26）：VA #10、bonus #8；free1099calc（2025-10-23）：1099 #5；yourincomecalculator（2026-02-21）：bonus #10 |
| 11–20 | realtakehomepay：WI #14、CA #20；slickcalc（2026-03）：WI #16；kalkfy（2026-03）：WI #17；paycheckcalculatorcalifornia.com（2026-02）：CA #16；paybyroster（2026-01）：CA #17；calk-usa（2026-04）：CT #14；paycheckwiz（2026-02）：CT #19 |
| 21–30（只查了 VA 第 3 页） | nationaltaxtools（2026-02）、paycheckcalculator.app（2026-06）、kalkfy、privatepaycheck（2026-02）、paycheckcalculatoronline（2026-03）、codexatools（2025-11）、rovidev（2025-07）、epaystubs（2025-06）——VA 第 3 页 10 个结果里有 8 个是 2025 年以后注册的 |

**怎么解读**：
1. **新站能进第 2–3 页，而且很快**：注册 6–9 个月的站已经在 11–30 名。
2. **能进前 10 的新站极少，而且有条件**：
   - 州工资单词里只有 realtakehomepay 一个进了前 10（VA #10）。它注册约 10 个月，sitemap 有 **1,189 个 URL**，其中 918 个是「州 × 年薪档」页（如 `/states/nebraska/take-home-pay/salary/100000`），另有城市页和 166 篇资源文。规模是 netpaywise 计划（约 70 页）的 15 倍以上。
   - 另外两个进前 10 的新站都在竞争更软的小工具词：bonus tax（日均约 310）和 1099（日均约 590）。
3. **这条赛道已经被 AI 批量建站挤满了**：2026 年注册的同款站至少 12 个。netpaywise 上线就是第 17 个以上的同类站，没有任何差异点。
4. **立项文档点名的三家**：
   - realtakehomepay：08-15 在 VA 13–18 名，现在升到 VA #10。
   - paycheckwise.com（2025-11 注册，网站还在，标题是 "Paycheck Calculator 2026 … All 50 States"）：VA 前 30、WI/CA/CT 前 20 **都找不到了**。
   - treasury.sh：网站还在，但已经改成 "AI Money Manager"，VA 前 30 **找不到了**。

   两个月内三家一升两掉：新站的排名很不稳。

---

## 3. AI 概览和零点击风险

SearchApi 查了 7 个词：

| 查询 | AI 概览 | 内容 |
|---|---|---|
| paycheck calculator va | ✅ 有 | 第一句直接点名「ADP Virginia Paycheck Calculator 或 SmartAsset」，然后列出 VA 税率 2%–5.75% 和计算步骤 |
| salary to hourly | ✅ 有 | 给出公式「年薪 ÷ 2,080」和例子 $50,000 → $24.04/小时。**问题在概览里就答完了**，零点击风险最高 |
| w4 calculator | ✅ 有 | 指向 IRS Tax Withholding Estimator |
| paycheck calculator / federal income tax / bonus tax | ⚠️ 有异步占位，但返回「AI Overview is not available」 | 可能按用户或时段出现，**未核实** |
| mortgage payoff calculator | ❌ 无 | — |

- **Google 自带的计算器小部件**：这几个查询的 Serper 和 SearchApi 结果里都没检出。但接口不一定解析这类小部件，所以**未核实**。
- **判断**：
  - 需要输入个人数据的计算（到手工资、贷款还款）AI 概览替代不了，用户还是得点进工具。但概览会把点击导向它点名的品牌（ADP/SmartAsset），对小站是二次挤压。
  - 换算类（salary to hourly）基本是零点击。
  - 报税类（W-4）概览指向 IRS。
- 叠加第 1 节的同比下滑，**这一类搜索的可点击空间正在缩**。

---

## 4. 变现估算

### 4.1 点击率锚点

| 来源 | 第 1–3 名 | 3–5 | 5–8 | 8–10 | 10–15 |
|---|---|---|---|---|---|
| 自有站 GSC 实测（2026-09-09 至 10-06，36 站汇总，以游戏站为主） | 44% | 21% | 2.0% | **0.34%** | 0.38% |

金融计算器的搜索结果页顶部有 3–4 条付费广告（"paycheck calculator va" CPC $20）和 AI 概览，第 8 名以后的点击率只会更低。下面用的假设是：第 8–12 名 0.5%–1.5%，第 13–25 名 0.1%–0.4%。行业公开的点击率曲线一般给第 10 名 1%–2%，本次**未核实**，只当上限参考。

### 4.2 广告 RPM（每千次浏览收入）

- 公开博客给的金融类 AdSense RPM 是 $15–$50+：sentinelserp.com 2026 版写「Finance, insurance, loans $15–$50+」；techconda.com 2026-02 写「Finance $20–$50+」；ranktracker 写「$20–$50」。这些都是内容站的经验值，**可信度一般**。
- 计算器页用户停留短、广告位少、多数人算完就走，实际会打折。这里取 **$8–$25，中值 $15**。每次点击约 1.3 次浏览。
- CPC $20 是 ADP/Gusto 这类广告主抢中小企业主的出价，摊到发布商的展示 RPM 上不是这个数，**不能直接拿来算收入**。

### 4.3 三种情形（上线后 6–12 个月，按当前非报税季的日均搜索量）

| 情形 | 假设 | 每天点击 | 月浏览量 | 月收入 |
|---|---|---|---|---|
| 乐观（复制 realtakehomepay 的最好成绩） | 50 州平均排到 #10–12（点击率 1%）；其余工具约 25K/天，排 #15–20（0.3%） | ~175 | ~6,800 | **$55–$170** |
| 现实（同类新站的中位：州页 #15–25） | 州页 0.3%（约 30 次/天）；工具页 #20–40（0.05%，约 12 次/天） | ~40 | ~1,600 | **$13–$40** |
| 悲观（等于自家 visualrefiner：排 77–99，28 天 0 点击） | — | 0–2 | <100 | **≈$0**，还可能像 json1 一样被 AdSense 判低价值、不过审 |

报税季的工资单词基本不涨，税务工具约 ×1.4，所以全年平均只比上表高 10%–20%。

### 4.4 维护成本（每年固定要付）

- 现状：52 份税务数据里只有 9 个**无州所得税的州**是 `verified:true`，`federal.json` 还在用 2025 年的占位值。要上线就必须先按 IRS 2026 年参数（Rev. Proc. 2025-32、Pub 15-T 2026）和 SSA 2026 年工资上限核对。
- 每年 1 月：联邦税级、标准扣除、FICA 工资上限、41 州 + DC 的税级，再加 CA SDI、NY/NYC/Yonkers、PA 地方 EIT、OH 市税、MD 县税、IN 县税这些地方税。全部核一遍估 **3–5 人日/年**；部分州年中还会改税率。
- 属于 YMYL（涉及钱的内容），算错不只是掉排名，也会被用户和 AdSense 当低质量站。

**投入产出**：现实情形一年收入约 $150–$500，换来每年 3–5 天税表核对加持续的 YMYL 风险。不如把这些时间投到已经在赚钱的 holefishing 类项目上。

---

## 5. 和自家历史对照

| 站 | 类型 | 结果 |
|---|---|---|
| visualrefiner | 工具站，成熟 SERP | 28 天 0 点击 / 54 展示，排 77–99 |
| docstomd | 工具站 | 0 点击（本次 GSC 28 天：12 展示 0 点击；docs2html 476 展示 0 点击） |
| json1 / json.how | 工具站 | 被 AdSense 判低价值；本次 GSC 28 天 90 展示 0 点击 |
| invoicewand | SaaS + 落地页 | 本次 GSC 28 天 540 展示 0 点击 |

netpaywise 面对的 SERP 比这几个站都硬：品牌更多、YMYL 门槛更高、同款新站十几个。没有理由预期它比自家工具站的历史表现好。

---

## 6. 结论：🟡 缩小范围，接近 ❌

**不按原计划做**。「50 州 × 每州排 5–15 名」不成立，原因有三：
- 州页前 6 名被 ADP、SmartAsset、PaycheckCity、Gusto、Fingercheck、SurePayroll 固定占住。
- 2025–2026 年已有 16 个同款新站挤在 11–30 名，唯一进前 10 的是一个 1,189 页的程序化站。
- 需求同比在跌，AI 概览在把点击导给品牌。

现实收入每月 $13–$40，乐观 $55–$170。

**为什么不直接 ❌**：代码已经写完、域名已经买了。按下面的子集上线，追加成本约 1 人日，还能顺便验证「自家方法做金融工具站能不能排进前 20」，对以后选题有参考价值。不愿意承担每年 1 月的税表核对，就直接 ❌。

### 如果做，只上这些页（零新开发）

| 页 | 理由 |
|---|---|
| `/paycheck-calculator`（全国主页） | 内链枢纽；联邦参数必须先换成 2026 年核实值 |
| 9 个无所得税州的州页：TX、FL、WA、TN、NV、SD、WY、AK、NH | 数据已是 `verified:true`，只依赖联邦 + FICA，**维护量最小**；TX+FL 当前约 2,170 次/天 |
| `/bonus-tax-calculator` | 前 10 里有 2 个 2025–26 年的新站，说明进得去；只依赖联邦补充预扣率 22%/37% |
| `/self-employment-tax-calculator`（标题和主词改成 "1099 tax calculator"） | free1099calc 注册不到一年排到 #5；报税季约 1,600 次/天 |
| `/salary-to-hourly` | 纯数学、零维护；有独立老站排 #1/#3。缺点是 AI 概览会直接给答案 |

**不上，或设 noindex 并移出 sitemap**：
- 41 个有所得税的州 + DC：数据没核实，维护量大，SERP 最硬。
- W-4：IRS 占 5/10，概览也指向 IRS。
- federal / CA income tax：前 10 零独立站。
- 整个贷款集群：前 10 全是银行和 calculator.net，没有新站进入的证据，和收入主题也不连贯。

### 止损线和扩张线（以 GSC 为准）

| 时间 | 条件 | 动作 |
|---|---|---|
| 2027-01-15 | 子集页零收录，或全部排 50 名以外 | 放下：不续费、不再维护 |
| 2027-04-15（报税季结束，上线约 6 个月） | 日均点击 < 30，且没有任何页进前 15 | 放下 |
| 2027-04-15 | ≥2 个页进前 10，且日均点击 ≥100 | 才考虑扩到有所得税的州，并且照 realtakehomepay 的「州 × 年薪档」程序化页来做，不是每州 1 页 |

AdSense 要等收录和内容够了再申请，避免重演 json1 被判低价值；被拒就接 Adsterra（RPM 更低）或者直接放下。

---

## 附：本次消耗

- Serper 24 次（额度 25）
- SearchApi 7 次（剩 3）
- Google Trends：6 组发了 5 组成功，1 组被 429 限流
- DataForSEO：调用失败（账号未验证），$0
- SerpApi 主号本月 250 次已用完，没有使用
- 原始数据都在 `/tmp/npw/data/`：`serp.json`、`searchapi.json`、`trends.json`、`rdap.json`、`vol_rows.json`
