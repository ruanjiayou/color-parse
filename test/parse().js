var Color = require('../index.js');
var assert = require('assert');

describe('parse()', function () {
    it('parse("#123456")', function () {
        let o = new Color().parse('#123456')
        assert.equal(o.R, 18);
        assert.equal(o.G, 52);
        assert.equal(o.B, 86);
        assert.equal(o.A, 1);
    });
    it('parse("#123456")', function () {
        let o = new Color().parse('#123456')
        assert.equal(o.R, 18);
        assert.equal(o.G, 52);
        assert.equal(o.B, 86);
        assert.equal(o.A, 1);
    });
    it('parse("#12345644")', function () {
        let o = new Color().parse('#12345644');
        assert.equal(o.R, 18);
        assert.equal(o.G, 52);
        assert.equal(o.B, 86);
        assert.equal(o.A, 0.267);
    });
    it('parse("rgb(18,52,86)")', function () {
        let o = new Color().parse('rgb(18,52,86)');
        assert.equal(o.R, 18);
        assert.equal(o.G, 52);
        assert.equal(o.B, 86);
        assert.equal(o.A, 1);
    });
    it('parse("rgb(50%,50%,50%)")', function () {
        let o = new Color().parse('rgb(50%,50%,50%)')
        assert.equal(o.R, 128);
        assert.equal(o.G, 128);
        assert.equal(o.B, 128);
        assert.equal(o.A, 1);
    });
    it('parse("rgba(50%,50%,50%,50%)")', function () {
        let o = new Color().parse('rgba(50%,50%,50%,50%)')
        assert.equal(o.R, 128);
        assert.equal(o.G, 128);
        assert.equal(o.B, 128);
        assert.equal(o.A, 0.5);
    });
    it('parse("hsl(180, 50%, 0.5)")', function () {
        let o = new Color().parse('hsl(180,0.5,0.5)')
        assert.equal(o.R, 64);
        assert.equal(o.G, 191);
        assert.equal(o.B, 191);
        assert.equal(o.A, 1);
    });
    it('parse("hsla(180,50%,0.5,0.5)")', function () {
        let o = new Color().parse('hsla(180,50%,0.5,0.5)');
        assert.equal(o.R, 64);
        assert.equal(o.G, 191);
        assert.equal(o.B, 191);
        assert.equal(o.A, 0.5);
    });
    it('parse({ R: 18, G: "52%", B: 86, A: 0.5})', function () {
        let o = new Color().parse({ R: 18, G: '52%', B: 86, A: 0.5 })
        assert.equal(o.R, 18);
        assert.equal(o.G, 133);
        assert.equal(o.B, 86);
        assert.equal(o.A, 0.5);
    });
    it('parse({ H: 180, S: 50%, L: 0.50})', function () {
        let o = new Color().parse({ H: 180, S: '50%', L: 0.5 });
        assert.equal(o.R, 64);
        assert.equal(o.G, 191);
        assert.equal(o.B, 191);
        assert.equal(o.A, 1);
    });

});