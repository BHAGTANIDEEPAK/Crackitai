# [Crackit AI](https://crackitai.netlify.app/)

This is an AI-powered interview practice web application that allows users to record their voice responses to predefined interview questions, transcribe them in real-time, and receive feedback based on their responses. The feedback is generated using AI, offering constructive suggestions and ratings for improvement. The app uses browser APIs for media recording, voice recognition, and video capturing..

### `Features`

`Real-Time Voice Recording`: Users can record their answers to interview questions using their device's microphone.\

`Speech-to-Text Transcription`: The app converts voice responses to text in real-time, displaying interim results and saving the final transcription.\

`AI-Powered Feedback`: The application sends the user's answers to an AI model to provide feedback, corrections, and ratings.\

`Video Recording`: Captures video using the user's webcam to simulate real interview conditions.\

`Progress Tracking`: Allows users to move through a list of predefined questions, with the ability to revisit or finish once all questions are answered.

### `Tech Stack`

`React`: Frontend framework used for building the UI.\

`TypeScript`: Adds static typing to JavaScript for improved code quality.\

`Web APIs`: Utilizes Web Speech API for speech recognition and Media Recorder API for video and audio recording.\

`Google Gemini API`: For generating AI-based feedback on the user's answers.\

`Axios`: For making HTTP requests to the AI API.

## Future Enhancements

Allow users to upload their own custom interview questions.\
Improve mobile browser support for media recording and speech recognition.\
Add more detailed feedback and suggestions from the AI.\
Enable recording and saving user interview sessions for future review.\
