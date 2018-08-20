// Your corresponding keys
Parse.initialize("YOUR_APP_ID", "YOUR_JAVASCRIPT_KEY");

// For back4app applications, this url is
// 'https://parseapi.back4app.com'
Parse.serverURL = 'YOUR_SERVER_URL'


// If you want to test your parse connection
new Parse.Object("Test", {"text" : "testing"}).save()
.then(function (obj) {
	console.log("Success", obj);
})
.catch(function (e) {
	alert("Error saving test object!" + e.message);
});
