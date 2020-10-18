import { normalizePath } from './fire-auth.utilities';

describe('normalizePath', () => {
  it('should create an instance', () => {
    const path = ['collection','hash!@#','subcollection'];
    const normalized = normalizePath(path)
    expect(typeof normalized).toEqual('string')
  });
});
