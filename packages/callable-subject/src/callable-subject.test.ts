import { mapTo } from "rxjs/operators";
import {
    CallableAsyncSubject,
    CallableBehaviorSubject,
    CallableReplaySubject,
    CallableSubject,
} from "./callable-subject";

describe("CallableSubject", () => {
    it("Should call next with undefined", (done) => {
        const subject = new CallableSubject<string>();
        subject.subscribe((x) => expect(x).toBe("a"), null, done);
        subject("a");
        subject.complete();
    });

    it("Should call next with value", (done) => {
        const subject = new CallableSubject();
        subject.subscribe((x) => expect(x).toBeUndefined, null, done);
        subject();
        subject.complete();
    });

    it("Should works next method", (done) => {
        const subject = new CallableSubject<string>();
        subject.subscribe((x) => expect(x).toBe("y"), null, done);
        subject.subject$.next("y");
        subject.complete();
    });

    it("Should works pipes", (done) => {
        const subject = new CallableSubject();
        subject.pipe(mapTo("x")).subscribe((x) => expect(x).toBe("x"), null, done);
        subject();
        subject.complete();
    });
});

describe("CallableReplaySubject", () => {
    it("Should call next with undefined", (done) => {
        const subject = new CallableReplaySubject<string>();
        subject.subscribe((x) => expect(x).toBe("a"), null, done);
        subject("a");
        subject.complete();
    });
});

describe("CallableAsyncSubject", () => {
    it("Should call next with undefined", (done) => {
        const subject = new CallableAsyncSubject<string>();
        subject.subscribe((x) => expect(x).toBe("a"), null, done);
        subject("a");
        subject.complete();
    });
});

describe("CallableBehaviorSubject", () => {
    it("Should return value", () => {
        const subject = new CallableBehaviorSubject("test");
        expect(subject.value).toBe("test");
    });
});
