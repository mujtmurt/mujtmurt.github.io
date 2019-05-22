<!DOCTYPE html>
<html lang="en">

<head>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="css/style.css">
  <!-- <link rel="stylesheet" href="css/styles.css"> -->
  <link href="https://fonts.iu.edu/style.css?family=BentonSans:regular,bold|BentonSansCond:regular|GeorgiaPro:regular" media="screen" rel="stylesheet" type="text/css" />

  <script src="https://code.jquery.com/jquery-3.4.0.min.js" charset="utf-8"></script>
  <!-- <script src="js/app.js"></script> -->

  <title>DUE Events</title>
</head>

<body>
  <?php
  /*
    * A new document is created to store the path to the xml code in the "$events" variable.
    * The link to the list of the IU events is then stored into the "$events" variable using the load() function.
    * We then create a variable called $event (singular) to store the array of events in the variable as it loops through the foreach loop.
  */
  $events = new DOMDocument(); // create the DOMDocument class.
  $events->load("https://uisapp2.iu.edu/ccl-prd/Xml.do?pubCalId=GRP19120&dayLimit=365"); // static location of the events.
  $event = array(); // storing event one by one in the $event variable.
  foreach ($events->getElementsByTagName('event') as $node) { // searches for all the elements with the given 'event' tag name in xml.
    $eventItem = array( // create a variable $eventItem to store event info by retrieving their nodevalue.
      'event-url' => $node->getElementsByTagName('event-url')->item(0)->nodeValue, // event url
      'summary' => $node->getElementsByTagName('summary')->item(0)->nodeValue, // event title
      'description' => char_limit($node->getElementsByTagName('description')->item(0)->nodeValue, 750), // event description
      'location' => $node->getElementsByTagName('location')->item(0)->nodeValue, // event location
      'startDate' => $node->getElementsByTagName('start-date-time')->item(0)->nodeValue, // event start date
      'endDate' => $node->getElementsByTagName('end-date-time')->item(0)->nodeValue // event end date
    );
    array_push($event, $eventItem); // pushing the variables at the end of the array.
  }

  function char_limit($text, $limit)
  { // this is the function for the number of events you would display
    $size = strlen($text);
    if ($size > $limit) {
      $short = substr($text, 0, $limit) . '...';
      return $short;
    }
    return $text;
  }
  $limit = 5; // change number of events to 5, 10, 15, 20 and so on...
  ?>

  <div id="fullPage">
    <img class="logo" src="img/iu_logo.png" alt="iu logo">
    <div class="section">
      <?php
      for ($x = 0; $x < $limit; $x++) {
        $summary = str_replace(' & ', ' &amp; ', $event[$x]['summary']);
        $summary = str_replace(" ' ", ' &apos; ', $event[$x]['summary']);
        $summary = str_replace(' < ', ' &lt; ', $event[$x]['summary']);
        $summary = str_replace(' > ', ' &gt; ', $event[$x]['summary']);
        $summary = str_replace(' " ', ' &quot; ', $event[$x]['summary']);
        $summary = strip_tags($summary);

        $eventURL = $event[$x]['event-url'];

        $description = $event[$x]['description'];
        $description = strip_tags($description);
        $description = substr($description, 0, 800);

        $location = $event[$x]['location'];

        $startParts = explode('-', $event[$x]['startDate']);
        $endParts = explode('-', $event[$x]['endDate']);

        $startDate = date('l, F j, Y', strtotime($startParts[1] . '-' . $startParts[0] . '-' . $startParts[2]));
        $endDate = date('l, F j, Y', strtotime($endParts[1] . '-' . $endParts[0] . '-' . $endParts[2]));

        $dayofmonth = date('d', strtotime($startDate));
        $month = date('M', strtotime($startDate));

        $startTime = strtotime($startParts[1] . '-' . $startParts[0] . '-' . $startParts[2]);
        $endTime = strtotime($endParts[1] . '-' . $endParts[0] . '-' . $endParts[2]);

        $startTimeFormat = date('g:i A', $startTime);
        $endTimeFormat = date('g:i A', $endTime);

        $difference = (($endTime - $startTime) / 3600);

        echo '<div class="event">';

        echo '<div class="event__time">';
        //echo '<span>' . $startDate  . '</span><br>'; // this format is just for reference. uncomment to see the full date format.
        echo '<p class="event__time__day-month">' . $dayofmonth  . '</p>';
        echo '<p class="event__time__month">' . $month  . '</p>';

        if ($difference == 24) {
          echo '<p class="event__time__allday"> ALL DAY </p>';
        } else {
          echo '<p class="event__time__start-end">' . $startTimeFormat . ' - ' . $endTimeFormat . '</p>';
        }
        echo '</div>';

        echo '<div class="event__info">';
        echo '<h2 class="event__info__header"> EVENTS </h2>';
        echo '<h3 class="event__info__title">' . $summary . '</h3>';
        echo '<p class="event__info__location">' . $location . '</p>';
        echo '<p class="event__info__description">' . $description . '</p>';
        echo '</div>';

        echo '</div>';
      }
      ?>
    </div>
  </div>
</body>

</html>