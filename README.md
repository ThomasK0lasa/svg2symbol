# svg2symbol

Simple and quick symbol maker. Can strip fills, strokes, styles - all, key one, or except the key.

## Quick start

### Install
`npm i svg2symbol --save-dev`

### As script
`svg2symbol -i ./tests/svgs -o ./tests/symbols.svg`

### Inline cmd
`npm run env svg2symbol -- -i ./tests/svgs -o ./tests/symbols.svg`

## Parameters

### Required

**--input, -i** - folder input path<br>
**--output, -o** - file output path


### Optional

**--stripFills** (Boolean|String) [false]<br>
If set to true module will strip every fill from svg. If you will specify key value like "#FF0000" it will strip only fills with "#FF0000" value. To remove all fills except key value write "!#FF0000".

**--stripStrokes** (Boolean|String) [false]<br>
Similar to stripFills. Set to true to remove every stroke from svg. Specify key value like "red" to strip only strokes with "red" value. To remove all strokes except key value write "!red".

**--stripStyles** (Boolean) [false]<br>
Strip styles attribute

**--prefix** (String) ['']<br>
String to be prefixed to your symbol name.

**--suffix** (String) ['']<br>
String to be suffixed to your symbol name.

**--hideClass** (String) ['hidden']<br>
Add specific class to generated svg. By default adds .hidden as it is typical for "display: none"

**--hideDisplay** (Boolean) [false]<br>
Sets "display: none" in generated svg inline style<br>


## Usage examples
To be written


## What if I need minifying or other stuff?

Use [SVGO](https://github.com/svg/svgo).
