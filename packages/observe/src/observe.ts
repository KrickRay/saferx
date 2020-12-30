import { BehaviorSubject, Observable, Subject } from "rxjs";

export function observe<O extends PropertyKey>(observablePropertyKey: O) {
    return function <
        V extends T[P],
        P extends PropertyKey,
        T extends {
            [N in PropertyKey]: any;
        }
    >(
        target: T &
            {
                [N in O]: Observable<V>;
            },
        propertyKey: P
    ) {
        if (!target[observablePropertyKey] || target[observablePropertyKey].hasOwnProperty("value")) {
            const subject$: BehaviorSubject<V> =
                target[observablePropertyKey] || new BehaviorSubject<V>(target[propertyKey]);
            Object.defineProperty(target, propertyKey, {
                get() {
                    return subject$.value;
                },
                set(value) {
                    subject$.next(value);
                },
            });
            Object.defineProperty(target, observablePropertyKey, {
                value: subject$,
                writable: true,
            });
        } else {
            const subject$: Subject<V> = target[observablePropertyKey];
            let value: V = target[propertyKey];
            subject$.next(value);
            Object.defineProperty(target, propertyKey, {
                get() {
                    return value;
                },
                set(v) {
                    value = v;
                    subject$.next(v);
                },
            });
        }
    };
}
