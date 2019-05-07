class DateHelper {
    parseHour(dateStr) {
        this.dateStr = dateStr;
        const date = new Date(dateStr);
        let hour = date.getHours();
        hour = hour > 9 ? hour : `0${hour}`;
        let minutes = date.getMinutes();
        minutes = minutes > 9 ? minutes : `0${minutes}`;
        return `${hour}:${minutes}`;
    }
}

module.exports = DateHelper;
