# url-store

A compressed key value store for **small** textual content. Post content to have it compressed and encoded into a url. Access the url to retrieve the original value.


## Roadmap


### UI

- [x] Add title and short description section

- [x] Add text input field

- [x] Add content-type field (default to text/plain)

- [x] Add link output field

- [x] Add Copy (to clipboard) button

### API

- [x] Return full link
  - Extract basePath from request url

- [x] Add url section with code for implementation version
  - Extract implementation into own module, outside http handler

- [x] Add url section with code for content-type
  - Return correct content type header based on url parameter

- [x] Add input content type check (If not in white-list assume text/plain)

- Add unit tests for compression + encoding / decoding + decompression

- Add proper error handling

- Add input size check

- Add maxed out caching headers to GET response (Enable only in production, maybe use a middleware)

- Add QRCode output option

- Add auth protected post handler with user defined key that stores payload on upstash

### Ops

- [x] Attach short custom domain to service (packv.ws)