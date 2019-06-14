const Lautfm = require('lautfm')
const $ = require('jquery')
const laut = new Lautfm()
let stationList = $('#station-list')
let player = $('audio').get(0)


laut.getStations({by: 'letter', term: 'e'})
.then((stations)=>{
    console.log(stations)
    if(stations){
        stations.forEach(station => {
            let stationRow = 
            `
            <li class="list-group-item" ondblclick="playStream('${station.stream_url}', this)">
                <img class="img-circle media-object pull-left" src="${station.images.station_120x120}" width="32" height="32">
                <div class="media-body">
                    <strong>${station.name}</strong>
                    <p>${station.description}</p>
                </div>
            </li>
            `

            stationList.append(stationRow)
        });
    }
}).catch((err)=>{
    console.log(err)
})

function playStream(url, li){
    let allStations = $('.list-group-item')
    allStations.removeClass('active')
    $(li).addClass('active')
    player.src = url
    player.load()
    player.play()
}