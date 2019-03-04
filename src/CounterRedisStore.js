import {promisify} from 'util';

function viewsReducer(acc, val) {
    let intVal = parseInt(val, 10);

    return isNaN(intVal) ? acc : acc + intVal;
}

export default class CounterRedisStore {
    constructor(redis, hashKey = 'counter') {
        this.redis = redis;
        this.hashKey = hashKey;
    }

    async addPageView(timestamp) {
        let hincrbyAsync = promisify(this.redis.hincrby).bind(this.redis);

        await hincrbyAsync(this.hashKey, timestamp, 1);
    }

    async getPageViewsOfPastMinute(timestamp) {
        let hmgetAsync = promisify(this.redis.hmget).bind(this.redis);

        let fields = Array.from({length: 60}, (v, k) => timestamp - k);

        let views = await hmgetAsync(this.hashKey, fields);

        return views.reduce(viewsReducer, 0);
    }
}
