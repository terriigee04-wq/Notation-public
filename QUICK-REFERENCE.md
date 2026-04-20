# Notation Quick Reference

## Core Syntax (1-page cheat sheet)

### Metadata Headers
```
[TYPE]        Decision, Project, Meeting, Workflow, Risk, Register
[STATUS]      🟢 ACTIVE | 🟡 BLOCKED | 🔴 STALLED | ⚪ ON_HOLD | ✅ DONE
[PRIORITY]    P0 (Critical) | P1 (High) | P2 (Medium) | P3 (Low)
[DATE]        2026-04-15 | [by DATE] | [~DATE] | [ASAP]
[OWNER]       @username (references)
```

### Relations
```
DEPENDS_ON: X             X must complete first
BLOCKS: Y                 Y can't start until this done
BLOCKED_BY: Z             Z is blocking this
HANDOFF: Step N → N+1     Transition point with gates
```

### Status Codes
```
✅ DONE                   Complete
🟢 ACTIVE / IN_PROGRESS   Moving forward
🟡 BLOCKED / MONITORING   Waiting/watching
🔴 STALLED               Needs attention/decision
⚪ PENDING / ON_HOLD     Not started/intentionally paused
```

### Common Patterns

**Decision:**
```
[DECISION] Title
[DATE] YYYY-MM-DD | [OWNER] @user | [PRIORITY] P1
Decision: [CHOSEN] Best option → Rationale → Consequences
[Review] [by DATE]
```

**Project:**
```
[PROJECT] Name
[STATUS] 🟢 ACTIVE | [PRIORITY] P0 | [OWNER] @user
[GOAL] What we're building | [LAUNCH] [by DATE]
Milestones, KPIs, Blockers, Budget
```

**Meeting:**
```
[MEETING] Name | [DATE] YYYY-MM-DD | [ATTENDEES] @user1, @user2
Decisions, Action items, Next steps
[NEXT_MEETING] YYYY-MM-DD
```

**Workflow/Process:**
```
[WORKFLOW] Name | [STATUS] 🟡 IN_PROGRESS | [STAGE] 3/6
Step 1 ✅  Step 2 🟢  Step 3 🟡  [CRITICAL_PATH] Steps...
```

**Risk:**
```
[RISK] Name | [SEVERITY] HIGH | [STATUS] ACTIVE
What, Why, Current, Mitigation, Escalation
[BLOCKED_SINCE] 2026-04-10
```

---

## Token Efficiency

| Type | Avg Tokens | Best For |
|------|-----------|----------|
| Decision Log | 150 | Major choices (pricing, tech, scope) |
| Project Status | 160 | Weekly/monthly snapshots |
| Meeting Notes | 180 | Decisions + action items |
| Risk Register | 100 | Active risks dashboard |
| Workflow | 140 | Multi-step processes |
| Quick Note | 40 | Status updates, blockers |

**Pro tip:** Use compact forms (tables, lists) over prose. Extract high-value data, discard filler.

---

## Parsing Quick Start

```bash
# Extract all P0 items
grep "\[PRIORITY\] P0" *.md

# Find all blockers
grep "BLOCKED_BY:" *.md

# Status dashboard
grep -E "\[STATUS\]|BLOCKED_SINCE" *.md

# Who owns what
grep -E "\[OWNER\]|@" *.md
```

---

## Integration Ideas

- **Daily Standup:** Extract all IN_PROGRESS + BLOCKED items
- **Dashboard:** CSV export, sort by priority/owner
- **Calendar:** Parse [by DATE] into calendar events
- **Slack Bot:** Parse notation, post status updates
- **GitHub:** Sync decisions & risks to Issues
- **Alert:** Escalate HIGH + long-blocked items
