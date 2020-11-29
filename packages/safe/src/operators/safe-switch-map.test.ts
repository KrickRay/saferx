import { of, throwError, merge } from "rxjs";
import { rxSandbox } from "rx-sandbox";
import { delay } from "rxjs/operators";
import { safeSwitchMap } from "./safe-switch-map";
import { toTestSafe, VALUES } from "./test-common";

const { marbleAssert } = rxSandbox;

describe("stripSwitchMap", () => {
    const SIMPLE_SAFE_SWITCH_MAP = safeSwitchMap<any, any>((v) => of(v));

    it("Should init and complete", () => {
        const { hot, getMessages, e } = rxSandbox.create(true);
        const actual = hot("-|").pipe(SIMPLE_SAFE_SWITCH_MAP, toTestSafe);
        const expected = e("i|", VALUES);
        marbleAssert(getMessages(actual)).to.equal(expected);
    });

    it("Should next", () => {
        const { hot, getMessages, e } = rxSandbox.create(true);
        const actual = hot("-a-|").pipe(SIMPLE_SAFE_SWITCH_MAP, toTestSafe);
        const expected = e("i(abc)-|", VALUES);
        marbleAssert(getMessages(actual)).to.equal(expected);
    });

    it("Should double next", () => {
        const { hot, getMessages, e } = rxSandbox.create(true);
        const actual = hot("-a-a-|").pipe(SIMPLE_SAFE_SWITCH_MAP, toTestSafe);
        const expected = e("i(abc)-(abc)-|", VALUES);
        marbleAssert(getMessages(actual)).to.equal(expected);
    });

    it("Should double next with double emitions", () => {
        const { hot, getMessages, e } = rxSandbox.create(true);
        const actual = hot("-a-a-|").pipe(
            safeSwitchMap((v) => of(v, "x")),
            toTestSafe
        );
        const expected = e("i(abxc)-(abxc)-|", VALUES);
        marbleAssert(getMessages(actual)).to.equal(expected);
    });

    it("Should switched double next with delays", () => {
        const { hot, getMessages, e, scheduler } = rxSandbox.create(true);
        const actual = hot("-a-a...100...|").pipe(
            safeSwitchMap((v) => of(v).pipe(delay(5, scheduler))),
            toTestSafe
        );
        const expected = e("ia-a----(bc)...95...|", VALUES);
        marbleAssert(getMessages(actual)).to.equal(expected);
    });

    it("Shouldn't switch double next with delays", () => {
        const { hot, getMessages, e, scheduler } = rxSandbox.create(true);
        const actual = hot("-a-----a...100...|").pipe(
            safeSwitchMap((v) => of(v).pipe(delay(5, scheduler))),
            toTestSafe
        );
        const expected = e("ia----(bc)a----(bc)...95...|", VALUES);
        marbleAssert(getMessages(actual)).to.equal(expected);
    });

    it("Should switched & complete first emition when double next with double emitions with delays", () => {
        const { hot, getMessages, e, scheduler } = rxSandbox.create(true);
        const actual = hot("-a-a...100...|").pipe(
            safeSwitchMap((v) =>
                merge(of(v), of("x").pipe(delay(5, scheduler)))
            ),
            toTestSafe
        );
        const expected = e("i(ab)-(acb)----(xc)-...94...|", VALUES);
        marbleAssert(getMessages(actual)).to.equal(expected);
    });

    it("Should error", () => {
        const { hot, getMessages, e } = rxSandbox.create(true);
        const actual = hot("-a-|").pipe(
            safeSwitchMap((v) => throwError("e")),
            toTestSafe
        );
        const expected = e("i(ae)-|", VALUES);
        marbleAssert(getMessages(actual)).to.equal(expected);
    });
});
