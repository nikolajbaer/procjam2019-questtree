
Crafty.c('Character', {
    init: function(){
        this.addComponent("2D, Canvas, character, Fourway, Collision");
        this.attr({w:32,h:32,z:1000})
        this.fourway(200, {normalize: true}) 
        this.inventory = [];
        this.name = "Unnamed";
        this.quest = null;
        this.checkHits("Pickup, StaticBody")
        this.onHit("StaticBody", h => {
            //console.log("stop")
        })
        this.onHit("Pickup",function(hitData){
            hitData.forEach( pickup => {
                const item = pickup.obj
                //Crafty.trigger("showMessages",[`${this.name} picked up a ${item.item}`]);
                this.inventory.push(item.item);
                Crafty.trigger("characterUpdate",this);
                item.destroy();
                const complete = this.quest.update(this);
                if(complete){
                    Crafty.trigger("showMessages", [`${this.quest.name} is complete!`]);
                }
                Crafty.trigger("questUpdate",this.quest);
            });
        })
        this.onHit("NPC",function(hitData){
            hitData.forEach( npc_hit => {
                const npc = npc_hit.obj
                //Crafty.trigger("showMessages",[`${this.name} picked up a ${item.item}`]);
                const action = npc.interact(this);
                if(action != null){
                    console.log(`triggering ${action}`)
                    Crafty.trigger(action,npc);
                    npc.destroy();
                }
                const complete = this.quest.update(this);
                if(complete){
                    Crafty.trigger("showMessages", [`${this.quest.name} is complete!`]);
                }
                Crafty.trigger("questUpdate",this.quest);
            });
        })
        /*
        // TODO Mouse/Touch Control
        Crafty.s("Mouse").bind("MouseMove",function(e){
            this.target = {x:e.realX,y:e.realY};
        })
        Crafty.s("Mouse").bind("MouseDown",function(e){
            console.log(e)
            const v1 = new Crafty.math.Vector2D(this.x,this.y);
            const v2 = new Crafty.math.Vector2D(this.target.x,this.target.y);
            const speed = v2.subtract(v1).normalize().multiply(this.speed);
            this.speed = speed
        })
        Crafty.s("Mouse").bind("MouseUp",function(e){
            this.speedx = {x:0,y:0}
        })
        */
    },
})