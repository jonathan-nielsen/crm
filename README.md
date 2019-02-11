# CRM

## Requirements

### Brew

#### Redis

```
brew install redis
```

Set password for redis by opening the config file and scrolling down to "SECURITY" and replacing the line `# requirepass foobared` with `requirepass placeholder-password` (remove the `#`).

```
vi /usr/local/etc/redis.conf
```

Now start the server

```
ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```

[Source](https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298)

#### Mongodb

```
brew install mongodb
mkdir -p /data/db
brew services start mongodb
```

[Source](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
