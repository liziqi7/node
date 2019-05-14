const originRequest = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
function request(url,callback) {
  const options = {
    url: url,
    encoding: null
  };
  originRequest(options, callback);
}
const url = 'https://www.dy2018.com/i/100723.html';
request(url, function(err, res, body) {
  const html = iconv.decode(body, 'gb2312');
  const $ = cheerio.load(html);
  console.log($('#Zoom').text());
});
