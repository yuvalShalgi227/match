import Sketch from 'react-p5';
import p5 from "p5";

const DraggableLetter = ({ letter }:{letter:string}) => {
    let x = 50;
    let y = 50;
    let isDragging = false;

    const setup = (p5: p5, canvasParentRef: Element) => {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
        x = p5.width / 2;
        y = p5.height / 2;

    };

    const draw = (p5: p5) => {
        p5.background(200);
        const d = p5.dist(x, y, p5.mouseX, p5.mouseY);

        // If we're dragging the letter, update its position
        if (isDragging) {
            x = p5.mouseX;
            y = p5.mouseY;
        }

        // When mouse is pressed, check if it's on the letter
        if (p5.mouseIsPressed && d < 32) { // 32 is half of our text size
            isDragging = true;
        }

        // When mouse is released, stop dragging
        if (!p5.mouseIsPressed) {
            isDragging = false;
        }

        p5.text(letter, x, y);
        p5.textSize(64);
        p5.textFont('Georgia');

    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Sketch setup={setup} draw={draw} />;
};

export default DraggableLetter;
