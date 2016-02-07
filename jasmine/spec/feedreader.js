/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed in the allFeeds object and
         * ensures it has a URL defined and that the URL is not empty.
         */
        it('have URLs', function() {
          allFeeds.forEach( function(feed) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).toBeGreaterThan(0);
          });
        });


        /* Loops through each feed in the allFeeds object and
         * ensures it has a name defined and that the name is not empty.
         */
        it('have names', function() {
          allFeeds.forEach( function(feed) {
            expect(feed.name).toBeDefined();
            expect(feed.name.length).toBeGreaterThan(0);
          });
        });
    });

    describe('The menu', function() {
        /* Ensures the menu element is hidden by default.
         * Menu is hidden when the body element has the class 'menu-hidden'
         */
        it('is hidden on load', function() {
          expect( $('body').hasClass('menu-hidden') ).toBe(true);
        });

         /* Ensures the menu changes visibility when the menu
          * icon is clicked. This test should have two expectations:
          * does the menu display when clicked and does it hide
          * when clicked again.
          */
        it('displays when menu icon is clicked', function() {

          // Click on icon -> Displays menu
          $('.menu-icon-link').click();
          expect( $('body').hasClass('menu-hidden') ).toBe(false);

          //Click on icon 2nd time -> Hides menu
          $('.menu-icon-link').click();
          expect( $('body').hasClass('menu-hidden') ).toBe(true);
        });
    });

    describe('Initial Entries', function() {
      /* Ensures when the loadFeed function is called and completes
       * its work, there is at least a single .entry element within
       * the .feed container.
       */

      //Loads a feed before the test runs
      beforeEach( function( done ) {
        loadFeed(0, done);
      });

      it('have at least one entry on load', function() {
        expect( $('.entry').length ).toBeGreaterThan(0);
      });
    });

    describe('New Feed Selection', function() {
      /* Ensures when a new feed is loaded by the loadFeed function
       * that the content actually changes.
       */
      var initialFeed, newFeed = '';

      // Load feed from index 0 before test
      beforeEach( function(done) {
        loadFeed(0, function() {
          // Saves HTML to compare in test
          initialFeed = $('.feed').html();
          done();
        });
      });

      it('updates content when new feed is loaded', function(done) {

        // Loads new feed
        loadFeed(1, function() {
          // Once loaded, save new content
          newFeed = $('.feed').html();

          // Compare new to initial
          expect(newFeed).not.toEqual(initialFeed);
          done();
        });
      });
    });

}());
