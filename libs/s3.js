import AWS from 'aws-sdk';
import fs from 'fs';
import walk from "walk"
import mime from 'mime-types'

const s3 = {

    deployDistToS3() {
        var files   = [];
        
        // Walker options
        var walker  = walk.walk('./dist', { followLinks: false });
        
        walker.on('file', function(root, stat, next) {
            // Add this file to the list of files
            files.push(root + '/' + stat.name);
            next();
        });
        
        walker.on('end', async function() {
            //console.log(files);
            console.log(files.length+" file(s) found...");
            for(let i in files) {
                let fileDest = files[i].substr(7);
                let filePath = files[i];
                let mimeType = mime.lookup(files[i]);
                console.log(`deploy [${filePath}] with mime type: ${mimeType}`);
                await s3.uploadFile(fileDest,filePath,mimeType)
            }
            console.log("DONE!");
        });
    },

    uploadFile: async (fileName, filePath, mimeType) => {
        const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: process.env.AWS_REGION });
        const fileContent = fs.readFileSync(filePath);

        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: fileName,
            Body: fileContent,
            ContentType: mimeType
        };

        const data = await s3.upload(params).promise();
        return data.Location;
    },

    listObjects: async (filter) => {
        const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: process.env.AWS_REGION });
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Prefix: decodeURIComponent(filter)
        };

        const result = await s3.listObjectsV2(params).promise();
        return result.Contents.map(item => item.Key);
    }
}

export default s3;