    var config = {
    apiKey: "AIzaSyCdpGZWBzBcAOjnBEU3X8EEZI9N8bkaGns",
    authDomain: "nssproject-cdff3.firebaseapp.com",
    databaseURL: "https://nssproject-cdff3.firebaseio.com",
    projectId: "nssproject-cdff3",
    storageBucket: "nssproject-cdff3.appspot.com",
    messagingSenderId: "970241223832"
    };
    firebase.initializeApp(config);
    function subm()
    {
    var db = firebase.firestore();
    var u=document.getElementById("uid").value;
    if(u.length!=10){
        window.alert("Invalid User-Id");
    }
    else{
    var n=document.getElementById("name").value;
    var a1=document.getElementById("amt1").value;
    var a2=document.getElementById("amt2").value;
    var a3=document.getElementById("amt3").value;
    var a4=document.getElementById("amt4").value;
    if(u=="" || a1=="" || a2=="" || a3=="" || a4=="")
        alert("Please provide data.");
    else
    {
        var docRef = db.collection("data").doc(u);
        var t=docRef.get().then(function(doc) {
        if (doc.exists) {
            updater(doc.data());
        } else {
            updater({exist:false});
        }}).catch(function(error) {
        console.log("Error getting document:", error);})            
    }
    function updater(dat){
        if(dat.exist)
    {
    if(n!=dat.name){
        alert("Name mismatch.");
        return;
    }
    a1=Number(a1)+Number(dat.amt1);
    a2=Number(a2)+Number(dat.amt2);
    a3=Number(a3)+Number(dat.amt3);
    a4=Number(a4)+Number(dat.amt4);
    var data = {
    uid:u,
    amt1:a1,
    amt2:a2,
    amt3:a3,
    amt4:a4,
    name:n,
    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    exist:true
    };
    db.collection("data").doc(u).set(data);
    alert("Succesfully submitted. Press F5 or Ctrl+R to make a new entry.");
    }
        else
    {
    alert("User doesn't exist, making new entry...");
    var data = {
    uid:u,
    amt1:a1,
    amt2:a2,
    amt3:a3,
    amt4:a4,
    name:n,
    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    exist:true
    };
    db.collection("data").doc(u).set(data);
    alert("Succesfully submitted, New entry created. Press F5 or Ctrl+R to make a new entry.");
    }
    }
    }
}