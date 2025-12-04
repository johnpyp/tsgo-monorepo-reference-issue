import { createThing } from "package-b";

class MyClass {
  public thing = createThing({ id: "1", name: "test", enabled: true });
}

export { MyClass };
