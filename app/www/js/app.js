console.log=function(){}
$(function(){
function news(country,cat,publisher,q){

    if(cat!=null)
	{
        cat='&category='+cat
    }
	else
	{
		cat=""
	}
    var url="";
    if(q!="")
	{
       $("#search").val(q);
       url='everything?q='+q;
   	   $("#s").html("Keyword-"+$("#search").val());
        
    }
	else
	{
    $("#search").val("");
    if(publisher=="")
	{
		var url='top-headlines?country='+country+cat;
   $("#s").html($("#countryoption:selected").html()+"/"+$("#catoption:selected").html());
    }
	else{
      $("#s").html($("#sources option:selected").html());
      url='top-headlines?sources='+publisher;
     }
	}
$.ajax({
        type: "POST",
        url: "https://smartnewsapi.herokuapp.com/getJSON",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({'data':"https://newsapi.org/v2/"+url+"&apiKey=2d8601bb938f4f328fd06ae694e07fa3"}),
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Bearer ")
        }, success: function(data){
        $("#list").html("");
            if(data["totalResults"]===0){
                $("#list").html("No News found related with '"+q+"'");
            }
			else{
            for(var i=0;i<data["articles"].length;i++)
			{
                var whatsAppMsg = data['articles'][i]['title']+"\r\n"+"link to news is  : "+"\r\n"+data['articles'][i]['url']+"\r\n\r\n[Sent via using SmartNews App] or Browse on below link \r\nhttps://aadityadeshpande.github.io/SmartNews/"
                whatsAppMsg = whatsAppMsg.replace("'","`")
                whatsAppMsg = window.encodeURIComponent(whatsAppMsg)
           $("#list").append(
               "<div class='zm'>\
               <img class='thmb' loading='lazy' src="+data['articles'][i]['urlToImage']+"><br>\
               <b><a href="+data['articles'][i]['url']+" target='_blank' onclick='ah(this);return false;'>"+data['articles'][i]['title']+"</a></b>\
               <br><small>by "+data['articles'][i]['author']+"<a href='https://api.whatsapp.com/send?text="+whatsAppMsg+"' data-action='share/whatsapp/share' target='_blank'><button type='button' class='btn btn-success' style='float: right;' >WhatsApp</button></a>\
               <br>"+data['articles'][i]['publishedAt']+"<br>\
               </small><div class='less' onclick=h(this)><div class='content'>"+data['articles'][i]['content']+"<br>\
               </div><small>Read more..</small></div></div>\
               "
		   )
        }}}
        
})}
    $("#country").on("change",function(){
       
       news($("#country").val(),$("#cat").val(),"","") 
    })
    $("#sources").on("change",function(){
       news($("#country").val(),$("#cat").val(),$("#sources").val(),"") 
    })
    $("#cat").on("change",function(){
       news($("#country").val(),$("#cat").val(),"","") 
    })
    $("#sbt").on("click",function(){
       news($("#country").val(),$("#cat").val(),"",$("#search").val()) 
    })
    $(".less").click(function(){
        $(this).children().toggle("fast");
    })
    
    
  news('in','','',"")//bydefault (country,category,publisher,searchdata)
    
    
    $("iframe").on('load',function(){ 
    	//document.getElementById("ittl").innerHTML = document.getElementById("iframe").contentDocument.title; 
	
		 $("#cred_data").html("");
		 
		
	});
   
})
function ah(a){
	   $("#cred_data").html("");
		document.getElementById("ittl").innerHTML="Your news is loading";
       document.getElementById("iframe").src="";
		$("iframe").contents().empty();
       document.getElementById("iframe").src=a.href;
       $("#popup").toggle("fast");
       return false;
}
function h(a){
    $(a).children().toggle("fast");
}



/*credit section*/

$("#cred").click(function(){
	  
	 $("#popup2").toggle("fast");
	
	
	/*$("#ittl").html("");
	document.getElementById("iframe").src=null;
	$("#cred_data").html("");*/
	//alert("credit clicked");
	//$("#popup2").show("fast");
	/*document.getElementById("ittl2").innerHTML="hello, my name is aaditya";
	 $("#cred_data").html("<br><center> hello everyone, <br> this app is made by me.<br> and i have used bootstrap for this.</center>");*/
})




