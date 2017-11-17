var Color = require('../index.js');
var assert = require('assert');

describe('Color.toString()', function(){
    var o = new Color('#12345644');
    it('toString(RGB)', function(){
        assert.equal(o.toString(Color.TYPE.RGB), 'rgb(18, 52, 86)');
    });
    it('toString(RGBA)', function(){
        assert.equal(o.toString(Color.TYPE.RGBA), 'rgba(18, 52, 86, 0.267)');
    });
    it('toString(HSL)', function(){
        assert.equal(o.toString(Color.TYPE.HSL), 'hsl(210, 0.6538, 0.2039)');
    });
    it('toString(HSLA)', function(){
        assert.equal(o.toString(Color.TYPE.HSLA), 'hsla(210, 0.6538, 0.2039, 0.267)');
    });
});