// Copyright (c) Martin Costello, 2017. All rights reserved.
// Licensed under the Apache 2.0 license. See the LICENSE file in the project root for full license information.

"use strict";

exports.handler = (event, context, callback) => {
  const response = event.Records[0].cf.response;
  const headers = response.headers;

  const values = [
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
