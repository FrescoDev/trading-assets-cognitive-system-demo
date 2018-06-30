module.exports = (body, css) => (
  `
  <!doctype html>
  <html>
    <head>
      <meta name="description" content="db-wiz">
      <style>
        ${css}
      </style>
      <!-- Latest compiled and minified CSS -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    </head>
    <body>
      <div id='app'>${body}</div>
    </body>
    <script>
    $(document).on("focus keyup", "input.autocomplete", function() {
      // Cache useful selectors
      var $input = $(this);
      var $dropdown = $input.next("ul.dropdown-menu");
      
      // Create the no matches entry if it does not exists yet
      if (!$dropdown.data("containsNoMatchesEntry")) {
          $("input.autocomplete + ul.dropdown-menu").append('<li class="no-matches hidden"><a>No matches</a></li>');
          $dropdown.data("containsNoMatchesEntry", true);
      }
      
      // Show only matching values
      $dropdown.find("li:not(.no-matches)").each(function(key, li) {
          var $li = $(li);
          $li[new RegExp($input.val(), "i").exec($li.text()) ? "removeClass" : "addClass"]("hidden");
      });
      
      // Show a specific entry if we have no matches
      $dropdown.find("li.no-matches")[$dropdown.find("li:not(.no-matches):not(.hidden)").length > 0 ? "addClass" : "removeClass"]("hidden");
  });
  $(document).on("click", "input.autocomplete + ul.dropdown-menu li", function(e) {
      // Prevent any action on the window location
      e.preventDefault();
      
      // Cache useful selectors
      $li = $(this);
      $input = $li.parent("ul").prev("input");
      
      // Update input text with selected entry
      if (!$li.is(".no-matches")) {
          $input.val($li.text());
      }
  });
    </script>
  </html>
  `
);