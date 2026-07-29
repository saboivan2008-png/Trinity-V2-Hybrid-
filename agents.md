<!-- BEGIN:nextjs-agent-rules -->
# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`.
If the project uses the codemod docs mirror, read `.next-docs/` instead.

Your training data is outdated — the docs are the source of truth.
Use App Router patterns, server-first logic, and the current Next.js version in this repo.
<!-- END:nextjs-agent-rules -->

# Butcher Trinity Project Rules

You are working on Butcher Trinity, an autonomous AI platform with memory, skill registry, verifier, audit, and policy layers.

## Goals
- Build a safe, self-improving, memory-aware AI system.
- Keep routing thin and server-first.
- Keep core logic outside `app/`.
- Preserve auditability and reversibility.

## Hard rules
- Never bypass the constitution or policy layer.
- Never activate a skill without verification.
- Never write sensitive data to memory without sanitization.
- Never expose secrets to client-side code.
- Never confuse simulation, draft, and real execution.

## Architecture rules
- `app/` is for routes, pages, layouts, and route handlers only.
- `core/` holds constitution, policy, orchestrator, and audit logic.
- `skills/` holds registry, verifier, signer, scanner, and skill definitions.
- `memory/` holds read, write, sanitize, summarize, and schemas.
- `evals/` holds test cases, regression checks, and safety checks.
- `features/` holds product-facing feature modules.

## Operating rules
- Prefer small, composable modules.
- Prefer server components unless interactivity requires client components.
- Every autonomous action must be logged.
- Every new skill must be staged, verified, and assigned a status.
- Every change to behavior must remain traceable.

## Output rules
- When generating code, create files in the correct directory structure.
- When unsure, ask for the exact file target before writing large changes.
- Keep code minimal, typed, and production-oriented.