const NodeCache = require("node-cache");
const configCache = new NodeCache();
const fs = require("fs");

var readConfig = function () {
  var config = configCache.get("config");
  if (config == undefined) {
    configCache.set("config", JSON.parse(fs.readFileSync("config.json")));
    config = configCache.get("config");
  }
  return config;
};

var navbarUpdate = function () {
  configCache.set("config", JSON.parse(fs.readFileSync("config.json")));
  config = configCache.get("config");
  var html = "";
  for (sayfa in config.sayfalar) {
    html += `<a class="nav-item nav-link text-light" href="/${sayfa}">${config.sayfalar[sayfa].baslik}</a>\n`;
  }
  fs.writeFile("views/includes/pages.ejs", html, function (err) {
    if (err) return console.log(err);
    updateConfig();
  });
};

var updateConfig = function () {
  var data = fs.readFileSync("config.json", "utf8");
  configCache.set("config", data);
};

var setConfig = function (config) {
  fs.writeFileSync("config.json", JSON.stringify(config));
  configCache.set("config", config);
};

module.exports = {
  readConfig: readConfig,
  updateConfig: updateConfig,
  setConfig: setConfig,
  navbarUpdate: navbarUpdate,
};
