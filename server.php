<?php
/*
 * An extremely simple REST server that provides basic CRUD operations on a CSV file.
 * (c) 2017 Radek Burget <burgetr@fit.vutbr.cz>
 * 
 * REST URL: server.php/<csv_file_name>/<record_id>
 * (csv_file_name is without the .csv suffix)
 * 
 * TODO: only GET and POST operations are implemented at the moment.
 */

//===========================================================================
// CSV file operations
//===========================================================================

/**
 * Loads all records from a CSV file.
 * @param String $filename
 * @return stdClass[]|NULL
 */
function loadAll($filename)
{
	$f = fopen($filename, "r");
	if ($f) 
	{
		$ret = array();
		while (($line = fgets($f)) !== false) 
		{
			$data = explode(',', trim($line));
			$person = new stdClass;
			$person->id = $data[0];
			$person->name = $data[1];
			$person->surname = $data[2];
			$person->city = $data[3];
			$ret[] = $person;
		}
		fclose($f);
		return $ret;
	} else {
		// error opening the file.
		return null;
	}
}

/**
 * Loads a single record from a CSV file.
 * @param String $filename
 * @param unknown $key
 * @return stdClass[]|NULL
 */
function loadRecord($filename, $key)
{
	$f = fopen($filename, "r");
	if ($f)
	{
		$ret = null;
		while (($line = fgets($f)) !== false)
		{
			$data = explode(',', trim($line));
			if ($data[0] == $key)
			{
				$person = new stdClass;
				$person->id = $data[0];
				$person->name = $data[1];
				$person->surname = $data[2];
				$person->city = $data[3];
				$ret = $person;
				break;
			}
		}
		fclose($f);
		return $ret;
	} else {
		// error opening the file.
		return null;
	}
}

/**
 * Adds a new record to the CSV file
 * @param unknown $filename
 * @param unknown $record
 * @return number|NULL
 */
function saveRecord($filename, $record)
{
	//determine the new record ID
	$all = loadAll($filename);
	if ($all)
		$lastId = $all[count($all) - 1]->id;
	else
		$lastId = 0;
	
	$lastId++;
	
	//add CSV data
	$data = array($lastId, $record['name'], $record['surname'], $record['city']);
	$f = fopen($filename, "a");
	if ($f)
	{
		fputs($f, implode(',', $data) . "\n");
		fclose($f);
		return $lastId;
	}
	else
		return null;
}

//===========================================================================
// REST server
//===========================================================================

//allow access from any client (public API)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: origin, x-csrftoken, content-type, accept');
		
//get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));

//retrieve the file name and key from the path
$table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$csv = $table . '.csv';
$key = array_shift($request)+0;

//create output data based on HTTP method
$data = null;
switch ($method) {
	case 'GET':
		if ($key)
			$data = loadRecord($csv, $key);
		else
			$data = loadAll($csv);
		break;
	case 'PUT':
		break;
	case 'POST':
		$input = json_decode(file_get_contents('php://input'), true);
		$data = saveRecord($csv, $input);
		break;
	case 'DELETE':
		break;
}

//die if the operation failed (probably not found)
if (!$data) {
	http_response_code(404);
	die();
}

//format the results in the appropriate format
if ($method == 'GET') 
{
	header('Content-Type: application/json');
	echo json_encode($data);
} 
elseif ($method == 'POST') 
{
	echo $data;
} 
else 
{
}
