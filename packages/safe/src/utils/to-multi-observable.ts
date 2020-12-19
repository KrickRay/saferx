import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MultiObservable } from "@saferx/multi-observable";
import { isError, isValue } from "../parts";
import { Safe } from "../safe";

/**
 * Safe to MultiObservable
 */
export function toMultiObservable<R, P>(src$: Observable<Safe<any, R, P>>) {
    return new MultiObservable<"value", P & { value: R; error: any }>(
        src$.pipe(
            map((safe: any) =>
                Object.assign(
                    {},
                    safe.parts,
                    isValue(safe) && { value: safe.value },
                    isError(safe) && { error: safe.error }
                )
            )
        )
    );
}
