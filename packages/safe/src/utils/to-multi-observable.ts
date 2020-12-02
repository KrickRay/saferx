import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MultiObservable } from "@saferx/multi-observable";
import { isError, isValue } from "../parts";
import { Safe } from "../safe";

/**
 * Safe to MultiObservable
 */
export function toMultiObservable<S extends Safe>(
    src$: Observable<S>
): S extends Safe<any, infer V, infer P> ? MultiObservable<"value", P & { value: V; error: any }> : never {
    return new MultiObservable(
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
    ) as any;
}
