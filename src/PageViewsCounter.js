import md5 from 'md5';

export default class PageViewsCounter {
    constructor() {
        this.pageviews = {};
    }

    addPageView(uri) {
        let uriHash = md5(uri);
        let now = Date.now();

        if (!this.pageviews.hasOwnProperty(uriHash)) {
            this.pageviews[uriHash] = [];
        }

        this.pageviews[uriHash].push(now);
    }

    getPageViewsOfPastMinute(uri) {
        let uriHash = md5(uri);
        let now = Date.now();
        let pastMinutePageViews = 0;

        if (!this.pageviews.hasOwnProperty(uriHash)) {
            return 0;
        }

        /**
         * Simple and fast solution:
         * Iterate over array from tail to head,
         * increment page views counter while diff in seconds least than 60
         */
        for (let i = this.pageviews[uriHash].length - 1; i > -1; i--) {
            let diffInSeconds = (now - this.pageviews[uriHash][i]) / 1000;

            if (diffInSeconds > 60) {
                break;
            }

            pastMinutePageViews++;
        }

        /**
         * Very simple solution with arrow function, may be slow, when array is big
         */
        // pastMinutePageViews = pageViews.filter((v) => now - v < 60 * 1000).length;

        return pastMinutePageViews;

    }
}
