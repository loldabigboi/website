class DelayedCallbackSystem extends System {

    constructor() {
        super([DelayedCallbackComponent]);
    }

    update(dt, entities, scene) {

        const now = Date.now();
        for (const entityID of Object.keys(this.entities)) {

            const c = this.entities[entityID];
            const delayCArr = c[DelayedCallbackComponent];

            const toRemove = [];
            for (const delayC of delayCArr) {
                if (now - delayC.created > delayC.delay) {
                    delayC.callback({
                        id: entityID,
                        components: c,
                        scene: scene
                    })
                    toRemove.push(delayC);
                }
            }

            toRemove.forEach((c) => delayCArr.splice(delayCArr.indexOf(c), 1));

        }

    }

}