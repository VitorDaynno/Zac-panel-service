class DateHelper {
    parseDate(dateStr) {
        this.dateStr = dateStr;
        const date = new Date(dateStr);
        let day = date.getDate() + 1;
        day = day > 9 ? day : `0${day}`;
        let month = date.getMonth() + 1;
        month = month <= 9 ? `0${month}` : month;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

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
