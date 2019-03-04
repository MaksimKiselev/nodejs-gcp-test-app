import 'dotenv/config';
import express from 'express';
import redis from 'redis';
import Counter from './Counter';
import CounterRedisStore from './CounterRedisStore';

const port = process.env.PORT || 3000;

const app = express();

const redisClient = redis.createClient({
    'host': process.env.REDIS_HOST,
    'port': process.env.REDIS_PORT,
});
redisClient.on('error', (err) => console.error(err));

const counterStore = new CounterRedisStore(redisClient);
const counter = new Counter(counterStore);

app.get('/', async function (req, res) {
    await counter.addPageView();

    let pastMinutePageViews = await counter.getPageViewsOfPastMinute();

    res.send(`${pastMinutePageViews}`);
});

app.listen(port);

console.log("App started on port " + port);
