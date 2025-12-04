# tsgo-monorepo-issue

Minimal reproduction for a tsgo TS2742 error in monorepos with project references.

## Reproduce

```bash
bun install

npx tsc -b   # passes
npx tsgo -b  # fails
```

## Error

```bash
$ bun run tsgo -b
packages/package-a/src/index.ts:4:10 - error TS2742: The inferred type of 'thing' cannot be named without a reference to '../../package-b/node_modules/package-c/out'. This is likely not portable. A type annotation is necessary.

4   public thing = createThing({ id: "1", name: "test", enabled: true });
           ~~~~~


Found 1 error in packages/package-a/src/index.ts:4

error: "tsgo" exited with code 2

```

## Setup

- `package-c`: exports `MyType` interface
- `package-b`: project reference to `package-c`, exports `createThing()` returning `MyType`
- `package-a`: project reference to `package-b` only (not `package-c`), uses `createThing()` without type annotation

The issue is that `package-a` reaches `package-c` types transitively through `package-b`, but doesn't have a direct project reference to `package-c`.
