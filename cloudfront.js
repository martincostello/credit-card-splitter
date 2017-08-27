// Copyright (c) Martin Costello, 2017. All rights reserved.
// Licensed under the Apache 2.0 license. See the LICENSE file in the project root for full license information.

"use strict";

exports.handler = (event, context, callback) => {
  const response = event.Records[0].cf.response;
  const headers = response.headers;

  const values = [
    { key: "Content-Security-Policy", value: "default-src 'self' data: maxcdn.bootstrapcdn.com;script-src 'self' cdnjs.cloudflare.com maxcdn.bootstrapcdn.com www.google-analytics.com;style-src 'self' cdnjs.cloudflare.com fonts.googleapis.com maxcdn.bootstrapcdn.com;img-src 'self' data: stats.g.doubleclick.net www.google-analytics.com;font-src 'self' fonts.googleapis.com fonts.gstatic.com maxcdn.bootstrapcdn.com;connect-src 'self' www.google-analytics.com;media-src 'none';object-src 'none';child-src 'self';frame-ancestors 'none';form-action 'self';block-all-mixed-content;base-uri 'self';manifest-src 'self';upgrade-insecure-requests;report-uri https://martincostello.report-uri.io/r/default/csp/enforce;" },
    { key: "Expect-CT", value: "max-age=1800; report-uri https://martincostello.report-uri.io/r/default/ct/reportOnly" },
    { key: "Referrer-Policy", value: "no-referrer-when-downgrade" },
    { key: "Strict-Transport-Security", value: "max-age=31536000" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Download-Options", value: "noopen" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-XSS-Protection", value: "1; mode=block" }
  ];

  values.forEach((header) => {
    headers[header.key] = [header];
  });

  callback(null, response);
};
