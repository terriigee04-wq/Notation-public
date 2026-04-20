# Notation

**A plain-text notation system for projects, decisions, and risks.**

Write once. Parse everywhere. No copy-paste, no duplicate updates.

## What Is Notation?

Notation is a lightweight, human-readable notation for capturing project status, decisions, risks, and workflows. It's designed to be:

- **Simple** — minimal syntax, easy to learn
- **Portable** — plain text, works in any editor
- **Parseable** — machines extract structure automatically
- **Integrable** — posts to Slack, GitHub, dashboards, anywhere

## Quick Start

### Installation

```bash
git clone https://github.com/yourusername/notation.git
cd notation
npm install
```

### Basic Usage

Create a `.notation` file:

```
[PROJECT] First Key
[STATUS] 🟢 ACTIVE
[PRIORITY] P0
[OWNER] @anthony
[DEADLINE] 2026-05-01

## Overview
Building a passive income web app.

## Tasks
- [ ] Launch MVP
- [ ] Set up analytics
- [x] Design landing page

## Blockers
None currently

DEPENDS_ON: Analytics infrastructure
BLOCKS: Revenue launch
```

Parse it:

```bash
node cli-parser.js parse my-project.notation --format=json
node cli-parser.js parse my-project.notation --format=csv
```

## Templates

### 1. Project Status
```
[PROJECT] Name
[STATUS] 🟢 ACTIVE | [PRIORITY] P0
[OWNER] @username
[DEADLINE] [by 2026-05-01]

## Goals
- Goal 1
- Goal 2

## Tasks
- [ ] Task 1 — @owner [by DATE]
- [ ] Task 2 — @owner [by DATE]

## Blockers
BLOCKED_BY: Something [since DATE]
```

### 2. Decision Log
```
[DECISION] Title
[DATE] 2026-04-15
[OWNER] @username
[PRIORITY] P1

**Situation:** Context/problem
**Options:** A, B, C with pros/cons
**Decision:** [CHOSEN] Option A
**Rationale:** Why this path
[Review] [by DATE]
```

### 3. Risk Register
```
[RISK] Name
[SEVERITY] HIGH | [STATUS] ACTIVE
[OWNER] @username

What: Description
Why: Business impact
Mitigation: What we're doing
[ESCALATE_TO] @leader [by DATE]
```

### 4. Meeting Notes
```
[MEETING] Name
[DATE] 2026-04-15
[ATTENDEES] @user1, @user2, @user3

## Decisions
[DECISION] What we decided
[Review] [by DATE]

## Action Items
- [ ] Task — @owner [by DATE]

[NEXT_MEETING] 2026-04-22
```

### 5. Workflow
```
[WORKFLOW] Process Name
[STATUS] 🟡 IN_PROGRESS | [STAGE] 2/5

Step 1 ✅ [DONE]
Step 2 🟢 [IN_PROGRESS]
Step 3 ⚪ [PENDING]

[CRITICAL_PATH] Step 1 → Step 2 → Step 3
```

## Status Codes

```
🟢 ACTIVE       — Moving forward
🟡 BLOCKED      — Waiting on something
🔴 STALLED      — Needs attention
⚪ PENDING      — Not started
✅ DONE         — Complete
```

## Priority Levels

```
P0 — CRITICAL   — Must happen now
P1 — HIGH       — This week
P2 — MEDIUM     — This month
P3 — LOW        — Backlog
```

## Relations

```
DEPENDS_ON: X       — X must complete first
BLOCKS: Y           — Y can't start until this done
BLOCKED_BY: Z       — Z is blocking this
HANDOFF: A → B      — Transition point
```

## CLI Commands

```bash
# Parse to JSON
node cli-parser.js parse file.notation --format=json

# Parse to CSV
node cli-parser.js parse file.notation --format=csv

# Extract P0 items
node cli-parser.js extract file.notation --filter=priority=P0

# Extract blockers
node cli-parser.js extract file.notation --filter=status=BLOCKED

# Generate dependency graph
node cli-parser.js graph file.notation --format=dot
```

## Slack Integration

Post notation status to Slack automatically:

```bash
export SLACK_BOT_TOKEN=xoxb-...
export SLACK_SIGNING_SECRET=...
node slack-bot.js
```

Commands:
- `/notation status` — Show P0 items
- `@notation extract P0` — List critical items
- `@notation blockers` — Show blocked items
- Upload `.notation` file — Auto-parse and post

## Features

✅ Core notation syntax
✅ CLI parser (JSON, CSV export)
✅ Slack bot integration
✅ Dependency mapping
✅ Task extraction
✅ Mention parsing

🔜 Web dashboard
🔜 GitHub Actions integration
🔜 Team collaboration features
🔜 Mobile app

## Pricing

**Free Tier:**
- Notation syntax + documentation
- CLI parser
- GitHub examples

**Pro ($25/mo):**
- Cloud dashboard
- Slack bot
- Team workspaces

**Enterprise ($500+/mo):**
- Custom integrations
- API access
- Dedicated support

## Community

- **Issues:** Report bugs or request features
- **Discussions:** Share ideas and use cases
- **Examples:** Submit your notation workflows
- **Twitter:** [@NotationHQ](https://twitter.com)

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT — Use freely, modify, distribute.

## FAQ

**Q: Is this a replacement for Asana/Monday/Jira?**
A: No. It's lighter, faster, and cheaper. Good for solopreneurs and small teams. Enterprise teams may need more features.

**Q: Can I use this offline?**
A: Yes! Notation is plain text. Works offline, syncs when you're online.

**Q: How do I export my data?**
A: It's already exported — it's plain text files. Copy them anywhere.

**Q: Can teams collaborate?**
A: Yes, via shared folders (Google Drive, GitHub, Dropbox). Pro tier adds real-time sync.

**Q: Is there a mobile app?**
A: Not yet. You can view/edit notation files in any text editor on mobile. Native app coming 2026.

---

**Questions?** Open an issue or email hello@notation.dev

**Want to try Pro?** [Start free trial](https://notation.dev/pricing)
