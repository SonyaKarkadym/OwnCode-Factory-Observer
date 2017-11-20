'use strict';

const Event = function() {
  this.events = {};
  this.finished = {};
}

Event.prototype = {

  on: function(name, fn) {
    const event = this.events[name] || [];
    this.events[name] = event;
    event.push(fn);
    const finished = this.finished[name] || false;
    this.finished[name] = finished;
  },

  unsubscribe: function(name) {
    delete(this.events[name]);
},

  once: function(fn,name,data){
    const event = this.events[name];
    const finished = this.finished[name];
     const once = fn => {
      return (...args) => {
        if(finished) return;
         let res = (event) ? event.forEach(fn => fn(data)) : null;
        this.finished[name] = true;
        return res;
      }
    }
  const f = once(fn)();
},

  unsubscribeAll: function() {
    delete this.events;
  },

  send: function(name,data,msg) {
    for(let i in this.events){
      if(i === name) console.log('Your message is: ' + msg);
    }
    const event = this.events[name];
    if (event) event.forEach(fn => fn(data));
  },

  count: function() {
    let count = 0;
    for (const i in events) {
      count++;
    }
    return count;
  },

  onTime: function(name,fn,time){
    this.on(name,fn);
    setTimeout(() => this.unsubscribe(name), time);
  },

  onceTime: function(fn,name,data,time){
    this.once(fn,name,data);
    setTimeout(() => this.unsubscribe(name), time);
  }
};

const sevent = new Event();
sevent.onceTime('func', data => console.log(`${data} from "on"`),5000);
sevent.onceTime('func', data => console.log(`${data} from "on"`),5000);
//sevent.once((data) => {
//console.log(`${data} from "on"`)},'func',1);
//sevent.once(x => x++,'func',2);
setTimeout(() => console.log(sevent),4000);
sevent.onceTime('click',x => console.log(x++),6000);
setTimeout(() => console.log(sevent),8000);
setTimeout(() => console.log(sevent),11000);
//sevent.send('func',1,'lol');
// sevent.unsubscribe('func');
 //setTimeout(console.log(sevent),11000);
//sevent.on('click',x => console.log(x++));
 //sevent.unsubscribe('func');
 //console.log(sevent);
//sevent.on('click',x => console.log(x--));
//sevent.once('funcn',1);
//sevent.once('fn',2);
