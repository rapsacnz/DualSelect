({
    doInit : function(component, event, helper) {
        helper.doInit(component);
    },
    deleteFromList : function(component,event, helper){
        helper.deleteFromList(component,event);
    },
    moveItems : function(component,event, helper){
        helper.moveItems(component);
    },
    handleDataChangeAppEvent : function(component, event, helper) {
        helper.handleDataChangeAppEvent (component, event);
    },
    handleListClick : function(component, event, helper) {
        helper.handleListClick(component,event,"v.items","v.highlightedItems","v.highlightedItem");
    },
    handleAddItems : function(component,event, helper){
        helper.handleAddItems(component,event,"v.items","v.highlightedItems","v.highlightedItem");
    },
    handleReorderItemUp : function(component,event, helper){
        helper.reorderItem(component,'up');
    },
    handleReorderItemDown : function(component,event, helper){
        helper.reorderItem(component,'down');
    },
    handleDragStart: function(component, event, helper) {
        helper.handleDragStart(component,event,"v.items");
    },
    handleOnDragEnter: function(component, event, helper) {
        helper.handleOnDragEnter(component,event);
    },
    handleOnDragLeave: function(component, event, helper) {
        helper.handleOnDragLeave(component,event);
    },
    handleOnDrop: function(component, event, helper) {
        helper.handleOnDrop(component,event);
    },
    handleOnDropParent: function(component, event, helper) {
        helper.handleOnDropParent(component,event);
    },
    
    /*dummy methods*/
    handleOnDragOver: function(component, event, helper) {
        event.preventDefault();
    },
    handleOnDragOverDummy: function(component, event, helper) {
        event.preventDefault();
    },
    handleOnDragEnterDummy: function(component, event, helper) {
        event.preventDefault();
    },
    handleOnDragLeaveDummy: function(component, event, helper) {
        event.preventDefault();
    },
    
    
})
