import { OperatorFunction, Notification } from "rxjs";
import { map, materialize } from "rxjs/operators";
import { Safe } from "../safe";
import { SafeType } from "../types/safe-type";

const KIND_TO_TYPE: { [N in Notification<any>["kind"]]: SafeType } = {
    C: SafeType.Success,
    E: SafeType.Error,
    N: SafeType.End,
};

/**
 * Operator for make safe operator safe end
 */
export function toSafeEnd<T, R>(safeStart: Safe<T, R>): OperatorFunction<R, Safe<T, R>> {
    return (src$) =>
        src$.pipe(
            materialize(),
            map(({ kind, value, error }) =>
                safeStart.create({
                    type: KIND_TO_TYPE[kind],
                    value,
                    error,
                })
            )
        );
}
