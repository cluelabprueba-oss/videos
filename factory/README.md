# ClueLab content factory (Remotion + Rough.js)
Restore: `cd factory && npm i remotion@4 @remotion/cli@4 @remotion/renderer@4 @remotion/bundler@4 react@18 react-dom@18 roughjs`
Pipeline per mystery (see src/): `mysteries.js` (spec + narration segments split by ` || `) -> ElevenLabs TTS (NARRATOR ROB, eleven_v4) -> `audioprep.py` (silence trim, atempo, faster-whisper word timing) -> `mkprops.js` -> `render.sh` (Remotion, 1080x1920@30) -> `mux.js` (narration + eleven_music_v2_5 bed + eleven_text_to_sound_v2 SFX, loudnorm, AAC) -> `qc.sh`.
Raw audio/music/SFX are ElevenLabs outputs (flow JlnVwo5xIRylyPEfomsi) and are not stored here. Logo: public/cluelab_logo.png (official, unmodified).
