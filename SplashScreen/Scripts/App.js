'use strict';

var context = SP.ClientContext.get_current();
var user = context.get_web().get_currentUser();

$(document).ready(function () {
    // Hide the globalNavBox element if IsDlg querystring parameter is set
    //var isDialog = getQueryStringParameterByName('IsDlg');
    //if (isDialog == '1') {
        //$("#globalNavBox").hide();
    //}

    getUserName();
});

function getUserName() {
    context.load(user);
    context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
}


function onGetUserNameSuccess() {
    if (null != user) {
        //The user is not null
        var userName = null;
        try {
            userName = user.get_title();
        } catch (e) {
            userName = "Anonymous user!";
        }
    }
    $('#message').text('User Name: ' + userName);
}


function onGetUserNameFail(sender, args) {
    $('#message').text('Failed to get user name. Error:' + args.get_message());
}

// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
 
function getQueryStringParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}