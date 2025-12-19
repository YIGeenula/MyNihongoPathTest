(function () {
        function getJapaneseVoice() {
            const voices = window.speechSynthesis.getVoices();
            return voices.find(v =>
                (v.lang || '').toLowerCase().startsWith('ja') ||
                (v.name || '').toLowerCase().includes('japan')
            ) || null;
        }

        function speakJapanese(text) {
            if (!('speechSynthesis' in window)) {
                alert('Speech synthesis is not supported in this browser.');
                return;
            }
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            const voice = getJapaneseVoice();
            if (voice) utterance.voice = voice;
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            window.speechSynthesis.speak(utterance);
        }

        function bindButtons() {
            document.querySelectorAll('.jp-speak[data-text]').forEach(btn => {
                btn.addEventListener('click', function () {
                    const text = this.getAttribute('data-text');
                    if (text) speakJapanese(text);
                });
            });
        }

        // Voices load asynchronously in some browsers
        if ('speechSynthesis' in window) {
            window.speechSynthesis.onvoiceschanged = bindButtons;
        }
        document.addEventListener('DOMContentLoaded', bindButtons);
    })();