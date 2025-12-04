import type { MyType } from "package-c";

export function createThing(input: MyType): MyType {
  return { ...input };
}
