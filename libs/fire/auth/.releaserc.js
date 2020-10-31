const { createReleaseConfigWithScopeFilter } = require('../../../tools/release')

// const releaserc = createReleaseConfigWithScopeFilter({
//   projectScope: 'nx-fire',
//   projectRoot: 'libs/fire/auth',
//   buildOutput: 'dist/libs/fire/auth',
// })
// console.log(JSON.stringify(releaserc))
const releaserc = createReleaseConfigWithScopeFilter({
  projectScope: 'nx-fire',
  projectRoot: 'libs/fire/auth',
  buildOutput: 'dist/libs/fire/auth',
})
console.log(JSON.stringify(releaserc))
module.exports = releaserc
// module.exports = createReleaseConfigWithScopeFilter({
//   projectScope: 'nx-fire',
//   projectRoot: 'libs/fire/auth',
//   buildOutput: 'dist/libs/fire/auth',
// })
