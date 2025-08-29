import { defineStorage } from '@aws-amplify/backend';

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
