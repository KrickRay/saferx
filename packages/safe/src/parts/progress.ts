import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { getPart } from "../get-part";
import { Safe, ExtendSafe, SafeType } from "../safe";

export const PROGRESS_KEY = "progress" as const;

export function withProgress<S extends Safe>(
    src$: Observable<S>
): Observable<ExtendSafe<S, { [PROGRESS_KEY]: number }>> {
    let progress = 0;
    return src$.pipe(
        map((v) => {
            switch (v.type) {
                case SafeType.Initialize:
                    return v.add(PROGRESS_KEY, progress);
                case SafeType.Start:
                    return v.add(PROGRESS_KEY, ++progress);
                default:
                    if (v.isComplete) return v.add(PROGRESS_KEY, --progress);
                    return v.add(PROGRESS_KEY);
            }
        })
    ) as any;
}

export const selectProgress = getPart(PROGRESS_KEY);

export const toProgress = <S extends Safe>(src$: Observable<S>) => src$.pipe(withProgress, selectProgress);
