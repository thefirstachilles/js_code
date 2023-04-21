;
var EventHub = /** @class */ (function () {
    function EventHub() {
        this.cache = {};
    }
    EventHub.prototype.on = function (eventName, fn) {
        this.cache[eventName] = this.cache[eventName] || [];
        this.cache[eventName].push(fn);
    };
    EventHub.prototype.emit = function (eventName, data) {
        (this.cache[eventName] || []).forEach(function (fn) { return fn(data); });
    };
    EventHub.prototype.off = function (eventName, fn) {
        if (!this.cache[eventName])
            return;
        var index = this.indexOf(this.cache[eventName], fn);
        if (index === -1)
            return;
        this.cache[eventName].splice(index, 1);
    };
    EventHub.prototype.indexOf = function (array, item) {
        for (var i = 0; i < array.length; i++) {
            if (item.toString() == array[i].toString()) {
                return i;
            }
        }
        return -1;
    };
    ;
    return EventHub;
}());
var eventhub = new EventHub();
eventhub.on('hi', function (e) { console.log('hi', e); });
eventhub.on('hi', function (e) { console.log('hello', e); });
eventhub.on('hi', function (e) { console.log('hello', e); });
eventhub.emit('hi', 'zhouzhou');
