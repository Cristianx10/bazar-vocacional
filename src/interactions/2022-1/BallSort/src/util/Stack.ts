/*
 * Stack Implementation
 */
class Stack {

    capacity: any;
    stack = [];
    count = 0;
    solved = false;



    constructor(capacity?: any) {

        this.capacity = capacity || Infinity;
        this.stack = [];
        this.count = 0;
        this.solved = false;

    }


    available = () => {
        return this.capacity - this.count;
    }


    size = () => {
        return this.count;
    }

    takeout = (index: number) => {

        let counter = 0;
        let content;
        let movement = [];

        var kill = false;

        while (!kill) {




            if (this.count > 0) {

                if (counter == 0) {
                    content = this.pop();
                    counter++;

                } else if (content === this.peek()) {
                    this.pop();
                    counter++;
                } else {
                    kill = true;
                }

            } else {

                kill = true;
            }


        }

        if (counter == 0) {
            return false;
        } else {
            movement.push(content);
            movement.push(counter);
            movement.push(index);
        }

        return movement;

    }

    push = (val: any) => {

        if (this.count < this.capacity) {
            //@ts-ignore
            this.stack[this.count] = val;
            this.count++;
            return this.count


        } else {
            return 'The stack is full';
        }

    }

    pop = () => {

        if (this.count > 0) {
            var value = this.stack[this.count - 1];
            this.count--;
            delete this.stack[this, this.count];

            if (this.count < 0) {
                this.count = 0;
            }

            return value;
        } else {
            return 'The stack is empty';
        }

    }

    peek = () => {

        if (this.count > 0) {
            return this.stack[this.count - 1];
        } else {
            return 'empty';
        }
    }

    getArray = () => {
        return this.stack;
    }

    stackSolved = () => {


        if (this.count == 0) {
            this.solved = true;
        } else if (this.count > 0 && this.count <= this.capacity) {
            let color = this.stack[0];

            for (let i = 0; i < this.stack.length; i++) {

                if (color == this.stack[i]) {

                } else {

                    this.solved = false;

                    return;
                }
            }

            this.solved = true;



        } else {
            this.solved = false;
        }

    }

}

export default Stack;