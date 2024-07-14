///** @type {import('ts-jest').JestConfigWithTsJest} **/
//export default {
// testEnvironment: "node",
// transform: {
//  "^.+.tsx?$": ["ts-jest",{}],
//  '^.+\\.css$': 'jest-css-modules',
// },
//};
//module.exports = {
// preset: 'ts-jest',
//  testEnvironment: 'node',
//  transform: {
//    '^.+\\.tsx?$': 'babel-jest',
//   '^.+\\.css$': 'jest-css-modules',
// },
//  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//};
export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    //      "\\.(s?css|less)$": "identity-obj-proxy",
  },
};
