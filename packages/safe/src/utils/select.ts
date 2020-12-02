import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Safe, SafePart } from "../safe";

export function select<P extends PropertyKey = PropertyKey>(partName: P) {
    return <R extends SafePart>(src$: Observable<Safe<any, any, R>>): Observable<R[P]> =>
        src$.pipe(
            filter((safe) => safe.notEmpty(partName)),
            map((safe) => safe.get(partName))
        );
}
