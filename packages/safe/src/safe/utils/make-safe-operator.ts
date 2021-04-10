import { OperatorFunction, merge } from "rxjs";
import { map, publish, startWith } from "rxjs/operators";
import { Safe } from "../safe";
import { SafeType } from "../types/safe-type";

/**
 * Make safe operator
 */
export function makeOperatorSafe<F extends (...args: any[]) => OperatorFunction<any, Safe>>(
    operatorFn: (...args: Parameters<F>) => OperatorFunction<Safe, Safe>
): F {
    return ((...args: Parameters<F>) => {
        const operator = operatorFn(...args);
        return (src$) =>
            src$.pipe(
                map((startValue) => new Safe({ type: SafeType.Start, startValue })),
                publish((multicasted$) =>
                    merge(multicasted$, multicasted$.pipe(operator)).pipe(
                        startWith(new Safe({ type: SafeType.Initialize }))
                    )
                )
            );
    }) as F;
}
