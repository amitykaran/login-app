# login-app
This is an login/signUp authentication app

#body-parser
Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

#Passport.js
Passport is authentication middleware for Node.js. As it’s extremely flexible and modular, Passport can be unobtrusively dropped into any Express-based web application. A comprehensive set of strategies supports authentication using a username and password, Facebook, Twitter, and more.

#path
The path module provides utilities for working with file and directory paths. It can be accessed using: const path = require('path');

#cors
CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

#express-session
session(options)
Create a session middleware with the given options.

=> Note: Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.

=> Note: Since version 1.5.0, the cookie-parser middleware no longer needs to be used for this module to work. This module now directly reads and writes cookies on req/res. Using cookie-parser may result in issues if the secret is not the same between this module and cookie-parser.

=> Warning: The default server-side session storage, MemoryStore, is purposely not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.

#SessionOptions
options = {
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },
    genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  name: '',
  proxy: '',
  resave: '',
  rolling: '',
}

#SessionFunctions
1. Session.regenerate(callback)
To regenerate the session simply invoke the method. Once complete, a new SID and Session instance will be initialized at req.session and the callback will be invoked.

req.session.regenerate(function(err) {
  // will have a new session here
})
2. Session.destroy(callback)
Destroys the session and will unset the req.session property. Once complete, the callback will be invoked.

req.session.destroy(function(err) {
  // cannot access session here
})
3. Session.reload(callback)
Reloads the session data from the store and re-populates the req.session object. Once complete, the callback will be invoked.

req.session.reload(function(err) {
  // session updated
})
4. Session.save(callback)
Save the session back to the store, replacing the contents on the store with the contents in memory (though a store may do something else--consult the store's documentation for exact behavior).

This method is automatically called at the end of the HTTP response if the session data has been altered (though this behavior can be altered with various options in the middleware constructor). Because of this, typically this method does not need to be called.

There are some cases where it is useful to call this method, for example, redirects, long-lived requests or in WebSockets.

req.session.save(function(err) {
  // session saved
})
5. Session.touch()
Updates the .maxAge property. Typically this is not necessary to call, as the session middleware does this for you.

express-session accepts these properties in the options object.

cookie
Settings object for the session ID cookie. The default value is { path: '/', httpOnly: true, secure: false, maxAge: null }.

The following are options that can be set in this object.

cookie.domain
Specifies the value for the Domain Set-Cookie attribute. By default, no domain is set, and most clients will consider the cookie to apply to only the current domain.

cookie.expires
Specifies the Date object to be the value for the Expires Set-Cookie attribute. By default, no expiration is set, and most clients will consider this a "non-persistent cookie" and will delete it on a condition like exiting a web browser application.

Note If both expires and maxAge are set in the options, then the last one defined in the object is what is used.

Note The expires option should not be set directly; instead only use the maxAge option.

cookie.httpOnly
Specifies the boolean value for the HttpOnly Set-Cookie attribute. When truthy, the HttpOnly attribute is set, otherwise it is not. By default, the HttpOnly attribute is set.

Note be careful when setting this to true, as compliant clients will not allow client-side JavaScript to see the cookie in document.cookie.

cookie.maxAge
Specifies the number (in milliseconds) to use when calculating the Expires Set-Cookie attribute. This is done by taking the current server time and adding maxAge milliseconds to the value to calculate an Expires datetime. By default, no maximum age is set.

Note If both expires and maxAge are set in the options, then the last one defined in the object is what is used.

cookie.path
Specifies the value for the Path Set-Cookie. By default, this is set to '/', which is the root path of the domain.

cookie.sameSite
Specifies the boolean or string to be the value for the SameSite Set-Cookie attribute.

true will set the SameSite attribute to Strict for strict same site enforcement.
false will not set the SameSite attribute.
'lax' will set the SameSite attribute to Lax for lax same site enforcement.
'strict' will set the SameSite attribute to Strict for strict same site enforcement.
More information about the different enforcement levels can be found in the specification https://tools.ietf.org/html/draft-west-first-party-cookies-07#section-4.1.1

Note This is an attribute that has not yet been fully standardized, and may change in the future. This also means many clients may ignore this attribute until they understand it.

cookie.secure
Specifies the boolean value for the Secure Set-Cookie attribute. When truthy, the Secure attribute is set, otherwise it is not. By default, the Secure attribute is not set.

Note be careful when setting this to true, as compliant clients will not send the cookie back to the server in the future if the browser does not have an HTTPS connection.

Please note that secure: true is a recommended option. However, it requires an https-enabled website, i.e., HTTPS is necessary for secure cookies. If secure is set, and you access your site over HTTP, the cookie will not be set. If you have your node.js behind a proxy and are using secure: true, you need to set "trust proxy" in express: