import React, { Component } from 'react';
import './upload.css';
import Camera, { FACING_MODES, IMAGE_TYPES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import * as AWS from 'aws-sdk';

const characterToDigitMap = {
    "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
    "A": 10, "B": 11, "C": 12, "D": 13, "E": 14, "F": 15, "G": 16, "H": 17, "I": 18, "J": 19,
    "K": 20, "L": 21, "M": 22, "N": 23, "O": 24, "P": 25, "Q": 26, "R": 27, "S": 28, "T": 29,
    "U": 30, "V": 31,  "W": 32, "X": 33, "Y": 34, "Z": 35, "<": 0
}

function checkDigitValidate(characterString, checkingDigit) {
    var sum = 0;
    for (var i = 0; i < characterString.length; i++) {
        if (i%3 === 0) {
            sum += characterToDigitMap[characterString[i]] * 7;
        }
        if (i%3 === 1) {
            sum += characterToDigitMap[characterString[i]] * 3;
        }
        if (i%3 === 2) {
            sum += characterToDigitMap[characterString[i]] * 1;
        }
    }
    if (sum%10 == checkingDigit) {
        return "pass";
    }
    return "fail";
}

class Upload extends Component {
    accessKeyId = "AKIAJ47EG4S3EKRX2SYQ";
    secretAccessKey = "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";
    region = "ap-northeast-1";
    
    constructor(props) {
        super(props);
        this.showSummary = this.showSummary.bind(this);
    }

    showSummary(scan){
        this.props.setScanResult(scan)
        this.props.view('scanResult');
    }

    onTakePhoto (dataUri) {
        // AWS credentials? lol
        console.log('takePhoto', dataUri);
        let s3 = new AWS.S3({
            accessKeyId:"AKIAJ47EG4S3EKRX2SYQ",
            secretAccessKey:"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",
            region: "ap-northeast-1"
        });

        function dataURItoBlob(dataURI) {
            // convert base64 to raw binary data held in a string
            // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
            var byteString = atob(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);

            // create a view into the buffer
            var ia = new Uint8Array(ab);

            // set the bytes of the buffer to the correct values
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            // write the ArrayBuffer to a blob, and you're done
            var blob = new Blob([ab], {type: mimeString});
            return blob;

        }

        let timeSpecific = Date.now().toString(10)
        let s3params = {
            Bucket: "latekscans",
            Key: `images/${timeSpecific}.jpg`, // generate a new name for the picture with username and time when photo taken(?)
            Body: dataURItoBlob(dataUri), //specific the path on this func call
            ContentType: "image/jpeg"        
        }

        s3.putObject(s3params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            } else {
                console.log("uploaded");
                console.log(data);
                let rekognition = new AWS.Rekognition({
                    accessKeyId:"AKIAJ47EG4S3EKRX2SYQ",
                    secretAccessKey:"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",
                    region: "ap-northeast-1"
                });

                let rekogparams = {
                    Image: {
                        S3Object:{
                            Bucket: "latekscans",
                            Name: `images/${timeSpecific}.jpg`, // must use the same name from the s3 store can get it from a local var(?)
                        }
                    }
                }

                rekognition.detectText(rekogparams, (err, data) => {
                    if (err) {
                        console.log(err, err.stack);
                    } else {
                        var counter = 0;
                        var lineStringArr = [];
                        if (data) {
                            for (let prediction of data.TextDetections) {
                                if (prediction.DetectedText.length > 30) {
                                    counter++;
                                    if (counter > 2) {
                                        break;
                                    }
                                    // console.log(prediction.Id);
                                    console.log(counter.toString(10) + ". " + prediction.DetectedText);
                                    lineStringArr.push(prediction.DetectedText);
                                    if (prediction.Confidence < 90) {
                                        console.log("line " + counter.toString(10) + " confidence low: " + prediction.Confidence);
                                    }
                                }
                            }
                            console.log(lineStringArr);
                            console.log(`country: ${lineStringArr[0].slice(2, 5)}`);
                            var tempNameSec = "";
                            var fullName = [];
                            for (var i = 5; i < lineStringArr[0].length; i++) {
                                if (lineStringArr[0][i] !== "<") {
                                    tempNameSec += lineStringArr[0][i];
                                } else {
                                    if (tempNameSec !== "") {
                                        fullName.push(tempNameSec);
                                        tempNameSec = "";
                                    } else {
                                        continue;
                                    }
                                }
                            }
                            console.log(`fullname: ${fullName.toString()}`);
                            var nameChecker = "";
                            for (var i = 5; i < lineStringArr[0].length; i++) {
                                if (lineStringArr[0][i] !== "<") {
                                    continue;
                                } else {
                                    if (lineStringArr[0][i + 1] == "<") {
                                        nameChecker = "no";
                                        break;
                                    } else {
                                        nameChecker = "an"
                                        break;
                                    }
                                }
                            }
                            console.log(`There is ${nameChecker} error for name readed`)
                            console.log(`Passport No.: ${lineStringArr[1].slice(0, 9)}`);

                            console.log(`Nationality (3-digit): ${lineStringArr[1].slice(10, 13)}`);

                            console.log(`Date of Birth (YYMMDD): ${lineStringArr[1].slice(13, 19)}`);

                            console.log(`Sex: ${lineStringArr[1][20]}`);
                            console.log(`Expiration Date of Passport(YYMMDD): ${lineStringArr[1].slice(21, 27)}`);

                            console.log(`Personal number: ${lineStringArr[1].slice(29, 42)}`);

                            console.log(`1st checking ${checkDigitValidate(
                                lineStringArr[1].slice(0, 9),
                                lineStringArr[1][9]
                            )}`);
                            console.log(`2nd checking ${checkDigitValidate(
                                lineStringArr[1].slice(13, 19),
                                lineStringArr[1][19]
                            )}`);
                            console.log(`3rd checking ${checkDigitValidate(
                                lineStringArr[1].slice(21, 27),
                                lineStringArr[1][27]
                            )}`);
                            console.log(`4th checking ${checkDigitValidate(
                                lineStringArr[1].slice(28, 42),
                                lineStringArr[1][42]
                            )}`);
                            console.log(`final checking ${checkDigitValidate(
                                lineStringArr[1].slice(0, 10) + lineStringArr[1].slice(13, 20) + lineStringArr[1].slice(21, 43),
                                lineStringArr[1][43]
                            )}`);
                        }
                    }
                })
            }
        })
        let scan = null;
        this.showSummary(scan);
    }

    render() {
        return (
            <div className="upload">
                <div className={"topNav"}>
                    <h1>Scan & Upload</h1>
                </div>
                <div className={"cam-wrapper"}>
                    <Camera
                        onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
                        idealFacingMode = {FACING_MODES.ENVIRONMENT}
                        isImageMirror = {false}
                        imageType = {IMAGE_TYPES.JPG}
                    />
                </div>
            </div>
        );
    }
}

export default Upload;
