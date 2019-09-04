
function Zone() {
  this.uuid;
  this.location_id;
  this.carrier_id;
  this.hub_id;
  this.zone_id;
  this.zone_parent_id;
  this.service_id;
  this.travel_time;
  this.travel_time_min;
  this.travel_time_max;
  this.zone_from;
  this.zone_to;
}

function Hub() {
  this.uuid;
  this.hub_desc;
}

function Zone() {
  this.uuid;
  this.zone_desc;
}

function MissingLocation() {
  this.postcode;
  this.state;
  this.suburb;
}


// Header Indexes
var carrierHeader = -1;
var zoneFromHeader = -1;
var zoneToHeader = -1;
var townHeader = -1;
var stateHeader = -1;
var parentHeader = -1;
var postcodeHeader = -1;
var countryHeader = -1;
var timeHeader = -1;
var maxTimeHeader = -1;
var minTimeHeader = -1;
var hubHeader = -1;
var serviceHeader = -1;

//Fixed Headers
var carrier;
var zoneFrom;
var zoneTo;
var town;
var state = "";
var parent = "";
var postcode;
var time;
var maxTime;
var minTime;
var service_id;
var country;

//Our final array of items
var CSVOutput = [];

var typeArray = [];

var papaResult = [];

var headerArray = [];

var missingLocations = [];
var missingZones = [];
var missingHubs = [];

var missingLCZ = [];

var pasteReady = 0;

var filename = '';

function findLocationByPostcode(postcode, country, town) {

  console.log('pct ' + postcode + country + town);

  if (!postcode || !country || !town)
    buildAlert(null, `${postcode || ''} ${country || ''} ${town || ''}`, 'missing-keys');

  let filteredArray = db_locations.filter(data => {
    return data.location_postcode == postcode && data.location_country == country && data.location_town == town.toUpperCase();
  })

  if (filteredArray.length < 1) {
    return "NO_LOCATION_FOUND"
  } else {
    return filteredArray[0].location_id;
  }

}

function findHubByDesc(hub) {

  if (db_hubs.filter(data => data.hub_desc === hub.toUpperCase())[0] !== undefined) {
    return db_hubs.filter(data => data.hub_desc === hub.toUpperCase())[0].hub_id
  }


}

function findZoneByDesc(zone) {

  if (db_zones.filter(data => data.zone_desc.toString().toUpperCase() === zone.toString().toUpperCase())[0] != undefined) {
    return db_zones.filter(data => data.zone_desc.toString().toUpperCase() === zone.toString().toUpperCase())[0].zone_id
  }

}

