---
title: 'Skills'
description: 'A map of the core capabilities every advanced AI builder should master.'
contributors:
  - orchids
---

## Why Skills Matter

Advanced tooling collapses unless the people running it can diagnose, tune, and explain it. Skills are the connective tissue between theory-heavy chapters and shipping something that survives in production. This page collects the habits, heuristics, and drills that show up repeatedly across successful AI teams.

## Core Pillars

### Systems Literacy

- Trace an inference request end-to-end and identify latency, cost, and failure choke points.
- Instrument everything: prompts, embeddings, vector search, rerankers, guardrails.
- Treat evaluation like CI; automate regression tests for prompts and workflows before rollout.

### Retrieval Craft

- Design chunking to respect meaning, not token counts; use adaptive windows for structured data.
- Pick embeddings by task (semantic search, code, multimodal) and track drift when vendors update models.
- Rerank aggressively; sparse+dense hybrids plus cross-encoders keep context relevant.

### Orchestration Discipline

- Break agents into atomic skills with transparent state machines before adding autonomy.
- Prefer declarative workflows (DSL, YAML, BPMN) so non-dev stakeholders can audit branching logic.
- Keep human-in-the-loop checklists for escalation, especially on safety-critical paths.

## Practice Stack

| Layer | Tooling to Master | Signals of Proficiency |
| --- | --- | --- |
| Observability | OpenTelemetry, Langfuse, custom traces | Can correlate hallucinations to specific prompt+context pairs |
| Data | Qdrant, Milvus, DuckDB | Tunes recall/precision by adjusting chunk filters and payload schema |
| Automation | Temporal, Windmill, n8n | Builds replayable workflows with retries and alerting |
| Evaluation | E2E harnesses, synthetic judges | Maintains scorecards per release and blocks regressions |

## Drills

1. Pick an existing workflow, log every intermediate artifact, and annotate decisions that were assumptions rather than measurements.
2. Run an embedding migration: swap to a new model, compare retrieval diffs, and document acceptance criteria.
3. Simulate on-call: inject failures (vector DB timeout, tool output in the wrong format) and practice mitigation playbooks.

## Reference Sets

- **Skill Trees**: Map stack layers to owners (PM, infra, prompt engineer) to expose gaps.
- **Capability Reviews**: Quarterly audits of evaluation coverage, incident response time, and documentation freshness.
- **Playbooks**: One-pagers for ramping new contributors onto RAG, MCP, or agentic systems without tribal knowledge.
