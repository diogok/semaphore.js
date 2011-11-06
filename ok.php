<?php
$r = rand(0,3);
if($r == 1) {
    echo "ok";
} else if($r == 2){
    sleep(15);
    echo "ok";
} else if($r == 3){
    sleep(6);
    echo "ok";
} else {
    echo "nok";
}

?>
