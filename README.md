# @baemingo/epson-printer-sdk

> A modern and simple "connect-less" integration against EPSON printers.

## Printer Prerequisites

- The printer needs to support Ethernet connections
- The printer needs to run on at least v2.x
- The printer needs to have the "epos print" setting turned on

## Install

Using npm:

```sh
npm install --save @baemingo/epson-printer-sdk
```

or using yarn:

```sh
yarn add @baemingo/epson-printer-sdk
```

## Publish

1. Change version number in package.json
2. `yarn build`
3. `cp package.json dist/`
4. `cd dist`
5. `npm publish`

## Usage

```ts
import EpsonPrinter, { EpsonPrint, Epson } from '@baemingo/epson-printer-sdk';

// Create a printer instance
const printer = new EpsonPrinter('192.168.0.1');

// Build up a print object
const print = new EpsonPrint();

// Add some text
print.addText('Hello, world!');

// Add a QR code
print.addSymbol('1234', Epson.Symbol.QRCODE_MODEL_1, 1, 50, 50, 2);

// Cut the paper
print.addCut(EpsonPrint.CUT_FEED);

// Send the print object to the printer
try {
  await printer.send(print);

  // Success
} catch (e) {
  // Print failed
  console.error(e.message);
}
```

## Connections & parallel printers

This implementation uses one-off http requests and does not set up a permanent connection. This means you can have a many-to-many setup with printers and clients and it will work just fine (unlike with the native SDKs).
