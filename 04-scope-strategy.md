# 04 · 工具范围(三层模型)

原则:Google 奖励**话题权威度**。紧扣「收入/钱」一个圈子的站,比杂货站更快建立排名权威。`netpaywise` 品牌锚定在「收入 / 到手工资」——不稀释它。

## 🎯 核心层(品牌正中,先做;验证过 CPC 最高)
- **50 州工资单 / 到手工资计算器**(paycheck calculator [state],CPC $13–20)—— 程序化生成,站的地基
- 联邦所得税计算器、州所得税计算器
- W-4 预扣税计算器
- 1099 自雇税计算器
- 加班 / 时薪计算器、**年薪 ↔ 时薪换算**
- 税后奖金 / bonus 计算器
- 销售税 / reverse sales tax(高软词,CPC 尚可)

## 🔗 邻接层(建立核心后扩;与「收入」意图连贯)
用户算完到手工资,下一问题天然是「我能负担多少贷款/房子」——意图连贯,SEO 合理扩展。**房贷可以做,但只做以下工具意图软词**:
- mortgage payoff calculator(KD12 / 60.5K)
- simple loan calculator(KD15,SERP 已有独立站)
- loan amortization schedule(分期表)
- affordability「我能买多贵的房 / 借多少」
- 汽车贷款月供、债务还清(debt payoff)、预算 / 储蓄计算器

## 🚫 不做(稀释权威 + 不值钱 + 或 SERP 锁死)
- BMI / 怀孕预产期 / GPA / 科学·图形计算器(与收入无关,CPC $0–0.7)
- 房贷**导流词**:cash-out refinance、current mortgage rates、refinance rates —— 真实 SERP 被银行/贷款商 100% 锁死,独立站零机会,且离品牌远

## 决策点(已确认 2026-08-15)
- [x] 接受「核心=工资单/税 + 邻接=贷款工具」的范围。
- [x] **邻接层(房贷/贷款)第一版 v1 就一起做**(共用同一套计算引擎框架,只限工具意图软词,不碰导流词)。
- [x] 不做全品类杂货计算器(维持 netpaywise 收入圈话题权威)。
- [x] 技术栈:Next.js(复用 nextjs-seo / seo-programmatic skill)。

## 下一步
确认范围后 → 用 `seo-cluster` skill 输出 hub-and-spoke 架构(pillar 支柱页 / spoke 子页 / 内链矩阵)+ 首批 20–30 页清单 → 再写正式 PRD。
