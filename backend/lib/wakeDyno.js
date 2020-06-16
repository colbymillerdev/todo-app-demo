const fetch = require('node-fetch');

const wakeDyno = (url, interval = 29) => {
  const milliseconds = interval * 60000;
  setTimeout(() => {
    fetch(url)
      .then(() => console.log('Successfully woke the dyno'))
      .catch(() => console.log('Error attempting to wake the dyno'))
      .finally(() => wakeDyno(url, interval));
  }, milliseconds);
};

const wakeDynos = (urls, interval = 29) => {
  const milliseconds = interval * 60000;
  setTimeout(() => {
    if (!Array.isArray(urls)) return;

    const promises = urls.map((url) => fetch(url));
    Promise.all(promises)
      .then(() => console.log('Successfully woke all dynos'))
      .catch(() => console.log('Error attempting to wake the dynos'))
      .finally(() => wakeDynos(urls, interval));
  }, milliseconds);
};

module.exports = { wakeDyno, wakeDynos };
