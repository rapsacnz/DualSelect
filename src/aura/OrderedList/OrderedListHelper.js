({
    
    doInit: function(component) {
        this.initializeList(component);
        component.set("v.uuId",this.uniqueId());
    },
    
    
    handleListClick : function(component,event, listName, selectedListName, selectedItemName ){
        var id = event.currentTarget.id;
        var items = component.get(listName);
        
        var itemOriginal = component.get(selectedItemName);
        
        var item = this.getItem(id,items);
        items = this.removeStyles(items);
        
        if (event.shiftKey && itemOriginal) {
            //make a selection from one to the next!
            var start = item.sort < itemOriginal.sort ? item.sort : itemOriginal.sort;
            var end = item.sort > itemOriginal.sort ? item.sort : itemOriginal.sort;
            
            var subset = this.getItems(start,end,items);
            
            subset = this.addStyles(subset,' select-focus ');
            component.set(selectedListName,subset);
            component.set(selectedItemName,'');
        }
        else {
            component.set(selectedItemName,item);
            component.set(selectedListName,[item]);
        }
        
        component.set(listName,items);
        
    },
    
    
    /***************************************
     *  DRAG AND DROP
     ***************************************/
    
    handleDragStart: function(component, event, listName) {
        
        var id = event.currentTarget.id;
        var items = component.get(listName);
        var item = this.getItem(id,items);
        item.parentId = component.get("v.uuId");
        
        event.dataTransfer.setData("text", JSON.stringify(item));
        
    },
    
    handleOnDragEnter: function(component, event) {
        var itemsDiv = component.find("items");
        $A.util.addClass(itemsDiv,' select-focus ');
    },
    
    handleOnDragLeave: function(component, event) {
        var itemsDiv = component.find("items");
        $A.util.removeClass(itemsDiv,' select-focus ');
    },
    
    handleOnDropParent: function(component, event) {
        
        event.preventDefault();
        event.stopPropagation();
        
        var items = component.get("v.items");
        var rawData = event.dataTransfer.getData('text');
        var item = JSON.parse(rawData);
        var receivingItem = this.getItem(event.target.id,items);
        item = this.getItem(item.Id,items) || item;
        
        //no items in the list or item wasn't dropped on a list item
        //possibly bad if there isn't a recieving item found but we are rearranging items
        //could lead to duplication
        if (!items || items.length === 0 || !receivingItem){
            item = this.addItem(items,item);
        }
        //item comes from other list
        else if (item.parentId !== component.get("v.uuId")) {
            
            receivingItem.parentId = component.get("v.uuId");
            items = this.insertItemAt(item,receivingItem,items);
        }
        //item from this list (just reorder)
        else {
                
            receivingItem.parentId = component.get("v.uuId");
            items = this.swapItem(item,receivingItem,items);
            items = this.sortItems(items);
        }

        items = this.renumberItems(items);
        items = this.sortItems(items);
        
        component.set("v.items",items);
        
        if(!(item instanceof Array)){
            item = [item];
        }
        
        this.dragComplete(component, item);
        
    },
    
    
    /***************************************
     *  APPLICATION EVENT AREA 
     ***************************************/
    
    moveItems : function(component) {
        var e = $A.get("e.c:DataChange_AE");
        e.setParams({
            "data" : {"uuId": component.get("v.uuId"), "items": component.get("v.highlightedItems"), "type" : "move"}
        });
        e.fire();
    },
    
    moveComplete : function(component) {
        var e = $A.get("e.c:DataChange_AE");
        e.setParams({
            "data" : {"uuId": component.get("v.uuId"), "type" : "moveComplete"}
        });
        e.fire();
    },
    
    dragComplete : function(component, itemsDragged) {
        var e = $A.get("e.c:DataChange_AE");
        e.setParams({
            "data" : {"uuId": component.get("v.uuId"), "type" : "dragComplete", "itemsDragged": itemsDragged}
        });
        e.fire();
    },
    
    handleDataChangeAppEvent : function(component, event) {
        var data = event.getParam("data");
        
        //abort if despatched from this component
        if (data.uuId === component.get("v.uuId")){
            return;
        }
        
        if (data.type === "move"){
            this.addItems(component,data.items);
            this.moveComplete(component);
        }
        
        else if (data.type === "moveComplete"){
            var items = this.removeItems(component.get("v.highlightedItems"),component.get("v.items"));
            component.set("v.items",items);
        }
        
            else if (data.type === "dragComplete"){
                var itemsDragged = data.itemsDragged;
                var items = this.removeItems(itemsDragged,component.get("v.items"));
                component.set("v.items",items);
            }
    },
    
    
    /***************************************
     *  COMPONENT EVENTS
     ***************************************/
    
    broadcastDataChange : function(component, immediate, item){
        
        component.set("v.changeEventScheduled",true);
        var position = component.get("v.position");
        var timer = component.get("v.storedTimer");
        var timeout = 1000;
        if (timer){
            window.clearTimeout(timer);
        }
        
        if (immediate){
            timeout = 50;
        }
        
        timer = window.setTimeout(
            $A.getCallback(function() {
                var compEvent = component.getEvent("multiColumnSelectChange");
                compEvent.setParams({ "type": "multiColumnSelectChange","data" : {"action":"remove","position":position, "item":item}});
                compEvent.fire();
                component.set("v.changeEventScheduled",false);
                
            }), timeout
        );
    },
    
    /***************************************
     *  GENERAL FUNCTIONS 
     ***************************************/
    
    addItems : function(component,newItems){
        
        var items = component.get("v.items");
        
        if(!newItems.length ){
            return;
        }
        var self = this;
        newItems.forEach(function(item){
            self.addItem(items,item);
        });
        
        items = self.renumberItems(items);
        items = self.sortItems(items);
        
        component.set("v.items",items);
        
        this.broadcastDataChange(component);
        
    },
    
    
    initializeList : function (component) {
        
        var items = component.get("v.values");
        var self = this;
        
        items.forEach( function(item,index){
            item.sort = index;
            item.style = '';
            item.id = self.uniqueId();
        });
        
        //needed to make work with locker service otherwise bindings don't work :(
        items = JSON.parse(JSON.stringify(items));
        
        component.set("v.items",items);
    },
    
    deleteFromList: function(component, event) {
        
        var params = event.getParam('arguments');
        var id;
        if (params) {
            id = params.itemId;
            var items = this.removeItem(id,component.get("v.items"));
            component.set("v.items",items);
        }
    },
    
    uniqueId : function(){
        function chr4(){
            return Math.random().toString(16).slice(-4);
        }
        return chr4() + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() + chr4() + chr4();
    },
    
    
    /***************************************
     *  LIST FUNCTIONS 
     ***************************************/
    
    getItem : function(id,items) {
        var itemToReturn;
        items.forEach( function(item){
            if (item.id === id){
                itemToReturn = item;
            }
        });
        return itemToReturn;
    },
    
    getItemBySort : function(sort,items) {
        var itemToReturn;
        items.forEach( function(item){
            if (item.sort === sort){
                itemToReturn = item;
            }
        });
        return itemToReturn;
    },
    
    getItems : function(start,end,items) {
        var itemsToReturn = [];
        items.forEach( function(item){
            if (item.sort >= start && item.sort <= end){
                itemsToReturn.push(item);
            }
        });
        return itemsToReturn;
    },
    
    addItem : function(items,item){
        item.style = '';
        //swap sorts
        var savedSort = item.savedSort;
        item.savedSort = item.sort;
        item.sort = savedSort;
        
        console.log('added: ' + JSON.stringify(item));
        
        items.push(item);
        return item;
    },
    
    removeItems : function(itemsToRemove,items) {
        
        itemsToRemove.forEach(function(itemToRemove) {
            items = items.filter(function(item){
                return item.id !== itemToRemove.id;
            });
        });
        return items;
    },
    
    removeItem : function(id,items) {
        items.forEach(function(item, index) {
            if (item.id === id) {
                items.splice(index, 1);
            }
        });
        return items;
    },
    
    sortItems : function(items) {
        items.sort(function(a, b) {
            return a.sort > b.sort ? 1 : -1;
        });
        return items;
    },
    
    renumberItems : function(items) {
        
        items = this.sortItems(items);
        items.forEach(function(item, index) {
            item.sort = index;
        });
        return items;
    },
    
    removeStyles : function(items) {
        items.forEach( function(item){
            item.style = '';
        });
        return items;
    },
    
    addStyles : function(items,style) {
        items.forEach( function(item){
            item.style = style;
        });
        return items;
    },
    
    swapItem : function (fromItem,toItem,items){
        
        //save desired sort
        var toIndex = toItem.sort;
        
        items.forEach( function(item){
            if (item.id == fromItem.id){
                item.sort = toIndex;
            }
            else if (item.sort >= toIndex){
                item.sort++;
            }
        });
        
        return items;
    },
    
    
    insertItemAt : function (fromItem,toItem,items){

        var toSort = toItem.sort;
        var toIndex = -1;
        
        items.forEach( function(item, index){
            if (item.sort === toSort){
                toIndex = index;
            }
            if (item.sort >= toSort){
                item.sort++;
            }
        });
        if (toIndex > -1){
            fromItem = JSON.parse(JSON.stringify(fromItem));
            fromItem.sort = toSort;
            items.splice(toIndex,0,fromItem);
        }
        return items
        
    },
    
    reorderItem : function (component, direction) {
        
        var item = component.get("v.highlightedItem");
        if (!item){
            return;
        }
        var swapItem,swapIndex;
        //clear selected list
        component.set("v.highlightedItems",[item]);
        
        var items = component.get("v.items");
        items = this.renumberItems(items);
        
        if (direction == 'up'){
            if (item.sort < 1 ){
                return;
            }
            swapIndex = item.sort - 1;
        }
        if (direction == 'down'){
            if (item.sort == items.length ){
                return;
            }
            swapIndex = item.sort + 1;
        }
        swapItem = this.getItemBySort(swapIndex,items);
        if (!swapItem){
            return;
        }
        var temp = item.sort;
        item.sort = swapItem.sort;
        swapItem.sort = temp;
        console.log('swapitem sort: ' + swapItem.sort + ' item sort: ' + item.sort);
        
        //sort and save
        items = this.sortItems(items);
        component.set("v.items",items);
        
        item.style  = ' select-focus ';
        component.set("v.highlightedItem",item);
        
    },
})
