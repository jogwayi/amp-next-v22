import { defineBackend } from '@aws-amplify/backend';
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

console.log("Bucket", JSON.stringify(backend.storage.resources.bucket))

backend.storage.resources.bucket = new s3.Bucket(backend.storage.resources.bucket, 'MyCustomBucket', {
      bucketName: exactBucketName      
    });
// backend.storage.resources.bucket.addPropertyOverride('BucketName', exactBucketName);
