window.addEventListener('load', function() {
    console.log("It's loaded!");
    var base_url = "https://codeforces.com/api/user.info?handles=";
    var user_info = document.getElementsByClassName("rated-user");

    function change_names(arr) {
        var i;
        for (i = 0; i < arr.length; i++) {
            var out = user_info[i].innerHTML;
            if (arr[i].firstName != null)
                out = arr[i].firstName + " " + arr[i].lastName;
            user_info[i].innerHTML = out;
        }
    }

    function api_request(k) {
        var xmlhttp = new XMLHttpRequest();
        var url = base_url + k;
        xmlhttp.open("GET", url, true);
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                myArr = myArr.result;
                change_names(myArr);
            }
        };
        xmlhttp.send();
    }

    function helper(mycallback) {
        var ans = user_info[0].innerHTML;
        for (var i = 1; i < user_info.length; i++) {
            ans += ";" + user_info[i].innerHTML;
        }
        mycallback(ans);
    }
    helper(api_request);
})