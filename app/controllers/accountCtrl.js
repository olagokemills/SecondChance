"use strict";

  angular
    .module('app.controllers')
    .controller('accountsCtrl', accountsCtrl);

function accountsCtrl($scope, $state, $location, apiCall, $rootScope)
{
    $rootScope.navbar = true;
    var accounts = this;

    accounts.login = Login;
    accounts.logout= logout;
    accounts.register = Register;
    accounts.forgotPass = forgotPass;
    accounts.changePword = changePword;
    accounts.deleteAcct = deleteAcct;
    var $userData = sessionStorage.getItem('accountinfo');

    switch($state.current.name)
    {
        case "Account":
            if($userData)
            {
                $location.path('Account/Dashboard');
            }
            else if(!$userData)
            {
                $location.path('Account/Login');
            }
            break;

        case "acctRegister": 
        $rootScope.navbar = true;
            if($userData){

                $location.path('Account/Dashboard');
            }

        break;
        case "acctForgotPass":
        case "acctSetting":
        case "acctLogin":
            $rootScope.navbar = false;

            if($userData){

                $location.path('Account/Dashboard');
            }
            break;

        case "Orders":
            if(!$userData)
            {
                $location.path('Account/Login');
            }
            else if($userData)
            {
                Orders();
            }
            break;

        case "acctProfile":
            if(!$userData)
            {
                $location.path('Account/Login');
            }
            else if($userData)
            {
                acctProfile();
            }
            break;
        case "Dashboard":
            if(!$userData)
            {
                $location.path('Account/Login');
            }
            else if($userData)
            {
                Dashboard();
            }
            break;
        default:
            $location.path('404')
            break;
    }

    function Login()
    {
        apiCall
         .post(
            'accounts/login',
            {
                username: accounts.username,
                password: accounts.password
            },
             function(response)
            {   
                if(response.status == 401)
                {
                    accounts.errMsg = response.output.response;
                }
                else if(response.status == 200)
                {

                    $userData = response.output.response.data;
                    sessionStorage.setItem('accountinfo', JSON.stringify($userData));
                    sessionStorage.setItem('accounttoken', response.output.response.token);
                    accounts.errMsg= '';
                    accounts.succMsg = 'Logged In';
                    setTimeout(function(){ window.location = 'Account/Dashboard'}, 3000);
                } 
                else
                {
                    accounts.errMsg = "Server error please retry your credentials";
                }
            }
         );
    }

    function Register()
    {
        apiCall
         .post(
            'accounts/Register',
            {
                email: accounts.email,
                password: accounts.password, 
                fname: accounts.fname,
                lname: accounts.lname,
                city: accounts.city,
                password:accounts.pass,
                username: accounts.username,
                phone: accounts.phone,
            },
             function(response)
           {   
                 if(response.status == 200)
                {
                    apiCall
                     .post(
                        'email/notify',
                        {
                            email: 'michelle@almondcareers.com',
                            sender: 'Pamper Admin',
                            receipent: accounts.email,
                            subject: 'Account Created on Pamper.com',
                            message: '<h2>Pamper Beauty Portal</h2><p>You recently registerd to our platform, Welocme!!</p>'
                        },
                        function(emailresponse){}
                    );

                    $userData = response.output.response.data;
                    sessionStorage.setItem('accountinfo', JSON.stringify($userData));
                    sessionStorage.setItem('accounttoken', response.output.response.token);
                    accounts.succMsg = 'Account Successfully Created';
                    setTimeout(function(){ window.location = 'Account/Dashboard'}, 3000);
                } 
                
                {
                    accounts.errMsg = "Server error please retry your credentials";
                }
            }
         );

    }


    function forgotPass()
    {
    }


    function Dashboard()
    {
        $userData = sessionStorage.getItem('accountinfo');
        $rootScope.userinfo = JSON.parse($userData);
    }


    function Orders()
    {
        apiCall
        .get(
             'Orders/username'+$userData.username,
            function(response)
            {
                accounts.data = response.data.output.response;
            }

            );

    }


    function Profile()
    {
        apiCall
         .get(
             'accounts/username/'+$userData.username, 
         `
             {
                 accounts.data = response.data.output.response;
             }
          );

    }


    function changePword()
    {

    }
    function deleteAcct()
    {

    }

    function logout(){

        sessionStorage.clear();

        setTimeout(function(){ window.location = 'Home'}, 2000);
    }
}
