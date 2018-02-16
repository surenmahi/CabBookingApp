angular.module('meanApp').controller('addCabController', function($scope,$http,$mdDialog) {

  var initCab=function(){

    $http.get('/getDriver').then(function(response) {
      console.log('initCab executed');
        $scope.DriverData = response.data;
    });
};




$scope.AddCab=function(){

$scope.Driver.Photo=document.getElementById('Fname').value+'.jpg';


$http.post('/AddDriver',$scope.Driver).then(function(res){
  console.log('Driver Data Saved');
});

$http.post('/AddCab',$scope.Driver).then(function(res){
  console.log('Cab Data Saved');
});
initCab();
$scope.Driver='';



    };


//alert('Submit the form first and then upload the photo');

    $http.get('/getDriver').then(function(response) {
      console.log(response.data);
        $scope.DriverData = response.data;
    });





    $scope.GetDriver= function(t) {
      $scope.DriverMobile=t.MobileNo;
        $http.get('/getDriver/'+t.MobileNo).then(function(response) {

            console.log(response.data);
                $scope.getDriver= response.data;
        });

        $http.get('/getCabDetail/'+t.MobileNo).then(function(response) {

                console.log(response.data);
                $scope.getCab= response.data;
        });




      };


          $scope.UpdateCabDetails=function(){
            $http.put('/UpdateCab/'+$scope.getCab[0]._id+'/'+$scope.getDriver[0].MobileNo,$scope.getCab[0]).then(function(res){
              console.log('Cab data edited');
            });
            $http.put('/UpdateDriver/'+$scope.getDriver[0]._id,$scope.getDriver[0]).then(function(res){
              console.log('Driver data edited');
            });

            initCab();
       };




    $scope.DeleteCab = function(d,event) {
      var confirm = $mdDialog.confirm()
          .title('Are you sure to delete the record?')
        .textContent('Record will be deleted permanently.')
          .targetEvent(event)
          .ok('Yes')
          .cancel('No');
          $mdDialog.show(confirm).then(function() {
      $http.delete('/DeleteDriver/' + d.MobileNo).then(function(response) {
          console.log('Driver Deleted');
      });

        $http.delete('/DeleteCab/' + d.MobileNo).then(function(response) {
            console.log('Cab Deleted');
        });

        initCab();
}, function() {
console.log('You decided to keep your record.');
});
      };

    });
