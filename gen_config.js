var fs = require('fs');
var envs = (envName, defaultValue = '') => {
  return envName in process.env
    ? JSON.stringify(process.env[envName])
    : JSON.stringify(defaultValue);
};

const outStr = `
{
  "log": {
    // "access": "/path/to/access/log/file",
    "error": "./error.log",
    "loglevel": "warning"
  },
  // List of inbound proxy configurations.
  "inbounds": [{
    "port": ${envs('PORT', 80)},
    "listen": "0.0.0.0",
    "protocol": "shadowsocks",
    "settings": {
      "method": ${envs('METHOD', 'aes-256-cfb')},
      "password": ${envs('PASSWORD', '0')}
    },
    "streamSettings": {
      "network":"ws"
    }
  }],
  // List of outbound proxy configurations.
  "outbounds": [{
    "protocol": "freedom",
    "settings": {}
  }]
}
`;

fs.writeSync(1, outStr);
fs.fsyncSync(1);
