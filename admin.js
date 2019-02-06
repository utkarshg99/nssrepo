var config = {
    apiKey: "AIzaSyCdpGZWBzBcAOjnBEU3X8EEZI9N8bkaGns",
    authDomain: "nssproject-cdff3.firebaseapp.com",
    databaseURL: "https://nssproject-cdff3.firebaseio.com",
    projectId: "nssproject-cdff3",
    storageBucket: "nssproject-cdff3.appspot.com",
    messagingSenderId: "970241223832"
    };
    firebase.initializeApp(config);
    var db = firebase.firestore();
    function alldata(){
    var totamt1=0;
    var totamt2=0;
    var totamt3=0;
    var totamt4=0;
    db.collection("data").where("exist", "==", true)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        var dat=doc.data();
        totamt1+=Number(dat.amt1);
        totamt2+=Number(dat.amt2);
        totamt3+=Number(dat.amt3);
        totamt4+=Number(dat.amt4);
        var txt=dat.name+", ID: "+dat.uid+", Hotriculture waste: "+dat.amt1+", Hotriculture2 waste: "+dat.amt2+", Hotriculture3 waste: "+dat.amt3+", Hotriculture4 waste: "+dat.amt4;
        var node = document.createElement("LI");
        var textnode = document.createTextNode(txt);
        node.appendChild(textnode);
        document.getElementById("infoall").appendChild(node);
        });
        var node = document.createElement("LI");
        document.getElementById("infoall").appendChild(node);
        node.appendChild(document.createTextNode("Total Hotriculture1 Waste: "+totamt1+" "));
        node.appendChild(document.createTextNode("Total Hotriculture2 Waste: "+totamt2+" "));
        node.appendChild(document.createTextNode("Total Hotriculture3 Waste: "+totamt3+" "));
        node.appendChild(document.createTextNode("Total Hotriculture4 Waste: "+totamt4+" "));
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}
function particular(){
    var u=document.getElementById("uid").value;
    var docRef = db.collection("data").doc(u);
    var t=docRef.get().then(function(doc) {
    if (doc.exists) {
    var dat=doc.data();
    var txt=dat.name+", ID: "+dat.uid+", Hotriculture waste: "+dat.amt1+", Hotriculture2 waste: "+dat.amt2+", Hotriculture3 waste: "+dat.amt3+", Hotriculture4 waste: "+dat.amt4;
    var node = document.createElement("LI");
    var textnode = document.createTextNode(txt);
    node.appendChild(textnode);
    document.getElementById("infopart").appendChild(node);
    } else {
    var txt="User Does not Exist.";
    var node = document.createElement("LI");
    var textnode = document.createTextNode(txt);
    node.appendChild(textnode);
    document.getElementById("infopart").appendChild(node);        
    }}).catch(function(error) {
    console.log("Error getting document:", error);})
}