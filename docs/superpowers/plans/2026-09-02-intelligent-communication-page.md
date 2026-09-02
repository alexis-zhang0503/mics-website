# Intelligent Communication Research Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Chinese and English intelligent-communication placeholders with a complete, communication-centered research narrative covering intelligent signal processing, wireless world models and network agents, embodied and edge communication, a trustworthy closed loop, public representative works, and restrained future directions.

**Architecture:** Reuse the content architecture and CSS classes already proven by the multimodal-sensing detail pages. The Chinese page is the content source of truth; the English page mirrors its section order, research claims, publication list, and links with idiomatic academic English. No new JavaScript, framework, image dependency, or data layer is introduced.

**Tech Stack:** HTML5, existing CSS3 classes in `css/style.css`, existing vanilla JavaScript in `js/main.js`, PowerShell, Python 3 standard library, Microsoft Edge headless mode.

**Spec:** `docs/superpowers/specs/2026-09-02-intelligent-communication-page-design.md`

## Global Constraints

- Keep the direction name `智能通信` / `Intelligent Communication`, lead name, email address, navigation, language switch, footer, and relative resource paths unchanged.
- Treat speech as an acoustic signal, not a wireless signal.
- Keep communication and signal processing as the research objects; AI, agents, and world models are methods.
- Describe wireless world models as an active research agenda, not a completed unified system.
- Do not publish local manuscript metrics, anonymous submission details, private paths, unconfirmed team members, recruitment requirements, or collaboration claims.
- Reuse `news-article`, `news-header`, `news-summary`, `news-section`, `focus-list`, `focus-item`, `news-note`, `publication-list`, and `direction-publications` without adding dependencies.
- Limit implementation changes to `research-communication.html` and `en/research-communication.html` unless verification proves an existing CSS rule cannot support the approved content.

## File Structure

- Modify `research-communication.html`: complete Chinese research-direction page and canonical content ordering.
- Modify `en/research-communication.html`: complete English page with exact structural and publication parity.
- Read only `research-multimodal.html`, `en/research-multimodal.html`, and `css/style.css`: established layout and responsive behavior references.
- Do not modify `README.md`: the repository structure and maintenance workflow remain unchanged.

---

### Task 1: Build the Chinese Intelligent Communication Page

**Files:**
- Modify: `research-communication.html:4-116`
- Reference: `research-multimodal.html:61-181`
- Reference: `css/style.css:1380-1540`
- Reference: `css/style.css:1862`

**Interfaces:**
- Consumes: Existing header/footer markup and the detail-page CSS classes listed in Global Constraints.
- Produces: Canonical section order, Chinese research copy, publication ordering, and public links that Task 2 mirrors exactly.

- [ ] **Step 1: Confirm the current Chinese page fails the approved content contract**

Run:

```powershell
rg -n "方向介绍内容待补充|通信系统图片与说明待补充|该方向团队成员信息待补充|该方向学术成果待补充|该方向招新题目待发布" research-communication.html
```

Expected: five matches, proving that the approved research content is absent.

- [ ] **Step 2: Update metadata and the Hero framing**

Change the meta description to:

```html
<meta name="description" content="南京邮电大学计算机学院多模态智能通信与感知课题组智能通信方向，研究智能信号处理、无线世界模型、网络智能体与具身边缘通信。">
```

Keep the current `<h1>智能通信</h1>` and lead contact. Add no new claims to the Hero.

- [ ] **Step 3: Replace every placeholder section with one semantic research article**

Use this exact top-level structure inside `<main>` after the Hero:

```html
<article class="section news-article fade-in-up">
  <div class="container news-container">
    <header class="news-header">...</header>
    <section class="news-section">研究背景</section>
    <section class="news-section">研究方向 + 三个 focus-item</section>
    <section class="news-section">可信通信智能闭环</section>
    <section class="news-section">未来方向</section>
    <section class="news-section">代表性工作</section>
  </div>
</article>
```

The header title must be `从智能信号到可信行动的 AI 原生通信`. The summary must state that the direction studies signal understanding, dynamic network modeling, agent decision-making, task-oriented communication, and safe execution under real communication constraints.

- [ ] **Step 4: Write the communication-centered background**

The background must progress through four ideas in order:

1. Communication, sensing, computing, and control are becoming coupled in 6G, IoV, low-altitude networks, and intelligent IoT.
2. Static models and one-shot optimization cannot continuously track changing channels, traffic, topology, devices, and tasks.
3. Agents connect service intent, telemetry, analytical tools, and control interfaces, but real execution requires provenance, verification, and recovery.
4. Embodied and multi-agent systems require communication to optimize task completion under latency, bandwidth, energy, and reliability constraints.

- [ ] **Step 5: Implement the three approved research levels**

Create exactly three `focus-item` sections in this order:

```text
01 智能信号处理与多模态健康
02 无线世界模型与网络智能体
03 具身与边缘智能通信
```

The first section must explicitly distinguish acoustic speech signals from wireless signals. It must connect AD screening to cross-corpus generalization, uncertainty, multimodal health sensing, and optional device-edge collaboration without implying clinical deployment.

