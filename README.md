# #] PRIZ.md
A "server-side" processor for my markdown flavor

*it processes on whichever device calls it

## #] How to use it
Add `<script type="text/javascript src="https://voxelprismatic.github.io/priz.md/markup.js"></script>`
to the `<head>` of your page.

To use the markdown, just do the following:
```
var content = `
<content>
`;

elementNode.innerHTML = mark_page(content);
```

## #] Important notices
This also adds the proper CSS style sheet to your page. If you don't like this, you can
override it by putting your CSS style sheets after the script. However, there are a bunch
of styles [at least 100].

There are more functions and variables, so if you don't want to live with that use
`iframe.js` instead of `markup.js`. You'll still use `mark_page(content)`, but you'll
need to `await` it first.
