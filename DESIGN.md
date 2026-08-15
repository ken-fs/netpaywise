# netpaywise 设计系统

遵循 `../DESIGN-RULES.md`。YMYL 调和:外壳有个性,金额区精确克制。

## 主题 / 招牌(impeccable 改造 2026-08-15)
- 主题内核:工资单上 gross → 到手 之间被扣走的那道口子。
- **招牌 = 一张真实 pay stub**:首页 hero 右侧是带**齿孔撕边**(perforation)的工资单面板,含 Split Bar 分账条 + 逐项明细(Federal/State/FICA 各带负号)+ 底部 take-home 总额。结果页复用同一 stub 语言。
- **唯一编排动效**:页面载入时分账条**撕开**(take-home 段先满,税段依次落位),明细行随之上浮。仅 hero 一次,交互计算器结果不重复动。尊重 reduced-motion。
- **工具列表 = pay-stub 台账**(非卡片网格):顶部 2px 粗线,行间发丝线,首行 Paycheck 放大加绿,hover 内容右移 + 绿箭头滑出。
- **禁 eyebrow/kicker**(craft-floor 硬禁):标题自己承重,已全站移除。
- 背景:冷纸白 + 极淡台账网格 + 柔和径向绿晕(禁纯平)。

## 令牌(见 globals.css :root)—— Money-Green Trust(绿=你留下的钱)
| token | hex | 用途 |
|---|---|---|
| --ink | #14312a | 深松绿墨,正文/标题 |
| --paper | #f3f4ee | 冷调纸白背景(带网格纹理) |
| --panel | #ffffff | 计算器/结果面板(数字区) |
| --take | #1f9d57 | 到手信号 + 主行动(鲜绿) |
| --take-deep | #17814a | hover / 强调 |
| --fed | #3f5148 | 联邦税段(深灰绿) |
| --clay | #a2472f | 州税段(暗陶红,负色) |
| --fica | #6f8a5a | FICA 段(橄榄) |
| --slate | #46564c | 辅助正文(绿灰) |
| --line | #d5dacf | 发丝线/网格 |
| --muted | #5d6b60 | 弱化文字 |

> 2026-08-15 从暖金改为到手绿:金黄偏 lifestyle,削弱 YMYL 税务工具信任;绿=你留下的钱,语义更强、信任感更好。骨架/布局/分账条/字体不变。

## 字体
- 标题 `Fraunces`(有个性编辑衬线,克制使用)
- 正文/UI `Public Sans`(美国联邦设计系统字体,主题呼应)
- 金额/数据 `IBM Plex Mono`(等宽表格数字,精确对齐)

## 动效
- `--ease` cubic-bezier(.2,.8,.2,1) 面板/hover
- `--ease-settle` cubic-bezier(.34,1.56,.64,1) 金额落位(轻微 overshoot)
- 全部包在 `@media (prefers-reduced-motion: no-preference)` 内

## 语言规则(硬性)
- **任何进入页面的文案一律英文**(面向美国用户):UI 标签、按钮、说明、FAQ、州文案、meta、错误/空状态。
- 中文只用于项目文档(README/01-07/DESIGN.md)与代码注释,不上线。
- 英文文案沿用 DESIGN-RULES 文案风格:口语、具体、短句、可幽默;但金额/税额数字区保持精确克制。

## 布局纪律
- 非对称(内容偏左,分账条/数字偏右),禁完美居中、禁 Hero+三卡。
- 金额区:高对比、大字号 mono、不加装饰。个性只在落地/说明/FAQ/空状态。
- 图标 Iconify(禁 emoji 功能图标)。
