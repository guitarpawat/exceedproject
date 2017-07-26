<?php
error_reporting(0);
header('Access-Control-Allow-Origin: *');
if($_GET['set'] != NULL) {
  $val = explode(',',$_GET['set']);
  $key = './'.$val[0];
  $value = strval($val[1]);
  if($key == './index.php' || $key == NULL || $value == NULL) {
    echo 'Rejected';
    exit();
  }
  if(file_exists($key)) {
    $file = fopen( $key, "r" );
    $filesize = filesize( $key );
    $filetext = fread( $file, $filesize );
    fclose( $file );
    if($filetext != $value) {
      $file = fopen( $key, "w" );
      fwrite($file, $value);
      fclose($fp);
    }
    else {
      echo 'SAME';
      exit();
    }
  }
  else {
    $file = fopen( $key, "w" );
    fwrite($file, $value);
    fclose($fp);
  }
  echo 'OK';
}
if($_GET['get'] != NULL) {
  $key = './'.$_GET['get'];
  if($key == './index.php') {
    echo 'Rejected';
    exit();
  }
  if(file_exists($key)) {
    $file = fopen( $key, "r" );
    $filesize = filesize( $key );
    $filetext = fread( $file, $filesize );
    echo $filetext;
    fclose( $file );
  }
  else {
    echo 'null';
  }
}
?>
