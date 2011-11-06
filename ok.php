<?php
$r = rand(0,2);
if($r == 1) {
    echo "ok";
} else if($r == 2){
    sleep(15);
    echo "ok";
} else {
    echo "nok";
}


?>
