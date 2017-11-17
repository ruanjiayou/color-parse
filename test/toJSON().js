var Color = require('../index.js');
var assert = require('assert');

describe('Color.toJSON()', function(){
    var o = new Color('#12345644');
    it('toJSON(RGB)', function(){
        let t = o.toJSON(Color.TYPE.RGB);
        assert.equal(t.R, 18);
        assert.equal(t.G, 52);
        assert.equal(t.B, 86);
    });
    it('toJSON(RGBA)', function(){
        let t = o.toJSON(Color.TYPE.RGBA);
        assert.equal(t.R, 18);
        assert.equal(t.G, 52);
        assert.equal(t.B, 86);
        assert.equal(t.A, 0.267);
    });
    it('toJSON(HSL)', function(){
        let t = o.toJSON(Color.TYPE.HSL);
        assert.equal(t.H, 210);
        assert.equal(t.S, 0.6538);
        assert.equal(t.L, 0.2039);
    });
    it('toJSON(HSLA)', function(){
        let t = o.toJSON(Color.TYPE.HSLA);
        assert.equal(t.H, 210);
        assert.equal(t.S, 0.6538);
        assert.equal(t.L, 0.2039);
        assert.equal(t.A, 0.267);
    });
});