$(function () {

  $('#submit').click(function () {
    var files = $('#uploadbtn')[0].files;
    filename = files[0].name;
    console.log(files);
    if (!files[0].name.includes(".csv")) {
      buildAlert(null, "File must be CSV", "file-error");
      return false;
    }
    var config = buildConfig();

    $('#uploadbtn').parse({
      config: config,
      before: function (file, inputElem) {
        console.log("Parsing file:", file);
      },
      complete: function () {


      }
    });


  })
  $('#process').click(function () {

    let progress = document.getElementById('progress_card');

    progress.style.display = 'block';

    Object.keys(papaResult).map(async key => {

      let row = papaResult[key];

      let currentZone = new Zone();

      currentZone.uuid = GetUUID();

      // currentZone.location_id = findLocationByPostcode(row[postcodeHeader], 'AU');
      if (row[postcodeHeader]) {
        var zone_location = findLocationByPostcode(row[postcodeHeader].trim(), 'AU', row[townHeader].trim());
      }

      if (zone_location == 'NO_LOCATION_FOUND') {
        currentZone.location_id = false;
        missingLocations.push(row[postcodeHeader].trim() + '' + row[townHeader].trim() + '' + 'AU');
      } else {
        currentZone.location_id = zone_location;
      }

      let zone_id = findZoneByDesc(row[zoneToHeader].trim());

      if (zone_id === undefined) {
        currentZone.zone_id = false;
        missingZones.push(row[zoneToHeader].trim());
      } else {
        currentZone.zone_id = zone_id;
      }

      if (hubHeader != -1) {
        let hub_id = findHubByDesc(row[hubHeader].trim());
        if (hub_id === undefined) {
          currentZone.hub_id = false;
          missingHubs.push(row[hubHeader]);
        } else {
          currentZone.hub_id = hub_id;
        }
      }

      if (timeHeader != -1) {
        //let times =[];
        times = GetTravelTime(row[timeHeader]);
        console.log(times);
        currentZone.travel_time = times[0];
        currentZone.travel_time_max = times[1];
        currentZone.travel_time_min = times[2];

      }
      if (parentHeader != -1) {
        currentZone.zone_parent_id = findZoneByDesc(row[parentHeader]);
      }
      currentZone.carrier_id = carrier;

      currentZone.service_id = service_id;

      currentZone.zone_from = row[zoneFromHeader];
      currentZone.zone_to = row[zoneToHeader];


      if (currentZone.zone_id == false || currentZone.location_id == false || currentZone.hub_id == false) {
        missingLocation = new MissingLocation();

        missingLocation.suburb = row[townHeader];
        missingLocation.postcode = row[postcodeHeader];
        missingLocation.state = row[stateHeader];
        missingLCZ.push(missingLocation);
      } else {
        CSVOutput.push(currentZone);
      }


    })

    let lcz_out = document.getElementById('lcz_out');
    lcz_out.innerText = 'Successful: ' + CSVOutput.length + '  Failed: ' + missingLCZ.length;

    let zone_out = document.getElementById('zone_out');
    let unique_zone = [...new Set(missingZones)];
    zone_out.innerText = 'Total: ' + missingZones.length + 'Unique: ' + unique_zone.length;

    let hub_out = document.getElementById('hub_out');
    let unique_hub = [...new Set(missingHubs)];
    hub_out.innerText = 'Total: ' + missingHubs.length + 'Unique: ' + unique_hub.length;

    //progress.style.display = 'none';
    ProcessMissingZones();
    ProcessMissingHubs();
    ProcessMissingLCZ();

  })
  $('#process_carrier_times').click(function () {
    /*
        Export
            UUID
            Carrier
            Service
            ZoneID (from)
            ZoneID (to)
            TravelTime
            CreatedAt
    */

    Object.keys(papaResult).map(async key => {
      let row = papaResult[key];

      var currentZone = new Zone();

      //UUID
      currentZone.uuid = GetUUID();

      //Carrier
      currentZone.carrier_id = carrier;

      //Service
      currentZone.service_id = service_id;

      //ZoneFrom
      currentZone.zone_from = row[zoneFromHeader];

      //ZoneTo
      currentZone.zone_to = row[zoneToHeader];

      //Times
      if (timeHeader != -1) {
        let times = GetTravelTime(row[timeHeader]);
        if (!isNaN(times[0])) {
          currentZone.travel_time = times[0];
        } else if (!isNaN(times[1])) {
          currentZone.travel_time = times[0];
        } else {
          currentZone.travel_time = 'No Time Found';
        }

      }

      //Push to our array
      CSVOutput.push(currentZone);

    })
  })
  $('#process_extended_times').click(function () {
    /*
        Export
            Carrier
            Service
            ZoneID (from)
            LocationID (to)
            TravelTime
            TravelTimeMin
            TravelTimeMax
            Notes
            CreatedAt
    */
    Object.keys(papaResult).map(async key => {
      let row = papaResult[key];

      var currentZone = new Zone();

      //UUID
      currentZone.uuid = GetUUID();

      //Carrier
      currentZone.carrier_id = carrier;

      //Service
      currentZone.service_id = service_id;

      //ZoneFrom
      var zone_id = findZoneByDesc(row[zoneFromHeader].trim());
      if (zone_id === undefined) {
        currentZone.zone_id = false;
        missingZones.push(row[zoneFromHeader].trim());
      } else {
        currentZone.zone_id = zone_id;
      }

      //LocationTo
      if (row[postcodeHeader]) {
        var zone_location = findLocationByPostcode(row[postcodeHeader].trim(), 'AU', row[townHeader].trim());
      }

      if (zone_location == 'NO_LOCATION_FOUND') {
        currentZone.location_id = false;
        missingLocations.push(row[postcodeHeader].trim() + '' + row[townHeader].trim() + '' + 'AU');
      } else {
        currentZone.location_id = zone_location;
      }

      //Times
      if (timeHeader != -1) {
        let times = GetTravelTime(row[timeHeader]);
        currentZone.travel_time = times[0];
        currentZone.travel_time_max = times[1];
        currentZone.travel_time_min = times[2];
      }

      //Remove FALSE results
      if (currentZone.zone_id == false || currentZone.location_id == false || currentZone.hub_id == false) {

        missingLocation = new MissingLocation();

        missingLocation.suburb = row[townHeader];
        missingLocation.postcode = row[postcodeHeader];
        missingLocation.state = row[stateHeader];

        missingLCZ.push(missingLocation);

      } else {
        CSVOutput.push(currentZone);
      }

    })
  })
  $('#process_hub').click(function () {
    Object.keys(papaResult).map(async key => {
      let row = papaResult[key];
      let currentZone = new Zone();

      let zone_from_id = findZoneByDesc(row[zoneFromHeader]);

      if (zone_from_id === undefined) {
        currentZone.zone_id = false;
        missingZones.push(row[zoneFromHeader]);
      } else {
        currentZone.zone_id = zone_from_id;
      }

      if (hubHeader != -1) {
        let hub_id = findHubByDesc(row[hubHeader]);
        if (hub_id === undefined) {
          missingHubs.hub_id = false;
          missingHubs.push(row[hubHeader]);
        } else {
          currentHub.uuid = GetUUID();
          currentHub.hub_desc = row[hubHeader];

          CSVOutput.push(currentHub);
        }
      }

    })
  })

  $('#process_hub').click(function () {

    Object.keys(papaResult).map(async key => {
      let row = papaResult[key];
      let currentHub = new Hub();

      if (hubHeader != -1) {
        let hub_id = findHubByDesc(row[hubHeader]);
        if (hub_id === undefined) {
          missingHubs.hub_id = false;
          missingHubs.push(row[hubHeader]);
        } else {
          currentHub.uuid = GetUUID();
          currentHub.hub_desc = row[hubHeader];

          CSVOutput.push(currentHub);
        }
      }

    })
  })

  $('#reset').click(function () {
    CSVOutput = [];

    typeArray = [];

    missingLocations = [];
    missingZones = [];
    missingHubs = [];

    missingLCZ = [];
  })
  $('#elcz').click(function () {

    var blob = new Blob([export_location_carrier_zones()], { type: 'text/csv' });

    generateDownload(blob, 'download-btn', filename + '-locationsCarriersZones');

  })

  $('#ect').click(function () {

    var blob = new Blob([export_carrier_times()], { type: 'text/csv' });

    generateDownload(blob, 'download-btn', filename + '-carrierTimes');

  })

  $('#ecte').click(function () {

    var blob = new Blob([export_carrier_times_extended()], { type: 'text/csv' });

    generateDownload(blob, 'download-btn', filename + '-extendedCarrierTimes');


  })

  $('#emh').click(function () {

    var blob = new Blob([export_missing_hubs()], { type: 'text/csv' });

    generateDownload(blob, 'download-btn', '');

  })

  $('#dl_db').click(function () {

    updateCache();

  })

})

