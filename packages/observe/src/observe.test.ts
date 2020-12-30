import { BehaviorSubject } from "rxjs";
import { take } from "rxjs/operators";
import { observe } from "./observe";

describe("observeProperty", () => {
    it("Should call next undefined and value", (done) => {
        class X {
            @observe("prop$") prop: number;
            prop$: BehaviorSubject<number>;
        }
        const x = new X();
        let i = 0;
        x.prop$.subscribe(
            (v) => {
                expect(v).toBe(i === 0 ? undefined : 1);
                ++i;
            },
            null,
            done
        );
        x.prop = 1;
        x.prop$.complete();
    });

    it("Should call next init value and 2 next values", (done) => {
        class X {
            @observe("prop$") prop = 1;
            prop$: BehaviorSubject<number>;
        }
        const x = new X();
        let i = 0;
        x.prop$.subscribe(
            (v) => {
                switch (i) {
                    case 0:
                        expect(v).toBe(1);
                        break;
                    case 1:
                        expect(v).toBe(2);
                        break;
                    case 2:
                        expect(v).toBe(3);
                        break;
                }
                ++i;
            },
            null,
            done
        );
        x.prop = 2;
        x.prop = 3;
        x.prop$.complete();
    });

    describe("Should call next with init value", () => {
        it("when init value first", (done) => {
            class X {
                @observe("prop$") prop = 2;
                prop$: BehaviorSubject<number>;
            }
            const x = new X();
            x.prop$.subscribe((v) => expect(v).toBe(2), null, done);
            x.prop$.complete();
        });

        it("when init observable first", (done) => {
            class X {
                @observe("prop$") prop = 3;
                prop$: BehaviorSubject<number>;
            }
            const x = new X();
            x.prop$.subscribe((v) => expect(v).toBe(3), null, done);
            x.prop$.complete();
        });
    });

    it("Take value from prop", (done) => {
        class X {
            @observe("prop$") prop = "a";
            prop$: BehaviorSubject<string>;
        }
        const x = new X();
        x.prop$.subscribe((v) => expect(x.prop).toBe("a"), null, done);
        x.prop$.complete();
    });

    it("Take value from prop after next", (done) => {
        class X {
            @observe("prop$") prop = "a";
            prop$: BehaviorSubject<string>;
        }
        const x = new X();
        x.prop = "b";
        x.prop$.pipe(take(1)).subscribe((v) => expect(x.prop).toBe("b"), null, done);
    });

    // TODO
    // it("Use created", (done) => {
    //     class X {
    //         @observe("prop$") prop = "a";
    //         prop$ = new ReplaySubject<string>(1);
    //     }
    //     const x = new X();
    //     x.prop$.pipe(take(1)).subscribe(
    //         (v) => {
    //             // expect(x.prop$ instanceof Subject).toBeTruthy();
    //             expect(x.prop).toBe("b");
    //         },
    //         null,
    //         done
    //     );
    //     x.prop = "b";
    // });
});
