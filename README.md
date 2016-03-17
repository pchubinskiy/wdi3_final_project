# Full-stack project for week twelve of WDI.
URL: https://lastichecked.herokuapp.com/

**Explanations of the technologies used**

Bootstrap

+ Used for fixed-navbar layout

Last.fm API

+ Used to get info for top artists (most subscribed) and top five genres an artist is tagged with

localStorage

+ Used to store results from Last.fm API

D3.js

+ Data-Driven Documents were used to create chart visualizations of last.fm API data


**A couple paragraphs about the general approach you took**

     made directory locally
     set up express in repo
     made repo in github; created a remote for it in git
     installed express
     linked to jquery
     linked javascript; wrote ajax api call
     stored response in localStorage
     used local storage info as input for D3 visualization
     deployed to heroku; set up procfile; tested homepage
     finalized d3 visualization
     created and finished "about" and "contact" pages
     wrote another ajax call to make artist image and genre info display on bar click

**Installation instructions for any dependencies**

    N/A    

**Link to your user stories – who are your users, what do they want, and why?**

    Users: last.fm users or researchers

    They want: to see an updated visualization of last.fm chart trends

    Why: So they can compare the popularity of artists and genres on the platform

    As a user, I should be able to: 
         visit the page and see last.fm data for artists with the most listeners and subscribers appear

         click on a chart item and see that it is selected
            /! be able to genrify the selected item through the action dropdown so that genres the artist has been tagged with appear below the chart
                ! click on one of the displayed genres and see a tooltip or popover with a description appear

         see the artist's picture and genre info appear when I click on their name

**Link to your wireframes – sketches of major views / interfaces in your application**

     ./wdi3_final_project.html

**Descriptions of any unsolved problems or major hurdles your team had to overcome**

    * used node request library so that AJAX calls are in middleware and API key is hidden (Sean's suggestion).
    * this app could be made mobile-responsive by running the d3 through window size conditionals and bootstrapping anything else: http://eyeseast.github.io/visible-data/2013/08/28/responsive-charts-with-d3/
    * what would be a good use for angular? related links, maybe to other APIs?
    * Actions dropdown doesn't have working links
    ! Last.fm's API doesn't return any data for genre info (even for the example request in the documentation).
    ! main.js:68 -- can I specify which object keys and array indexes are requested? (before return)

    ** for Last.fm tag.getIngo (genre) API hole or potential API mashups: https://developer.musicgraph.com/api-docs/v2/artists


