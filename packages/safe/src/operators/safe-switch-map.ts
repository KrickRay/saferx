import { from, of } from "rxjs";
import { ObservableInput, OperatorFunction } from "rxjs/internal/types";
import { switchMap, startWith, pairwise, concatMap } from "rxjs/operators";
import { makeOperatorSafe, Safe, SafeType, toSafeEnd } from "../safe";

const END_PREVENT = Symbol();

export const safeSwitchMap = makeOperatorSafe<
    <T, R>(project: (value: T, index: number) => ObservableInput<R>) => OperatorFunction<T, Safe<T, R>>
>((project) => (src$) =>
    src$.pipe(
        switchMap((safeStart, idx) => from(project(safeStart.startValue, idx)).pipe(toSafeEnd(safeStart))),
        startWith(END_PREVENT as any),
        pairwise(),
        /**
         * Manually complete prevent 'Start' type Observable
         */
        concatMap(([a, b]: [Safe | typeof END_PREVENT, Safe]) =>
            a !== END_PREVENT && a.type !== SafeType.Success && a.id !== b.id
                ? of(
                      new Safe({
                          id: a.id,
                          type: SafeType.Success,
                          startValue: a.startValue,
                      }),
                      b
                  )
                : of(b)
        )
    ) as any
);
