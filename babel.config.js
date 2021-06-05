module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@view': 'ExerciseTimer/view',
          '@utils': 'ExerciseTimer/view/utils',
          '@components': 'ExerciseTimer/view/components',
          '@store': 'ExerciseTimer/view/store',
        },
      },
    ],
  ],
};
