<?php
$root="premium/boxed-bg";
$dir=array("abstract","blurred","polygon");
$dir2=array("bg","thumbs");
for ($i=1;$i<=16;$i++){
    foreach ($dir as $d){
        foreach ($dir2 as $d2) {
            $file = $root . '/' . $d  . '/' . $d2 . '/' . $i . ".jpg";
            $url = "http://www.themeon.net/nifty/v2.9/" . $file;
            echo $url . PHP_EOL;
            file_put_contents($file,file_get_contents($url));
        }
    }
}