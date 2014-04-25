/*jslint node: true*/

"use strict";


var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var path = require('path');
var config = require(path.join(__dirname, '../config/config'))['test'];


var port = process.env.PORT || 3001;
var url = 'http://localhost:' + port;

var app = require('../server');
app.set('port', port);
var server = app.listen(app.get('port'));


describe('Routing', function() {
  // This is before all, must be before each to perform the database drop.
  before(function(done) {
    done();
  });

  describe('User', function(){
    it('should register a valid email', function (done){
      var user = {
        email: 'yago.riveiro@gmail.com',
        password: 'soyuncalhau'
      };

      request(url).post('/signup').send(user).end(function(err, res) {
        if (err) {
          throw err;
        }

        res.should.have.status(302);
        res.text.should.equal('Moved Temporarily. Redirecting to /');
        done();
      });
    });

    it('should not register an invalid email', function (done){
      var user = {
        email: 'email invalido',
        password: 'just another password'
      };

      request(url).post('/signup').send(user).end(function(err, res) {
        if (err) {
          throw err;
        }

        res.should.have.status(302);
        res.text.should.equal('Moved Temporarily. Redirecting to /signup');
        done();
      });
    });

    it('should not register with empty password', function (done){
      var user = {
        email: 'yago.riveiro@gmail.com',
        password: ''
      };

      request(url).post('/signup').send(user).end(function(err, res) {
        if (err) {
          throw err;
        }

        res.should.have.status(302);
        res.text.should.equal('Moved Temporarily. Redirecting to /signup');
        done();
      });
    });

    it('should not register a already used email', function (done){
      var user = {
        email: 'yago.riveiro@gmail.com',
        password: 'soyuncalhau'
      };


      // BOTH Calls must use serial from async library.
      request(url).post('/signup').send(user).end(function(err, res) {
        if (err) {
          throw err;
        }

        res.should.have.status(302);
        res.text.should.equal('Moved Temporarily. Redirecting to /');
        done();
      });

      var same_email_user = {
        email: 'yago.riveiro@gmail.com',
        password: 'outrapass'
      };

      request(url).post('/signup').send(user).end(function(err, res) {
        if (err) {
          throw err;
        }

        res.should.have.status(302);
        res.text.should.equal('Moved Temporarily. Redirecting to /signup');
        done();
      });
    });
  });
});
