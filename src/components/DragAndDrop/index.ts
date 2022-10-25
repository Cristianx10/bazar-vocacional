class DragAndDrop {


    currentlyDragging?: HTMLElement;
    startContainer?: HTMLElement;

    drags: HTMLElement[];
    drops: HTMLElement[];

    fOnDrop?: (elemento: HTMLElement) => void;
    fOnDragOver?: () => void;
    fOnDragLeave?: () => void;
    fOnStartDrag?: () => void;


    constructor() {
        this.drags = [];
        this.drops = [];
    }

    addDrag(items: (HTMLElement | undefined)[]) {



        items.forEach(item => {
            if (item) {

                var encontro = false;
                for (let i = 0; i < this.drags.length; i++) {
                    var d = this.drags[i];
                    if (d === item) {
                        encontro = true;
                        i = this.drags.length;
                    }
                }
                if (encontro === false) {
                    this.drags.push(item);


                    item.setAttribute('draggable', "true");

                    item.addEventListener("dragstart", ev => {
                        if (ev && ev.dataTransfer) {
                            ev.dataTransfer.effectAllowed = 'move';
                        }

                        if (ev.target) {
                            var target = ev.target as any;
                            this.currentlyDragging = target as HTMLElement;
                            this.startContainer = target.parentNode;

                            this.OnStartDrag();
                        }
                    });
                }


            }
        });

    }

    addDrop(containers: HTMLElement[]) {

        containers.forEach(container => {

            var encontro = false;
            for (let i = 0; i < this.drops.length; i++) {
                var d = this.drops[i];
                if (d === container) {
                    encontro = true;
                    i = this.drops.length;
                }
            }
            if (encontro === false) {
                this.drops.push(container);


                container.addEventListener("dragover", (ev) => {
                    ev.preventDefault();
                    container.classList.add('hovering');
                    this.onDragOver();
                });

                container.addEventListener("dragleave", () => {
                    container.classList.remove('hovering');
                    this.onDragLeave();
                });

                container.addEventListener("drop", () => {
                    container.classList.remove('hovering');

                    this.onDrog(container);

                    this.currentlyDragging = undefined;
                    this.startContainer = undefined;
                });

            }

        });


    }

    insertAfter(newNode: HTMLElement, existingNode: HTMLElement) {
        var parent = existingNode.parentNode;
        if (parent) {
            parent.insertBefore(newNode, existingNode.nextSibling);
        }
    }

    insertBefore(newNode: HTMLElement, existingNode: HTMLElement) {
        var parent = existingNode.parentNode;
        if (parent) {
            parent.insertBefore(newNode, existingNode);
        }
    }


    private onDragOver() {
        if (this.fOnDragOver) {
            this.fOnDragOver();
        }

    }

    private onDragLeave() {
        if (this.fOnDragLeave) {
            this.fOnDragLeave();
        }
    }

    private onDrog(elemento: HTMLElement) {
        if (this.fOnDrop) {
            this.fOnDrop(elemento);
        }
    }

    private OnStartDrag() {
        if (this.fOnStartDrag) {
            this.fOnStartDrag();
        }
    }


    setOnDragOver(fOnDragOver: () => void) {
        this.fOnDragOver = fOnDragOver;
    }

    setOnDragLeave(fOnDragLeave: () => void) {
        this.fOnDragLeave = fOnDragLeave;
    }

    setOnDrog(fOnDrop: (elemento: HTMLElement) => void) {
        this.fOnDrop = fOnDrop;
    }

    setOnStartDrag(fOnStartDrag: () => void) {
        this.fOnStartDrag = fOnStartDrag;
    }

    getCurrentDrag() {
        return this.currentlyDragging;
    }

    getStartContainerOfDrag() {
        return this.startContainer;
    }


}

export default DragAndDrop;