The second section must connect channel, traffic, topology, mobility, service intent, and telemetry to network-state prediction, counterfactual action evaluation, tool use, resource control, and safe recovery. It must call world models a future research focus.

The third section must connect robots, UAVs, vehicles, and smart spaces to task-oriented information exchange, multi-agent coordination, edge-cloud inference, interruption-aware fallback, and joint communication-computation-action optimization.

- [ ] **Step 6: Add the six-stage trustworthy loop**

Render the loop as six numbered `focus-item` sections or six compact paragraphs under one `focus-list`, preserving this order and terminology:

```text
感知 → 建模 → 预测 → 协同 → 验证与执行 → 反馈
```

Each stage must say what enters, what is produced, and why communication constraints matter. The section must not claim that a unified implementation already exists.

- [ ] **Step 7: Add restrained future directions and the public work list**

Future directions must cover wireless world models/digital twins, verifiable network agents, task-oriented communication for embodied systems, device-edge processing of acoustic and wireless health signals, and low-latency deployment on real devices.

Add these five works in this order:

```text
WirelessOpsAgent: A Benchmark and Agent Design for Action Assurance in Wireless Networks
Fluid Antenna-Aided ISAC for Urban Drone Delivery: System Design, Edge Realization, and Evaluation
Secrecy Rate Maximization for Fluid Antenna-aided ISAC System with UAVs
ContractSkill: Repairable Contract-Based Skills for Multimodal Web Agents
VITAL-RAG: Invariance Race for Context Allocation in Coding Agents
```

Use the verified author lists and venue/year data from the supplied Google Scholar profile and existing public website content. Link the three arXiv works to:

```text
https://arxiv.org/abs/2608.08277
https://arxiv.org/abs/2603.20340
https://arxiv.org/abs/2607.26937
```

For a work without a verified direct paper URL, omit the link rather than inventing one.

- [ ] **Step 8: Run the Chinese content checks**

Run:

```powershell
rg -n "待补充|placeholder-block|placeholder-text" research-communication.html
rg -n "智能信号处理与多模态健康|无线世界模型与网络智能体|具身与边缘智能通信|可信通信智能闭环|代表性工作" research-communication.html
```

Expected: the first command has no output; the second finds all five approved section markers.

- [ ] **Step 9: Commit the Chinese page**

```powershell
git add -- research-communication.html
git diff --cached --check
git commit -m "content: write intelligent communication page in Chinese"
```

Expected: one HTML file committed with no whitespace errors.

---

### Task 2: Build the English Page with Structural Parity

**Files:**
- Modify: `en/research-communication.html:3-20`
- Reference: `en/research-multimodal.html:58-178`
- Test against: `research-communication.html`

**Interfaces:**
- Consumes: Task 1 section order, publication order, public links, and content boundaries.
- Produces: English page with matching semantics and DOM component counts.

- [ ] **Step 1: Confirm the current English page fails the approved content contract**

Run:

```powershell
rg -n "to be updated|to be released|placeholder-block|placeholder-text" en/research-communication.html
```

Expected: the current placeholders are found.

- [ ] **Step 2: Expand the minified English markup into readable semantic HTML**

Preserve all existing navigation links, resource paths, contact information, language switch behavior, and footer. Use the same indentation style as `en/research-multimodal.html` so later content changes remain auditable.

- [ ] **Step 3: Translate the complete page with fixed terminology**

Use these exact section names:

```text
AI-Native Communication from Intelligent Signals to Trustworthy Action
Research Background
Research Directions
Intelligent Signal Processing and Multimodal Health
Wireless World Models and Network Agents
Embodied and Edge Intelligent Communication
Trustworthy Communication-Intelligence Loop
Future Directions
Representative Works
```

Use `speech-based cognitive screening`, `task-oriented communication`, `action assurance`, `device-edge-cloud collaboration`, and `safe fallback` consistently. Do not translate 具身 as `physicalized`; use `embodied`.

- [ ] **Step 4: Mirror publication metadata and links exactly**

Keep the same five work titles, ordering, author lists, venue/year text, and URLs as the Chinese page. Only the descriptive paragraphs are translated.

- [ ] **Step 5: Run English and parity checks**

Run:

```powershell
rg -n "to be updated|to be released|placeholder-block|placeholder-text" en/research-communication.html
rg -n "Intelligent Signal Processing and Multimodal Health|Wireless World Models and Network Agents|Embodied and Edge Intelligent Communication|Trustworthy Communication-Intelligence Loop|Representative Works" en/research-communication.html
$cnWorks = (Select-String -LiteralPath 'research-communication.html' -Pattern 'class="publication-item"' -AllMatches).Matches.Count
$enWorks = (Select-String -LiteralPath 'en\research-communication.html' -Pattern 'class="publication-item"' -AllMatches).Matches.Count
if ($cnWorks -ne 5 -or $enWorks -ne 5) { throw "Publication parity failed: CN=$cnWorks EN=$enWorks" }
```

Expected: no placeholder matches, all five section markers found, and both publication counts equal five.

- [ ] **Step 6: Commit the English page**

