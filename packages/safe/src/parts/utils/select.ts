import { OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";

export function select<C extends { new (...args: any[]): any }>(
    PartClass: C
): OperatorFunction<Map<any, any> | any, InstanceType<C>> {
    return (src$) => src$.pipe(map((value) => (value instanceof PartClass ? value : value.get(PartClass))));
}
