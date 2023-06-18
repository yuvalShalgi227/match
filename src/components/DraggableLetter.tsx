import Sketch from 'react-p5';
import p5 from "p5";

const DraggableLetter = ({ letters }:{letters:string}) => {

    const lettersObjects = letters.split('').map((letter) => {
        return { letter, x: 0, y: 0, isDragging: false };
    }
    );

    const setup = (p5: p5, canvasParentRef: Element) => {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
        lettersObjects.forEach((lettersObjects,index) => {
            lettersObjects.x= p5.width / 2 + index * 50
            lettersObjects.y= p5.height / 2;
        });

    };

    const draw = (p5: p5) => {
        p5.background(200);

        lettersObjects.forEach((lettersObjects) => {
            const d = p5.dist(lettersObjects.x, lettersObjects.y, p5.mouseX, p5.mouseY);

            // If we're dragging the letter, update its position
            if (lettersObjects.isDragging) {
                lettersObjects.x = p5.mouseX;
                lettersObjects.y = p5.mouseY;
            }

            // When mouse is pressed, check if it's on the letter
            if (p5.mouseIsPressed && d < 32) { // 32 is half of our text size
                lettersObjects.isDragging = true;
            }

            // When mouse is released, stop dragging
            if (!p5.mouseIsPressed) {
                lettersObjects.isDragging = false;
            }

            p5.text(lettersObjects.letter, lettersObjects.x, lettersObjects.y);
            p5.textSize(64);
            p5.textFont('Georgia');

        });
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Sketch setup={setup} draw={draw} />;
};

export default DraggableLetter;
