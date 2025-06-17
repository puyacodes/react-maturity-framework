# Handle Javascript Errors Gracefully
## Unahndled Exceptions
The following code shows how you might create and report an error, and how it may be caught by adding a listener for the error event.

Source: [https://gist.github.com/JoeyBurzynski/dd4543b7078be54295a0eedd5212071c](https://gist.github.com/JoeyBurzynski/dd4543b7078be54295a0eedd5212071c)

Demo: [https://jsfiddle.net/joeyburzynski/x5wbe0jp/](https://jsfiddle.net/joeyburzynski/x5wbe0jp/)

Reference: [https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event](https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event)

```javascript
window.addEventListener('error', (event) => {
  // An uncaught exception occurred. It will be logged in the console.
  event.preventDefault();
  
  // Get the error properties from the error event object
  const { message, filename, lineno, colno, error } = event;
  
  // Output, if desired.
  console.log('Captured uncaught exception:', message, filename, lineno, colno, error.stack);
});
```

Note that in Node the event is called unhandledException:

```javascript
process.on('unhandledException', function(err, promise) {
    const { message, filename, lineno, colno, error } = event;
  
    console.log('Captured uncaught exception:', message, filename, lineno, colno, error.stack);
});
```

## Unahndled Promise Rejection
Many environments (such as Node.js) report unhandled promise rejections to the console by default.

You can prevent that from happening by adding a handler for unhandledrejection events that—in addition to any other tasks you wish to perform—calls preventDefault() to cancel the event, preventing it from bubbling up to be handled by the runtime's logging code.

This works because unhandledrejection is cancelable.

Source: [https://gist.github.com/JoeyBurzynski/dd4543b7078be54295a0eedd5212071c](https://gist.github.com/JoeyBurzynski/dd4543b7078be54295a0eedd5212071c)

Reference: [https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event](https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event)

```javascript
// The unhandledrejection event is sent to the global scope of a script when a JavaScript Promise 
// that has no rejection handler is rejected; typically, this is the window, but may also be a Worker.
// This is useful for debugging and for providing fallback error handling for unexpected situations.

window.addEventListener('unhandledrejection', (event) => {
  // code for handling the unhandled rejection
  // the event object has two special properties:
  
  // [object Promise] - The JavaScript Promise that was rejected.
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent/promise
  console.log('Faulted Promise: ', event.promise); 
  
  // Error: Whoops! - A value or Object indicating why the promise was rejected, as passed to Promise.reject().
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent/reason
  console.log('Error reason: ', event.reason); 

  // Prevent the default handling (such as outputting the error to the console)
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event#preventing_default_handling
  event.preventDefault();
});
```

Note that in Node the event is called unhandledRejection:

```javascript
process.on('unhandledRejection', function(err, promise) {
    console.error('Unhandled rejection (promise: ', promise, ', reason: ', err, ').');
});
```

## Third-party libraries
### uncaught
`uncaught` is the module, which allows you to handle all uncaught errors and promise rejections through only one listener.

[https://github.com/aleksandr-oleynikov/uncaught](https://github.com/aleksandr-oleynikov/uncaught)

```bash
$ npm install --save uncaught
```

Usage Example:

Browser
```html
<body>
    ...
    <script src="path_to_your_project_dir/node_modules/uncaught/lib/index.js"></script>
    <script>
        uncaught.start();
        uncaught.addListener(function (error) { // handled both errors: unhandled exceptions, unhandled promise rejections
            console.log('Uncaught error or rejection: ', error.message);
        });
    </script>
    ...
</body>
```

Browser + webpack

```javascript
var uncaught = require('uncaught');

uncaught.start();
uncaught.addListener(function (error) {
    console.log('Uncaught error or rejection: ', error.message);
});
```

Node.js

```javascript
var uncaught = require('uncaught');

uncaught.start();
uncaught.addListener(function (error) {
    console.log('Uncaught error or rejection: ', error.message);
});
```
