import { useEffect, useState } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export default function TextScramble({ text, className }) {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let frame = 0;
        const length = text.length;
        const queue = [];

        for (let i = 0; i < length; i++) {
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            queue.push({ from: text[i], start, end, char: '' });
        }

        let animationFrame;

        const update = () => {
            let output = '';
            let complete = 0;
            for (let i = 0, n = queue.length; i < n; i++) {
                let { from, start, end, char } = queue[i];
                if (frame >= end) {
                    complete++;
                    output += from;
                } else if (frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = CHARS[Math.floor(Math.random() * CHARS.length)];
                        queue[i].char = char;
                    }
                    output += `<span class="opacity-50">${char}</span>`;
                } else {
                    output += from;
                }
            }

            setDisplayText(output);

            if (complete === queue.length) {
                cancelAnimationFrame(animationFrame);
            } else {
                frame++;
                animationFrame = requestAnimationFrame(update);
            }
        };

        update();

        return () => cancelAnimationFrame(animationFrame);
    }, [text]);

    return (
        <span
            className={className}
            dangerouslySetInnerHTML={{ __html: displayText }}
        />
    );
}
