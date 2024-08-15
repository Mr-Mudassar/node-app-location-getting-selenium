// Requiring modules
const express = require('express');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Creating express object
const app = express();

app.get('/facebook', async (req, res) => {
  let driver;

  try {
    let chromeOptions = new chrome.Options();
    chromeOptions.setUserPreferences({ "profile.default_content_setting_values.geolocation": 1 });

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();

    await driver.manage().setTimeouts({ pageLoad: 60000 });

    await driver.get('https://finallisting.freewebhostmost.com/');

    console.log('Page loaded successfully. You can now interact with the page.');

    res.send('Selenium script executed successfully.');

  } catch (error) {
    console.error('An error occurred while executing the Selenium script:', error);
    res.status(500).send('Error executing the Selenium script.');
  }
});

// Handling GET request
app.get('/', (req, res) => { 
  res.send('App is runnig');
  res.end(); 
});

// Port Number
const PORT = process.env.PORT || 4599;

// Server Setup
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
