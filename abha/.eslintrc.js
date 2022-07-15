module.exports = {
  parser: "babel-eslint",
  pulgin:[
    'react',
    "eslint-plugin-prettier",
    "eslint-plugin-react",
  ], 
  extends: [
    "prettier",
    "prettier/react"
],
parserOptions: {
  "ecmaFeatures": {
      "jsx": true
  },
  "sourceType": "module"
},

  root: true,
  extends: '@react-native-community',
  // requireConfigFile: false,
};
