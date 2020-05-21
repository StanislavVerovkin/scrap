const puppeteer = require( 'puppeteer' );

const LAUNCH_PUPPETEER_OPTS = {
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--window-size=1920x1080'
  ]
};

const PAGE_PUPPETEER_OPTS = {
  networkIdle2Timeout: 5000,
  waitUntil: 'networkidle2',
  timeout: 3000000
};

class PuppeteerHandler {

  constructor () {
    this.browser = null;
  }

  async initBrowser () {
    this.browser = await puppeteer.launch( LAUNCH_PUPPETEER_OPTS );
  }

  closeBrowser () {
    this.browser.close();
  }

  async getPageContent ( url ) {

    if ( !this.browser ) {
      await this.initBrowser();
    }

    try {
      const browser = await puppeteer.launch( LAUNCH_PUPPETEER_OPTS );
      const page = await browser.newPage();
      page.setDefaultTimeout( 0 );

      await page.goto( url, PAGE_PUPPETEER_OPTS );
      await page.waitForSelector( '#page-product' );

      return await page.evaluate( () => {
        return document.querySelector( '#page-product' ).innerHTML;
      } );

    } catch ( err ) {
      throw err;
    }
  }

}

module.exports = PuppeteerHandler;