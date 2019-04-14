module.exports = (function(){
    let aws = require('aws-sdk');
    let config = require('./Utils/config');
    let bucket = 'car-dealership';

    let currentProfile = null;
    aws.config.update({
        region: 'us-east-2',
        credentials: new aws.Credentials(config.akid, config.secret, null)
    });

    let S3 = new aws.S3({
        apiVersion: '2006-03-01',
        params: {Bucket: bucket}
    });

    function createProfileOnS3(username, parkingLot, callback){
        currentProfile = "Profiles/" + username + '/';
        S3.headObject({Key: currentProfile}, function (err) {
            if(!err){
                return alert('Album already exists');
            }
            if(err.code !== 'NotFound'){
                return alert('Error creating album: ' + err.message);
            }
            S3.putObject({Key: currentProfile}, function (err) {
                if(err){
                    return alert('Error creating album: ' + err.message);
                }
                console.log("Profile uploaded to S3");

                let profile = {
                    username: username,
                    carsSold: 0,
                    bankAccount: 100000,
                    parkingLot: parkingLot.parkingLot
                };

                S3.upload({
                    Bucket: bucket,
                    Key: currentProfile + "profileData.json",
                    Body: JSON.stringify(profile)
                }, (err, data) =>{
                    if(err){
                        alert('Problem creating profile data');
                    }
                    console.log("Profile Data uploaded");
                    callback(currentProfile);
                });
            });
        });
    }

    function getProfileFromS3(key, callback) {
        currentProfile = key;
        S3.getObject({Key: currentProfile + "profileData.json"}, function(err, data){
            let blob = new Blob([data.Body], {type: "application/octet-stream"});
            let reader = new FileReader();
            reader.onload = function (event) {
                callback(JSON.parse(reader.result));
            };
            reader.readAsText(blob);
        });
    }

    function saveProfileInS3(profile, callback){

        S3.upload({
            Bucket: bucket,
            Key: currentProfile + "profileData.json",
            Body: JSON.stringify(profile)
        }, (err) =>{
            if(err){
                alert('Problem creating profile data');
            }
            console.log("Profile Data saved");
            callback();
        });
    }

    return {
        createProfileOnS3: (username, parkingLot, callback) => {
            return createProfileOnS3(username, parkingLot, callback);
        },

        getProfileFromS3: (key, callback) => {
            return getProfileFromS3(key, callback);
        },

        saveProfileInS3: (profile, callback) => {
            return saveProfileInS3(profile, callback);
        }
    }
})();