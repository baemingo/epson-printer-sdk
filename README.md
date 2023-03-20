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

## Usage

```ts
import EpsonPrinter, { EpsonPrint } from '@baemingo/epson-printer-sdk';

// Create a printer instance
const printer = new EpsonPrinter('192.168.0.1');

// Build up a print object
const print = new EpsonPrint();
print.addText('Hello, world!');
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
