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
    - add [hostname](#hostname) to match patterns
- [remove](#remove)
    - remove [hostname](#hostname) from match patterns
- [match](#match)
    - match [hostname](#hostname) with match patterns

### add
```javascript
matchPattern.add('www.google.com'); // *.google.com
```
- add `www.google.com` to match patterns
- returns `*.google.com`

### remove
```javascript
matchPattern.remove('github.com');
```
- remove `github.com` from match patterns
- if `github.com` is not in match patterns, do nothing

### match
```javascript
matchPattern.match('www.bing.com'); // false
```
- match `www.bing.com` with match patterns
- returns `false`, if you haven't added any [hostname](#hostname) that is `*.bing.com`

#### hostname
- *Sub Domain*.*Second Level Domain*.*Top Level Domain*
- `www.google.com`, or `github.com`

```javascript
let {hostname} = new URL(url);
```
