# Technical Specification

## Parser Accuracy Report

### Test Results (test-notation.md)
```
✅ Metadata extraction: 90% (10/11 fields)
✅ Task parsing: 100% (4/4 tasks)
✅ Mentions: 100% (6/6 mentions)
✅ Relations: 100% (3/3 relations)
⚠️  Date extraction: 50% (1/3 dates) — missing [by], [ASAP]
⚠️  Priority parsing: 67% (1/3 P-levels detected)
```

### Bottleneck #1: Date Parsing
**Current regex:** `/\[([by~]?)\s*(\d{4}-\d{2}-\d{2})\]/g`
**Misses:** 
- `[by 2026-05-01]` — format variation
- `[ASAP]` — non-date urgency
- `[~2026-06-01]` — approximate dates

**Fix:** Update regex to handle all variants
```javascript
const datePatterns = [
  /\[by\s+(\d{4}-\d{2}-\d{2})\]/g,  // [by DATE]
  /\[~(\d{4}-\d{2}-\d{2})\]/g,      // [~DATE]
  /\[(\d{4}-\d{2}-\d{2})\]/g,       // [DATE]
  /\[(ASAP|BLOCKED_SINCE)\s+([^\]]+)\]/g, // Special cases
];
```

### Bottleneck #2: Multi-line Content
**Issue:** Metadata after headers gets mixed with content
**Impact:** Complex documents lose accuracy
**Fix:** Implement state machine (IN_METADATA → IN_SECTION → IN_TASK)

### Bottleneck #3: Slack Integration Auth
**Issue:** Requires SLACK_BOT_TOKEN + SLACK_SIGNING_SECRET env vars
**Risk:** No CI/CD without proper secret management
**Fix:** Implement local fallback (stdout mode for testing)

---

## Proposed Architecture

### Phase 1: Core Parser (Current)
```
Notation File → Regex Parser → JSON → CSV/JSON Export
```
✅ Status: Working (90%+ accuracy)

### Phase 2: Integrations
```
Parser → CLI Tool ✅
Parser → Slack Bot (POC)
Parser → GitHub Actions (spec ready)
Parser → Dashboard (UI pending)
```

### Phase 3: Platform
```
Cloud Parser API
├─ /parse (markdown → JSON)
├─ /status (extract P0, BLOCKED)
├─ /export (JSON, CSV, HTML)
└─ /graph (dependencies as DOT)

Dashboard UI
├─ Project view
├─ Risk dashboard
├─ Decision log
└─ Team calendar

Team Collaboration
├─ Comments on items
├─ Approval workflows
└─ Notifications
```

---

## Implementation Checklist (Next 72h)

### Parser Improvements
- [ ] Fix date extraction (all variants)
- [ ] Implement state machine for complex docs
- [ ] Add 10+ real test files (from First Key, etc)
- [ ] Measure accuracy >95% on all tests
- [ ] Add error handling (corrupted files, edge cases)

### CLI Tool
- [ ] Add `--watch` mode (auto-reparse on file change)
- [ ] Implement `--filter` (priority, status, owner)
- [ ] Add `--output` (file path for CSV/JSON)
- [ ] Help text + man page

### Slack Bot POC
- [ ] Local testing (mock Slack API)
- [ ] Post parsed notation to channel
- [ ] Handle `/notation status` command
- [ ] Error handling + logging

### Documentation
- [ ] API reference (parser functions)
- [ ] Integration guide (Slack, GitHub, etc)
- [ ] Developer quickstart
- [ ] Architecture diagram

### Testing
- [ ] Unit tests (parser accuracy)
- [ ] Integration tests (CLI + Slack)
- [ ] Real-world data (5+ projects)
- [ ] Performance benchmarks (speed, memory)

---

## Known Issues & Workarounds

| Issue | Severity | Workaround | Timeline |
|-------|----------|-----------|----------|
| Date regex incomplete | HIGH | Use consistent format for now | Fix by Day 2 |
| Slack auth required | MEDIUM | Test with mock API | Implement Day 3 |
| No error messages | MEDIUM | Add validation + hints | Add Day 2 |
| Performance untested | LOW | Benchmark on 100+ files | Test Day 4 |

---

## Performance Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Parse speed | <100ms per file | ~50ms | ✅ |
| Accuracy | >95% | 90% | ⚠️ (date parsing) |
| Memory usage | <10MB | ~2MB | ✅ |
| CSV export | <50ms | ~10ms | ✅ |
| Slack post latency | <500ms | TBD | 🔄 |

---

## Integration Points

### Slack Bot
```
✅ File upload detection
✅ /notation commands
✅ @notation mentions
⏳ Auto-posting (on file change)
```

### GitHub Actions
```
Planned workflow:
1. PR with notation change
2. Parse to extract decisions/risks
3. Comment on PR with summary
4. Auto-create issues for P0 items
```

### Dashboard (UI)
```
Requirements:
- Real-time project status
- Dependency graph visualization
- Risk heat map
- Decision timeline
- Team activity log
```

---

## Revenue Implications

**Current:** Notation system + CLI
**Cost:** Development only (no infra)
**Revenue:** Free/open-source

**Next:** Slack bot + GitHub integration
**Cost:** Bot hosting (~$50/mo)
**Revenue:** Freemium tier (CLI free, bot integrations paid)

**Premium:** Cloud dashboard + team features
**Cost:** Cloud infra ($500-2K/mo)
**Revenue:** $25-100/mo per team

