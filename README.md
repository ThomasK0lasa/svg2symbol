# svg2symbol

Simple and quick symbol maker. Can strip fills, strokes, styles - all, the key one, or except the key one. Also allows for CSS background use with help of svg fragment identifier. *Use examples coming soon.*

## Quick start

### Install
```
npm i svg2symbol --save-dev
```

### Package.json script
Define your script in package.json:<br>
```
scripts: {
    "svg": "svg2symbol -i ./test/svgs -o ./test/symbols.svg"
}
```

Run your script<br>
```
npm run svg
```

### Run cmd

On linux or mac you can call
```
npm run env svg2symbol -- -i ./test/svgs -o ./test/symbols.svg
```

On **windows** and linux, mac
```
npm exec svg2symbol -- -i ./test/svgs -o ./test/symbols.svg
```

## Parameters

### Required

`--input, -i` Folder input path

`--output, -o` File output path

### Optional

```js
--stripFills (Boolean|String) [false]
```
If set to true module will strip every fill from svg. If you will specify key value like "#FF0000" it will strip only fills with "#FF0000" value. To remove all fills except key value write "!#FF0000".
<br><br>

```js
--stripStrokes (Boolean|String) [false]
```
Similar to stripFills. Set to true to remove every stroke from svg. Specify key value like "red" to strip only strokes with "red" value. To remove all strokes except key value write "!red".
<br><br>

```js
--stripStyles (Boolean) [false]
```
Strip styles attribute
<br><br>

```js
--prefix (String) ['']
```
String to be prefixed to your symbol name.
<br><br>

```js
--suffix (String) ['']
```
String to be suffixed to your symbol name.
<br><br>

```js
--hideClass (String) ['hidden']
```
Add specific class to generated svg. By default adds **hidden** as it is typical for "display: none".
<br><br>

```js
--hideDisplay (Boolean) [false]
```
Sets "display: none" in generated svg inline style. If this is used then hideClass is ignored. (?)
<br><br>

```js
--cssBgSupport (Boolean) [false]
```
Adds new svg elements (view, g, use) to allow use of svg fragments as css background property. Prepends **-v** to view id as it can't be the same as symbol id. In the end you call it like this:

`background: url(symbols.svg#symbolname-v) no-repeat;`

**Notice:** **cssBgSupport** adds global style (specific for svg2symbol generated svgs only) inside the svg file - it is needed to properly display stacked fragments. If you create multiple symbols collection files then consider adding the css style to your css file and set cssBgSupportStyle to false.
<br><br>

```js
--cssBgSupportStyle (Boolean) [false]
```
By default it's set to false, but if you set `--cssBgSupport true` then **cssBgSupportStyle** by default is also **true** and if you need you can disable it with `--cssBgSupportStyle false`
Adds below css style which is required to properly display svg views as css background.
```css
.svg2symbol view + g {
    display: none;
}
.svg2symbol view:target + g {
    display: inline;
}
```


## Usage examples
To be written


## What if I need minifying or other stuff?

Use [SVGO](https://github.com/svg/svgo).
