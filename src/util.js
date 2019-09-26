export function required(parameters, key) {
    const val = parameters[key];
    if (val === undefined || val === null) {
        throw new Error(`${key} is required`);
    }

    return val;
};
