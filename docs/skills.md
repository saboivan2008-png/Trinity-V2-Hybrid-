# Butcher Trinity Skills

## Skill model
A skill is a reusable capability artifact with:
- name
- version
- description
- permissions
- risk level
- owner/source
- verification status
- activation status

## Lifecycle
- `draft`
- `pending`
- `approved`
- `active`
- `blocked`
- `deprecated`

## Rules
- Skills may be proposed automatically.
- Skills may be stored in the registry automatically.
- Skills may only activate after verification.
- High-risk skills require stricter policy checks.
- Every skill run must generate evidence.

## Skill categories
- `create`
- `evolve`
- `selfwrite`
- `build`
- `memory`
- `audit`
- `policy`

## Verification requirements
- provenance check
- signature/hash check
- policy check
- risk score
- sandbox execution
- audit trail