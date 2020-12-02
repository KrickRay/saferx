import { Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { Safe } from "../safe";
import { select } from "../utils";
import { PROGRESS_KEY, withProgress } from "./progress";

export const IN_PROGRESS_KEY = "inProgress" as const;

export function withInProgress<A, B, C>(
    src$: Observable<Safe<A, B, C>>
): Observable<Safe<A, B, C & { [IN_PROGRESS_KEY]: boolean }>> {
    return src$.pipe(
        withProgress,
        map((v) =>
            v.notEmpty(PROGRESS_KEY) ? v.add(IN_PROGRESS_KEY, Boolean(v.get(PROGRESS_KEY))) : v.add(IN_PROGRESS_KEY)
        )
    ) as any;
}

export const selectInProgress = select(IN_PROGRESS_KEY);

export const toInProgress = <S extends Safe>(src$: Observable<S>) =>
    src$.pipe(withInProgress, selectInProgress, distinctUntilChanged());
