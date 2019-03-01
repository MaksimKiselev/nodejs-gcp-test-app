import 'dotenv/config';
import express from 'express';
import PageViewsCounter from './PageViewsCounter';

const port = process.env.PORT || 3000;
const app = express();
const pageViewsCounter = new PageViewsCounter();

let pageViews = [];

app.get('*', function (req, res) {

    let url = req.originalUrl;

    pageViewsCounter.addPageView(url);

    let pastMinutePageViews = pageViewsCounter.getPageViewsOfPastMinute(url);

    res.send(`${pastMinutePageViews}`);
});

app.listen(port);

console.log("App started on port " + port);
