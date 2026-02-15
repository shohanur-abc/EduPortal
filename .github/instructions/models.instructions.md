---
applyTo: 'src/models/**/*.ts'
---

Model File Method Order (Top → Bottom)

## Schema Definition
- Fields, types, defaults
- Virtuals (if any)
- Base structure of the model

## Static Methods
- Model-level operations
- Aggregate, factory, global queries
- `Model.method()` usage

## Query Helpers
- Chainable query extensions
- `Model.find().helper()` pattern
- Read-oriented logic only

## Instance Methods
- Document-level behavior
- `doc.method()` usage
- State-aware logic

## Middleware (Proxy)
- pre / post hooks
- Built-in behavior interception
- Validation, side-effects, automation

## Others
- Plugins
- Indexes

Rules

- Order must not be mixed
- Middleware ≠ business logic
- Method intent must match its category

Goal

- Predictable model structure
- Clear mental separation of concerns
- Easier debugging & extension