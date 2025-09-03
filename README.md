# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Video Performance

We've implemented a custom `VideoSmart` component to optimize video performance across the site. This component follows best practices for video loading and playback.

### Features

1. **Lazy Loading**: Videos are only loaded when they enter the viewport using IntersectionObserver
2. **Intelligent Preloading**: Uses `preload="none"` by default, with fallback to `preload="metadata"` for older browsers
3. **Single Playback**: Only one video plays at a time using a simple event bus system
4. **Hover/Clicl Interaction**: Videos can be configured to play on hover or click
5. **Accessibility**: Supports keyboard navigation and respects reduced motion preferences
6. **Performance Monitoring**: Logs IntersectionObserver events in development mode

### Usage

```jsx
import { VideoSmart } from './components';

<VideoSmart
  src="./path/to/video.mp4"
  poster="./path/to/poster.jpg"
  preload="none"
  autoPlayOnHover={true}
  autoPlayOnClick={true}
  muted={true}
  loop={true}
  controls={false}
  className="custom-video-class"
/>
```

### Encoding Guidelines

For optimal performance, follow these encoding guidelines:

1. **Format**: Use H.264/AAC MP4
2. **Frame Rate**: Target 24–30 fps
3. **Resolution**: 
   - Background loops: 720p or lower
   - Feature videos: Up to 1080p
4. **Bitrate**: 1–3 Mbps for most content
5. **Optimization**: Enable faststart/moov at front (MP4 faststart) so poster shows quickly
6. **Duration**: Keep loops short (2–6s) for better caching
7. **Reuse**: Reuse assets across cards when possible to leverage browser cache

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | required | Path to video file |
| poster | string | optional | Path to poster image |
| preload | string | "none" | Preload setting ("none", "metadata", "auto") |
| autoPlayOnHover | boolean | true | Play video on hover |
| autoPlayOnClick | boolean | true | Play video on click |
| muted | boolean | true | Mute video by default |
| loop | boolean | true | Loop video |
| controls | boolean | false | Show video controls |
| className | string | "" | Custom CSS classes |

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
