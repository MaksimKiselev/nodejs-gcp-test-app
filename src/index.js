import 'dotenv/config';
import express from 'express';

const port = process.env.PORT || 3000;
const app = express();

let pageViews = [];

app.get('*', function (req, res) {
    let now = Date.now();
    let pastMinutePageViews = 0;

    pageViews.push(now);

    /**
     * Simple and fast solution:
     * Iterate over array from tail to head,
     * increment page views counter while diff in seconds least than 60
     */
    // for (let i = pageViews.length - 1; i > -1; i--) {
    //     let diffInSeconds = (now - pageViews[i]) / 1000;
    //
    //     if (diffInSeconds > 60) {
    //         break;
    //     }
    //
    //     pastMinutePageViews++;
    // }


    /**
     * Very simple solution with arrow function, may be slow, when array is big
     */
    pastMinutePageViews = pageViews.filter((v) => now - v < 60 * 1000).length;

    res.send(`${pastMinutePageViews}`);
});

app.listen(port);

console.log("App started on port " + port);
