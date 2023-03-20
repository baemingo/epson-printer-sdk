/* eslint-disable radix */
import EpsonPrint from './print';

// @ts-ignore
import XMLParser from 'react-xml-parser';

const EPSON_XML_HEADER =
  '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><parameter xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print" /></s:Header><s:Body>';

class EpsonPrinter {
  private url;

  constructor(ip: string) {
    this.url = `http://${ip}/cgi-bin/epos/service.cgi?devid=local_printer&timeout=10000`;
  }

  public async send(print: EpsonPrint) {
    const data = print.toString();

    try {
      const xml = await this.request(data);
      const [response] = xml.getElementsByTagName('response');

      /**
       * Example response:
       * <soapenv:Body>
       *   <response
       *     success="false" code="DeviceNotFound" status="0" battery="0"
       *     xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"
       *   />
       * </soapenv:Body>
       */

      if (!response) {
        throw new Error('INVALID_RESPONSE');
      }

      const success = response.attributes.success === 'true';

      // If there's an error, "code" contains the error
      const code = response.attributes.code ?? '';

      // Currently not used
      const status = parseInt(response.attributes.status) ?? 0;
      const battery = parseInt(response.attributes.battery) ?? 0;

      if (!success) {
        throw new Error(code);
      }

      /** Successful print */
      return true;
    } catch (e) {
      console.error(e);
    }
  }

  private async request(data: string) {
    const body = `${EPSON_XML_HEADER}${data}</s:Body></s:Envelope>`;
    const result = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT',
        SOAPAction: '""',
      },
      body,
    }).then((r) => r.text());

    return new XMLParser().parseFromString(result);
  }
}

export default EpsonPrinter;
