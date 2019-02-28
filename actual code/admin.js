var datx,db;
var config = {
    apiKey: "AIzaSyCdpGZWBzBcAOjnBEU3X8EEZI9N8bkaGns",
    authDomain: "nssproject-cdff3.firebaseapp.com",
    databaseURL: "https://nssproject-cdff3.firebaseio.com",
    projectId: "nssproject-cdff3",
    storageBucket: "nssproject-cdff3.appspot.com",
    messagingSenderId: "970241223832"
    };
    firebase.initializeApp(config);
    db = firebase.firestore();
    function verifypass(redir){
        var pass=document.getElementById("pass").value;
        db.collection("admin").doc("pass").get().then(function(doc){
            var xpass=doc.data().password;
            if(!doc.data().actprj){
                window.alert("project de-activated");
                return;
            }
            if(xpass != pass){
                window.alert("Wrong Password");
            }
            else{
            if(redir=="specific"){
                particular();
            }
            else if(redir == 'all'){
                alldata();
            }
            }
        });        
    }
    function alldata(){
    var totamt1=0;
    var totamt2=0;
    var totamt3=0;
    var totamt4=0;
    db.collection("data").where("exist", "==", true).orderBy('timeStamp')
    .get()
    .then(function(querySnapshot) {
        datx=querySnapshot;
        querySnapshot.forEach(function(doc) {
        var dat=doc.data();
        totamt1+=Number(dat.amt1);
        totamt2+=Number(dat.amt2);
        totamt3+=Number(dat.amt3);
        totamt4+=Number(dat.amt4);
        node = document.createElement("TR");
        var name = document.createElement("TD");
        var uid = document.createElement("TD");
        var amt1 = document.createElement("TD");
        var amt2 = document.createElement("TD");
        var amt3 = document.createElement("TD");
        var amt4 = document.createElement("TD");
        var nm = document.createTextNode(dat.name);
        var a1 = document.createTextNode(dat.amt1);
        var a2 = document.createTextNode(dat.amt2);
        var a3 = document.createTextNode(dat.amt3);
        var a4 = document.createTextNode(dat.amt4);
        var ud = document.createTextNode(dat.uid);
        name.appendChild(nm);
        uid.appendChild(ud);
        amt1.appendChild(a1);
        amt2.appendChild(a2);
        amt3.appendChild(a3);
        amt4.appendChild(a4);
        node.appendChild(name);
        node.appendChild(uid);
        node.appendChild(amt1);
        node.appendChild(amt2);
        node.appendChild(amt3);
        node.appendChild(amt4);
        document.getElementById("infoall").appendChild(node);});
        var node = document.createElement("DIV");
        document.getElementById("infoall").appendChild(node);
        node.appendChild(document.createElement("BR"));
        node.appendChild(document.createTextNode("Total Hotriculture1 Waste: "+totamt1+" "));
        node.appendChild(document.createElement("BR"));
        node.appendChild(document.createElement("BR"));
        node.appendChild(document.createTextNode("Total Hotriculture2 Waste: "+totamt2+" "));
        node.appendChild(document.createElement("BR"));
        node.appendChild(document.createElement("BR"));
        node.appendChild(document.createTextNode("Total Hotriculture3 Waste: "+totamt3+" "));
        node.appendChild(document.createElement("BR"));
        node.appendChild(document.createElement("BR"));
        node.appendChild(document.createTextNode("Total Hotriculture4 Waste: "+totamt4+" "));
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}
function particular(){
    var u=document.getElementById("uid").value;
    if(u==''){
        window.alert("Please Enter the UID");
    }
    else{
    var docRef = db.collection("data").doc(u);
    var t=docRef.get().then(function(doc) {
    if (doc.exists) {
    var dat=doc.data();
    node = document.createElement("TR");
        var name = document.createElement("TD");
        var uid = document.createElement("TD");
        var amt1 = document.createElement("TD");
        var amt2 = document.createElement("TD");
        var amt3 = document.createElement("TD");
        var amt4 = document.createElement("TD");
        var nm = document.createTextNode(dat.name);
        var a1 = document.createTextNode(dat.amt1);
        var a2 = document.createTextNode(dat.amt2);
        var a3 = document.createTextNode(dat.amt3);
        var a4 = document.createTextNode(dat.amt4);
        var ud = document.createTextNode(dat.uid);
        name.appendChild(nm);
        uid.appendChild(ud);
        amt1.appendChild(a1);
        amt2.appendChild(a2);
        amt3.appendChild(a3);
        amt4.appendChild(a4);
        node.appendChild(name);
        node.appendChild(uid);
        node.appendChild(amt1);
        node.appendChild(amt2);
        node.appendChild(amt3);
        node.appendChild(amt4);
        document.getElementById("infoall").appendChild(node);
    } else {
    var txt="User Does not Exist.";
    var node = document.createElement("LI");
    var textnode = document.createTextNode(txt);
    node.appendChild(textnode);
    document.getElementById("infopart").appendChild(node);        
    }}).catch(function(error) {
    console.log("Error getting document:", error);})
}}

function convtocsv(){
        var datajson=[{}];
        var d;
        datx.forEach(function(doc){
            d=doc.data();
            datajson.push(d);
        })
        JSONToCSVConvertor(datajson,"Current User Data",true);
    }

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;    
    var CSV = 'sep=,' + '\r\n';
    if (ShowLabel) {
        var row = "";
        for (var index in arrData[1]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        CSV += row + '\r\n';
    }
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        CSV += row + '\r\n';
    }
    if (CSV == '') {        
        alert("Invalid data");
        return;
    }
    var fileName = "";
    fileName += ReportTitle.replace(/ /g,"_");
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    var link = document.createElement("a");    
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}