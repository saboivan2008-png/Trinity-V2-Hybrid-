# Butcher Trinity Memory

## Purpose
Memory stores only useful, sanitized, and authorized information that improves future behavior.

## Memory types
- Short-term context
- Session summaries
- Long-term facts
- Preferences
- Skill evidence
- Audit references

## Rules
- Never store secrets.
- Never store raw sensitive data unless explicitly allowed.
- Always sanitize before writing.
- Prefer summaries over raw transcripts.
- Track source and timestamp for every entry.

## Read path
Memory is read only on the server and only when needed by the orchestrator.

## Write path
Memory writes occur after response generation or after a verified event.