function buildConfig() {
  return {
    delimiter: ',',
    header: false,
    complete: completeFn,
    newline: "",    // auto-detect

  };

  function getLineEnding() {
    if ($('#newline-n').is(':checked'))
      return "\n";
    else if ($('#newline-r').is(':checked'))
      return "\r";
    else if ($('#newline-rn').is(':checked'))
      return "\r\n";
    else
      return "";
  }
}

//Called once csv parse is complete
function completeFn() {

  end = performance.now();
  if (!$('#stream').prop('checked')
    && !$('#chunk').prop('checked')
    && arguments[0]
    && arguments[0].data);
  var selects = document.getElementsByClassName('options');
  Array.from(selects).forEach((el) => {
    // Do stuff here
    let optionsUI = document.createElement('option');
    optionsUI.innerHTML = '--';
    el.append(optionsUI);
  });

  papaResult = arguments[0].data;
  papaResult[0].map(element => {
    var headerUl = document.getElementById('headers');
    var item = document.createElement('li');
    item.innerHTML = element;
    item.setAttribute('onclick', 'copyHeader(this);'); // for FF
    headerUl.appendChild(item);


    Array.from(selects).forEach((el) => {
      // Do stuff here
      let optionsUI = document.createElement('option');
      optionsUI.innerHTML = element;

      el.append(optionsUI);
    });


    var destroyKeys = document.getElementById('destroyKey');
    var item = document.createElement('option');
    item.innerHTML = element;
    destroyKeys.appendChild(item)
  })

  papaResult[1].map(element => {
    var headerUl = document.getElementById('example-row');
    var item = document.createElement('li');
    item.innerHTML = element;
    headerUl.appendChild(item);
  })

  document.title = papaResult.length + " rows to process 🔥";

  typeArray = papaResult[0];
  $('#basic-earl').typeahead({
    source: typeArray
  });

  headerArray = papaResult[0];
  papaResult.pop();
  papaResult.shift();
}

