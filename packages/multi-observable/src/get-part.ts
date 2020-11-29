import { Observable } from "rxjs";
import { filter, pluck } from "rxjs/operators";
import { Multi } from "./multi-observable";

export function hasPart<S extends Multi>(multi: S, partName: keyof S): boolean {
    return multi && multi.hasOwnProperty(partName);
}

export function getPart<P extends PropertyKey = PropertyKey>(partName: P) {
    return <S extends Multi & { [N in P]?: any }>(
        src$: Observable<S>
    ): Observable<S[P]> =>
        src$.pipe(
            filter((v) => hasPart(v, partName)),
            pluck(partName)
        );
}
