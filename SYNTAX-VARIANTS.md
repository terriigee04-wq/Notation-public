# Notation Syntax Variants

## 1. Decision Log Format

```
[DECISION] Project Name - Decision Title
[DATE] 2026-04-15
[OWNER] @anthony
[PRIORITY] P1

**Situation:** Context/problem statement
**Options Considered:** 
  - Option A (pros/cons)
  - Option B (pros/cons)

**Decision:** [CHOSEN] Option A
**Rationale:** Why this path
**Consequences:** What happens next
**Review Date:** [by 2026-05-15]

DEPENDS_ON: X
BLOCKS: Y
```

---

## 2. Workflow/Process Notation

```
[WORKFLOW] Process Name
[STATUS] ACTIVE | STAGE: Step 3 of 5

Step 1: Input ✅ [DONE]
  → Owner: @user
  → Deadline: [by DATE]
  → Output: Result description

Step 2: Review 🟡 [IN_PROGRESS]
  → Owner: @reviewer
  → Blocked by: Step 1 output
  → Gates: Approval required

Step 3: Execute ⚪ [PENDING]
  → Owner: @executor
  → Depends on: Step 2 approval
  → Duration: ~2 days

[HANDOFF] Step 2 → Step 3 requires sign-off from @reviewer
```

---

## 3. Risk/Blocker Escalation

```
[RISK] Issue Name
[SEVERITY] HIGH | [IMPACT] Revenue delay
[DISCOVERED] 2026-04-15
[OWNER] @anthony

**What:** Clear description of risk
**Why it matters:** Business impact
**Current status:** What we know
**Mitigation plan:** What we're doing about it
**Escalation:** Who needs to know, by when

[ESCALATE_TO] @leadership [by 2026-04-16]
[REVIEW_CADENCE] Daily until resolved
```

---

## 4. Meeting Notes Template

```
[MEETING] Event Name
[DATE] 2026-04-15 | [TIME] 2:00 PM PT
[ATTENDEES] @user1, @user2, @user3
[OWNER] @facilitator

## Agenda
- Topic 1
- Topic 2
- Topic 3

## Decisions Made
[DECISION] Main decision
  - Owner: @user
  - Implementation: [by DATE]

## Action Items
- [ ] Task 1 — @owner [by DATE]
- [ ] Task 2 — @owner [by DATE]

## Key Takeaways
- Point 1
- Point 2

[NEXT_MEETING] 2026-04-22
```

---

## 5. Project Status Template

```
[PROJECT] Name
[STATUS] 🟢 ACTIVE | [PRIORITY] P1
[HEALTH] 📊 Green (on track)

[GOAL] What we're building
[OWNER] @anthony | [TEAM] @user1, @user2

### KPIs
- Metric 1: Current value → Target
- Metric 2: Current value → Target

### Timeline
[by 2026-05-01] Milestone 1
[by 2026-06-01] Milestone 2

### Blockers
[BLOCKED_BY] X since 2026-04-10
  - Impact: Development paused
  - Resolution: Waiting on @user decision

[DEPENDS_ON] Y
[BLOCKS] Z

### Budget
- Spent: $X / Allocated: $Y
- Burn rate: $X/month
```

---

## 6. Risk Register (Compact)

```
[REGISTER] Q2 Risks

| Risk | Owner | Severity | Status | Mitigation | Review |
|------|-------|----------|--------|-----------|--------|
| [R1] Cash flow delay | @anthony | HIGH | ACTIVE | Secure line of credit | Weekly |
| [R2] Team bandwidth | @lead | MEDIUM | MONITORING | Hire contractor | Bi-weekly |
```

---

## Token Count (Baseline)
- Decision log: ~150 tokens
- Workflow: ~120 tokens
- Risk escalation: ~100 tokens
- Meeting notes: ~180 tokens
- Project status: ~160 tokens
- Risk register: ~80 tokens

