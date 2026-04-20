# Real-World Examples

## Example 1: Project Tracking

```
[PROJECT] First Key
[STATUS] 🟢 ACTIVE | [PRIORITY] P0
[OWNER] @anthony | [TEAM] @dev1, @dev2
[HEALTH] 📊 Green (on track)

[GOAL] Passive income SaaS reaching $5K MRR
[LAUNCH_DATE] [by 2026-06-30]

### Milestones
- [by 2026-04-30] Analytics dashboard live ✅
- [by 2026-05-15] Performance optimization complete
- [by 2026-06-01] Pricing strategy locked
- [by 2026-06-30] Public launch

### KPIs
- Daily active users: 150 → 500
- Revenue: $0 → $5,000/month
- Page load time: 2.5s → <1s
- Uptime: 99.5%

### Current Sprint
[SPRINT_05] 2026-04-15 to 2026-04-29

Active tasks:
- [ ] Implement analytics tracking — @dev1 [by 2026-04-22]
- [ ] Fix homepage performance — @dev2 [by 2026-04-25]
- [ ] A/B test signup flow — @anthony [by 2026-04-29]

### Budget
- Spent: $3,200 / Allocated: $10,000
- Burn: $1,600/month
- Runway: 6+ months

### Blockers
None currently

BLOCKS: Digital Downloads (revenue baseline)
```

---

## Example 2: Decision Log

```
[DECISION] Pricing Model for First Key
[DATE] 2026-04-15
[OWNER] @anthony
[PRIORITY] P1

**Situation:** 
First Key needs pricing locked by May 1 for marketing. Three models viable: freemium, subscription, pay-per-use.

**Options Considered:**
- Freemium ($29/mo premium tier)
  - Pros: Low friction, viral potential, 5-10% conversion typical
  - Cons: Support overhead, churn risk
  
- Subscription ($99-499/mo tiers)
  - Pros: Predictable revenue, better retention
  - Cons: Slower adoption, requires feature differentiation
  
- Pay-per-use ($0.10-1.00 per transaction)
  - Pros: No risk for users
  - Cons: Revenue volatile, hard to forecast

**Decision:** [CHOSEN] Freemium + Premium subscription hybrid
- Tier 1: Free (5 analysis/month)
- Tier 2: $29/month (unlimited + priority support)
- Tier 3: $99/month (API access + custom integrations)

**Rationale:** 
Balances user acquisition (free tier) with revenue stability (premium). Aligns with SaaS benchmarks. Can adjust tiers in Q3 based on unit economics.

**Consequences:**
- Need to build tier gates by May 1
- Premium support team needed by Q3
- Will measure: free-to-paid conversion, churn, LTV

**Review Date:** [by 2026-08-01]

[DECISION_LOG_ID] FIRST-KEY-PRICING-001
BLOCKS: Marketing launch
DEPENDS_ON: Analytics (to understand user segments)
```

---

## Example 3: Risk Register

```
[REGISTER] Active Risks - Q2 2026

[RISK] R1 - Cash Flow Constraint
[SEVERITY] HIGH | [IMPACT] Could delay all projects
[DISCOVERED] 2026-03-15
[OWNER] @anthony

Status: ACTIVE (5 weeks ongoing)
Current: $2K in bank, $3.5K monthly burn
Trigger: If cash < $1K, pause non-revenue projects

Mitigation:
- Close first revenue deal by May 15 (Digital Downloads)
- Secure $10K line of credit (in progress)
- Reduce burn by 20% (cut tools Q2)

Escalation: None needed if Digital Downloads launches on time

---

[RISK] R2 - Scope Creep on First Key
[SEVERITY] MEDIUM | [IMPACT] Delays revenue launch
[DISCOVERED] 2026-04-10
[OWNER] @dev_lead

Status: MONITORING (3 days)
Current: Feature backlog at 15 items, only 3 committed for launch MVP

Mitigation:
- Weekly scope review (every Mon 10am)
- Cut anything non-essential before May 1
- Lock feature freeze April 20

Escalation: Escalate to @anthony if timeline slips 2+ weeks

---

[RISK] R3 - Key Person Dependency
[SEVERITY] MEDIUM | [IMPACT] Launch delays if key dev unavailable
[DISCOVERED] 2026-04-01
[OWNER] @anthony

Status: MONITORING
Current: Dev knowledge concentrated in 1 person on core features
Mitigation:
- Document critical systems (ongoing)
- Cross-train second dev (May)
- Build runbook for manual failover

Escalation: If primary dev unavailable, review May 15 deadline

---

Dashboard Summary:
HIGH risks: 1 (Cash Flow)
MEDIUM risks: 2 (Scope, Key Person)
Next review: 2026-04-22
```

