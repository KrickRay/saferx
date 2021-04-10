import { from, ObservableInput, of } from "rxjs";
import { OperatorFunction } from "rxjs/internal/types";
import { mergeScan, pluck, scan } from "rxjs/operators";
import { makeOperatorSafe, Safe, SafeType, toSafeEnd } from "../../safe";

interface AccSafe {
    safe: Safe;
    acc: any;
}

export const safeMergeScan = makeOperatorSafe<
    <T, R>(
        accumulator: (acc: R, value: T, index: number) => ObservableInput<R>,
        seed: R,
        concurrent?: number
    ) => OperatorFunction<T, Safe<T, R>>
>((accumulator, seed, concurrent) => (src$) =>
    src$.pipe(
        mergeScan(
            (acc, value, index) =>
                from(accumulator(acc.acc, value.startValue, index)).pipe(
                    toSafeEnd(value),
                    scan(
                        (res, safe) => ({ safe, acc: safe.type === SafeType.End ? safe.value : res.acc }),
                        {} as AccSafe
                    )
                ),
            {
                safe: new Safe({
                    type: SafeType.End,
                    value: seed,
                }),
                acc: seed,
            },
            concurrent
        ),
        pluck("safe")
    )
);
