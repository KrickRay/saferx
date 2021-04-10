import { of } from "rxjs";
import { rxSandbox } from "rx-sandbox";
import { safeMergeScan } from "./safe-merge-scan";
import { EMPTY_TEST_SAFE, toTestSafe, VALUES } from "../test/common";
import { SafeType } from "../../safe";

const { marbleAssert } = rxSandbox;

describe("safeMergeScan", () => {
    const SEED = "seed";
    const SIMPLE_SAFE_SWITCH_MAP = safeMergeScan<any, any>((acc, v) => of([acc, v].join("-")), SEED);
    const MERGE_SCAN_VALUES = {
        ...VALUES,
        S: {
            ...EMPTY_TEST_SAFE,
            type: SafeType.End,
            value: SEED,
        },
        B: {
            ...VALUES.b,
            value: [SEED, VALUES.b.value].join("-"),
        },
        X: {
            ...VALUES.b,
            value: [SEED, VALUES.b.value, VALUES.b.value].join("-"),
        },
    };

    it("Should init", () => {
        const { hot, getMessages, e } = rxSandbox.create(true);
        const actual = hot("-").pipe(SIMPLE_SAFE_SWITCH_MAP, toTestSafe);
        const expected = e("i-----", MERGE_SCAN_VALUES);
        marbleAssert(getMessages(actual)).to.equal(expected);
    });

    it("Should init and complete", () => {
        const { hot, getMessages, e } = rxSandbox.create(true);
        const actual = hot("-|").pipe(SIMPLE_SAFE_SWITCH_MAP, toTestSafe);
        const expected = e("i(S|)", MERGE_SCAN_VALUES);
        marbleAssert(getMessages(actual)).to.equal(expected);
    });

    it("Should next", () => {
        const { hot, getMessages, e } = rxSandbox.create(true);
        const actual = hot("-a-|").pipe(SIMPLE_SAFE_SWITCH_MAP, toTestSafe);
        const expected = e("i(aBc)-|", MERGE_SCAN_VALUES);
        marbleAssert(getMessages(actual)).to.equal(expected);
    });

    it("Should double next", () => {
        const { hot, getMessages, e } = rxSandbox.create(true);
        const actual = hot("-a-a-|").pipe(SIMPLE_SAFE_SWITCH_MAP, toTestSafe);
        const expected = e("i(aBc)-(aXc)-|", MERGE_SCAN_VALUES);
        marbleAssert(getMessages(actual)).to.equal(expected);
    });
});
