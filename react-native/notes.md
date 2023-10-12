## what is react native and how is it different from react?

- well, as the name applies, it is related to React.js.
- and with React.js and React Native, we can build real React Native based mobile apps for iOS and Android, which are real apps we can distribute through the app stores and apps that can be used by any user with an iOS or Android device.
- now React.js is a library that's independent from react native
- React.js is a JavaScript library for building UIs. and it is typically used for web development.
- that's the environment for which it was first created.
- but actually, if you worked with React.js, you know that there, it's actually another library known as the ReactDOM library that adds the actual web support because React itself, the library React itself, without React DOM is platform-agnostic, which means you can use React in conjunction with React DOM to build web apps, but React the library itself, actually does not care about the underlying platform.
- React just gives you tools for managing state, for building virtual component trees, and then you need an extra library like React DOM for translating the result React produced to an actual platform like the browser.
- now, React Native is basically an alternative to React DOM, therefore.
- React Native gives you a collection of special react components, which you can use in our JSX code.
- so React Native ships with built-in components you can use.
- and those components are then compiled to native UI elements for the iOS and Android platforms, and React Native will also take care about this compilation step.
- in addition, React Native also exposes certain native platform APIs like using the device camera so that you can use such features in your JavaScript code even though you need to tap into native device APIs for that. And therefore in the end, React Native is like React DOM.
- It just does not target the web, the browser as a platform, but instead iOS and Android.
- And React Native gives you all the components and the APIs you need to interact with those platforms and to build apps for those platforms.
- That is what React Native is all about.
- and therefore, in order to work with React Native, we also must know React.js because you will write your code in React.js and then just use these extra React Native components and APIs in your React JavaScript code to produce those native mobile apps for iOS and Android.

## under the hood

-
