<h1 align="center">Welcome to falsete 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/simonwjackson/falsete#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/simonwjackson/falsete/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/simonwjackson/falsete/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/simonwjackson/falsete" />
  </a>
  <a href="https://twitter.com/simonwjackson" target="_blank">
    <img alt="Twitter: simonwjackson" src="https://img.shields.io/twitter/follow/simonwjackson.svg?style=social" />
  </a>
</p>

> A cloud music player

### 🏠 [Homepage](https://github.com/simonwjackson/falsete#readme)

## Install

```sh
npm install
```

## Usage

### Docker

```sh
docker run \
  --tty # Important \
  -p 8080:80 \
  simonwjackson/falsete:latest
```

Then visit [http://localhost:8080]()

### Docker Compose

**docker-compose.yml**
```yaml
version: '3.3'
services:
  falsete:
    image: 'simonwjackson/falsete:latest'
    ports:
      - '8080:80'
```

```bash
docker-compose up
```

Then visit [http://localhost:8080]()

## Author

👤 **Simon W. Jackson**

* Website: http://simonwjackson.io
* Twitter: [@simonwjackson](https://twitter.com/simonwjackson)
* Github: [@simonwjackson](https://github.com/simonwjackson)
* LinkedIn: [@simonwjackson](https://linkedin.com/in/simonwjackson)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/simonwjackson/falsete/issues). You can also take a look at the [contributing guide](https://github.com/simonwjackson/falsete/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/simonwjackson">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## 📝 License

Copyright © 2020 [Simon W. Jackson](https://github.com/simonwjackson).<br />
This project is [MIT](https://github.com/simonwjackson/falsete/blob/master/LICENSE) licensed.
