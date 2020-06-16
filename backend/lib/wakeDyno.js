const fetch = require('node-fetch');

const defaultOptions = { interval: 29, logging: true };

const wakeDyno = (url, options = defaultOptions) => {
  const { interval, logging } = options;
  const milliseconds = interval * 60000;

  setTimeout(() => {
    fetch(url)
      .then(() => logging && console.log('Successfully woke the dyno'))
      .catch(() => logging && console.log('Error attempting to wake the dyno'))
      .finally(() => wakeDyno(url, options));
  }, milliseconds);
};

const wakeDynos = (urls, options = defaultOptions) => {
  const { interval, logging } = options;
  const milliseconds = interval * 1;

  setTimeout(() => {
    if (!Array.isArray(urls)) return;

    const promises = urls.map((url) => fetch(url));
    Promise.all(promises)
      .then(() => logging && console.log('Successfully woke all dynos'))
      .catch(() => logging && console.log('Error attempting to wake the dynos'))
      .finally(() => wakeDynos(urls, options));
  }, milliseconds);
};

module.exports = { wakeDyno, wakeDynos };
