!function r(n,t,e){function u(i,f){if(!t[i]){if(!n[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(o)return o(i,!0);throw new Error("Cannot find module '"+i+"'")}var p=t[i]={exports:{}};n[i][0].call(p.exports,function(r){var t=n[i][1][r];return u(t?t:r)},p,p.exports,r,n,t,e)}return t[i].exports}for(var o="function"==typeof require&&require,i=0;i<e.length;i++)u(e[i]);return u}({1:[function(r,n,t){var e=r("./multiply");n.exports=function(r){return e(r,r)}},{"./multiply":2}],2:[function(r,n,t){n.exports=function(r,n){return r*n}},{}]},{},[1]);