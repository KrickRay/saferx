import { OperatorFunction, isObservable, of, ObservableLike, Observable } from "rxjs";
import { mergeScan, mapTo } from "rxjs/operators";
import { Safe } from "../../safe";

export function add<C extends { new (...args: any[]): any }>(
    PartClass: C
): OperatorFunction<Map<any, any> | any, Map<any, any>> {
    return (src$) =>
        src$.pipe(
            mergeScan(
                (acc, map) => {
                    if (map instanceof Safe) map = new Map([[Safe, map]]);
                    const part = acc.get(PartClass);
                    const updated = part.update(map.get(Safe));
                    map.set(PartClass, part);
                    return isObservable(updated) ? updated.pipe(mapTo(map)) : of(map);
                },
                new Map([[PartClass, new PartClass()]]),
                1
            )
        );
}
