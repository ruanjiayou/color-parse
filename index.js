
class Color {
    /**
     * @constructor
     * @param {string|object} 
     */
    constructor(val) {
        this._rgb = { R: 0, G: 0, B: 0 };
        this._hsl = { H: 0, S: 0, L: 0 };
        this.A = 1;
        if (val) {
            this.parse(val);
        }
    }
    // RGB和HSL状态切换
    _trans2(RGB) {
        if (RGB) {
            this._hsl = this._rgb2hsl(this._2rgb());
        } else {
            this._rgb = this._hsl2rgb(this._2hsl());
        }
    }
    set R(n) {
        this._rgb.R = this._limit(n, 255);
        this._trans2(true);
    }
    set G(n) {
        this._rgb.G = this._limit(n, 255);
        this._trans2(true);
    }
    set B(n) {
        this._rgb.B = this._limit(n, 255);
        this._trans2(true);
    }
    set H(n) {
        this._hsl.H = this._limit(n, 360);
        this._trans2(false);
    }
    set S(n) {
        this._hsl.S = this._limit(n);
        this._trans2(false);
    }
    set L(n) {
        this._hsl.L = this._limit(n);
        this._trans2(false);
    }
    // 设置透明度 0-1 最小单位0.01
    set A(n) {
        this._a = this._limit(n);
    }
    get R() {
        return this._rgb.R;
    }
    get G() {
        return this._rgb.G;
    }
    get B() {
        return this._rgb.B;
    }
    get H() {
        return this._hsl.H;
    }
    get S() {
        return this._hsl.S;
    }
    get L() {
        return this._hsl.L;
    }
    get A() {
        return this._a;
    }
    /**
     * 
     */
    parse(str) {
        let m = null;
        this.A = 1;
        // object RGB 或 object HSL 解析后返回
        if (typeof str === 'object') {
            this.A = str.A;
            if (str.H && str.S && str.L) {
                this.H = str.H;
                this.S = str.S;
                this.L = str.L;
                return this;
            } else if (str.R && str.G && str.B) {
                this.R = str.R;
                this.G = str.G;
                this.B = str.B;
                return this;
            } else {
                str = '#000';
            }
        }
        if (str in this.NickName) {
            str = this.NickName[str];
        }
        if (m = this.RE.hex3.exec(str)) {
            // 格式: #789
            m = parseInt(m[1], 16);
            this.R = (m >> 8 & 0xf) | (m >> 4 & 0x0f0);
            this.G = (m >> 4 & 0xf) | (m & 0xf0);
            this.B = (m & 0xf) << 4 | (m & 0xf);
        } else if (m = this.RE.hex6.exec(str)) {
            // 格式: #778899
            m = parseInt(m[1], 16);
            this.R = m >> 16 & 0xff;
            this.G = m >> 8 & 0xff;
            this.B = m & 0xff;
        } else if (m = this.RE.hex8.exec(str)) {
            this.A = this._limit(parseInt(m[1].substring(6, 8), 16) / 255);
            m = parseInt(m[1].substring(0, 6), 16);
            this.R = m >> 16 & 0xff;
            this.G = m >> 8 & 0xff;
            this.B = m & 0xff;
        } else if (m = this.RE.rgb.exec(str)) {
            // 格式: rgb(255, 255, 255)
            this.R = this._limit(m[1], 255);
            this.G = this._limit(m[2], 255);
            this.B = this._limit(m[3], 255);
        } else if (m = this.RE.rgba.exec(str)) {
            // 格式: rgba(255, 255, 255, 0.5)
            this.R = this._limit(m[1], 255);
            this.G = this._limit(m[2], 255);
            this.B = this._limit(m[3], 255);
            this.A = this._limit(m[4]);
        } else if (m = this.RE.hsl.exec(str)) {
            // 格式: hsl( 222, 55%, 43%)
            var o = { H: this._limit(m[1], 360), S: this._limit(m[2]), L: this._limit(m[3]) };
            this._rgb = this._hsl2rgb(o);
        } else if (m = this.RE.hsla.exec(str)) {
            // 格式: hsla( 222, 55%,43%, 0.8)
            var o = { H: this._limit(m[1], 360), S: this._limit(m[2]), L: this._limit(m[3]) };
            this._rgb = this._hsl2rgb(o);
            this.A = this._limit(m[4]);
        } else {
            this.parse('#000');
        }
        return this;
    }
    toString(type) {
        let T = Color.TYPE,
            res;
        switch (type) {
            case T.RGB:
                res = `rgb(${this.R}, ${this.G}, ${this.B})`;
                break;
            case T.RGBA:
                res = `rgba(${this.R}, ${this.G}, ${this.B}, ${this.A})`;
                break;
            case T.HSL:
                res = `hsl(${this.H}, ${this.S}, ${this.L})`;
                break;
            case T.HSLA:
                res = `hsla(${this.H}, ${this.S}, ${this.L}, ${this.A})`;
                break;
            case T.HSB:
                //TODO:
                res = 'TODO';
                break;
            case T.LAB:
                //TODO:
                res = 'TODO';
                break;
            case T.CMYK:
                //TODO:
                res = 'TODO';
                break;
            case T.HSV:
                //TODO:
                res = 'TODO';
                break;
            case T.HEX8:
                res = this._2hex8();
            default:
                return this._2hex6();
                break;
        }
        return res;
    }
    // rgb hsl hsb 
    toJSON(type) {
        let T = Color.TYPE,
            res = { R: this.R, G: this.G, B: this.B };
        switch (type) {
            case T.RGB: break;
            case T.RGBA: res.A = this.A; break;
            case T.HSL: res = { H: this._hsl.H, S: this.S, L: this.L }; break;
            case T.HSLA:
                res = { H: this.H, S: this.S, L: this.L };
                res.A = this.A;
                break;
            case T.HSB: break;
            case T.LAB: break;
            case T.CMYK: break;
            case T.HSV: break;
            default: break;
        }
        return res;
    }
    /**
     * 默认最大值是1 最大值不是1时返回整数 否则返回0-1
     */
    _limit(n, max) {
        max = max || 1;
        if (typeof n === 'string') {
            if (n.charAt(n.length - 1) === '%') {
                n = (parseFloat(n) || 0) * max;
                n = n < 1 ? 0 : n / 100;
            } else {
                n = parseFloat(n) || 0;
            }
        } else if (typeof n !== 'number') {
            n = max === 1 ? 1 : 0;
        }
        // 非0-1则转为整数 否则保留两位小数
        n = max === 1 ? Math.round(n * 1000) / 1000 : Math.round(n);
        // [0, max]限制
        return (n < 0 ? 0 : (n > max ? max : n));
    }
    // 二位8bit转为16位
    _2hex_str(n) {
        n = parseInt(n) || 0;
        n = (n > 255 ? 255 : (n > 0 ? n : 0)).toString(16);
        return (n.length === 1 ? `0${n}` : n).toUpperCase();
    }
    // return json
    _2rgb() {
        return this._rgb;
    }
    _2rgba() {
        let o = this._rgb;
        o.A = this.A;
        return o;
    }
    _2hsl() {
        return this._hsl;
    }
    _2hex6() {
        return `#${this._2hex_str(this.R)}${this._2hex_str(this.G)}${this._2hex_str(this.B)}`;
    }
    _2hex8() {
        return `#${this._2hex_str(this.R)}${this._2hex_str(this.G)}${this._2hex_str(this.B)}${this._2hex_str(this.A * 255)}`;
    }
    _hueToRGB(p, q, h) {
        if (h < 0)
            h += 1;
        else if (h > 1)
            h -= 1;

        if ((h * 6) < 1)
            return p + (q - p) * h * 6;
        else if ((h * 2) < 1)
            return q;
        else if ((h * 3) < 2)
            return p + (q - p) * ((2 / 3) - h) * 6;
        else
            return p;
    }
    _hsl2rgb(hsl) {
        var h = this._limit(hsl.H / 360);
        var s = this._limit(hsl.S);
        var l = this._limit(hsl.L);

        if (l <= 0.5)
            var q = l * (1 + s);
        else
            var q = l + s - (l * s);

        var p = 2 * l - q;

        var tr = h + (1 / 3);
        var tg = h;
        var tb = h - (1 / 3);

        var r = Math.round(this._hueToRGB(p, q, tr) * 255);
        var g = Math.round(this._hueToRGB(p, q, tg) * 255);
        var b = Math.round(this._hueToRGB(p, q, tb) * 255);
        return { R: r, G: g, B: b };
    }
    _rgb2hsl(o) {
        var r = o.R / 255,
            g = o.G / 255,
            b = o.B / 255,
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            add = max + min,
            diff = max - min,
            h = 0,
            s = 0,
            l = 0;
        if (min === max) {
            h = 0;
        } else if (r === max) {
            h = (60 * (b - r) / diff + 360) % 360;
        } else if (g === max) {
            h = (60 * (b - r) / diff) + 120;
        } else {
            h = (60 * (r - g) / diff) + 240;
        }
        l = 0.5 * add;
        if (l === 0 || max === min) {
            s = 0;
        } else if (l === 1) {
            s = 1;
        } else if (l <= 0.5) {
            s = diff / add;
        } else {
            s = diff / (2 - add);
        }
        h = Math.round(h);
        s = Math.round(s * 10000) / 10000;
        l = Math.round(l * 10000) / 10000;
        return { H: h, S: s, L: l };
    }
    _2hsb() {

    }
    _2hsv() {

    }
    _2lab() {

    }
    _2cmyk() {

    }
    reverse() {

    }
    lighten() {

    }
    darken() {

    }
}
// 颜色正则
Color.prototype.RE = {
    'hex3': /^#([0-9a-f]{3})$/,
    'hex6': /^#([0-9a-f]{6})$/,
    'hex8': /^#([0-9a-f]{8})$/,
    'rgb': /^rgb\(\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*\)$/,
    'rgba': /^rgba\(\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*\)$/,
    'hsl': /^hsl\(\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*\)$/,
    'hsla': /^hsla\(\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*,\s*([-+]?\d+(?:\.\d+)?[%]?)\s*\)$/,
}
// 颜色简称
Color.prototype.NickName = {
    'aliceblue': 'F0F8FF',
    'antiquewhite': 'FAEBD7',
    'aqua': '00FFFF',
    'aquamarine': '7FFFD4',
    'azure': 'F0FFFF',
    'beige': 'F5F5DC',
    'bisque': 'FFE4C4',
    'black': '000000',
    'blanchedalmond': 'FFEBCD',
    'blue': '0000FF',
    'blueviolet': '8A2BE2',
    'brown': 'A52A2A',
    'burlywood': 'DEB887',
    'cadetblue': '5F9EA0',
    'chartreuse': '7FFF00',
    'chocolate': 'D2691E',
    'coral': 'FF7F50',
    'cornflowerblue': '6495ED',
    'cornsilk': 'FFF8DC',
    'crimson': 'DC143C',
    'cyan': '00FFFF',
    'darkblue': '00008B',
    'darkcyan': '008B8B',
    'darkgoldenrod': 'B8860B',
    'darkgray': 'A9A9A9',
    'darkgreen': '006400',
    'darkkhaki': 'BDB76B',
    'darkmagenta': '8B008B',
    'darkolivegreen': '556B2F',
    'darkorange': 'FF8C00',
    'darkorchid': '9932CC',
    'darkred': '8B0000',
    'darksalmon': 'E9967A',
    'darkseagreen': '8FBC8F',
    'darkslateblue': '483D8B',
    'darkslategray': '2F4F4F',
    'darkturquoise': '00CED1',
    'darkviolet': '9400D3',
    'deeppink': 'FF1493',
    'deepskyblue': '00BFFF',
    'dimgray': '696969',
    'dodgerblue': '1E90FF',
    'firebrick': 'B22222',
    'floralwhite': 'FFFAF0',
    'forestgreen': '228B22',
    'fuchsia': 'FF00FF',
    'gainsboro': 'DCDCDC',
    'ghostwhite': 'F8F8FF',
    'gold': 'FFD700',
    'goldenrod': 'DAA520',
    'gray': '808080',
    'green': '008000',
    'greenyellow': 'ADFF2F',
    'honeydew': 'F0FFF0',
    'hotpink': 'FF69B4',
    'indianred': 'CD5C5C',
    'indigo': '4B0082',
    'ivory': 'FFFFF0',
    'khaki': 'F0E68C',
    'lavender': 'E6E6FA',
    'lavenderblush': 'FFF0F5',
    'lawngreen': '7CFC00',
    'lemonchiffon': 'FFFACD',
    'lightblue': 'ADD8E6',
    'lightcoral': 'F08080',
    'lightcyan': 'E0FFFF',
    'lightgoldenrodyellow': 'FAFAD2',
    'lightgreen': '90EE90',
    'lightgrey': 'D3D3D3',
    'lightpink': 'FFB6C1',
    'lightsalmon': 'FFA07A',
    'lightseagreen': '20B2AA',
    'lightskyblue': '87CEFA',
    'lightslategray': '778899',
    'lightsteelblue': 'B0C4DE',
    'lightyellow': 'FFFFE0',
    'lime': '00FF00',
    'limegreen': '32CD32',
    'linen': 'FAF0E6',
    'magenta': 'FF00FF',
    'maroon': '800000',
    'mediumaquamarine': '66CDAA',
    'mediumblue': '0000CD',
    'mediumorchid': 'BA55D3',
    'mediumpurple': '9370D8',
    'mediumseagreen': '3CB371',
    'mediumslateblue': '7B68EE',
    'mediumspringgreen': '00FA9A',
    'mediumturquoise': '48D1CC',
    'mediumvioletred': 'C71585',
    'midnightblue': '191970',
    'mintcream': 'F5FFFA',
    'mistyrose': 'FFE4E1',
    'moccasin': 'FFE4B5',
    'navajowhite': 'FFDEAD',
    'navy': '000080',
    'oldlace': 'FDF5E6',
    'olive': '808000',
    'olivedrab': '6B8E23',
    'orange': 'FFA500',
    'orangered': 'FF4500',
    'orchid': 'DA70D6',
    'palegoldenrod': 'EEE8AA',
    'palegreen': '98FB98',
    'paleturquoise': 'AFEEEE',
    'palevioletred': 'D87093',
    'papayawhip': 'FFEFD5',
    'peachpuff': 'FFDAB9',
    'peru': 'CD853F',
    'pink': 'FFC0CB',
    'plum': 'DDA0DD',
    'powderblue': 'B0E0E6',
    'purple': '800080',
    'red': 'FF0000',
    'rosybrown': 'BC8F8F',
    'royalblue': '4169E1',
    'saddlebrown': '8B4513',
    'salmon': 'FA8072',
    'sandybrown': 'F4A460',
    'seagreen': '2E8B57',
    'seashell': 'FFF5EE',
    'sienna': 'A0522D',
    'silver': 'C0C0C0',
    'skyblue': '87CEEB',
    'slateblue': '6A5ACD',
    'slategray': '708090',
    'snow': 'FFFAFA',
    'springgreen': '00FF7F',
    'steelblue': '4682B4',
    'tan': 'D2B48C',
    'teal': '008080',
    'thistle': 'D8BFD8',
    'tomato': 'FF6347',
    'turquoise': '40E0D0',
    'violet': 'EE82EE',
    'wheat': 'F5DEB3',
    'white': 'FFFFFF',
    'whitesmoke': 'F5F5F5',
    'yellow': 'FFFF00',
    'yellowgreen': '9ACD32'
}
//
Color.TYPE = {
    'HEX': 'HEX',
    'HEX8': 'HEX8',
    'RGB': 'RGB',
    'RGBA': 'RGBA',
    'HSL': 'HSL',
    'HSLA': 'HSLA'
};

module.exports = Color;