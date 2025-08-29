import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';

const branch = process.env.AWS_BRANCH || 'dev';

defineBackend({
  auth,
  data,
  storage
});
