export default class CounterMemoryStore {
    constructor() {
        this.pageviews = [];
    }

    async addPageView(timestamp) {
        this.pageviews.push(timestamp);
    }

    async getPageViewsOfPastMinute(timestamp) {
        let viewsCount = 0;

        for (let i = this.pageviews.length - 1; i > -1; i--) {
            let diffInSeconds = timestamp - this.pageviews[i];

            if (diffInSeconds > 60) {
                break;
            }

            viewsCount++;
        }

        return viewsCount;
    }
}
