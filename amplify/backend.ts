import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { devStageStorage } from './storage/dev-stage-resource';
import { prodStorage } from './storage/prod-resource';

const branch = process.env.AWS_BRANCH || 'dev';


defineBackend({
  auth,
  data,
  storage: branch === 'main' ? prodStorage : devStageStorage
});
