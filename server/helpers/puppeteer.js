const puppeteer = require( 'puppeteer' );

const LAUNCH_PUPPETEER_OPTS = {
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--window-size=1920x1080'
  ],
  headless: true
};

const PAGE_PUPPETEER_OPTS = {
  networkIdle2Timeout: 5000,
  waitUntil: 'networkidle2',
  timeout: 3000000
};

class PuppeteerHandler {

  async getPageContent ( url ) {

    try {
      const browser = await puppeteer.launch( LAUNCH_PUPPETEER_OPTS );
      const page = await browser.newPage();
      page.setDefaultTimeout( 0 );

      await page.goto( url, PAGE_PUPPETEER_OPTS );
      await page.waitForSelector( '#page-product' );

      const content = await page.evaluate( () => {
        return document.querySelector( '#page-product' ).innerHTML;
      } );

      await browser.close();

      return content;

    } catch ( err ) {
      throw err;
    }
  }

}

module.exports = PuppeteerHandler;