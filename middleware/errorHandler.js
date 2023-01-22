const express = require('express');

 exports.promiseHandler = (fn) => 
  (req , res , next ) => {
  Promise.resolve(fn(req  , res , next)).catch(next)
}

