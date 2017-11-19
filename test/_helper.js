var Color = require('../index.js');
var assert = require('assert');

describe('Color._limit()', function(){
    var o = new Color();
    // null/undefined
    it('_limit(null)', function(){
        assert.equal(o._limit(null), 1);
    });
    it('_limit(undefined)', function(){
        assert.equal(o._limit(undefined), 1);
    });
    // string%/number max = 1 -1/0/0.55/1/2
    it('_limit("-1")', function(){
        assert.equal(o._limit('-1'), 0);
    });
    it('_limit("0")', function(){
        assert.equal(o._limit('0'), 0);
    });
    it('_limit("0.55")', function(){
        assert.equal(o._limit('0.55'), 0.55);
    });
    it('_limit("1")', function(){
        assert.equal(o._limit('1'), 1);
    });
    it('_limit("2")', function(){
        assert.equal(o._limit('2'), 1);
    });
    it('_limit("-1%")', function(){
        assert.equal(o._limit('-1%'), 0);
    });
    it('_limit("0%")', function(){
        assert.equal(o._limit('0%'), 0);
    });
    it('_limit("0.55%")', function(){
        assert.equal(o._limit('0.55%'), 0);
    });
    it('_limit("1%")', function(){
        assert.equal(o._limit('1%'), 0.01);
    });
    it('_limit("2%")', function(){
        assert.equal(o._limit('2%'), 0.02);
    });
    it('_limit("100%")', function(){
        assert.equal(o._limit('100%'), 1);
    });
    it('_limit("101%")', function(){
        assert.equal(o._limit('101%'), 1);
    });
    it('_limit(-1)', function(){
        assert.equal(o._limit(-1), 0);
    });
    it('_limit(0)', function(){
        assert.equal(o._limit(0), 0);
    });
    it('_limit(0.55)', function(){
        assert.equal(o._limit(0.55), 0.55);
    });
    it('_limit(1)', function(){
        assert.equal(o._limit(1), 1);
    });
    it('_limit(2)', function(){
        assert.equal(o._limit(2), 1);
    });
    // string % number max= 100 null/undefined/-1/0/1.23/100/101
    it('_limit("-1", 100)', function(){
        assert.equal(o._limit('-1', 100), 0);
    });
    it('_limit("0", 100)', function(){
        assert.equal(o._limit('0', 100), 0);
    });
    it('_limit("0.55", 100)', function(){
        assert.equal(o._limit('0.55', 100), 1);
    });
    it('_limit("1", 100)', function(){
        assert.equal(o._limit('1', 100), 1);
    });
    it('_limit("2", 100)', function(){
        assert.equal(o._limit('2', 100), 2);
    });
    it('_limit("-1%", 100)', function(){
        assert.equal(o._limit('-1%', 100), 0);
    });
    it('_limit("0%", 100)', function(){
        assert.equal(o._limit('0%', 100), 0);
    });
    it('_limit("0.55%", 100)', function(){
        assert.equal(o._limit('0.55%', 100), 1);
    });
    it('_limit("1%", 100)', function(){
        assert.equal(o._limit('1%', 100), 1);
    });
    it('_limit("2%", 100)', function(){
        assert.equal(o._limit('2%', 100), 2);
    });
    it('_limit("100%", 100)', function(){
        assert.equal(o._limit('100%', 100), 100);
    });
    it('_limit("101%", 100)', function(){
        assert.equal(o._limit('101%', 100), 100);
    });
    it('_limit(-1, 100)', function(){
        assert.equal(o._limit(-1, 100), 0);
    });
    it('_limit(0, 100)', function(){
        assert.equal(o._limit(0, 100), 0);
    });
    it('_limit(0.55, 100)', function(){
        assert.equal(o._limit(0.55, 100), 1);
    });
    it('_limit(1, 100)', function(){
        assert.equal(o._limit(1, 100), 1);
    });
    it('_limit(2, 100)', function(){
        assert.equal(o._limit(2, 100), 2);
    });
});

describe('Color._2hex_str() [0,255]-->["00","ff"]', function(){
    var o = new Color();
    it('_2hex_str(null)', function(){
        assert.equal(o._2hex_str(null), "00");
    });
    it('_2hex_str(undefined)', function(){
        assert.equal(o._2hex_str(undefined), "00");
    });
    it('_2hex_str("a")', function(){
        assert.equal(o._2hex_str('a'), "00");
    });
    it('_2hex_str(-1)', function(){
        assert.equal(o._2hex_str(-1), "00");
    });
    it('_2hex_str("-1")', function(){
        assert.equal(o._2hex_str('-1'), "00");
    });
    it('_2hex_str(0)', function(){
        assert.equal(o._2hex_str(0), "00");
    });
    it('_2hex_str("0")', function(){
        assert.equal(o._2hex_str('0'), "00");
    });
    it('_2hex_str(1)', function(){
        assert.equal(o._2hex_str(1), "01");
    });
    it('_2hex_str("1")', function(){
        assert.equal(o._2hex_str('1'), "01");
    });
    it('_2hex_str(21)', function(){
        assert.equal(o._2hex_str(21), "15");
    });
    it('_2hex_str("21")', function(){
        assert.equal(o._2hex_str('21'), "15");
    });
    it('_2hex_str(256)', function(){
        assert.equal(o._2hex_str(256), "FF");
    });
    it('_2hex_str("256)', function(){
        assert.equal(o._2hex_str('256'), "FF");
    });
});

describe('Color._hsl2rgb()', function(){
    var o = new Color();
    it('_hsl2rgb({ H: 223, S: 0.5385, L: 0.4333 })', function(){
        let t = o._hsl2rgb({ H: 223, S: 0.5385, L: 0.4333 });
        assert.equal(t.R, 51);
        assert.equal(t.G, 85);
        assert.equal(t.B, 170);
    });
});
//TODO:
describe('Color._2rgb()', function(){
    var o = new Color();
    it('_2rgb()', function(){
        o.R = 12;
        o.G = 34;
        o.B = 45;
    })
});
//TODO:
describe('Color._2rgba()', function(){
    var o = new Color();
    it('_2rgba()', function(){

    })
});
//TODO:
describe('Color._2hex6()', function(){
    var o = new Color();
    it('_2hex6()', function(){

    })
});
//TODO:
describe('Color._2hex8()', function(){
    var o = new Color();
    it('_limit()', function(){

    })
});
//TODO:
describe('Color._2hsl()', function(){
    var o = new Color({ R: 51, G: 85, B: 170 });
    it('_2hsl()', function(){
        let t = o._2hsl();
        assert.equal(t.H, 223);
        assert.equal(t.S, 0.5385);
        assert.equal(t.L, 0.4333);
    });
});