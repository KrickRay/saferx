import { Observable } from "rxjs";
import { filter, pluck } from "rxjs/operators";
import { Safe, SafeType } from "../safe";

export function isError(safe: Safe): boolean {
    return safe.type === SafeType.Error;
}

export function toError(src$: Observable<Safe<any, any, any>>): Observable<any> {
    return src$.pipe(filter(isError), pluck("error"));
}

export const selectError = toError;
