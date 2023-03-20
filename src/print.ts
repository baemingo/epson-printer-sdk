import * as utils from './utils';

class EpsonPrint {
  private message = '';
  private halftone = 0;
  private brightness = 1;
  private force = false;

  public static FONT_A = 'font_a' as const;
  public static FONT_B = 'font_b' as const;
  public static FONT_C = 'font_c' as const;
  public static FONT_D = 'font_d' as const;
  public static FONT_E = 'font_e' as const;
  public static FONT_SPECIAL_A = 'special_a' as const;
  public static FONT_SPECIAL_B = 'special_b' as const;
  public static ALIGN_LEFT = 'left' as const;
  public static ALIGN_CENTER = 'center' as const;
  public static ALIGN_RIGHT = 'right' as const;
  public static COLOR_NONE = 'none' as const;
  public static COLOR_1 = 'color_1' as const;
  public static COLOR_2 = 'color_2' as const;
  public static COLOR_3 = 'color_3' as const;
  public static COLOR_4 = 'color_4' as const;
  public static FEED_PEELING = 'peeling' as const;
  public static FEED_CUTTING = 'cutting' as const;
  public static FEED_CURRENT_TOF = 'current_tof' as const;
  public static FEED_NEXT_TOF = 'next_tof' as const;
  public static MODE_MONO = 'mono' as const;
  public static MODE_GRAY16 = 'gray16' as const;
  public static BARCODE_UPC_A = 'upc_a' as const;
  public static BARCODE_UPC_E = 'upc_e' as const;
  public static BARCODE_EAN13 = 'ean13' as const;
  public static BARCODE_JAN13 = 'jan13' as const;
  public static BARCODE_EAN8 = 'ean8' as const;
  public static BARCODE_JAN8 = 'jan8' as const;
  public static BARCODE_CODE39 = 'code39' as const;
  public static BARCODE_ITF = 'itf' as const;
  public static BARCODE_CODABAR = 'codabar' as const;
  public static BARCODE_CODE93 = 'code93' as const;
  public static BARCODE_CODE128 = 'code128' as const;
  public static BARCODE_GS1_128 = 'gs1_128' as const;
  public static BARCODE_GS1_DATABAR_OMNIDIRECTIONAL = 'gs1_databar_omnidirectional' as const;
  public static BARCODE_GS1_DATABAR_TRUNCATED = 'gs1_databar_truncated' as const;
  public static BARCODE_GS1_DATABAR_LIMITED = 'gs1_databar_limited' as const;
  public static BARCODE_GS1_DATABAR_EXPANDED = 'gs1_databar_expanded' as const;
  public static BARCODE_CODE128_AUTO = 'code128_auto' as const;
  public static HRI_NONE = 'none' as const;
  public static HRI_ABOVE = 'above' as const;
  public static HRI_BELOW = 'below' as const;
  public static HRI_BOTH = 'both' as const;
  public static SYMBOL_PDF417_STANDARD = 'pdf417_standard' as const;
  public static SYMBOL_PDF417_TRUNCATED = 'pdf417_truncated' as const;
  public static SYMBOL_QRCODE_MODEL_1 = 'qrcode_model_1' as const;
  public static SYMBOL_QRCODE_MODEL_2 = 'qrcode_model_2' as const;
  public static SYMBOL_QRCODE_MICRO = 'qrcode_micro' as const;
  public static SYMBOL_MAXICODE_MODE_2 = 'maxicode_mode_2' as const;
  public static SYMBOL_MAXICODE_MODE_3 = 'maxicode_mode_3' as const;
  public static SYMBOL_MAXICODE_MODE_4 = 'maxicode_mode_4' as const;
  public static SYMBOL_MAXICODE_MODE_5 = 'maxicode_mode_5' as const;
  public static SYMBOL_MAXICODE_MODE_6 = 'maxicode_mode_6' as const;
  public static SYMBOL_GS1_DATABAR_STACKED = 'gs1_databar_stacked' as const;
  public static SYMBOL_GS1_DATABAR_STACKED_OMNIDIRECTIONAL = 'gs1_databar_stacked_omnidirectional' as const;
  public static SYMBOL_GS1_DATABAR_EXPANDED_STACKED = 'gs1_databar_expanded_stacked' as const;
  public static SYMBOL_AZTECCODE_FULLRANGE = 'azteccode_fullrange' as const;
  public static SYMBOL_AZTECCODE_COMPACT = 'azteccode_compact' as const;
  public static SYMBOL_DATAMATRIX_SQUARE = 'datamatrix_square' as const;
  public static SYMBOL_DATAMATRIX_RECTANGLE_8 = 'datamatrix_rectangle_8' as const;
  public static SYMBOL_DATAMATRIX_RECTANGLE_12 = 'datamatrix_rectangle_12' as const;
  public static SYMBOL_DATAMATRIX_RECTANGLE_16 = 'datamatrix_rectangle_16' as const;
  public static LEVEL_0 = 'level_0' as const;
  public static LEVEL_1 = 'level_1' as const;
  public static LEVEL_2 = 'level_2' as const;
  public static LEVEL_3 = 'level_3' as const;
  public static LEVEL_4 = 'level_4' as const;
  public static LEVEL_5 = 'level_5' as const;
  public static LEVEL_6 = 'level_6' as const;
  public static LEVEL_7 = 'level_7' as const;
  public static LEVEL_8 = 'level_8' as const;
  public static LEVEL_L = 'level_l' as const;
  public static LEVEL_M = 'level_m' as const;
  public static LEVEL_Q = 'level_q' as const;
  public static LEVEL_H = 'level_h' as const;
  public static LEVEL_DEFAULT = 'default' as const;
  public static LINE_THIN = 'thin' as const;
  public static LINE_MEDIUM = 'medium' as const;
  public static LINE_THICK = 'thick' as const;
  public static LINE_THIN_DOUBLE = 'thin_double' as const;
  public static LINE_MEDIUM_DOUBLE = 'medium_double' as const;
  public static LINE_THICK_DOUBLE = 'thick_double' as const;
  public static DIRECTION_LEFT_TO_RIGHT = 'left_to_right' as const;
  public static DIRECTION_BOTTOM_TO_TOP = 'bottom_to_top' as const;
  public static DIRECTION_RIGHT_TO_LEFT = 'right_to_left' as const;
  public static DIRECTION_TOP_TO_BOTTOM = 'top_to_bottom' as const;
  public static CUT_NO_FEED = 'no_feed' as const;
  public static CUT_FEED = 'feed' as const;
  public static CUT_RESERVE = 'reserve' as const;
  public static FULL_CUT_NO_FEED = 'no_feed_fullcut' as const;
  public static FULL_CUT_FEED = 'feed_fullcut' as const;
  public static FULL_CUT_RESERVE = 'reserve_fullcut' as const;
  public static DRAWER_1 = 'drawer_1' as const;
  public static DRAWER_2 = 'drawer_2' as const;
  public static PULSE_100 = 'pulse_100' as const;
  public static PULSE_200 = 'pulse_200' as const;
  public static PULSE_300 = 'pulse_300' as const;
  public static PULSE_400 = 'pulse_400' as const;
  public static PULSE_500 = 'pulse_500' as const;
  public static PATTERN_NONE = 'none' as const;
  public static PATTERN_0 = 'pattern_0' as const;
  public static PATTERN_1 = 'pattern_1' as const;
  public static PATTERN_2 = 'pattern_2' as const;
  public static PATTERN_3 = 'pattern_3' as const;
  public static PATTERN_4 = 'pattern_4' as const;
  public static PATTERN_5 = 'pattern_5' as const;
  public static PATTERN_6 = 'pattern_6' as const;
  public static PATTERN_7 = 'pattern_7' as const;
  public static PATTERN_8 = 'pattern_8' as const;
  public static PATTERN_9 = 'pattern_9' as const;
  public static PATTERN_10 = 'pattern_10' as const;
  public static PATTERN_A = 'pattern_a' as const;
  public static PATTERN_B = 'pattern_b' as const;
  public static PATTERN_C = 'pattern_c' as const;
  public static PATTERN_D = 'pattern_d' as const;
  public static PATTERN_E = 'pattern_e' as const;
  public static PATTERN_ERROR = 'error' as const;
  public static PATTERN_PAPER_END = 'paper_end' as const;
  public static LAYOUT_RECEIPT = 'receipt' as const;
  public static LAYOUT_RECEIPT_BM = 'receipt_bm' as const;
  public static LAYOUT_LABEL = 'label' as const;
  public static LAYOUT_LABEL_BM = 'label_bm' as const;
  public static HALFTONE_DITHER = 0 as const;
  public static HALFTONE_ERROR_DIFFUSION = 1 as const;
  public static HALFTONE_THRESHOLD = 2 as const;

