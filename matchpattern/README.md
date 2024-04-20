## Usage

### Download
[Latest](https://jc3213.github.io/jslib/matchpattern/matchpattern.js)

### HTML
```HTML
<script src="https://jc3213.github.io/jslib/matchpattern/matchpattern.js"></script>
```

### TamperMonkey
```javascript
// @require https://jc3213.github.io/jslib/matchpattern/matchpattern.js
```

## Syntax
```javascript
let matchPattern = new MatchPattern();
```

## Method
- [add](#add)
    - add [url](#url) to match patterns
- [remove](#remove)
    - remove [url](#url) from match patterns
- [match](#match)
    - match [url](#url) with match patterns

### add
```javascript
matchPattern.add('https://www.google.com/'); // *.google.com
```
- add `https://www.google.com/` to match patterns
- returns `*.google.com`

### remove
```javascript
matchPattern.remove('https://github.com/');
```
- remove `*.github.com` from match patterns
- if `*.github.com` is not in match patterns, do nothing

### match
```javascript
matchPattern.match('https://www.bing.com/'); // false
```
- match `https://www.bing.com/` with match patterns
- returns `false`, if you haven't added any [url](#url) that is `*.bing.com`

#### url
- Any available URL
