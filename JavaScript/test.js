'use strict';

const Event = require('./observer.js');

const sevent = new Event();
//subscribe(name,function)
sevent.on('click', (question) => console.log(question));
sevent.on('sum', (x, y) => console.log('Sum: ' + (x + y)));
sevent.on('inc', (x) => console.log('Inc: ' + (x++)));
//you can call this fn only once(name, any arguments)
sevent.once('click', 'What is your name?');
sevent.once('click', 'How old are you?');
//amount of events at the current moment
sevent.count();
//you can call this fn only once before unsubscribing(name,time,any arguments)
sevent.onceTime('sum', 2000, 5, 10);
sevent.onceTime('sum', 5000, 4, 7);
//subscribe(name)
sevent.unsubscribe('inc');
//you have time to call it before automatically unsubscribing(name,fn,time)
sevent.onTime('mul', (x, y, z) => console.log('Mul: ' + x * y * z), 4000);
//you can send the message and call fn(name,msg,any arguments)
sevent.send('click', 'Hello!', 'How are you?');
setTimeout(() => sevent.count(), 1000);
setTimeout(() => console.log(sevent), 1100);
setTimeout(() => sevent.count(), 3000);
setTimeout(() => console.log(sevent), 3500);
setTimeout(() => sevent.count(), 4000);
setTimeout(() => console.log(sevent), 4500);
//unsubscribe from all events
setTimeout(() => sevent.unsubscribeAll(), 7000);
setTimeout(() => sevent.count(), 7500);
setTimeout(() => console.log(sevent), 8000);