```powershell
git add -- en/research-communication.html
git diff --cached --check
git commit -m "content: write intelligent communication page in English"
```

Expected: one HTML file committed with no whitespace errors.

---

### Task 3: Verify Content, Links, Rendering, and Scope

**Files:**
- Verify: `research-communication.html`
- Verify: `en/research-communication.html`
- Verify unchanged: `css/style.css`, `js/main.js`, other research pages

**Interfaces:**
- Consumes: Completed bilingual pages from Tasks 1 and 2.
- Produces: Evidence that both pages are structurally valid, locally reachable, link-safe, responsive, and limited to approved files.

- [ ] **Step 1: Run static scope and placeholder checks**

```powershell
git diff origin/main...HEAD --check
rg -n "待补充|to be updated|to be released|placeholder-block|placeholder-text" research-communication.html en/research-communication.html
git diff --name-only origin/main...HEAD
```

Expected: no diff errors, no placeholder matches, and the branch contains only the approved spec, plan, and two communication pages.

- [ ] **Step 2: Parse both pages with Python's HTML parser**

Run:

```powershell
@'
from html.parser import HTMLParser
from pathlib import Path

class StrictEnoughParser(HTMLParser):
    def error(self, message):
        raise RuntimeError(message)

for name in ('research-communication.html', 'en/research-communication.html'):
    parser = StrictEnoughParser(convert_charrefs=True)
    parser.feed(Path(name).read_text(encoding='utf-8'))
    parser.close()
    print(f'parsed: {name}')
'@ | python -
```

Expected: both filenames print with no exception.

- [ ] **Step 3: Verify local relative resources**

Run:

```powershell
@'
import re
from pathlib import Path

for page in (Path('research-communication.html'), Path('en/research-communication.html')):
    text = page.read_text(encoding='utf-8')
    for attr, value in re.findall(r'''\b(href|src)=["']([^"']+)["']''', text):
        if value.startswith(('http://', 'https://', 'mailto:', '#', 'javascript:')):
            continue
        target = (page.parent / value.split('?', 1)[0].split('#', 1)[0]).resolve()
        if not target.exists():
            raise SystemExit(f'missing local resource: {page} -> {value}')
    print(f'links ok: {page}')
'@ | python -
```

Expected: both pages report `links ok`.

- [ ] **Step 4: Serve and fetch both pages over HTTP**

Run:

```powershell
$server = Start-Process -FilePath python -ArgumentList '-m','http.server','8765','--bind','127.0.0.1' -WorkingDirectory (Get-Location) -WindowStyle Hidden -PassThru
try {
  $cn = Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:8765/research-communication.html'
  $en = Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:8765/en/research-communication.html'
  if ($cn.StatusCode -ne 200 -or $en.StatusCode -ne 200) { throw 'HTTP verification failed' }
  if ($cn.Content -notmatch '无线世界模型与网络智能体') { throw 'Chinese content missing over HTTP' }
  if ($en.Content -notmatch 'Wireless World Models and Network Agents') { throw 'English content missing over HTTP' }
} finally {
  Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
}
```

Expected: the command exits successfully and the server process is stopped.

- [ ] **Step 5: Capture desktop and mobile screenshots with Edge**

Run:

```powershell
$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$reviewDir = Join-Path $env:TEMP 'mics-intelligent-communication-review'
New-Item -ItemType Directory -Force -Path $reviewDir | Out-Null
$server = Start-Process -FilePath python -ArgumentList '-m','http.server','8765','--bind','127.0.0.1' -WorkingDirectory (Get-Location) -WindowStyle Hidden -PassThru
try {
  & $edge --headless --disable-gpu --hide-scrollbars --window-size=1440,1200 --screenshot="$reviewDir\cn-desktop.png" 'http://127.0.0.1:8765/research-communication.html'
  & $edge --headless --disable-gpu --hide-scrollbars --window-size=390,1200 --screenshot="$reviewDir\cn-mobile.png" 'http://127.0.0.1:8765/research-communication.html'
  & $edge --headless --disable-gpu --hide-scrollbars --window-size=1440,1200 --screenshot="$reviewDir\en-desktop.png" 'http://127.0.0.1:8765/en/research-communication.html'
  & $edge --headless --disable-gpu --hide-scrollbars --window-size=390,1200 --screenshot="$reviewDir\en-mobile.png" 'http://127.0.0.1:8765/en/research-communication.html'
} finally {
  Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
}
```

Inspect all four screenshots under `$reviewDir` for clipped headings, horizontal overflow, broken publication cards, unreadable long titles, and inconsistent whitespace. The screenshots stay outside Git.

- [ ] **Step 6: Run a final diff audit and commit any verification-only corrections**

```powershell
git status --short
git diff origin/main...HEAD -- research-communication.html en/research-communication.html
git diff origin/main...HEAD --check
```

If rendering corrections were required, stage only the two approved HTML files and commit:

```powershell
git add -- research-communication.html en/research-communication.html
git commit -m "fix: polish intelligent communication page rendering"
```

Expected: clean working tree, no untracked screenshots, and no changes to unrelated pages, CSS, JavaScript, or assets.
