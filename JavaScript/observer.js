'use strict';

const Event = function() {
  this.events = {};
  this.finished = {};
  this.counted = {};
};

Event.prototype = {
  on(name, fn) {
    const event = this.events[name] || [];
    this.events[name] = event;
    const count = this.counted[name] || false;
    this.counted[name] = count;
    if (count) console.log('Event `"${name}"` has own function\n');
    else {
      event.push(fn);
      this.counted[name] = true;
    }
    const finished = this.finished[name] || false;
    this.finished[name] = finished;
  },

  unsubscribe(name) {
    delete (this.events[name]);
    delete (this.counted[name]);
    delete (this.finished[name]);
  },

  once(name, ...args) {
    const event = this.events[name];
    const finished = this.finished[name];
    if (finished) {
      console.log('\nYou can call this function only once\n');
      return;
    }
    for (const i in this.events) {
      if (i === name) {
        event.forEach(fn => fn(...args));
      }
    }
    this.finished[name] = true;
  },

  unsubscribeAll() {
    for (const i in this.events) {
      delete this.events[i];
      delete this.counted[i];
      delete this.finished[i];
    }
  },

  send(name, msg, ...args) {
    const event = this.events[name];
    for (const i in this.events) {
      if (i === name) {
        console.log(msg + '\n');
        event.forEach(fn => fn(...args));
      }
    }
  },

  count() {
    let count = 0;
    for (const i in this.events) count++;
    console.log('\nAmount of events is: ' + count + '\n');
  },

  onTime(name, fn, time) {
    this.on(name, fn);
    setTimeout(() => this.unsubscribe(name), time);
  },

  onceTime(name, time, ...args) {
    this.once(name, ...args);
    setTimeout(() => this.unsubscribe(name), time);
  }
};

module.exports = Event;
