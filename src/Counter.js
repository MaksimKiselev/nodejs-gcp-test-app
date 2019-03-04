function getTimestamp() {
    return parseInt(Date.now() / 1000);
}

export default class Counter {
    constructor(store) {
        this.store = store;
    }

    async addPageView() {
        let timestamp = getTimestamp();

        await this.store.addPageView(timestamp);
    }

    async getPageViewsOfPastMinute() {
        let timestamp = getTimestamp();

        return await this.store.getPageViewsOfPastMinute(timestamp);
    }
}
