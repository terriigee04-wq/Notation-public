# Parsing & Export Specs

## 1. JSON Serializer

```javascript
// Input: Notation markdown
[DECISION] Build API
[DATE] 2026-04-15
[OWNER] @anthony
[PRIORITY] P1

Decision: Use REST over GraphQL

// Output:
{
  "type": "decision",
  "metadata": {
    "title": "Build API",
    "date": "2026-04-15",
    "owner": "anthony",
    "priority": "P1"
  },
  "content": {
    "decision": "Use REST over GraphQL"
  }
}
```

**Fields extracted:**
- `[TYPE]` metadata (decision, project, meeting, etc.)
- `[FIELD]` values (date, owner, priority, etc.)
- Inline status/severity codes (🟢, 🔴, P0, etc.)
- Dependencies (DEPENDS_ON, BLOCKS, BLOCKED_BY)
- Checkboxes (✅, ⚪, 🟡)

---

## 2. CSV Export (For Dashboards)

```
Type,Title,Owner,Priority,Status,DueDate,BlockedSince,Impact
Decision,Build API,anthony,P1,,2026-04-15,,
Project,First Key,anthony,P0,ACTIVE,2026-05-01,,Revenue
Risk,Cash Flow,anthony,HIGH,MONITORING,,2026-04-10,Revenue
Meeting,Q2 Planning,anthony,,,,,(Notes)
```

**Use case:** Dashboard widgets, status reports, Excel integration

---

## 3. Status Extractor

```
// Returns all P0 or BLOCKED items across documents

{
  "critical": [
    { "type": "project", "name": "First Key", "status": "ACTIVE" },
    { "type": "risk", "name": "Cash Flow", "since": "2026-04-10" }
  ],
  "blocked": [
    { "title": "X", "blockedBy": "Y", "days": 5 }
  ]
}
```

**Use case:** Daily standup, escalation alerts, priority reports

---

## 4. Dependency Mapper

```
Input:
[PROJECT] First Key
BLOCKS: Digital Downloads

[PROJECT] Digital Downloads
DEPENDS_ON: First Key

Output (DOT format):
digraph {
  "First Key" -> "Digital Downloads"
  "Kansas City Property" -> "All Projects"
}

// Renders as visual graph showing:
// - Critical path
// - Parallelizable work
// - Bottlenecks
```

**Use case:** Roadmap visualization, resource planning

---

## 5. Implementation Checklist

- [ ] Regex patterns for field extraction
- [ ] Date/time parser (handles "2026-04-15", "by DATE", "[ASAP]")
- [ ] Status code decoder (emoji → enum)
- [ ] Owner mention parser (@user → user ID)
- [ ] Dependency resolver (detects circular refs)
- [ ] Export pipelines (JSON, CSV, DOT, HTML)

---

## 6. API Endpoints (Future Product)

```
POST /api/notation/parse
  Input: markdown text
  Output: structured JSON

GET /api/status?priority=P0,BLOCKED
  Output: filtered dashboard data

POST /api/export/csv?filter=project,team
  Output: downloadable CSV

GET /api/graph?project=First%20Key
  Output: dependency visualization
```

