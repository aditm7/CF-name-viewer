window.addEventListener('load', function() {
    console.log("It's loaded!");
    var base_url = "https://codeforces.com/api/user.info?handles=";
    var user_info = document.getElementsByClassName("rated-user");

    function change_names(arr) {
        var i;
        for (i = 0; i < arr.length; i++) {
            var out = user_info[i].innerHTML;
            if (arr[i].firstName != null)
                out = arr[i].firstName + " "
            if (arr[i].lastName != null)
                out += arr[i].lastName;
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
        var ans = "";
        if (user_info[0].innerHTML[0] != "<")
            ans += user_info[0].innerHTML
        else {
            ans += user_info[0].innerHTML[42] + user_info[0].innerHTML.substring(50, user_info[0].innerHTML.length);
        }
        for (var i = 1; i < user_info.length; i++) {
            if (user_info[i].innerHTML[0] != "<")
                ans += ";" + user_info[i].innerHTML
            else {
                ans += ";" + user_info[i].innerHTML[42] + user_info[i].innerHTML.substring(50, user_info[i].innerHTML.length);
            }
        }
        mycallback(ans);
    }
    helper(api_request);
})