function copyHeader(inny) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(inny.innerText).select();
  document.execCommand("copy");
  $temp.remove();

  $.toast("Copied " + inny.innerText);
}

function GetTravelTime(input) {

  let times = [];

  if (isNaN(parseInt(input))) {

    switch (input.toLowerCase().trim()) {
      case 'overnight':
        times[0] = 1;
        times[1] = 1;
        times[2] = 1;
        return times;
        break;
      case 'same day':
        times[0] = 1;
        times[1] = 1;
        times[2] = 1;
        return times;
        break;
    }
  }

  if (input.length === 1) {

    times[0] = parseInt(input);
    times[1] = parseInt(input);
    times[2] = parseInt(input);
    console.log(input + ' ' + times);
    return times;
  }

  if (typeof (parseInt(input)) === 'number') {

    times[0] = parseInt(input);
    times[1] = parseInt(input);
    times[2] = parseInt(input);
    console.log(input + ' ' + times);
    return times;
  }

  let numberArray = input.replace(/\D+/g, ',');
  let x = numberArray.split(',');
  let stripped = parseInt(x[0]) + parseInt(x[1])

  if (parseInt(x[0]) <= parseInt(x[1])) {
    times[1] = parseInt(x[1]);
    times[2] = parseInt(x[0]);
  } else {
    times[1] = parseInt(x[0]);
    times[2] = parseInt(x[1]);
  }

  times[0] = Math.ceil(stripped / 2);

  return times;

}

function GetUUID() {

  var seed = Date.now();
  if (window.performance && typeof window.performance.now === "function") {
    seed += performance.now();
  }

  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (seed + Math.random() * 16) % 16 | 0;
    seed = Math.floor(seed / 16);

    return (c === 'x' ? r : r & (0x3 | 0x8)).toString(16);
  });

  return uuid;

}

function ProcessMissingZones() {
  let exportable = [];
  let unique_zone = [...new Set(missingZones)];
  unique_zone.map(function (element) {
    let newZone = new Zone();
    newZone.uuid = GetUUID();
    newZone.zone_desc = element;
    exportable.push(newZone);
  })

  let blob = new Blob([Papa.unparse(exportable)], { type: 'text/csv' });
  generateDownload(blob, 'zone_dl', 'missingZones');
}

function ProcessMissingHubs() {

  let exportable = [];
  let unique_hub = [...new Set(missingHubs)];
  unique_hub.map(function (element) {
    let newHub = new Hub();
    newHub.uuid = GetUUID();
    newHub.hub_desc = element;
    exportable.push(newHub);
  })

  let blob = new Blob([Papa.unparse(exportable)], { type: 'text/csv' });
  generateDownload(blob, 'hub_dl', 'missingHubs');
}

function ProcessMissingLCZ() {

  let blob = new Blob([Papa.unparse(missingLCZ)], { type: 'text/csv' });
  generateDownload(blob, 'lcz_dl', 'missingLCZ');
}

