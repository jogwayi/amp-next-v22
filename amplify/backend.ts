import { defineBackend } from '@aws-amplify/backend';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';


const branch = process.env.AWS_BRANCH || 'dev';

const backend = defineBackend({
  auth,
  data,
  storage
});

const exactBucketName = branch === 'main' ? 'existing-prod-bucket-name': 'existing-dev-bucket-name'

console.log("Bucket", JSON.stringify(Object.keys(backend.storage.resources.bucket)), backend.storage.resources.bucket.stack._stackName)

backend.storage.resources.bucket = new s3.Bucket(backend.storage.resources.bucket, backend.storage.resources.bucket.stack._stackName, {
      bucketName: exactBucketName      
    });
// backend.storage.resources.bucket.addPropertyOverride('BucketName', exactBucketName);
