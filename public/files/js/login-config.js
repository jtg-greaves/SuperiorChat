var details;


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.status == 200 && this.readyState == 4) {
        response = this.responseText.toString()
        details = response.split("\r\n")
        var email = details[0];
        var password = details[1];
        var server = details[2];

        document.getElementById('user_email').value = email;
        document.getElementById('user_pass').value = password;
        document.getElementById('server_ip').value = server;
    }
};
xhttp.open("GET", "/configuration/login_details.txt", true);
xhttp.send();