function export_location_carrier_zones() {

  let data = CSVOutput.map(element =>
    ({
      uuid: element.uuid,
      location_id: element.location_id,
      carrier_id: element.carrier_id,
      hub_id: element.hub_id,
      zone_id: element.zone_id,
      zone_parent_id: element.zone_parent_id
    })
  );
  return Papa.unparse(data);
}

function export_carrier_times() {

  //ctim_id: null, carrier_id, serivce_id, zone_from, zone_to, travel_time
  let data = CSVOutput.map(element =>
    ({
      uuid: element.uuid,
      carrier_id: element.carrier_id,
      service_id: element.service_id,
      zone_from: element.zone_from,
      zone_to: element.zone_to,
      travel_time: element.travel_time
    })
  );
  return Papa.unparse(data);
}

function export_carrier_times_extended() {
  console.log(CSVOutput);
  let data = CSVOutput.map(element =>
    ({
      uuid: element.uuid,
      carrier_id: element.carrier_id,
      service_id: element.service_id,
      zone_id: element.zone_id,
      location_id: element.location_id,
      travel_time: element.travel_time,
      travel_time_min: element.travel_time_min,
      travel_time_max: element.travel_time_max
    })
  );
  console.log(data);
  return Papa.unparse(data);
}


function export_missing_hubs() {

  let data = uniqueArray(CSVOutput, 'hub_desc')
  return Papa.unparse(data);
}

function generateDownload(blob, attachment, filename) {
  //Generate unique URL for the blob object
  var url = URL.createObjectURL(blob);

  //Date for file name
  var d = new Date();

  //Create new a element to be the download button
  var uid = Math.random();
  var a = document.getElementById(attachment);
  a.setAttribute("href", url);
  a.setAttribute("download", "ofs-zone-importer-" + filename + '-' + d.getDay() + "-" + d.getMonth() + "-" + ".csv");

  a.style.display = "block";
}

