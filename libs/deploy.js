
import s3 from "./s3.js"

//s3.listObjects("").then((res) => {
//    console.log(res);
//}).catch((e) => { console.log(e);})

s3.deployDistToS3();