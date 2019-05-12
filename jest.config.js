module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "roots": ["./src", "./test"],
  "testRegex": ".spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "coverageDirectory": "./coverage",
  "testEnvironment": "node"
}
