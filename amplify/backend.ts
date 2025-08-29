import { defineBackend } from '@aws-amplify/backend';
import { Stack } from ‘aws-cdk-lib’;

import { Bucket } from 'aws-cdk-lib/aws-s3';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';

const branch = process.env.AWS_BRANCH || 'dev';

const backend = defineBackend({
  auth,
  data,
  storage
});

// const storageStack = Stack.of(storage);

// Replace auto-generated bucket with existing one
const existingBucket = Bucket.fromBucketName(
  this,
  'ExistingBucket',
  branch === 'main' ? 'existing-prod-bucket-name': 'existing-dev-bucket-name'
);

backend.storage.resources.bucket = existingBucket;

export default backend;
