<?php
$root=dirname(__FILE__);

function getfile($dir,$rootpath){
    //echo "检测",$dir,"文件夹".PHP_EOL;
    $dirhandle=opendir($dir);
    while(($file = readdir($dirhandle)) !== false){
        if(in_array($file,array('.','..'))){
            continue;
        }
        //echo "file",$file,PHP_EOL;
        $filepath=realpath($dir.'/'.$file);
        //echo "本地路径".$filepath.PHP_EOL;
        $urlpath=str_replace($rootpath,'',$filepath);
        //echo "相对路径".$urlpath.PHP_EOL;
        if(is_dir($filepath)){
            getfile($filepath,$rootpath);
        }else{
            if(preg_match('/\.min\.js|\.min\.css/',$urlpath)){
                $sourcefile=str_replace('.min.','.',$filepath);
                if(file_exists($sourcefile)){
                    echo $filepath."\tOK".PHP_EOL;
                }else{

                    echo "获取http://www.themeon.net/nifty/v2.9".str_replace('.min.','.',$urlpath).PHP_EOL;
                    //echo file_get_contents("http://www.themeon.net/nifty/v2.9".str_replace('.min.','.',$urlpath));
                    file_put_contents($sourcefile,file_get_contents("http://www.themeon.net/nifty/v2.9".str_replace('.min.','.',$urlpath)));
                }
            }
        }
    }
    closedir($dirhandle);
}
getfile($root,$root);