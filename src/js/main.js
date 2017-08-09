smoothScroll.init({
    // Speed & Easing
    speed: 500, // Integer. How fast to complete the scroll in milliseconds
    //offset: function(){ return window.innerHeight * 0.2 + 20;}, // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
    easing: 'easeInOutCubic', // Easing pattern to use

    // Callback API
    before: function (anchor, toggle) {}, // Function to run before scrolling starts
    after: function (anchor, toggle) {} // Function to run after scrolling completes
    });