function uniqueArray(arr, key) {
  let existedKeys = []
  let newArr = []
  arr.map(a => {
    if (existedKeys.findIndex(k => k === a[key]) === -1) {
      existedKeys.push(a[key])
      newArr.push(a)
    }
  })
  return newArr
}
// options chunk page
function GetIndexOfHeader(input, id) {

  if (id == 'carrier') {
    carrierHeader = input;
  }
  if (id == 'zonefrom') {
    zoneFromHeader = headerArray.indexOf(input);
    if (zoneFromHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'zoneto') {
    zoneToHeader = headerArray.indexOf(input);
    zoneToHeader = headerArray.indexOf(input);
    if (zoneToHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'town') {
    townHeader = headerArray.indexOf(input);
    townHeader = headerArray.indexOf(input);
    if (townHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'state') {
    stateHeader = headerArray.indexOf(input);
    stateHeader = headerArray.indexOf(input);
    if (stateHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'postcode') {
    postcodeHeader = headerArray.indexOf(input);
    postcodeHeader = headerArray.indexOf(input);
    if (postcodeHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'country') {
    countryHeader = headerArray.indexOf(input);
    countryHeader = headerArray.indexOf(input);
    if (v == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'parent') {
    parentHeader = headerArray.indexOf(input);
    parentHeader = headerArray.indexOf(input);
    if (parentHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'time') {
    timeHeader = headerArray.indexOf(input);
    timeHeader = headerArray.indexOf(input);
    if (timeHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'maxtime') {
    maxTimeHeader = headerArray.indexOf(input);
    maxTimeHeader = headerArray.indexOf(input);
    if (maxTimeHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'mintime') {
    minTimeHeader = headerArray.indexOf(input);
    minTimeHeader = headerArray.indexOf(input);
    if (minTimeHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'hub') {
    hubHeader = headerArray.indexOf(input);
    hubHeader = headerArray.indexOf(input);
    if (hubHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'service_id') {
    serviceHeader = headerArray.indexOf(input);
    serviceHeader = headerArray.indexOf(input);
    if (serviceHeader == -1) {
      alert('No index found for ' + input);
    }
  }

}

function UpdateRawValues(input, id) {
  if (id == 'carrier') {
    carrier = input;
  }
  if (id == 'service_id') {
    service_id = input;
  }
  if (id == 'country') {
    country = input;
  }

  if (id == 'zoneto') {
    zoneToHeader = headerArray.indexOf(input);
    zoneToHeader = headerArray.indexOf(input);
    if (zoneToHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'town') {
    townHeader = headerArray.indexOf(input);
    townHeader = headerArray.indexOf(input);
    if (townHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'state') {
    stateHeader = headerArray.indexOf(input);
    stateHeader = headerArray.indexOf(input);
    if (stateHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'postcode') {
    postcodeHeader = headerArray.indexOf(input);
    postcodeHeader = headerArray.indexOf(input);
    if (postcodeHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'country') {
    countryHeader = headerArray.indexOf(input);
    countryHeader = headerArray.indexOf(input);
    if (v == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'parent') {
    parentHeader = headerArray.indexOf(input);
    parentHeader = headerArray.indexOf(input);
    if (parentHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'time') {
    timeHeader = headerArray.indexOf(input);
    timeHeader = headerArray.indexOf(input);
    if (timeHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'maxtime') {
    maxTimeHeader = headerArray.indexOf(input);
    maxTimeHeader = headerArray.indexOf(input);
    if (maxTimeHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'mintime') {
    minTimeHeader = headerArray.indexOf(input);
    minTimeHeader = headerArray.indexOf(input);
    if (minTimeHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'hub') {
    hubHeader = headerArray.indexOf(input);
    hubHeader = headerArray.indexOf(input);
    if (hubHeader == -1) {
      alert('No index found for ' + input);
    }
  }
  if (id == 'service_id') {
    serviceHeader = headerArray.indexOf(input);
    serviceHeader = headerArray.indexOf(input);
    if (serviceHeader == -1) {
      alert('No index found for ' + input);
    }
  }
}


function destroyKey() {

  var key = papaResult[0].indexOf(document.getElementById('destroyKey').value);
  var value = document.getElementById('destroyValue').value;

  console.log(key + ' ' + value);
  console.log(papaResult.length);

  for (var i = papaResult.length - 1; i--;) {
    if (papaResult[i][key] === value) papaResult.splice(i, 1);
  }

  document.title = papaResult.length + " rows to process 🔥";
}


$(document).ready(function () {
  console.log("yay jquery is here! 😩");

  $('#basic-earl').typeahead({
    source: typeArray
  });

});



//Create our alert to be shown
function buildAlert(type, message, source) {
  var alert = document.createElement('div');
  alert.setAttribute('class', 'alert alert-danger');
  alert.setAttribute('role', 'alert');
  alert.setAttribute('id', source);
  if (source == "key") {
    alert.innerHTML = 'Error: the key ' + message + ' could not be found on the system. ';
  } else if (source == "file-error") {
    alert.innerHTML = 'Error:' + message + ' Please only upload CSV files';
  } else if (source == "missing-keys") {
    alert.innerHTML = 'Error: ' + message + ' did not validate';
  } else if (source == "cache") {
    alert.innerHTML = 'Success: ' + message + '';
    alert.setAttribute('class', 'alert alert-success');
  }

  document.body.insertBefore(alert, document.body.firstChild);
  //document.body.append(alert);
}

function updateCache() {
  axios.get('/api.php?q=dl_zones')
    .then(function (response) {
      console.log(response);
      if (response.data != false) {
        buildAlert('', 'Zones Updated', 'cache');
      }

    })
    .catch(function (error) {
      console.log(error);
    });

  axios.get('/api.php?q=dl_hub')
    .then(function (response) {
      console.log(response);
      if (response.data != false) {
        buildAlert('', 'Hubs Updated', 'cache');
      }

    })
    .catch(function (error) {
      console.log(error);
    });

  axios.get('/api.php?q=dl_location')
    .then(function (response) {
      console.log(response);
      if (response.data != false) {
        buildAlert('', 'Locations Updated', 'cache');
      }

    })
    .catch(function (error) {
      console.log(error);
    });
}


