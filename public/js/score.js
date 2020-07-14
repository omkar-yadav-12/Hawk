function increment(id) {
    if (id != null) {
        if (document.getElementById(id).checked) {
       if (id.indexOf('skystone') != -1) {
           document.getElementById('stone' + id.substring(id.length-1, id.length)).checked = false 
           document.getElementById('none' + id.substring(id.length-1, id.length)).checked = false
       } else if (id.indexOf('none') != -1) {
           document.getElementById('stone' + id.substring(id.length-1, id.length)).checked = false 
           document.getElementById('skystone' + id.substring(id.length-1, id.length)).checked = false
       } else {
           document.getElementById('none' + id.substring(id.length-1, id.length)).checked = false 
           document.getElementById('skystone' + id.substring(id.length-1, id.length)).checked = false
       }
    }
    }
    var types = ["skystone", "stone"];
    var other_types = [
        ["firstRet", 10], ["firstRep", 10], ["R1N", 5], ["R2N", 5], ["Capstone1", 5], ["Capstone2", 5], ["Parked1", 5], ["Parked2", 5], ["found", 15]];
    let points = 0
    for (let j = 0; j < types.length; j++) {
        for (let i = 1; i <= 6; i++) {
            let needed = document.getElementById(types[j] + i);
            if (needed.checked && j == 0) points += 10
            if (needed.checked && j == 1) points += 2;
        }
    }
    
    for (let i = 0; i < other_types.length; i++) {
        let needed = document.getElementById(other_types[i][0]);
        if (needed.checked) points += other_types[i][1]
    }
    points += parseInt(document.getElementById("ReturnedAuto").value) * 2
    points += parseInt(document.getElementById("PlacedAuto").value) * 4
    points += parseInt(document.getElementById("delivered_number").value)
    points += (parseInt(document.getElementById("tallest_skyscraper").value) * 2)
    points -= parseInt(document.getElementById("returned_name").value)
    points += parseInt(document.getElementById("placed").value)
    points += parseInt(document.getElementById("minor").value) * 5
    points += parseInt(document.getElementById("major").value) * 20
    points += parseInt(document.getElementById("robot1_level").value)
    points += parseInt(document.getElementById("robot2_level").value)
    document.getElementById("points").value = points

}