---

## Example 4: Meeting Notes

```
[MEETING] First Key Roadmap Planning
[DATE] 2026-04-15
[TIME] 2:00 PM PT
[ATTENDEES] @anthony (founder), @dev1 (lead dev), @dev2 (backend), @product (PM)
[DURATION] 1.5 hours
[NOTES_BY] @product

## Agenda
1. Q2 Launch Timeline (15 min)
2. Feature Prioritization for MVP (30 min)
3. Performance Targets & Testing (20 min)
4. Go-to-Market Strategy (20 min)

## Key Decisions

[DECISION] Launch MVP by June 30 with core features only
- Approved by: @anthony
- Implementation owner: @dev1
- Sign-off date: [by 2026-06-30]

[DECISION] Pricing: Freemium + $29/$99 tiers (see separate decision doc)
- Approved by: @anthony
- Marketing launch: [by 2026-07-01]

[DECISION] Performance target: <1s page load, 99.5% uptime
- Approved by: @dev1
- Testing deadline: [by 2026-06-15]

## Action Items

- [ ] Finalize feature list (remove 8 non-essential) — @product [by 2026-04-20]
- [ ] Build analytics dashboard skeleton — @dev1 [by 2026-04-22]
- [ ] Set up performance monitoring — @dev2 [by 2026-04-25]
- [ ] Schedule pricing/GTM sync — @anthony [by 2026-04-17]
- [ ] Document architecture decisions — @dev1 [by 2026-05-01]

## Risks Identified

[RISK] R2 - Scope creep (backlog at 15 items, only 3 committed)
  → Mitigation: Weekly scope review, feature freeze April 20
  → Owner: @dev_lead

[RISK] Timeline tightness (6 weeks to launch, normally 8-10)
  → Mitigation: Parallel work, cut polish in MVP
  → Owner: @anthony

## Next Steps

[NEXT_MEETING] 2026-04-22 (Weekly sync)
[ESCALATION_NEEDED] If scope review shows unmanageable backlog, escalate pricing delay to @anthony

---

**Meeting Health:** Green (decisions made, next steps clear)
**Follow-up Cadence:** Weekly check-ins until launch
```

---

## Example 5: Workflow - Investment Property Purchase

```
[WORKFLOW] Kansas City Property Purchase
[STATUS] 🟡 IN_PROGRESS | [STAGE] Step 3 of 6
[OWNER] @anthony
[TARGET_CLOSE] [by 2026-08-15]

Step 1: Property Search ✅ [DONE]
  → Owner: @anthony + @realtor
  → Completed: 2026-04-01
  → Output: 3 properties shortlisted
  → Next: Inspect properties

Step 2: Home Inspection 🟢 [IN_PROGRESS]
  → Owner: @inspector (hired)
  → Deadline: [by 2026-04-20]
  → Deliverable: Inspection report + cost estimates
  → Blocked by: None
  → Handoff gate: Report + 24h review period

Step 3: Financing Approval 🟡 [IN_PROGRESS]
  → Owner: @lender + @anthony
  → Deadline: [by 2026-05-15]
  → Status: Pre-approval complete, full approval pending inspection
  → Blockers: Inspection report (see Step 2)
  → Next: Submit full application with appraisal

Step 4: Appraisal & Underwriting ⚪ [PENDING]
  → Owner: @lender
  → Est. timeline: ~10 days
  → Depends on: Financing application (Step 3)
  → Gate: Lender approval required before next step

Step 5: Final Walk-through & Closing Prep ⚪ [PENDING]
  → Owner: @anthony + @attorney
  → Timeline: 3 days before close
  → Deliverable: Final inspection, insurance bound

Step 6: Closing ⚪ [PENDING]
  → Owner: @attorney + @title_company
  → Target: [by 2026-08-15]
  → Depends on: All prior steps complete
  → Duration: ~2 hours

[CRITICAL_PATH]: Step 2 (inspection) → Step 3 (financing) → Step 4 (underwriting)
[RISK] Financing delay if appraisal comes in low
  → Mitigation: Pre-appraisal estimate already done
  → Escalation: If appraisal < offer price, notify @anthony immediately

[BUDGET_SNAPSHOT]
- Down payment: $20,000 (due at close)
- Closing costs: $5,000 (est.)
- Inspections/appraisal: $1,200 (committed)
```

