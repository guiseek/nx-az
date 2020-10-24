const { createReleaseConfigWithScopeFilter } = require('../../../tools/release')

// const releaserc = createReleaseConfigWithScopeFilter({
//   projectScope: 'fire-auth',
//   projectRoot: 'libs/fire/auth',
//   buildOutput: 'dist/libs/fire/auth',
// });
// console.log(releaserc);
module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'fire-auth',
  projectRoot: 'libs/fire/auth',
  buildOutput: 'dist/libs/fire/auth',
})
