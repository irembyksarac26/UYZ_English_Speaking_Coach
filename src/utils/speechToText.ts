export class SpeechToText {
  private recognition: any;

  constructor(onResult: (text: string) => void, onEnd: () => void) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      this.recognition.onend = () => {
        onEnd();
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        onEnd();
      };
    }
  }

  start() {
    if (this.recognition) {
      try {
        this.recognition.start();
      } catch (e) {
        console.warn('Speech recognition already started');
      }
    } else {
      alert('Speech recognition is not supported in this browser. / Ses tanıma bu tarayıcıda desteklenmiyor.');
    }
  }

  stop() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}
