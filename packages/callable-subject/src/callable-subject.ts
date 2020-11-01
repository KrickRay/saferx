import { AsyncSubject, BehaviorSubject, ReplaySubject, SchedulerLike, Subject } from "rxjs";

const SUBJECT_METHODS = ["pipe", "subscribe", "complete"] as const;

type CallableSubjectInstance<S extends Subject<any>> = S["next"] & { subject$: S } & {
        [N in typeof SUBJECT_METHODS[number]]: S[N];
    };

function toClass<T extends new (...args: any[]) => any>(
    createClass: (...args: ConstructorParameters<T>) => InstanceType<T>
): T {
    return function (...args: ConstructorParameters<T>) {
        return createClass(...args);
    } as any;
}

function createCallableSubject<T extends Subject<any>>(subject$: T): CallableSubjectInstance<T> {
    const callableSubject$: CallableSubjectInstance<T> = subject$.next.bind(subject$);
    callableSubject$.subject$ = subject$;
    for (const methodName of SUBJECT_METHODS) {
        callableSubject$[methodName] = subject$[methodName].bind(subject$);
    }
    return callableSubject$;
}

export const CallableSubject = toClass<new <T = void>() => CallableSubjectInstance<Subject<T>>>(() =>
    createCallableSubject(new Subject())
);

export const CallableReplaySubject = toClass<
    new <T = void>(options?: {
        bufferSize?: number;
        windowTime?: number;
        scheduler?: SchedulerLike;
    }) => CallableSubjectInstance<ReplaySubject<T>>
>((options = {}) =>
    createCallableSubject(new ReplaySubject(options.bufferSize, options.windowTime, options.scheduler))
);

export const CallableAsyncSubject = toClass<new <T = void>() => CallableSubjectInstance<AsyncSubject<T>>>(() =>
    createCallableSubject(new AsyncSubject())
);

const BEHAVIOR_SUBJECT_READONLY_VALUE = "value" as const;

type CallableBehaviorSubjectInstance<T = any> = CallableSubjectInstance<BehaviorSubject<T>> &
    { readonly [N in typeof BEHAVIOR_SUBJECT_READONLY_VALUE[number]]: T };

export const CallableBehaviorSubject = toClass<new <T = void>(value: T) => CallableBehaviorSubjectInstance<T>>(
    (value) => {
        const callableSubject$ = createCallableSubject(new BehaviorSubject(value)) as CallableBehaviorSubjectInstance;
        Object.defineProperty(callableSubject$, BEHAVIOR_SUBJECT_READONLY_VALUE, {
            get() {
                return callableSubject$.subject$[BEHAVIOR_SUBJECT_READONLY_VALUE];
            },
        });
        return callableSubject$;
    }
);
