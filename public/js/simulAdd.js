let i = 0;
var array = []
for (let i = 0; i < 40; i++) {
    array.push([["", "", "", "", "", "", "", true]])
}
for (obj in sessionStorage) {
    if (sessionStorage[obj].length > 20 && sessionStorage[obj][7]) {
        array[i] = (sessionStorage[obj].split(","))
        i++
    }
}
var scores = [];
var combinations = [];
var final = [];
for (let i = 0; i < array.length; i++) {
    if(array[i].length < 5) continue
    scores.push([array[i][0], "(" + array[i][0] + ") " + array[i][1] + ", " + array[i][2], array[i][5], 0, 0, 0, 0, array[i][6], 0, 0, 0, 0]);
}
// for(let i = 0; i < scores[0].length; i++) {
//     alert(scores[0][i])
// }
// alert(scores)
for (let i = 0; i < scores.length - 1; i++) {
    for (let g = i + 1; g < scores.length; g++) {
        combinations.push([scores[i][0], scores[i][1], scores[g][0], scores[g][1], Math.round((parseFloat(scores[i][2]) + parseFloat(scores[g][2])) * 1000.0) / 1000.0, Math.round((parseFloat(scores[i][7]) + parseFloat(scores[g][7])) / 2 * 1000.0) / 1000.0]);
    }
}
for (let i = 0; i < combinations.length - 1; i++) {
    for (let g = i; g < combinations.length; g++) {
        if (combinations[i][0] == combinations[g][0] || combinations[i][0] == combinations[g][2] || combinations[i][2] == combinations[g][0] || combinations[i][2] == combinations[g][2]) continue;
        final.push([combinations[i], combinations[g]])
        var location4 = 0, location1 = 0, location2 = 0, location3 = 0;

        for (let x = 0; x < scores.length; x++) {
            if (scores[x][0] == combinations[i][0]) location4 = x;
            if (scores[x][0] == combinations[i][2]) location1 = x;
            if (scores[x][0] == combinations[g][0]) location2 = x;
            if (scores[x][0] == combinations[g][2]) location3 = x;
        }
        if (combinations[i][4] > combinations[g][4]) {
            scores[location4][3]++
            scores[location1][3]++
            scores[location2][4]++
            scores[location3][4]++

        } else if (combinations[i][4] < combinations[g][4]) {
            scores[location4][4]++
            scores[location1][4]++
            scores[location2][3]++
            scores[location3][3]++
        } else {
            scores[location4][5]++
            scores[location1][5]++
            scores[location2][5]++
            scores[location3][5]++
        }
        if (combinations[i][5] > combinations[g][5]) {
            scores[location4][8]++
            scores[location1][8]++
            scores[location2][9]++
            scores[location3][9]++
        } else if (combinations[i][5] < combinations[g][5]) {
            scores[location4][9]++
            scores[location1][9]++
            scores[location2][8]++
            scores[location3][8]++
        }  else {
            scores[location4][10]++
            scores[location1][10]++
            scores[location2][10]++
            scores[location3][10]++
        }
        

    }
}
for (let i = 0; i < scores.length; i++) {
    scores[i][6] = (Math.round(((scores[i][3] + (scores[i][5] * .5)) / (scores[i][3] + scores[i][4] + scores[i][5])) * 10000.00) / 100.00)
    scores[i][11] = (Math.round(((scores[i][8] + (scores[i][10] * .5)) / (scores[i][8] + scores[i][9] + scores[i][10])) * 10000.00) / 100.00)
    scores[i][12] = (scores[i][6] + scores[i][11])
}
scores.sort(function (a, b) {
    if (a[12] > b[12]) return -1;
    if (a[12] < b[12]) return 1;
    return 0;
});