import { map } from "rxjs/operators";
import { Safe, SafeType } from "../../safe";

export const EMPTY_TEST_SAFE = {
    type: undefined,
    startValue: undefined,
    value: undefined,
    error: undefined,
};

export const VALUES = {
    i: {
        ...EMPTY_TEST_SAFE,
        type: SafeType.Initialize,
    },
    a: {
        ...EMPTY_TEST_SAFE,
        type: SafeType.Start,
        startValue: "a",
    },
    b: {
        ...EMPTY_TEST_SAFE,
        type: SafeType.End,
        startValue: "a",
        value: "a",
    },
    c: {
        ...EMPTY_TEST_SAFE,
        type: SafeType.Success,
        startValue: "a",
    },
    x: {
        ...EMPTY_TEST_SAFE,
        type: SafeType.End,
        startValue: "a",
        value: "x",
    },
    e: {
        ...EMPTY_TEST_SAFE,
        type: SafeType.Error,
        startValue: "a",
        error: "e",
    },
};

export const toTestSafe = map(({ type, startValue, value, error }: Safe) => ({
    type,
    startValue,
    value,
    error,
}));
