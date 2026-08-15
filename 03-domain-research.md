# 03 · 域名核验

日期 2026-08-15。核验方法与坑都记下,便于复核。

## 结论
- **选定:`netpaywise.com`** —— Verisign 权威 RDAP 返回 404(无注册记录),对照 google.com 返回 200。可注册确认。
  - 结账时需确认非 premium 溢价域名(普通 .com ~$10–13/年)。
  - 含义:net pay(到手工资)+ -wise(专业/懂行),好念好拼、品类清晰、信任调性佳。

## 核验方法(可靠性,踩过的坑)
- ✅ **`.com` 权威**:`https://rdap.verisign.com/com/v1/domain/<name>` → 404=可注册,200=已注册。可信。
- ✅ **`.io` 权威**:`https://rdap.identitydigital.services/rdap/domain/<name>` → 同上。可信。
- ❌ **`rdap.org` 查 .io/.co 不可靠**:曾对已注册的 calckit.io、google.co 误报 404(假阳性)。**勿用**。
- ❌ **本地 `whois`**:部分注册局阻塞/挂死,超时。不用。
- ⚠️ `.co` 至今未找到可靠免费端点,需在注册商页面自查。

## 关键教训
- calculator/calc 品牌的 `.com` 空间几乎被域名商 squat 光(数十个 calc* .com 全被占)——这本身印证 niche 成熟度高。
- 干净 calc 品牌只能走二级市场($1k+)或换词根。
- 最终改走 take-home / net pay 词根,拿到可注册且语义清晰的 `netpaywise.com`。

## 备选(已核验可注册,如需品牌保护或换名)
- `.com`:takehomepal · cleartakehome · smartpaycalc · takehomehero · netwagecalc · takehomenow
- `.io`:takehomecalc · paycheckwise · netpaycalc · wagecalc · mypaycalc(以及一大批 take-home/paycheck 组合)
- 待办:如需保护,自查并注册 `netpaywise` 的 `.io / .co / .net`。
