/**
 * Module dependencies.
 */
var passport = require('passport-strategy');
var util = require('util');


/**
 * `Strategy` constructor.
 *
 * The local authentication strategy authenticates requests based on the contents of
 * a HTTP Bearer authorization header, body parameter or query parameter.
 *
 * Applications must supply a `verify` callback which accepts `token`
 * and then calls the `done` callback
 *
 *      done(error, user, info);
 *
 * supplying a `user` which should be set to `false` if the token is not valid.
 * If an exception occurred, `error` should be set.
 * An additional `info` can be supplied to indicate the reason for the failure or data for success e.g. `scope`.
 * An optional argument will be passed to `authenticate` callback.
 *
 *
 * Optionally, `options` can be used to pass additional info to the constructor.
 *
 * Options:
 *   - `passReqToCallback` (default: `false`) when `true`, `request` is the first argument to the verify callback
 *
 * @constructor
 * @param {Object} [options]
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
    if ('function' === typeof options) {
        verify = options;
        options = {};
    }

    if (!verify) {
        throw new TypeError('HTTPBearerStrategy requires a verify callback');
    }

    passport.Strategy.call(this);

    this.name = 'bearer';
    this._verify = verify;
    this._passReqToCallback = options.passReqToCallback;
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request based on the contents of a HTTP Bearer authorization header, body parameter or query parameter.
 *
 * @param {Object}  request
 * @param {Object}  options - Strategy options
 * @param {Boolean} options.session - When `true`, session is saved. Typically not required for Bearer token requests.
 * @param {String}  options.badHeaderMessage - Message displayed when Authorization header format is incorrect.
 * @param {String}  options.missingTokenMessage - Message displayed when token is not present.
 * @api protected
 */
Strategy.prototype.authenticate = function (request, options) {
    var token = null;

    options.session = options.session || false;

    if (request.headers && request.headers.authorization) {
        var parts = request.headers.authorization.split(' ');

        if (2 === parts.length) {
            var scheme = parts[0];
            var credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return this.fail({message: options.badHeaderMessage || 'Incorrect Authorization header format!'}, 400);
        }
    }

    if (!token && request.body && request.body.access_token) {
        token = request.body.access_token;
    }

    if (!token && request.query && request.query.access_token) {
        token = request.query.access_token;
    }

    if (!token) {
        return this.fail({message: options.missingTokenMessage || 'Bearer token is missing!'}, 400);
    }

    var self = this;

    function verified(err, user, info) {
        if (err) {
            return self.error(err);
        }

        if (!user) {
            return self.fail(info);
        }

        self.success(user, info);
    }

    if (self._passReqToCallback) {
        this._verify(request, token, verified);
    } else {
        this._verify(token, verified);
    }
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
