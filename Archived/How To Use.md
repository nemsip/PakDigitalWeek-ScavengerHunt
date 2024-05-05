# How to use hackerText

Hacked-Text is a tiny JavaScript library that mimics the classic “scrambling” of text, creating an illusion of dynamic hacking activity on your website.

How to use it:

One - Download and include the Hacked-Text library on the page.

```html
<script src="hackerText.js"></script>
```

Two - Initialize the Hacked-Text on your text container and pass the following parameters:

id: The ID of the dom element
iterations: Number of iterations
speed: Speed of the interations

```html
<div id="example">
  Mess with the best, die like the rest
</div>
```

```js
// Init(id, iterations, speed)
Init("example", 5, 10)
```
