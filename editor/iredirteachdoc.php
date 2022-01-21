<!doctype html>
<html>
    <head>
        <script src="jscss/jquery.js"></script>
        
        <script>
            
            <?php
                if(isset($_GET['i'])){

                    $quitExept = 0;
                    if(isset($_GET['quit'])){
                        $quitExept = intVal($_GET['quit']);
                    }

                    $idPageTop = $_GET['i'];
                    if(isset($_GET['redir'])){
                        $RedirLP = $_GET['redir'];
                        $RedirLP = str_replace("t@d","/",$RedirLP);
                        $RedirLP = str_replace("t@@d","?",$RedirLP);
                        $RedirLP = str_replace("t@@@d","&",$RedirLP);

                        if ($quitExept==1){
                            $RedirLP = str_replace("action=view","action=list",$RedirLP);
                            $RedirLP = str_replace("isStudentView=true","isStudentView=false",$RedirLP);
                            $RedirLP = $RedirLP."&isStudentView=false";
                        }

                        echo "var idPageTop = $idPageTop;";
                    }
                 
                }
            ?>

        </script>

        <style>
            body,html{height:100%;margin:0;}
            
            svg {
                overflow: visible;
                width: 100px;
                height: 150px;
            }
            svg g {
                animation: slide 1.5s linear infinite;
            }
            svg g:nth-child(2) {
                animation-delay: 0.5s;
            }
            svg g:nth-child(2) path {
                animation-delay: 0.5s;
                stroke-dasharray: 0px 158px;
                stroke-dashoffset: 1px;
            }
            svg path {
                stroke: url(#gradient);
                stroke-width: 18px;
                stroke-linecap: round;
                fill: none;
                stroke-dasharray: 0 157px;
                stroke-dashoffset: 0;
                animation: grimpe 1.5s cubic-bezier(0.8, 0, 0.2, 1) infinite;
            }

            @keyframes slide {
                0% {
                    transform: translateY(-50px);
                }
                100% {
                    transform: translateY(50px);
                }
                }
                @keyframes grimpe {
                0% {
                    stroke-dasharray: 0 157px;
                    stroke-dashoffset: 0;
                }
                50% {
                    stroke-dasharray: 156px 157px;
                    stroke-dashoffset: 0;
                }
                100% {
                    stroke-dasharray: 156px 157px;
                    stroke-dashoffset: -156px;
                }
            }
        
        </style>

    </head>
    <body style="background-color:#D8D8D8;width:98%;height:98%;margin:1%;padding:0;" >
        
        <div id="logsreturn" style="color:red;" ></div>
        <table style="width:100%;height:99%" >
            <tr>
                <td style="text-align:center;" >
                    <br>
                    <svg transform="scale(0.5)" >
                       
                        <g>
                          <path d="M 50,100 A 1,1 0 0 1 50,0"/>
                        </g>
                        <g>
                          <path d="M 50,75 A 1,1 0 0 0 50,-25"/>
                        </g>
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#8356ff;stop-opacity:0.9;" />
                            <stop offset="100%" style="stop-color:#50adeb;stop-opacity:0.9;" />
                          </linearGradient>
                        </defs>
                      </svg>
                </td>
            </tr>
        </table>
        
        <script>

            var urRend = '../ajax/teachdoc-render.php?id=' + idPageTop;
            
            $.ajax({
                url : urRend,type : "POST",
                success: function(data,textStatus,jqXHR) {
                    if (data.indexOf("KOCS")!=-1) {
                        $("#logsreturn").html(data);
                    }else{
                        //$("#logsreturn").html(data);
                        window.location.href = "<?php echo $RedirLP ?>";
                    }
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
                    setTimeout(function(){
                        location.reload();
                    },1500);
                }
            });
        </script>

    </body>
</html>
