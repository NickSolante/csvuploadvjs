function GetLocation(csvTown, csvPostcode, csvState) {

    return new Promise((resolve, reject) => {
        axios.post('/api.php?q=location&town='+csvTown+'&state='+csvState+'&postcode='+csvPostcode)
                .then(function (response) {
                    console.log(response.data.location_id);

                    if (response.data != false){
                        resolve(response.data.location_id)
                    }

                })
                .catch(function (error) {
                    reject(error)
                });
    })

}

function GetZoneId(csvZone) {

    if (csvZone == '' || csvZone == undefined){
        return "";
    }

    return new Promise((resolve, reject) => {
        axios.post('/api.php?q=zone&zone='+csvZone, {
            zone: csvZone
        })
            .then(function (response) {
                console.log(response);

                if (response.data != false){
                    resolve(response.data.zone_id)
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    })
}

function GetHubId(csvHub) {

    if (csvHub == '' || csvHub == undefined) {
        return "";
    }
    return new Promise((resolve, reject) => {
        axios.post('/api.php?q=hub&hub='+csvHub, {
            // zone: csvZone
        })
            .then(function (response) {
                console.log(response.data);

                if (response.data != null){
                    resolve(response.data.hub_id)
                } else {
                    resolve('false');
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    })

}