  public addText(data: string) {
    this.addRow('text', utils.escapeMarkup(data));
    return this;
  }
  public addTextLang(lang: string) {
    this.message += '<text lang="' + lang + '"/>';
    return this;
  }
  public addTextAlign(align: string) {
    var s = '';
    s += utils.getEnumAttr('align', align, regexAlign);
    this.message += '<text' + s + '/>';
    return this;
  }
  public addTextRotate(rotate: string) {
    var s = '';
    s += utils.getBoolAttr('rotate', rotate);
    this.message += '<text' + s + '/>';
    return this;
  }
  public addTextLineSpace(linespc: string) {
    var s = '';
    s += utils.getUByteAttr('linespc', linespc);
    this.message += '<text' + s + '/>';
    return this;
  }
  public addTextFont(font: string) {
    var s = '';
    s += utils.getEnumAttr('font', font, regexFont);
    this.message += '<text' + s + '/>';
    return this;
  }
  public addTextSmooth(smooth: string) {
    var s = '';
    s += utils.getBoolAttr('smooth', smooth);
    this.message += '<text' + s + '/>';
    return this;
  }
  public addTextDouble(dw, dh: string) {
    var s = '';
    if (dw !== undefined) {
      s += utils.getBoolAttr('dw', dw);
    }
    if (dh !== undefined) {
      s += utils.getBoolAttr('dh', dh);
    }
    this.message += '<text' + s + '/>';
    return this;
  }

