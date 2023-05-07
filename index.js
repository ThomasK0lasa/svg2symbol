#!/usr/bin/env node

'use strict'
const fs = require('fs');
const path = require('path');
const $ = require('cheerio');
const args = require('yargs').argv;

const inputPath = args.i || args.input;
const outputPath = args.o || args.output;
if (!inputPath) return process.stderr.write('Missing input path argument.');
if (!outputPath) return process.stderr.write('Missing output file path argument.');

// strip attributes (Booleans|String)
let stripFills = args.hasOwnProperty('stripFills') ? args.stripFills : false;
let stripStrokes = args.hasOwnProperty('stripStrokes') ? args.stripStrokes : false;
const stripStyles = args.hasOwnProperty('stripStyles') ? args.stripStyles : false;

// set negation if we want to strip every fill or stroke EXCEPT (!)
let fillsNegated, strokesNegated;
if (typeof stripFills !== "boolean" && stripFills.charAt(0) === '!') {
    stripFills = stripFills.slice(1);
    fillsNegated = true;
}
if (typeof stripFills !== "boolean" && stripStrokes.charAt(0) === '!') {
    stripStrokes = stripStrokes.slice(1);
    strokesNegated = true;
}

// hide style or class
const hideClass = args.hasOwnProperty('hideClass') ? args.hideClass : 'hidden';
const hideDisplay = Boolean(args.hideDisplay);
const hide = hideDisplay ? 'style="display: none;"' : `class=${hideClass}`;

// prefix and sufix
const prefix = args.prefix ? args.prefix : '';
const suffix = args.suffix ? args.suffix : '';

const $dom = $.load(`
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0" ${hide}></svg>
`);
const $newSvg = $dom('svg');

fs.readdir(inputPath, function (err, files) {
    if (err) return process.stderr.write('ERROR: Input error -' + err.code);
    files.forEach(parseSvg);
    writeFile();
})

function parseSvg(file) {
    if (path.extname(file) !== '.svg') return;
    
    const fileName = file.slice(0, -4);
    const xmlFile = fs.readFileSync(path.join(inputPath, file), 'utf8');
    const $xml = $(xmlFile);

    const $svg = $xml.filter('svg');
    const $svgNodes = $svg.find('*');
    if (stripFills || stripStrokes || stripStyles) {
        $svgNodes.each((i, node) => {
            const $node = $(node);
            stripFill($node);
            stripStroke($node);
            stripStyle($node);
        });
    }

    const $symbol = $('<symbol></symbol>');
    $symbol.attr('viewbox', $svg.attr('viewbox'));
    $symbol.attr('id', `${prefix}${fileName}${suffix}`);
    $symbol.append($svg.contents());

    $newSvg.append($symbol);
}

function writeFile() {
    fs.writeFile(outputPath, $dom.html(), err => {
        if (err) return process.stderr.write('ERROR: Output error - ' + err.code);
    });
}

function stripFill($node) {
    if (!stripFills) return;
    if (stripFills === true) $node.removeAttr('fill');
    else {
        if (fillsNegated) {
            if ($node.attr('fill') !== stripFills) $node.removeAttr('fill');
        } else {
            if ($node.attr('fill') === stripFills) $node.removeAttr('fill');
        }
    }
}

function stripStroke($node) {
    if (!stripStrokes) return;
    if (stripStrokes === true) $node.removeAttr('stroke');
    else {
        if (strokesNegated) {
            if ($node.attr('stroke') !== stripStrokes) $node.removeAttr('stroke');
        } else {
            if ($node.attr('stroke') === stripStrokes) $node.removeAttr('stroke');
        }
    }
}

function stripStyle($node) {
    if (!stripStyles) return;
    if (stripStyles === true) $node.removeAttr('style');
}