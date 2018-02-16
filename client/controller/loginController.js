angular.module('meanApp').controller('loginController',function($rootScope,$scope,$cookies,$http,AuthenticationService,$location){
$scope.Login={};
function initController(){
  AuthenticationService.Logout();
};
initController();


    $scope.LoginUser = function(Login) {
        alert('entering into loginuser fun');

          AuthenticationService.Login($scope.Login,function(response){
              alert('entering authenticationservice fun in login controller');
if(response.data.success===false){
  alert(' Password / Email ID is invalid');
  return false;
}
        if(response.data.success ===true){
          console.log('Success',response.data);
if(response.data.userDetail.UserType=='Customer'|| response.data.userDetail.UserType=='Admin'){
  $rootScope.$emit('CallLoginUser',{});

}else if(response.data.userDetail.UserType=='Driver'){
  $rootScope.$emit('CallLoginUser',{});

}

  location.href='#/home';

}
else{
  $scope.message=response.message;
}


      });

    };

});
