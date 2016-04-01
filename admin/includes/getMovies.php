<?php 
	ini_set('display_errors',1);
    error_reporting(E_ALL);
	include('connect.php');

	
	//fetching info from the db
	if(isset($_GET['srch'])) {

		$srch = $_GET['srch'];
		$movieQuery = "SELECT movies_title,movies_year FROM tbl_movies WHERE movies_title LIKE '$srch%' ORDER BY movies_title ASC";
		
		$getMovies = mysqli_query($link, $movieQuery);
	
	}else if (isset($_GET['filter'])) {
		
		$filter = $_GET['filter'];
        $filterQuery = "SELECT tbl_movies.movies_id, tbl_movies.movies_thumb, tbl_movies.movies_title, tbl_movies.movies_year FROM tbl_movies, tbl_cat, tbl_L_mc WHERE tbl_movies.movies_id = tbl_L_mc.movies_id AND tbl_cat.cat_id = tbl_L_mc.cat_id AND tbl_cat.cat_name = '{$filter}'";
        //echo $movieQuery;
        $getMovies = mysqli_query($link, $filterQuery);

	}

	else if(isset($_GET['id'])){
		$id = $_GET['id'];
		$querySingle = "SELECT movies_title,movies_fimg,movies_storyline FROM tbl_movies WHERE movies_id = {$id}";
		$getMovies = mysqli_query($link, $querySingle);
	}


	else{
		$movieQuery = "SELECT movies_id,movies_title,movies_thumb,movies_year FROM tbl_movies ORDER BY movies_title ASC";
		$getMovies = mysqli_query($link, $movieQuery);
	}





	

	$jsonResult='[';		
	while($movResult = mysqli_fetch_assoc($getMovies)){ //putting the variable of the query into fetching it rom mySQL
		//echo JSON
		$jsonResult .= json_encode($movResult).','; // .= taks on the stuff to the end //.',' seperates the different movies wrapped in JSON looping
	}

	$jsonResult .= ']'; //closes the bracket for the JSON to work
	$jsonResult = substr_replace($jsonResult, '', -2, 1); //$jsonResult = subtr_replace(string, replacement, start); // -2, 1 replace the first character secound one in eg.(Street"},])
	echo $jsonResult; //how to wrap up so that the php goes directly to a specific area where the javascript lies <div>


	//"SELECT movies_title, movies_year... is added so you can add additional information (needed for the next assignment) JSON is the information you get once you searh in the browser panel
	//search for 'JSONLint' to check the work to see if it is valid // watch out for the commas added in the end in JSON code ',' once searched and checked cause that could be whats breaking it (the last comma added in the code ect. (..Street"},]..)
	//JSON is a 'sting'

?>



