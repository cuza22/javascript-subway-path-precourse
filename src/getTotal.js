function findLineOfTwoStations(data, departure, arrival) {
    let line = false;
    for (let i=0; i<data.length; i++) {
        if (data[i].includes(departure) && data[i].includes(arrival)){
            line = data[i];
        }
    }
    return line;
}

function betweenStations(line, departure, arrival, type){
    departure_idx = line.getIndexOf(departure);
    arrival_idx = line.getIndexOf(arrival);
    return line[Math.abs(departure_idx + arrival_idx)/2][type];
}

function totalBetweenStations(data, path, type) {
    let total=0;
    for (let i=0; i<path.length-1; i++) {
        const departure = path[i];
        const arrival = path[i+1];
        total += betweenStations(findLineOfTwoStations(data, departure,arrival, type))
    }
    return total;
}
