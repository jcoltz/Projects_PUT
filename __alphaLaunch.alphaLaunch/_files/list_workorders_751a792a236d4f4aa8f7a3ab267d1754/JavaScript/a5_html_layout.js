	
/*
Copyright (c) 2001, 2016 Alpha Software Corporation
All Rights Reserved.

This JavaScript library is licensed exclusively for use with Alpha Anywhere, Alpha Five,
Alpha Five Application Server, Alpha Anywhere Application Server,
Alpha Five Run Engine, and Alpha Anywhere Run Engine. It is specifically
not licensed for use on a server that does not have installed on it a
licensed copy of the Alpha Five Application Server or the Alpha Anywhere Application Server.
*/



function a5_layout_cont_bands(a5_layout_cont_curID,a5_layout_cont_style){if(document.getElementById(a5_layout_cont_curID).style.display=='none'){if(document.all){document.getElementById(a5_layout_cont_curID).style.display='block';}
else{document.getElementById(a5_layout_cont_curID).style.display='table-row-group';}
document.getElementById(a5_layout_cont_curID+'_IMG').src='css//'+a5_layout_cont_style+'//AscOn.png';}
else{document.getElementById(a5_layout_cont_curID).style.display='none';document.getElementById(a5_layout_cont_curID+'_IMG').src='css//'+a5_layout_cont_style+'//DescOn.png';}}
function a5_layout_cont_singlebands(a5_layout_cont_curID,a5_layout_cont_prevID,a5_layout_cont_style){if(a5_layout_cont_curID!=a5_layout_cont_prevID){if(document.all){document.getElementById(a5_layout_cont_curID).style.display='block';}
else{document.getElementById(a5_layout_cont_curID).style.display='table-row-group';}
document.getElementById(a5_layout_cont_curID+'_IMG').src='css//'+a5_layout_cont_style+'//RowMarkerOn.png';if(a5_layout_cont_prevID!=''){document.getElementById(a5_layout_cont_prevID).style.display='none';document.getElementById(a5_layout_cont_prevID+'_IMG').src='css//'+a5_layout_cont_style+'//RowMarkerOff.png';}}
return a5_layout_cont_curID;}
function a5_layout_cont_singlebands_onload(a5_layout_cont_curID,a5_layout_cont_style){document.getElementById(a5_layout_cont_curID).style.display='none';document.getElementById(a5_layout_cont_curID+'_IMG').src='css//'+a5_layout_cont_style+'//RowMarkerOff.png';}
function a5_layout_cont_tabs(a5_layout_cont_curID,a5_layout_cont_prevID,a5_layout_cont_style){if(a5_layout_cont_curID!=a5_layout_cont_prevID){if(document.all){document.getElementById(a5_layout_cont_curID).style.display='block';}
else{document.getElementById(a5_layout_cont_curID).style.display='table';}
document.getElementById(a5_layout_cont_curID+'_IMG').src='css//'+a5_layout_cont_style+'//RowMarkerOn.png';if(a5_layout_cont_prevID!=''){document.getElementById(a5_layout_cont_prevID).style.display='none';document.getElementById(a5_layout_cont_prevID+'_IMG').src='css//'+a5_layout_cont_style+'//RowMarkerOff.png';}}
return a5_layout_cont_curID;}
function a5_layout_cont_genie(a5_layout_cont_curID,a5_layout_cont_prevID){if(a5_layout_cont_curID!=a5_layout_cont_prevID){if(document.all){document.getElementById(a5_layout_cont_curID).style.display='block';}
else{document.getElementById(a5_layout_cont_curID).style.display='table';}
if(a5_layout_cont_prevID!=''){document.getElementById(a5_layout_cont_prevID).style.display='none';}
var ele=document.getElementById(a5_layout_cont_curID)
var selectedPosX=0;var selectedPosY=0;while(ele!=null){selectedPosX+=ele.offsetLeft;selectedPosY+=ele.offsetTop;ele=ele.offsetParent;}
window.scrollTo(selectedPosX,selectedPosY);}}