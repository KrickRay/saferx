import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { select } from "../utils";
import { Safe } from "../safe";
import { TIME_KEY, START_TIME_KEY, withStartCompleteTime } from "./progress-time";

export const TIMER_KEY = "timer" as const;

export function withTimer<A, B, C>(
    src$: Observable<Safe<A, B, C>>
): Observable<Safe<A, B, C & { [TIMER_KEY]: number }>> {
    return src$.pipe(
        withStartCompleteTime,
        map((v) => (v.isComplete ? v.add(TIMER_KEY, v.get(TIME_KEY) - v.get(START_TIME_KEY)) : v.add(TIMER_KEY)))
    ) as any;
}

export const selectTimer = select(TIMER_KEY);

export const toTimer = <S extends Safe>(src$: Observable<S>) => src$.pipe(withTimer, selectTimer);
