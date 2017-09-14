# DualSelect
A new version of the MultiColumnSelect. Looks the same. Way better.

<a href="https://githubsfdeploy.herokuapp.com?owner=rapsacnz&repo=DualSelect&ref=master">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

The structure of the component is more modular - The main `DualSelect` component is made up of two `OrderedList` components which handle all the dragging, dropping moving via events (I've done this via appliation events but am thinking of moving to component events - it does add a dependency on the parent `DualSelect` component, but I suppose there is a pretty heavy depency anyway... :)

What it looks like:

[![DualSelect gif][1]][1]


To use, look at the DualSelect app. Eg:

    <aura:application access="global" extends="force:slds" >
      <aura:attribute name="leftValues" type="Object[]" default="[
      {
        'label': 'Annual Review',
        'value': 'Annual Review'
      },
      {
        'label': 'Watching Market',
        'value': 'Watching Market'
      },
      {
        'label': 'Initial Contact',
        'value': 'Initial Contact'
      }
      ]"/>
        
      <div class="slds">
        <div class="slds-box">
          <c:DualSelect fieldName="Opportunity Stage" leftValues="{!v.stagenames}" />
        </div>     
      </div>
    </aura:application>
    
You can:
 - Drag from source to destination
 - Drag from destination to source
 - Dragging will attempt to put the item where you dropped it.
 - Drag to reorder in any list
 - Shift select several items in source or destination, then use the arrow buttons to move to either source or destination
 - Highlight an item and use the up / down buttons to move up and down.

At this point the component is very lightweight - you are required to pass in the source list.
When the selected items list changes, the component emits an event called "multiColumnSelectChange" of type "c:DataChange_CE"
The changed items will be in data.items parameter on the event.

**NOTE** If you need to set the list source values dynamically, it's best to set them to the source list in one go and use a handler (in the inner ordered list component) to detect the data change, in turn calling the init method:

Add:

    <aura:handler name="change" value="{!v.leftValues}" action="{!c.doInit}"/>
    
Remove:

    <aura:handler name="init" value="{!this}" action="{!c.doInit}" />

Enjoy!

[1]: https://imgur.com/g36y8If.gif
