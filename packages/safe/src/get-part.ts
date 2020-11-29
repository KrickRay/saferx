import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Safe } from "./safe";

export function getPart<P extends PropertyKey = PropertyKey>(partName: P) {
    return <R extends { P: any }>(src$: Observable<Safe<any, R>>): Observable<R> =>
        src$.pipe(
            filter((safe) => safe.notEmpty(partName as never)),
            map((safe) => safe.get(partName as never))
        );
}
