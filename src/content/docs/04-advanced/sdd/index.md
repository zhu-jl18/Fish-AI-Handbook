---
title: 'SDD'
description: 'Specification-Driven Development'
contributors:
  - codex
---

## Spec-Driven Development 

Specification is the program. You lock intent first, then generate code from it. The loop becomes:

```
You → Spec → Plan → Tasks → Code → Tests → Done
```

Effects:
- Single source of truth (versioned spec)
- Predictable outputs (same spec ⇒ same code)
- Team-friendly (parallelizable tasks, reviewable diffs)
- Easier QA (tests derive from spec and contracts)





## Some Suggestions

Pitfalls

- Don't write code-level specs. Describe outcomes, not function names.
- Don't skip the constitution — it's how you stop style and security drift.
- Don't mix workflows. If you're in spec mode, change the spec; don't "quick‑patch" in chat.

Bottom line

Use vibe coding for prototypes and learning. Use SPEC for anything with users, uptime, or a roadmap. Your future self (and teammates) will thank you.

## Further reading

- GitHub Spec Kit Quickstart and commands
- Spec Kit repo (CLI reference, folder layout)
- AWS Kiro: spec‑driven development and MCP
- Kiro: does your code match your spec? (property‑based testing)
- OpenSpec: lightweight, brownfield‑first
