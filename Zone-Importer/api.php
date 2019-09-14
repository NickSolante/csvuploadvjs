<?php
 
try{
        $fp = fopen('./database/shit.js', 'w');
        fwrite($fp, 'var db_zones = shit.js');
        fclose($fp);
} catch (Exception $e) {
    die;
}

$db_host = 'db.int.openfreight.net';
$db_user = 'ofdev';
$db_pass = 'keu2AQu8thim1shieK1m';
$db_name = 'openfreight20';

$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);


$baseSQL = '';

$functionName = $_GET["q"];


if($functionName == "dl_zones"){


    $sql = "SELECT zone_id, zone_desc from dict_zone";

    $query = $mysqli->query($sql);
    if($query != false){
        $actor = $query->fetch_all(MYSQLI_ASSOC);
        $res = json_encode($actor, true);
        $fp = fopen('./database/db_zones.js', 'w');
        fwrite($fp, 'var db_zones = '.$res.';');
        fclose($fp);
        echo 'true';
    } else {
        echo 'false';
    }
}

if($functionName == "dl_location"){

    $sql = "SELECT location_id, location_postcode, location_town, location_state, location_country from locations where location_pobox = 0";

    $query = $mysqli->query($sql);
    if($query != false){
        $actor = $query->fetch_all(MYSQLI_ASSOC);
        $res = json_encode($actor, true);
        $fp = fopen('./database/database_locations.js', 'w');
        fwrite($fp, 'var db_locations = '.$res.';');
        fclose($fp);
        echo 'true';
    } else {
        echo 'false';
    }


}

if($functionName == "dl_hub"){

    $sql = "SELECT hub_id, hub_desc, uuid from dict_hub";
    $query = $mysqli->query($sql);
    if($query != false){
        $actor = $query->fetch_all(MYSQLI_ASSOC);
        $res = json_encode($actor, true);
        $fp = fopen('./database/database_hubs.js', 'w');
        fwrite($fp, 'var db_hubs = '.$res.';');
        fclose($fp);
        echo 'true';
    } else {
        echo 'false';
    }
}




// $query = $mysqli->query($sql);
// if($query != false){
//     $actor = $query->fetch_assoc();
//     echo json_encode($actor);
// } else {
//     echo json_encode('false');
// }








?>
