/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var SnippetsApp = angular.module('SnippetsApp', ['ngCookies']);


SnippetsApp.filter('chekmark', function(){
   return function(input) {
       return(input);
   } ;
});

SnippetsApp.run(function($cookies, $rootScope){
   $rootScope.info = '0';
   //$cookies.put('myFavorite', 'oatmeal');
   //alert($cookies.get('myFavorite'));
   
   $rootScope.ShowModal = function(){
        $('#modal').modal();
    };
});



SnippetsApp.controller('SnippetsCtrl', function($scope, $rootScope, $http){
   $http.get('http://localhost:228/rows').then(function(response){
       $scope.SnippetsData = response.data.response;
       $scope.Select = function(item){
           $http.get('http://localhost:228/row/' + item).then(function(response){
               $scope.SnippetsData = response.data.response;
           });
       };
       
       $scope.Auth = function(login, pass){         
           
                     
       };
       
       
   }) ;
});

SnippetsApp.controller('AuthCtrl', function($scope, $rootScope){
    
    $scope.Time = new Date().getDate() + new Date().getHours();
    
    
    $scope.Auth = function(login, pass){
        $scope.Hash = sha256(login + pass);
    };
});

SnippetsApp.controller('TestCtrl', function($scope, $rootScope, $http){
    
    var req = {
                method: 'POST',
                crossDomain : true,
                url: 'http://localhost:228/',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                data: {id: null, tags: 'Finka', title: 'New post from WEB form', date: 'date', description: "33"}
            };
            $http(req).then(function(value){
                $scope.test = value.data;
            });
});


SnippetsApp.controller('SendDataCtrl', function($scope, $rootScope, $http){
    
    $scope.date = new Date().toLocaleString();
    
    $scope.Submit = function(id, title, tags, description, date){
        
        $('#error').hide();
        $('#ok').hide();         
        
        if (id === undefined){
            
            if(
                !title || 
                !tags ||
                !description ||
                !date ){
            
                    $rootScope.info = 'Не все данные заполнены';
                    $('#error').show();
                    $('#modal').modal();
                    return;
            }
            
            
            
            $scope.test = title + tags;
            var req = {
                method: 'POST',
                crossDomain : true,
                url: 'http://localhost:228/row/add',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Password =)'
                },
                data: {
                    id: null,
                    title: title,
                    tags: tags,
                    description: description,
                    date: date
                }
            };
            $http(req).then(function(value){
                if (value.data.response[0] === 1){
                    $rootScope.info = 'Data success add in database';
                }
                $('#ok').show();
                $('#modal').modal();
                
            });
        } else {
            $scope.test = 'не хаха';
        };
    };
    
});



//    SnippetsApp.controller('SnippetsCtrl', function($scope){
//        $scope.test = "222";
//    });