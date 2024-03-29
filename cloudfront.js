// Copyright (c) Martin Costello, 2017. All rights reserved.
// Licensed under the Apache 2.0 license. See the LICENSE file in the project root for full license information.

exports.handler = (event, _, callback) => {
  const response = event.Records[0].cf.response;
  const headers = response.headers;

  const values = [
    { key: "Content-Security-Policy", value: "default-src 'self' data: maxcdn.bootstrapcdn.com;script-src 'self' cdnjs.cloudflare.com stackpath.bootstrapcdn.com storage.googleapis.com www.google-analytics.com www.googletagmanager.com;style-src 'self' cdnjs.cloudflare.com fonts.googleapis.com stackpath.bootstrapcdn.com use.fontawesome.com;img-src 'self' data: stats.g.doubleclick.net www.google-analytics.com;font-src 'self' fonts.googleapis.com fonts.gstatic.com stackpath.bootstrapcdn.com use.fontawesome.com;connect-src 'self' www.google-analytics.com;media-src 'none';object-src 'none';child-src 'self';frame-ancestors 'none';form-action 'self';block-all-mixed-content;base-uri 'self';manifest-src 'self';upgrade-insecure-requests;" },
    { key: "Expect-CT", value: "max-age=1800; report-uri https://martincostello.report-uri.io/r/default/ct/reportOnly" },
    { key: "Feature-Policy", value: "accelerometer 'none'; camera 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; payment 'none'; usb 'none'" },
    { key: "Referrer-Policy", value: "no-referrer-when-downgrade" },
    { key: "Strict-Transport-Security", value: "max-age=31536000" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Download-Options", value: "noopen" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-UA-Compatible", value: "IE=edge" },
    { key: "X-XSS-Protection", value: "1; mode=block" }
  ];

  values.forEach((header) => {
    headers[header.key] = [header];
  });

  callback(null, response);
};
