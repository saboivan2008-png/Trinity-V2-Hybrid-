# Butcher Trinity Architecture

## Overview
Butcher Trinity is built as a server-first AI platform with a thin UI, a chat orchestrator, a skill registry, a verifier, a memory layer, and an evaluation layer.

## Modules
- `app/`: pages, layouts, and route handlers.
- `core/`: constitution, policy, orchestrator, and audit.
- `skills/`: registry, verification, signing, scanning, activation.
- `memory/`: read, write, sanitize, summarize, schema.
- `evals/`: safety checks, regression tests, behavior validation.
- `features/`: domain-specific product modules.

## Data flow
1. User sends a request.
2. Chat orchestrator evaluates intent.
3. Relevant memory is fetched server-side.
4. Candidate skills are selected.
5. Verifier checks provenance, permissions, and policy.
6. Approved skills are activated.
7. Audit records the outcome.
8. Eval results inform future improvement.

## Design principles
- Server-first.
- Least privilege.
- Auditability.
- Reversibility.
- Safe self-improvement.
- No direct client access to sensitive layers.
Fix buG. 
