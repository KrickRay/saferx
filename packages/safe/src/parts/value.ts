import { Observable } from "rxjs";
import { filter, pluck } from "rxjs/operators";
import { Safe, SafeType } from "../safe";

export function isValue<R>(safe: Safe<any, R>): boolean {
    return safe.type === SafeType.End;
}

export function toValue<R>(src$: Observable<Safe<any, R>>): Observable<R> {
    return src$.pipe(filter(isValue), pluck("value"));
}
