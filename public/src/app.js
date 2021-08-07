$(document).ready(function() {
    getTodos();
    getinprogressTodos();
    getDoneTodos();
});
     
function getTodos(){
  var xhr=new XMLHttpRequest();
      xhr.open('GET','https://6109306cd71b6700176397f0.mockapi.io/Todos?status=pending', true);
  
      xhr.onload = function(){
          if(this.status == 200)
          {
              var todos=JSON.parse(this.responseText);

             var output='';
             for(var i in todos){
              
          
                 output+=
                 '<div class="todos">' +
                  '<ul class="list-group list-group-flush">' +
                      '<li class="list-group-item">'+todos[i].description+'<button class="btn btn-primary" style="float:right;" onclick="switch_to_inprogress('+todos[i].id+')" id="button1"><i class="fas fa-arrow-right"></i></button></li>' +
                  '</ul>' +
                  '</div>';
                  
             }
             document.getElementById('card1').innerHTML=output;
             
          }
      }
      xhr.send();
}
function getinprogressTodos(){
  var xhr=new XMLHttpRequest();
      xhr.open('GET','https://6109306cd71b6700176397f0.mockapi.io/Todos?status=in-progress', true);
  
      xhr.onload = function(){
          if(this.status == 200)
          {
              var todos=JSON.parse(this.responseText);

             var output='';
             for(var i in todos){
              
          
                 output+=
                 '<div class="todos">' +
                  '<ul class="list-group list-group-flush" id="deneme111">' +
                      '<li class="list-group-item">'+todos[i].description+'<button class="btn btn-primary" style="float:right;" onclick="switch_to_done('+todos[i].id+')" id="button1"><i class="fas fa-arrow-right"></i></button></li>' +
                  '</ul>' +
                  '</div>';
                  
             }
             document.getElementById('card2').innerHTML=output;
             
          }
      }
      xhr.send();
}
function getDoneTodos(){
  var xhr=new XMLHttpRequest();
      xhr.open('GET','https://6109306cd71b6700176397f0.mockapi.io/Todos?status=done', true);
  
      xhr.onload = function(){
          if(this.status == 200)
          {
              var todos=JSON.parse(this.responseText);

             var output='';
             for(var i in todos){
              
          
                 output+=
                 '<div class="todos">' +
                  '<ul list-group list-group-flush>' +
                      '<li list-group-item>'+todos[i].description+'<button class="btn btn-primary" style="float:right;" onclick="deleteTodo('+todos[i].id+')" id="button1"><i class="fas fa-arrow-right"></i></button></li>' +
                  '</ul>' +
                  '</div>';
                  
             }
             document.getElementById('card3').innerHTML=output;
             
          }
      }
      xhr.send();
}

function switch_to_inprogress(id){
    $.ajax({
    url:'https://6109306cd71b6700176397f0.mockapi.io/Todos/'+id ,
    method:'put',
    dataType:'json',
    data:{
        status:'in-progress'
    },
    success: function(data){
        document.getElementById('card1').innerHTML="";
        document.getElementById('card2').innerHTML="";
        getTodos();
        getinprogressTodos();
    }
});
}

function switch_to_done(id){
    $.ajax({
    url:'https://6109306cd71b6700176397f0.mockapi.io/Todos/'+id ,
    method:'put',
    dataType:'json',
    data:{
        status:'done'
    },
    success: function(data){
        document.getElementById('card2').innerHTML="";
        document.getElementById('card3').innerHTML="";
        getinprogressTodos();
        getDoneTodos();
    }
});
}
function deleteTodo(id){
    $.ajax({
        url:'https://6109306cd71b6700176397f0.mockapi.io/Todos/'+id ,
        method:'DELETE',
        dataType:'json',
        success: function(data){
            document.getElementById('card3').innerHTML="";
            getDoneTodos();
        }
    });
}
function addTodo()
{
    const url='https://6109306cd71b6700176397f0.mockapi.io/Todos?status=pending';
    
    document.getElementById("status1").value = "pending";
    const d = new Date();
    document.getElementById("createdAt1").value = d.getMonth();
    const formEl=document.querySelector('form');
    formEl.addEventListener('submit',async(e) =>{
        e.preventDefault();
        const formData=new FormData(formEl);
        const formDataSerialized =Object.fromEntries(formData);
        console.log(formDataSerialized,"formDataSerialized");
        const jsonObject={...formDataSerialized};
        try{
            const response=await fetch(url,{
                method:'POST',
                body:JSON.stringify(jsonObject),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const json=await response.json();
            document.getElementById('card1').innerHTML="";
            getTodos();        
        }catch(e){
            console.error(e);
            alert("there has an error.");
        }
    });
}
