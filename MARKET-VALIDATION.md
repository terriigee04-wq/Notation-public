# Market Validation Plan

## Hypothesis
Teams spend 5-10 hours/week on status coordination. Notation cuts this by 40%, saves $250K/year for 50-person org. Will pay $25-100/mo if it integrates with existing tools.

---

## Validation Tests (Week 1-2)

### Test 1: Founder/Solopreneur Interest
**Method:** Twitter + IndieHackers + ProductHunt
**Success metric:** 20+ genuine DMs asking for early access
**Timeline:** 48 hours post-launch

**Draft messaging:**
> "Tired of 10 status update channels? Try Notation — write decisions, projects, risks in plain text. Parse to Slack, GitHub, Excel automatically. Free, open-source, zero setup."

---

### Test 2: Early Team Adoption
**Method:** 5-person internal test (Anthony's projects)
**Success metric:** All 5 use notation daily for 2 weeks without friction
**Friction points to track:**
- Time to first notation (target: <10 min)
- Daily adoption without reminders
- Parsing accuracy (target: >95%)
- Integration pain (Slack/GitHub sync)

**Test projects:**
- First Key (revenue tracking)
- Digital Downloads (progress + blockers)
- Kansas City property (workflow steps)
- Advantage Investment Grader (sprint planning)
- The Emergence (milestones + decisions)

---

### Test 3: Problem Validation (Structured Interviews)
**Sample:** 10 founders + 5 team leads
**Questions:**
1. How many tools do you use for status/decisions? (expect: 5-10)
2. How much time weekly on status coordination? (expect: 5-10 hours)
3. What's your biggest pain point? (expect: duplicate data, lost context)
4. Would you pay $25-100/mo to fix this? (target: >60% yes)
5. What integration matters most? (expect: Slack #1, GitHub #2)

**Timeline:** 2 weeks, parallel with build

---

### Test 4: Feature Demand
**Method:** Collect feedback from early users
**Key questions:**
- Which template (decision, project, meeting, workflow, risk) matters most?
- What's missing from core syntax?
- What's the #1 must-have integration?
- Would you pay for cloud dashboard or stay with markdown?

---

## Success Metrics (Cohort 1: First 100 Users)

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Adoption (daily active) | >70% | Core product value |
| Time-to-first-notation | <10 min | Low friction adoption |
| Retention (week 2) | >80% | Product-market fit signal |
| Integration adoption | >60% use Slack/GitHub | Reduces friction vs. Jira |
| Paying intent | >40% say "yes, would pay" | Revenue viability |
| NPS | >50 | Healthy growth product |

---

## Red Flags (Kill Signals)
- Adoption < 30% after week 1 → notation syntax too complex
- Time-to-first-notation > 30 min → UX/docs failure
- Integration pain blocking >50% → tool-agnostic thesis wrong
- Paying intent < 20% → pricing/positioning off
- NPS < 30 → product doesn't solve real problem

---

## Quick Win Experiments (This Week)

### Experiment 1: Can founders adopt without docs?
**Method:** Post notation examples on Twitter, link to repo
**Success:** >50 people fork/star repo within 48h

### Experiment 2: Does parsing work reliably?
**Method:** Build CLI tool, test on 10 real notation files
**Success:** >95% parse accuracy, no crashes

### Experiment 3: Will people use in Slack?
**Method:** Build Slack bot POC, test with 5 people
**Success:** Bot posts 10+ status updates/day with >90% accuracy

---

## Pricing Validation

**Current assumption:** $25/mo for Pro (dashboard + Slack bot)

**Test 1: Feature willingness-to-pay**
Survey question: "Which would you pay for?"
- Dashboard: 70% yes
- Slack integration: 90% yes
- GitHub sync: 60% yes
- → Bundle for $25, may be underpriced

**Test 2: Price sensitivity**
Price anchoring test:
- Free tier: core notation + CLI
- Pro at $25/mo
- Enterprise at $500+/mo

Expected: 5-10% convert to Pro, 0-2% to Enterprise (validate before scaling)

---

## Go-No-Go Decision (Week 2)

**Green light if:**
- ✅ >50 users in repo
- ✅ >70% week 2 retention
- ✅ >40% express paying intent
- ✅ Parsing works reliably
- ✅ At least 1 integration works smoothly

**Red light if:**
- ❌ <20 users after week 1 publicity push
- ❌ >50% drop off week 2
- ❌ <20% paying intent
- ✅ Any red flags triggered

**Yellow light (pivot):**
- Notation syntax too complex → simplify
- Integration too hard → make Slack-first, skip GitHub initially
- Pricing wrong → test freemium instead of $25 Pro

---

## Revenue Projection (If Green Light)

**Year 1:**
- Month 1-3: 100 free users, $0 revenue (build + launch)
- Month 4-6: 500 free, 50 Pro ($1.25K/mo)
- Month 7-9: 2K free, 200 Pro ($5K/mo)
- Month 10-12: 5K free, 500 Pro ($12.5K/mo)
- Total: ~$15K year 1

**Year 2 (assuming growth):**
- Month 1-6: 500 Pro users = $12.5K/mo
- Month 7-12: 800 Pro users = $20K/mo
- Total: $195K year 2

**Unit economics hold if:**
- CAC < $500 (achievable via content marketing)
- LTV > $600 (2-year retention × $25)
- Churn < 5%/month (target: 3%)

---

## Next 7 Days

- Day 1-2: Finish CLI parser + Slack bot POC
- Day 3-4: Launch on ProductHunt, Twitter, IndieHackers
- Day 5-6: Run structured interviews (5 founders)
- Day 7: Tally results, go/no-go decision

