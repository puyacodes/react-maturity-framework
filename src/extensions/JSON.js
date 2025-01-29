import safeParse from '../util/functions';

function extend() {
    if (JSON.safeParse === undefined) {
        JSON.safeParse = safeParse;
    }

    const _stringify = JSON.stringify;

    JSON.stringify = function (obj, replacer, space) {
        return _stringify(obj, replacer || ((_, value) => typeof value === 'bigint' ? value.toString() : value), space)
    }
}

export default extend