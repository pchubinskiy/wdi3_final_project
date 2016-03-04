# Full stack project for week twelve of WDI.
URL: https://genrify.herokuapp.com/

**Explanations of the technologies used**

1. D3.js

+ Data-Driven Documents were used to create chart visualizations of last.fm API data

**A couple paragraphs about the general approach you took**

    + made directory locally
    + set up express in repo
    + made repo in github; created a remote for it in git
    + installed mongoose, express as dependencies
    + linked to jquery
    + linked javascript; wrote ajax api call
    + stored response to localStorage
    + accessed local storage and used it as input for D3 visualization
    +/ deployed to heroku; set up procfile; tested homepage
    
    +/ set up mongodb
    +/ designed models and confirmed that db queries work

**Installation instructions for any dependencies**
    

**Link to your user stories – who are your users, what do they want, and why?**

    Users: last.fm users or researchers

    They want: to see an updated visualization of last.fm chart trends

    Why: So they can compare the popularity of artists and genres on the platform

    As a user, I should be able to: 
        + visit the page and see last.fm data for artists with the most listeners and subscribers appear

        + click on a chart item and see that it is selected
            +/! be able to genrify the selected item through the action dropdown so that genres the artist has been tagged with appear below the chart
                +! click on one of the displayed genres and see a tooltip or popover with a description appear

        + see the artist's picture appear when I click on their name

**Link to your wireframes – sketches of major views / interfaces in your application**

    + ./wdi3_final_project.html

**Descriptions of any unsolved problems or major hurdles your team had to overcome**
    +! this app could be made mobile-responsive by running the d3 through window size conditionals and bootstrapping anything else
    +! what would be a good use for angular? related links, maybe to other APIs?
    +! Actions dropdown doesn't have working links
    +* Last.fm's API doesn't return any data for genre info (even for the example request in the documentation).
    +* get x-axis label to show

    +** for potential API holes or mashups: https://developer.musicgraph.com/api-docs/v2/artists


