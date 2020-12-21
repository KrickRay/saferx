import { of, Subject, throwError } from "rxjs";
import { rxSandbox } from "rx-sandbox";
import { safeConcatMap } from "./safe-concat-map";
import { toTestSafe, VALUES } from "./test-common";
import { share, startWith } from "rxjs/operators";
import { selectValue, withInProgress } from "../parts";

describe("safeConcatMap", () => {
    const SIMPLE_SAFE_CONCAT_MAP: any = safeConcatMap((v) => of(v));

    it("Should init and complete", () => {
        const { hot, getMessages, e } = rxSandbox.create(true);
        const actual = hot("-|").pipe(SIMPLE_SAFE_CONCAT_MAP, toTestSafe);
        const expected = e("i|", VALUES);
        expect(getMessages(actual)).toEqual(expected);
    });

    it("Should next", () => {
        const { hot, getMessages, e } = rxSandbox.create(true);
        const actual = hot("-a-|").pipe(SIMPLE_SAFE_CONCAT_MAP, toTestSafe);
        const expected = e("i(abc)-|", VALUES);
        expect(getMessages(actual)).toEqual(expected);
    });

    it("Should double next", () => {
        const { hot, getMessages, e } = rxSandbox.create(true);
        const actual = hot("-a-a-|").pipe(SIMPLE_SAFE_CONCAT_MAP, toTestSafe);
        const expected = e("i(abc)-(abc)-|", VALUES);
        expect(getMessages(actual)).toEqual(expected);
    });

    it("Should error", () => {
        const { hot, getMessages, e } = rxSandbox.create(true);
        const actual = hot("-a-|").pipe(
            safeConcatMap((v) => throwError("e")),
            toTestSafe
        );
        const expected = e("i(ae)-|", VALUES);
        expect(getMessages(actual)).toEqual(expected);
    });

    it("Should work with share", (done) => {
        const action$ = new Subject();
        action$
            .pipe(
                startWith("test"),
                share(),
                safeConcatMap(() => of(2)),
                withInProgress,
                selectValue
            )
            .subscribe(
                (v) => {
                    expect(v).toBe(2);
                    action$.complete();
                },
                null,
                () => {
                    done();
                }
            );
    });
});
