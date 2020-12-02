import { MultiObservable } from "./multi-observable";
import { of } from "rxjs";
import { delay, take } from "rxjs/operators";

describe("MultiObservable", () => {
    it("Should return value", (done) => {
        const multiObservableName$ = new MultiObservable(of({ name: "Test", age: 20 }).pipe(delay(100)), "name");
        const age$ = multiObservableName$.get("age").pipe(take(1));
        age$.subscribe((x) => expect(x).toBe(20), null, done);
    });
});
