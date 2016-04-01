<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Welcome to the Finest Selection of Blu-rays on the internets!</title>
	<link href="css/foundation.css" rel="stylesheet" type="text/css">
	<link href="css/normalize.css" rel="stylesheet" type="text/css">
    <link href="css/main.css" rel="stylesheet" type="text/css" media="screen">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:700,300' rel='stylesheet' type='text/css'>
</head>

<body>

<?php include('includes/nav.html'); ?> <br><br>
    
    <div class="row">
    	<div class="large-4 large-push-8 medium-4 medium-push-8 small-12 columns" id="livesrch"></div><!--The empty <div> like the one shown in facebook that fills with the data from php and JSON-->
    </div>

    <div class="row">
	    <div class="large-12 medium-12 small-12 columns details"></div>
	</div>
    
 	<div class="row">
   		<div class="large-12 medium-12 small-12 columns">
        <div class="movies"></div> <!--empty container to be filled with movie filter-->
    </div> 
 </div>

    
<?php include('includes/footer.html'); ?>



<script src="js/utility.js"></script>
<script src="js/foundation.js"></script>
<script src="js/vendor/jquery.js"></script>
<script src="js/vendor/modenizr.js"></script>

</body>
</html>

<?php /*include('includes/nav.html'); ?>
	<div class="details"></div>
	<div class="movies"></div>
<?php include('includes/footer.html');*/ ?>


<script src="js/utility.js"></script>

</body>
</html>