"use strict";
function Complex(re, im) {
  this[0] = re;
  this[1] = im;
}

Complex.prototype = new Object();
Complex.prototype.toString = function() {
  return "("+this[0].toString()+", "+this[1].toString()+")";
}

Complex.prototype.conj = function() {
  return CMath.conj(this);
}
Complex.prototype.minus = function() {
  return CMath.minus(this);
}
Complex.prototype.plus = function(x) {
  return CMath.plus(this, x);
}
Complex.prototype.sub = function(x) {
  return CMath.sub(this, x);
}
Complex.prototype.mult = function(x) {
  return CMath.mult(this, x);
}
Complex.prototype.div = function(x) {
  return CMath.div(this, x);
}
Complex.prototype.abs = function() {
  return CMath.abs(this);
}
Complex.prototype.arg = function() {
  return CMath.arg(this);
}
Complex.prototype.re = function() {
  return CMath.re(this);
}
Complex.prototype.im = function() {
  return CMath.im(this);
}

/*
 * 極座標形式でComplexを生成
 */
function Polar(r, theta) {
  var re = r * Math.cos(theta);
  var im = r * Math.sin(theta);
  return new Complex(re, im);
}

var CMath = (function CMath() {
  function complexQ(x) {
    return (x instanceof 'Complex');
  }
  
  function conj(x) {
    return new Complex(x[0], -x[1]);
  }
  
  function minus(x) {
    return new Complex(-x[0], -x[1]);
  }
  
  function plus(x1, x2) {
    return new Complex(x1[0]+x2[0], x1[1]+x2[1]);
  }
  
  function sub(x1, x2) {
    return new Complex(x1[0]-x2[0], x1[1]-x2[1]);
  }
  
  function mult(x1, x2) {
    return new Complex(x1[0]*x2[0]-x1[1]*x2[1], x1[0]*x2[1]+x1[1]*x2[0]);
  }
  
  function div(x1, x2) {
    var a = x1[0];
    var b = x1[1];
    var c = x2[0];
    var d = x2[1];
    var denominator = c*c+d*d;
    return new Complex((a*c+b*d)/denominator, (b*c-a*d)/denominator);
  }
  
  function abs(x) {
    return Math.sqrt( (x[0]*x[0])+(x[1]*x[1]) );
  }
  
  function arg(x) {
    return  Math.atan2(x[1], x[0]);
  }
  
  function re(x) {
    return x[0];
  }
  
  function im(x) {
    return x[1];
  }
  
  /*
   * d間隔のグリッドに吸着
   */
  function round(x, d) {
    if(typeof d === 'undefined') {
      return new Complex(Math.round(x.re()), Math.round(x.im()));
    }
    return new Complex(Math.round(x.re()/d)*d, Math.round(x.im()/d)*d);
  }
  
  var I = new Complex(0, 1);

  // Export
  return {
    conj: conj,
    minus: minus,
    plus: plus,
    sub: sub,
    mult: mult,
    div: div,
    abs: abs,
    arg: arg,
    re: re,
    im: im,
    round: round,
    I: I
  }
}());
