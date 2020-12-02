import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { select } from "../utils";
import { Safe, SafeType } from "../safe";

export const START_TIME_KEY = "startTime" as const;
export const TIME_KEY = "time" as const;

export function withStartCompleteTime<A, B, C>(
    src$: Observable<Safe<A, B, C>>
): Observable<Safe<A, B, C & { [START_TIME_KEY]: number; [TIME_KEY]: number }>> {
    return src$.pipe(
        map((v) => {
            v.add(START_TIME_KEY);
            v.add(TIME_KEY);
            if (v.type === SafeType.Start) (v as any).set(START_TIME_KEY, Date.now());
            else if (v.type === SafeType.End || v.isComplete) (v as any).set(TIME_KEY, Date.now());
            return v;
        })
    ) as any;
}

export const selectStartTime = select(START_TIME_KEY);
export const selectCompleteTime = select(TIME_KEY);

export const toStartTime = <S extends Safe>(src$: Observable<S>) => src$.pipe(withStartCompleteTime, selectStartTime);
export const toCompleteTime = <S extends Safe>(src$: Observable<S>) =>
    src$.pipe(withStartCompleteTime, selectCompleteTime);
