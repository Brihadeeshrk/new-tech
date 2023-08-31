CORE MODULES: http, https, os, fs, path
http: launch a server, send req
https: ssl encoded server

UNDERSTANDING REQ
very complex but we need only a few parameters from there
url | method | headers

SENDING RES
there are many headers we can set, use this for reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
we do it in chunks
using `res.write()`
and `res.end()`

PARSING DATA
data is sent as a stream
data is parsed in chunks
consider a file being uploaded, this stream and buffers concept could help in writing the chunks onto the fs

- `req.on()` is an event listener, and this will be fired when a new chunk of data is ready to be read
- the body is the array that contains the entire stream
- so in the `req.on()` the callback func basically appends the chunks to the array

the

```js
return req.on("end", () => {...});
```

event listener will be fired once all the data has been parsed into the arr

- returning this function because this event loop signifies the end of the lifecycle for this server, as in, there's nothing else to be done.
- so thats why `res.statusCode` and the other 3 lines have been moved inside

```js
  return req.on("end", () => {
  // now that we have all the chunks, we need a buffer to access them
  const parsedBody = Buffer.concat(body).toString();
  const message = parsedBody.split("=")[1];
  fs.writeFile("./message.txt", message, (err) => {
  // here we redirect the user only after the file has been written
```

BLOCKING AND NONBLOCKING CODE
using writeFileSync is blocking or synchronous
in this case, our message is v small so, its fine to use sync, but in the case of very big files, we'd be blocking the next command until the write/copy operation is complete, and this would prevent other users from interacting w it and so on
hence, we use writeFile and this takes a 3rd arg, a callback func that executes after the line has finished running

BEHIND THE SCENES
uses only one JS thread
performance: assume you're writing a query that accesses the fs
typically fs ops take time, so does this mean other ops are on hold?
so, when we submit a req, nodejs AUTOMATICALLY triggers and keeps the EVENT LOOP running and this happens on its own, it keeps track of the listeners on record and also handles event callbacks

    the fs that the query uses, sends this req to a WORKER POOl, and this pool may use MULTIPLE THREADS and does all the heavy lifting
    and once this is done, it triggers a callback func

    that event loop, is a process that keeps the nodejs engine running and there's an order to call callbacks
    1. timers (setTimeout and setInterval) executes any due timer callbacks
    2. other pending callbacks (i/o related callbacks) executes callbacks that may have taken time to complete
    3. poll phase (it'll look for new i/o events) executes any new i/o events
    4. check phase (setImmediate()) here itll execute setImmediate() callbacks, like setInterval and such but will execute immediately after pending callbacks have been resolved
    5. close phase (close callbacks) here itll execute all close event callbacks
    6. if no remaining event handlers, then process.exit() ie, refs === 0
    nodejs maintains a counter of the remaining callbacks, and if callbacks = 0 then it exits

Links:
event loop: https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick
worker pool: https://nodejs.org/en/docs/guides/dont-block-the-event-loop
nodejs docs: https://nodejs.org/dist/latest/docs/api/
https://nodejs.org/en/docs/guides
