import { defineStorage } from '@aws-amplify/backend';

const branch = process.env.AWS_BRANCH || 'dev';
export const storage = defineStorage({
  name: 'myAppStorage',
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

// Add bucket naming override
storage.resources.bucket.addPropertyOverride('BucketName', {
  'Fn::If': [
    { 'Fn::Equals': [{ Ref: 'AWS::StackName' }, 'amp-next-v22-main'] },
    'myapp-storage-prod',
    'myapp-storage-dev-stage'
  ]
});