  /**
   * Sets the text size
   *
   * @param width A scale number between 1-8
   * @param height A scale number between 1-8
   * @returns this
   */
  public addTextSize(width: number, height: number) {
    this.addRow('text', null, {
      width,
      height,
    });
    return this;
  }
  public addTextStyle(reverse: boolean, ul: boolean, em: boolean, color: string) {
    this.addRow('text', null, {
      reverse,
      ul,
      em,
      color,
    });
    return this;
  }
  public addTextPosition(x: string) {
    var s = '';
    s += utils.getUShortAttr('x', x);
    this.message += '<text' + s + '/>';
    return this;
  }
  public addTextVPosition(y: string) {
    var s = '';
    s += utils.getUShortAttr('y', y);
    this.message += '<text' + s + '/>';
    return this;
  }
  public addFeedUnit(unit: string) {
    this.message += `<feed unit="${unit}/>`;
    return this;
  }
  public addFeedLine(line: number) {
    this.addRow('feed', null, {
      line,
    });
    return this;
  }
  public addFeed() {
    this.message += '<feed/>';
    return this;
  }
  public addFeedPosition(pos: string) {
    this.addRow('feed', null, {
      pos,
    });
    return this;
  }

  public addImage(base64ImageData: string, width: string, height: string) {
    this.addRow('image', base64ImageData, {
      height,
      width,
    });
    return this;
  }

  public addLogo(key1: string, key2: string) {
    this.addRow('logo', null, {
      key1,
      key2,
    });
    return this;
  }
  public addBarcode(
    data: string,
    type: string,
    hri: number,
    font: string,
    width: number,
    height: number,
  ) {
    var s = '';
    s += utils.getEnumAttr('type', type, regexBarcode);
    if (hri !== undefined) {
      s += utils.getEnumAttr('hri', hri, regexHri);
    }
    if (font !== undefined) {
      s += utils.getEnumAttr('font', font, regexFont);
    }
    if (width !== undefined) {
      s += utils.getUByteAttr('width', width);
    }
    if (height !== undefined) {
      s += utils.getUByteAttr('height', height);
    }
    this.message +=
      '<barcode' + s + '>' + utils.escapeControl(utils.escapeMarkup(data)) + '</barcode>';
    return this;
  }

  public addHLine(x1: number, x2: number, style: string) {
    var s = '';
    s += utils.getUShortAttr('x1', x1);
    s += utils.getUShortAttr('x2', x2);
    if (style !== undefined) {
      s += utils.getEnumAttr('style', style, regexLine);
    }
    this.message += '<hline' + s + '/>';
    return this;
  }
  public addVLineBegin(x, style: string) {
    var s = '';
    s += utils.getUShortAttr('x', x);
    if (style !== undefined) {
      s += utils.getEnumAttr('style', style, regexLine);
    }
    this.message += '<vline-begin' + s + '/>';
    return this;
  }
  public addVLineEnd(x, style: string) {
    var s = '';
    s += utils.getUShortAttr('x', x);
    if (style !== undefined) {
      s += utils.getEnumAttr('style', style, regexLine);
    }
    this.message += '<vline-end' + s + '/>';
    return this;
  }

  public addRotateBegin() {
    this.message += '<rotate-begin/>';
    return this;
  }
  public addRotateEnd() {
    this.message += '<rotate-end/>';
    return this;
  }

  public addCut(
    type: 'no_feed' | 'feed' | 'reserve' | 'no_feed_fullcut' | 'feed_fullcut' | 'reserve_fullcut',
  ) {
    this.addRow('cut', null, { type });
    return this;
  }

  public addSound(pattern: any, repeat: ant, cycle: string) {
    this.addRow('sound', null, {
      pattern,
      repeat,
      cycle,
    });
    return this;
  }

  public addRecovery() {
    this.addRow('recovery');
    return this;
  }
  public addReset() {
    this.addRow('reset');
    return this;
  }

  public addCommand(data: string) {
    this.message += '<command>' + utils.toHexBinary(data) + '</command>';
    return this;
  }

  public toString() {
    var s = '';
    if (this.force) {
      s += 'force="true"';
    }

    return (
      '<epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"' +
      s +
      '>' +
      this.message +
      '</epos-print>'
    );
  }

  /**
   * Adds an XML row to the message
   */
  private addRow(
    field: string,
    value?: string | null,
    fields?: Record<string, string | number | boolean>,
  ) {
    this.message += `<${field}`;
    if (fields) {
      for (const [key, value] of Object.entries(fields)) {
        if (value === undefined || value === null) {
          continue;
        }

        this.message += ` ${key}="${value}"`;
      }
    }

    if (!value) {
      this.message += '/>';
    } else {
      this.message += `>${value}</${field}>`;
    }
  }
}

export default EpsonPrint;
