import { defineStorage } from '@aws-amplify/backend';
import { Stack } from 'aws-cdk-lib';

import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';

const branch = process.env.AWS_BRANCH || 'dev';

const storage = defineStorage({
  name: branch === 'main' ? 'prodStorage' : 'devStageStorage',
  access: (allow) => ({
    'public/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    'protected/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],
    'private/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete'])
    ]
  })
});
//const s3Bucket = storage.resources.bucket;

// const cfnBucket = s3Bucket.node.defaultChild as CfnBucket;

const storageStack = Stack.of(storage);
const existingBucket = Bucket.fromBucketName(
  storageStack,
  'ExistingBucket',
  branch === 'main' ? 'existing-prod-bucket-name': 'existing-dev-bucket-name'
);

storage.resources.bucket = existingBucket;

export  default storage
