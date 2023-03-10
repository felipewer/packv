# url-store

A simple service to compress and encode small text files into self contained urls.


## Roadmap


### UI

- Add title and short description section

- Add and style text input field

- Add content-type field (default to text/plain)

- Add link output field

- Add Copy (to clipboard) button

### API

- Return full link
  - Parameterize base url with ENV variable

- Add url section with code for implementation version
  - Extract implementation into own module, outside http handler

- Add url section with code for content-type
  - Return correct content type header based on url parameter

- Add unit tests for compression + encoding / decoding + decompression

- Add proper error handling

- Add input size check

- Add input content type check (If not in white-list assume text/plain)

- Add maxed out caching headers to GET response (Enable only in production, maybe use a middleware)

- Add QRCode output option

- Add auth protected post handler with user defined key that stores payload on upstash

### Ops

- [x] Attach short custom domain to service (packv.ws)