import checkOwner from './checkOwner.js';

const pinPermissions = {
  update: {
    roles: ['admin', 'editor'],
    owner: checkOwner,
  },
  delete: {
    roles: ['admin', 'editor'],
    owner: checkOwner,
  },
};

export default pinPermissions;